const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'past_exam_library_super_secret_jwt_key_2026';

// Directories setup
const IS_VERCEL = !!(process.env.VERCEL || process.env.NOW_REGION);
const ROOT_DIR = path.join(__dirname, '..');
const UPLOADS_DIR = IS_VERCEL ? path.join('/tmp', 'uploads', 'exams') : path.join(ROOT_DIR, 'uploads', 'exams');
try {
    if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
} catch (e) {
    console.warn('Could not initialize uploads directory:', e.message);
}

// Multer storage for uploaded PDFs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase() || '.pdf';
        const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext) || file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and document files are permitted.'));
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defense-in-depth security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Block direct access to internal server files, database, and configurations
app.use((req, res, next) => {
    let rawPath = '';
    try {
        rawPath = decodeURIComponent(req.path || '');
    } catch (e) {
        rawPath = req.path || '';
    }
    rawPath = path.posix.normalize(rawPath.replace(/\\/g, '/')).toLowerCase();
    const blockedPrefixes = ['/data', '/server', '/.git', '/exam_cache', '/node_modules', '/scripts', '/.env'];
    const blockedFiles = ['/package.json', '/package-lock.json', '/vercel.json', '/.gitignore', '/readme.md', '/.env'];

    if (blockedPrefixes.some(p => rawPath === p || rawPath.startsWith(p + '/')) || blockedFiles.includes(rawPath)) {
        return res.status(404).send('Not Found');
    }
    next();
});

// Serve static assets
app.use('/uploads', express.static(path.join(ROOT_DIR, 'uploads')));

// Cache directory for high-speed PDF delivery
const PDF_CACHE_DIR = path.join(IS_VERCEL ? '/tmp' : ROOT_DIR, 'exam_cache');
try {
    if (!fs.existsSync(PDF_CACHE_DIR)) {
        fs.mkdirSync(PDF_CACHE_DIR, { recursive: true });
    }
} catch (e) {
    console.warn('Could not create PDF cache dir:', e.message);
}

