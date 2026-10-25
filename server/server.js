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
    const relPath = decodeURIComponent(req.path.replace(/^\//, ''));
    const localFile = path.join(ROOT_DIR, 'exams', relPath);

    if (fs.existsSync(localFile)) {
        return res.sendFile(localFile, { dotfiles: 'allow', acceptRanges: true, maxAge: '7d' });
    }

    const safeCacheKey = relPath.replace(/[^a-zA-Z0-9._-]/g, '_');
    const cachedFile = path.join(PDF_CACHE_DIR, safeCacheKey);

    if (fs.existsSync(cachedFile)) {
        return res.sendFile(cachedFile, { dotfiles: 'allow', acceptRanges: true, maxAge: '7d' });
    }

    // High-speed CDN proxy with jsDelivr edge CDN + raw fallback
    const encodedSegments = relPath.split('/').map(seg => encodeURIComponent(seg)).join('/');
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

app.use(express.static(ROOT_DIR));

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

/* ========================================================
   AUTHENTICATION ROUTES
======================================================== */

// Login
app.post('/api/auth/login', (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }

        const user = db.findUserByUsername(username);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const isMatch = bcrypt.compareSync(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const token = generateToken(user);
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                fullName: user.fullName
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// Register
app.post('/api/auth/register', (req, res) => {
    try {
        const { username, email, password, fullName, role } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ success: false, message: 'Username, email and password are required' });
        }

        if (db.findUserByUsername(username)) {
            return res.status(400).json({ success: false, message: 'Username is already taken' });
        }

        if (db.findUserByEmail(email)) {
            return res.status(400).json({ success: false, message: 'Email is already registered' });
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const assignedRole = role === 'admin' ? 'student' : (role || 'student');

        const newUser = db.createUser({
            username: username.trim(),
            email: email.trim(),
            passwordHash,
            role: assignedRole,
            fullName: fullName || username
        });

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
                fullName: newUser.fullName
            }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// Verify Current Token
app.get('/api/auth/me', authenticateToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
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

        // Clean up file if it was uploaded to uploads directory
        if (exam.fileUrl && exam.fileUrl.startsWith('/uploads/exams/')) {
            const diskPath = path.join(ROOT_DIR, exam.fileUrl);
            if (fs.existsSync(diskPath)) {
                try {
                    fs.unlinkSync(diskPath);
                } catch (e) {
                    console.warn('Could not delete physical file:', e);
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
        const { grade, subject, semester, examType, search, examId } = req.query;
        const questions = db.getQuestions({ grade, subject, semester, examType, search, examId });
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