// Proxy & serve exam papers directly with edge CDN acceleration, range support & disk cache
app.use('/exams', (req, res, next) => {
    let rawReqPath = '';
    try {
        rawReqPath = decodeURIComponent(req.path || '');
    } catch (e) {
        rawReqPath = req.path || '';
    }
    // Sanitize path against directory traversal
    const safeRelPath = path.normalize(rawReqPath).replace(/^(\.\.[\/\\])+/, '').replace(/^[\\\/]+/, '');
    const examsBaseDir = path.resolve(ROOT_DIR, 'exams');
    const localFile = path.resolve(examsBaseDir, safeRelPath);

    // Strict directory traversal boundary check
    if (localFile !== examsBaseDir && !localFile.startsWith(examsBaseDir + path.sep)) {
        return res.status(403).json({ success: false, message: 'Access denied: Invalid file path' });
    }

    if (fs.existsSync(localFile)) {
        return res.sendFile(localFile, { dotfiles: 'ignore', acceptRanges: true, maxAge: '7d' });
    }

    const safeCacheKey = safeRelPath.replace(/[^a-zA-Z0-9._-]/g, '_');
    const cachedFile = path.resolve(PDF_CACHE_DIR, safeCacheKey);

    if (fs.existsSync(cachedFile)) {
        return res.sendFile(cachedFile, { dotfiles: 'ignore', acceptRanges: true, maxAge: '7d' });
    }

    // High-speed CDN proxy with jsDelivr edge CDN + raw fallback
    const encodedSegments = safeRelPath.split(/[\/\\]/).filter(s => s && s !== '..' && s !== '.').map(seg => encodeURIComponent(seg)).join('/');
    const jsDelivrUrl = `https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/${encodedSegments}`;
    const rawGithubUrl = `https://raw.githubusercontent.com/soliyana-dev/past-exam-library/main/exams/${encodedSegments}`;

    const headers = {};
    if (req.headers.range) {
        headers['range'] = req.headers.range;
    }

    function fetchAndPipe(urls, idx = 0) {
        if (idx >= urls.length) return next();
        const currentUrl = urls[idx];

        https.get(currentUrl, { headers }, (upstreamRes) => {
            if (upstreamRes.statusCode === 200 || upstreamRes.statusCode === 206) {
                res.status(upstreamRes.statusCode);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Accept-Ranges', 'bytes');
                res.setHeader('Cache-Control', 'public, max-age=604800, s-maxage=86400');
                if (upstreamRes.headers['content-range']) {
                    res.setHeader('Content-Range', upstreamRes.headers['content-range']);
                }
                if (upstreamRes.headers['content-length']) {
                    res.setHeader('Content-Length', upstreamRes.headers['content-length']);
                }

                // If full document and not already cached, write to cache asynchronously
                if (upstreamRes.statusCode === 200 && !req.headers.range) {
                    try {
                        const tempCache = cachedFile + '.tmp_' + Date.now();
                        const writeStream = fs.createWriteStream(tempCache);
                        upstreamRes.pipe(writeStream);
                        writeStream.on('finish', () => {
                            try { fs.renameSync(tempCache, cachedFile); } catch (e) {}
                        });
                        writeStream.on('error', () => {
                            try { if (fs.existsSync(tempCache)) fs.unlinkSync(tempCache); } catch (e) {}
                        });
                    } catch (e) {}
                }

                return upstreamRes.pipe(res);
            }

            // If not found or error, try next candidate
            fetchAndPipe(urls, idx + 1);
        }).on('error', () => fetchAndPipe(urls, idx + 1));
    }

    const candidateUrls = [jsDelivrUrl, rawGithubUrl];
    if (encodedSegments.includes('/Pretest/')) {
        candidateUrls.push(jsDelivrUrl.replace('/Pretest/', '/pretest/'));
        candidateUrls.push(rawGithubUrl.replace('/Pretest/', '/pretest/'));
    }
    if (encodedSegments.includes('/pretest/')) {
        candidateUrls.push(jsDelivrUrl.replace('/pretest/', '/Pretest/'));
        candidateUrls.push(rawGithubUrl.replace('/pretest/', '/Pretest/'));
    }
    if (encodedSegments.includes('Citizen%20ship')) {
        candidateUrls.push(jsDelivrUrl.replace('Citizen%20ship', 'Citizenship'));
        candidateUrls.push(rawGithubUrl.replace('Citizen%20ship', 'Citizenship'));
    }
    if (encodedSegments.includes('Citizenship')) {
        candidateUrls.push(jsDelivrUrl.replace('Citizenship', 'Citizen%20ship'));
        candidateUrls.push(rawGithubUrl.replace('Citizenship', 'Citizen%20ship'));
    }
    if (encodedSegments.includes('HP.pdf')) {
        candidateUrls.push(jsDelivrUrl.replace('HP.pdf', 'Hp.pdf'));
        candidateUrls.push(rawGithubUrl.replace('HP.pdf', 'Hp.pdf'));
    }
    if (encodedSegments.includes('Hp.pdf')) {
        candidateUrls.push(jsDelivrUrl.replace('Hp.pdf', 'HP.pdf'));
        candidateUrls.push(rawGithubUrl.replace('Hp.pdf', 'HP.pdf'));
    }

    fetchAndPipe(candidateUrls, 0);
});

// Service Worker route with root scope & no-cache header
app.get('/sw.js', (req, res) => {
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.sendFile(path.join(ROOT_DIR, 'sw.js'));
});

app.use(express.static(ROOT_DIR, { dotfiles: 'ignore' }));

// Auth Helpers
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
            fullName: user.fullName
        },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid or expired session' });
        }
        req.user = decoded;
        next();
    });
}

function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Administrator access required' });
    }
    next();
}

// In-memory IP Rate Limiter to mitigate brute-force attacks on auth endpoints
const authRateLimits = new Map();
function rateLimitAuth(req, res, next) {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15-minute sliding window
    const maxAttempts = 15; // Max 15 attempts per 15 min per IP

    const record = authRateLimits.get(ip) || { count: 0, resetTime: now + windowMs };
    if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + windowMs;
    } else {
        record.count++;
    }
    authRateLimits.set(ip, record);

    if (record.count > maxAttempts) {
        const waitMinutes = Math.ceil((record.resetTime - now) / 60000);
        return res.status(429).json({
            success: false,
            message: `Too many attempts from this IP. Please try again in ${waitMinutes} minute${waitMinutes > 1 ? 's' : ''}.`
        });
    }
    next();
}

/* ========================================================
   AUTHENTICATION ROUTES
======================================================== */

// Login (Protected with Rate Limiting)
app.post('/api/auth/login', rateLimitAuth, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const loginIdentifier = (username || email || '').trim();
        if (!loginIdentifier || !password) {
            return res.status(400).json({ success: false, message: 'Email/username and password are required' });
        }

        const user = (await db.findUserByUsernameAsync(loginIdentifier)) || (await db.findUserByEmailAsync(loginIdentifier));
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const isMatch = bcrypt.compareSync(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const token = generateToken(user);

        // Record user login activity
        try {
            db.addActivityLog({
                type: 'login',
                userId: user.id,
                username: user.username,
                fullName: user.fullName || user.username,
                role: user.role,
                details: `Signed in to account`,
                ip: req.ip || req.headers['x-forwarded-for'] || '',
                userAgent: req.headers['user-agent'] || '',
                timestamp: new Date().toISOString()
            });
        } catch (logErr) {
            console.warn('Could not record login log:', logErr.message);
        }

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                fullName: user.fullName || user.username
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// Register (Protected with Rate Limiting)
app.post('/api/auth/register', rateLimitAuth, async (req, res) => {
    try {
        let { username, email, password, fullName } = req.body;

        if (!password || password.trim().length < 4) {
            return res.status(400).json({ success: false, message: 'Password must be at least 4 characters long' });
        }

        const identifier = (email || username || '').trim();
        if (!identifier) {
            return res.status(400).json({ success: false, message: 'Email or username is required' });
        }

        // If identifier contains @, treat as email
        if (identifier.includes('@')) {
            email = identifier;
            if (!username) {
                username = identifier.split('@')[0].replace(/[^a-zA-Z0-9_.]/g, '');
            }
        } else {
            if (!username) username = identifier;
            if (!email) email = `${username.toLowerCase()}@student.library`;
        }

        username = username.trim();
        email = email.trim();

        if (await db.findUserByUsernameAsync(username)) {
            // If auto-generated from email, try appending random suffix
            username = `${username}_${Math.floor(100 + Math.random() * 900)}`;
            if (await db.findUserByUsernameAsync(username)) {
                return res.status(400).json({ success: false, message: 'Username is already taken' });
            }
        }

        if (await db.findUserByEmailAsync(email)) {
            return res.status(400).json({ success: false, message: 'This email is already registered. Please sign in.' });
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        // Public registration strictly assigns student role (prevents role elevation)
        const assignedRole = 'student';

        const newUser = await db.createUserAsync({
            username,
            email,
            passwordHash,
            role: assignedRole,
            fullName: fullName ? fullName.trim() : username
        });

        // Record new student registration in activity logs
        try {
            db.addActivityLog({
                type: 'register',
                userId: newUser.id,
                username: newUser.username,
                fullName: newUser.fullName || newUser.username,
                role: newUser.role,
                details: 'New student registered and signed in',
                ip: req.ip || req.headers['x-forwarded-for'] || '',
                userAgent: req.headers['user-agent'] || '',
                timestamp: new Date().toISOString()
            });
        } catch (e) {}

        const token = generateToken(newUser);
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                fullName: newUser.fullName || newUser.username
            }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// Verify Current Token & Return Latest User Data
app.get('/api/auth/me', authenticateToken, (req, res) => {
    const user = db.findUserById(req.user.id);
    if (user) {
        return res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                fullName: user.fullName || user.username
            }
        });
    }
    res.json({
        success: true,
        user: req.user
    });
});

// Update Student / User Profile (e.g. Registered Full Name)
app.put('/api/auth/profile', authenticateToken, (req, res) => {
    try {
        const { fullName, email } = req.body;
        if (!fullName || !fullName.trim()) {
            return res.status(400).json({ success: false, message: 'Full name cannot be empty' });
        }
        const updated = db.updateUserProfile(req.user.id, { fullName: fullName.trim(), email });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: updated.id,
                username: updated.username,
                email: updated.email,
                role: updated.role,
                fullName: updated.fullName
            }
        });
    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

/* ========================================================
   CATEGORY MANAGEMENT ROUTES
======================================================== */

// Get all categories & taxonomy
app.get('/api/categories', (req, res) => {
    try {
        const categories = db.getCategories();
        res.json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Add a new Grade (Admin only)
app.post('/api/categories/grade', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { id, name, number, description } = req.body;
        if (!name && !id) {
            return res.status(400).json({ success: false, message: 'Grade name is required' });
        }
        const newGrade = db.addGrade({ id, name, number, description });
        res.status(201).json({ success: true, message: 'Grade added successfully', grade: newGrade });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Delete a Grade (Admin only)
app.delete('/api/categories/grade/:gradeId', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { gradeId } = req.params;
        db.deleteGrade(gradeId);
        res.json({ success: true, message: `Grade ${gradeId} removed successfully` });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Add a Subject to a Grade (Admin only)
app.post('/api/categories/subject', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { gradeId, subjectName } = req.body;
        if (!gradeId || !subjectName) {
            return res.status(400).json({ success: false, message: 'gradeId and subjectName are required' });
        }
        const updatedSubjects = db.addSubject(gradeId, subjectName);
        res.status(201).json({
            success: true,
            message: `Subject ${subjectName} added to ${gradeId}`,
            subjects: updatedSubjects
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Delete a Subject from a Grade (Admin only)
app.delete('/api/categories/subject', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { gradeId, subjectName } = req.body;
        if (!gradeId || !subjectName) {
            return res.status(400).json({ success: false, message: 'gradeId and subjectName are required' });
        }
        db.deleteSubject(gradeId, subjectName);
        res.json({ success: true, message: `Subject ${subjectName} removed from ${gradeId}` });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

/* ========================================================
   EXAMS MANAGEMENT ROUTES
======================================================== */

// Get exams with optional filters
app.get('/api/exams', (req, res) => {
    try {
        const { grade, semester, examType, subject, search } = req.query;
        const exams = db.getExams({ grade, semester, examType, subject, search });
        res.json({ success: true, count: exams.length, exams });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Upload and add an exam paper (Admin only)
app.post('/api/exams', authenticateToken, requireAdmin, upload.single('examFile'), (req, res) => {
    try {
        const { title, grade, semester, examType, subject, year, externalUrl } = req.body;

        if (!grade || !subject) {
            return res.status(400).json({ success: false, message: 'Grade and subject are required' });
        }

        let fileUrl = '';
        let fileName = '';
        let fileSize = 0;

        if (req.file) {
            fileUrl = `/uploads/exams/${req.file.filename}`;
            fileName = req.file.originalname;
            fileSize = req.file.size;
        } else if (externalUrl) {
            fileUrl = externalUrl;
            fileName = path.basename(externalUrl) || 'exam-paper.pdf';
        } else {
            // Default file path convention in exams folder
            if (examType === 'Pretest' || examType === 'Model') {
                fileUrl = `exams/${grade}/${examType}/${subject}.pdf`;
            } else {
                fileUrl = `exams/${grade}/${semester || 'Semester1'}/${examType || 'Final'}/${subject}.pdf`;
            }
            fileName = `${subject}.pdf`;
        }

        const newExam = db.createExam({
            title: title || `${grade} ${subject} ${examType || ''} (${year || '2024'})`,
            grade,
            semester: semester || 'Semester1',
            examType: examType || 'Final',
            subject,
            year: year || new Date().getFullYear().toString(),
            fileUrl,
            fileName,
            fileSize,
            uploadedBy: req.user.username
        });

        res.status(201).json({
            success: true,
            message: 'Exam paper uploaded and created successfully',
            exam: newExam
        });
    } catch (err) {
        console.error('Error creating exam:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Delete an Exam (Admin only)
app.delete('/api/exams/:id', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { id } = req.params;
        const exam = db.deleteExam(id);
        if (!exam) {
            return res.status(404).json({ success: false, message: 'Exam paper not found' });
        }

        // Clean up file safely if it was uploaded to uploads directory
        if (exam.fileUrl && exam.fileUrl.startsWith('/uploads/exams/')) {
            const fileName = path.basename(exam.fileUrl);
            const diskPath = path.resolve(UPLOADS_DIR, fileName);
            const uploadsBase = path.resolve(UPLOADS_DIR);
            if (diskPath.startsWith(uploadsBase) && fs.existsSync(diskPath)) {
                try {
                    fs.unlinkSync(diskPath);
                } catch (e) {
                    console.warn('Could not delete physical file:', e.message);
                }
            }
        }

        res.json({ success: true, message: 'Exam paper deleted successfully', exam });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

/* ========================================================
   INTERACTIVE PRACTICE QUESTIONS ROUTES
======================================================== */

// Get practice questions with filters
app.get('/api/practice', (req, res) => {
    try {
        const { grade, subject, semester, examType, search, examId, exactOnly } = req.query;
        const questions = db.getQuestions({ 
            grade, 
            subject, 
            semester, 
            examType, 
            search, 
            examId, 
            exactOnly: exactOnly === 'true' || exactOnly === '1' 
        });
        res.json({ success: true, count: questions.length, questions });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Add a practice question (Admin only)
app.post('/api/practice/questions', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { grade, subject, semester, examType, question, options, correctAnswer, explanation, points } = req.body;

        if (!grade || !subject || !question || !options || options.length < 2) {
            return res.status(400).json({ success: false, message: 'Grade, subject, question, and at least 2 options are required' });
        }

        const newQ = db.addQuestion({
            grade,
            subject,
            semester,
            examType,
            question,
            options,
            correctAnswer: parseInt(correctAnswer) || 0,
            explanation,
            points: parseInt(points) || 1
        });

        res.status(201).json({ success: true, message: 'Question created successfully', question: newQ });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Delete a practice question (Admin only)
app.delete('/api/practice/questions/:id', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { id } = req.params;
        const deleted = db.deleteQuestion(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        res.json({ success: true, message: 'Question deleted successfully', question: deleted });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

/* ========================================================
   STUDENT & USER ACTIVITY TRACKING ROUTES
======================================================== */

// Log an action (download, preview, practice completion)
app.post('/api/activity/log', (req, res) => {
    try {
        let authUser = null;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                authUser = db.findUserById(decoded.id) || decoded;
            } catch (e) {}
        }

        const {
            type,
            grade,
            subject,
            semester,
            examType,
            examTitle,
            filePath,
            score,
            totalQuestions,
            percentage,
            durationSeconds,
            mode,
            details
        } = req.body;

        if (!type) {
            return res.status(400).json({ success: false, message: 'Activity type is required' });
        }

        const username = authUser ? authUser.username : (req.body.username ? String(req.body.username).slice(0, 30) : 'student');
        const fullName = authUser ? (authUser.fullName || authUser.username) : (req.body.fullName ? String(req.body.fullName).slice(0, 50) : username);
        // Prevent unauthorized spoofing of admin role in logs when unauthenticated
        const role = authUser ? authUser.role : 'student';
        const userId = authUser ? authUser.id : null;

        const newLog = db.addActivityLog({
            type,
            userId,
            username,
            fullName,
            role,
            grade,
            subject,
            semester,
            examType,
            examTitle,
            filePath,
            score,
            totalQuestions,
            percentage,
            durationSeconds,
            mode,
            details,
            ip: req.ip || req.headers['x-forwarded-for'] || '',
            userAgent: req.headers['user-agent'] || '',
            timestamp: new Date().toISOString()
        });

        res.json({ success: true, log: newLog });
    } catch (err) {
        console.error('Activity logging error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Query activity logs with filtering (Admin only)
app.get('/api/activity/logs', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { type, username, grade, subject, search, limit } = req.query;
        const logs = db.getActivityLogs({ type, username, grade, subject, search, limit });
        res.json({ success: true, count: logs.length, logs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Aggregated activity statistics (Admin only) - supports active filters
app.get('/api/activity/stats', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { type, username, grade, subject, search } = req.query;
        const stats = db.getActivityStats({ type, username, grade, subject, search });
        res.json({ success: true, stats });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

/* ========================================================
   ADMIN METRICS ROUTE
======================================================== */
app.get('/api/stats', authenticateToken, requireAdmin, (req, res) => {
    try {
        const stats = db.getStats();
        res.json({ success: true, stats });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Admin Route: Directory of All Registered Students
app.get('/api/admin/students', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const search = (req.query.search || '').trim();
        const students = await db.getAllStudentsAsync(search);

        const allLogs = db.data.activityLogs || [];
        const enriched = students.map(student => {
            const studentLogs = allLogs.filter(l => l.userId === student.id || (student.username && l.username === student.username));
            const downloads = studentLogs.filter(l => l.type === 'download' || l.type === 'preview').length;
            const quizzes = studentLogs.filter(l => l.type === 'practice').length;
            return {
                ...student,
                downloadsCount: downloads,
                quizzesCount: quizzes
            };
        });

        const supabaseStore = require('./supabase');
        res.json({
            success: true,
            total: enriched.length,
            isCloudConnected: supabaseStore.isConfigured(),
            students: enriched
        });
    } catch (err) {
        console.error('Error fetching registered students:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Fallback to index.html for single-page client routing
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads') && !req.path.startsWith('/exams')) {
        return res.sendFile(path.join(ROOT_DIR, 'index.html'));
    }
    next();
});

// Export app for serverless platforms (Vercel)
module.exports = app;

// Start server only when executed directly (standalone)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`===============================================`);
        console.log(`🚀 Past Exam Library Server running on port ${PORT}`);
        console.log(`🔗 Local URL: http://localhost:${PORT}`);
        console.log(`===============================================`);
    });
}
