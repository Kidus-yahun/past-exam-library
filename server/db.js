const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

let bundledSeedData;
try {
    bundledSeedData = require('../data/db.json');
} catch (e) {
    bundledSeedData = null;
}

const DATA_DIR = path.join(__dirname, '..', 'data');
const IS_VERCEL = !!(process.env.VERCEL || process.env.NOW_REGION);
const RUNTIME_DIR = IS_VERCEL ? '/tmp' : DATA_DIR;
const DB_FILE = path.join(RUNTIME_DIR, 'db.json');

// Ensure data directory exists safely
try {
    if (!fs.existsSync(RUNTIME_DIR)) {
        fs.mkdirSync(RUNTIME_DIR, { recursive: true });
    }
} catch (e) {
    console.warn('Could not create runtime directory:', e.message);
}

// Initial seed data
function getInitialData() {
    const salt = bcrypt.genSaltSync(10);
    const adminPasswordHash = bcrypt.hashSync('admin123', salt);
    const studentPasswordHash = bcrypt.hashSync('student123', salt);

    const initialSubjects = {
        Grade9: [
            "Amharic", "English", "Mathematics", "Physics", "Chemistry", 
            "Biology", "History", "Geography", "Economics", "IT", "Citizenship", "HP"
        ],
        Grade10: [
            "Amharic", "English", "Mathematics", "Physics", "Chemistry", 
            "Biology", "History", "Geography", "Economics", "IT", "Citizenship", "HP"
        ],
        Grade11: [
            "Amharic", "English", "Mathematics", "Physics", "Chemistry", 
            "Biology", "Agriculture", "IT", "WEB"
        ],
        Grade12: [
            "Amharic", "English", "Mathematics", "Physics", "Chemistry", 
            "Biology", "Agriculture", "IT", "Aptitude"
        ]
    };

    const grade12NationalSubjects = [
        "English", "Mathematics", "Aptitude", "Physics", "Chemistry", "Biology"
    ];

    // Seed some initial exam papers mapped to standard structure
    const initialExams = [];
    let examIdCounter = 1;

    // Seed Grade 12 National Pretest & Model
    grade12NationalSubjects.forEach(subject => {
        initialExams.push({
            id: 'exam_' + (examIdCounter++),
            title: `Grade 12 Pre-test ${subject}`,
            grade: 'Grade12',
            semester: 'Pretest',
            examType: 'Pretest',
            subject: subject,
            year: '2024',
            fileUrl: `exams/Grade12/Pretest/${subject}.pdf`,
            uploadedBy: 'system',
            createdAt: new Date().toISOString()
        });

        initialExams.push({
            id: 'exam_' + (examIdCounter++),
            title: `Grade 12 Model ${subject}`,
            grade: 'Grade12',
            semester: 'Model',
            examType: 'Model',
            subject: subject,
            year: '2024',
            fileUrl: `exams/Grade12/Model/${subject}.pdf`,
            uploadedBy: 'system',
            createdAt: new Date().toISOString()
        });
    });

    return {
        users: [
            {
                id: 'u_admin',
                username: 'admin',
                email: 'admin@pastexamlibrary.org',
                passwordHash: adminPasswordHash,
                role: 'admin',
                fullName: 'System Administrator',
                createdAt: new Date().toISOString()
            },
            {
                id: 'u_student',
                username: 'student',
                email: 'student@pastexamlibrary.org',
                passwordHash: studentPasswordHash,
                role: 'student',
                fullName: 'Demo Student',
                createdAt: new Date().toISOString()
            }
        ],
        categories: {
            grades: [
                { id: 'Grade9', name: 'Grade 9', number: '09', description: 'Past examinations for Grade 9' },
                { id: 'Grade10', name: 'Grade 10', number: '10', description: 'Past examinations for Grade 10' },
                { id: 'Grade11', name: 'Grade 11', number: '11', description: 'Past examinations for Grade 11' },
                { id: 'Grade12', name: 'Grade 12', number: '12', description: 'Past examinations for Grade 12' }
            ],
            semesters: [
                { id: 'Semester1', name: 'Semester 1', description: 'Mid 1, Mid 2 and Final' },
                { id: 'Semester2', name: 'Semester 2', description: 'Mid 1, Mid 2 and Final' }
            ],
            examTypes: [
                { id: 'Mid1', name: 'Mid 1', code: 'M1', description: 'First midterm examination' },
                { id: 'Mid2', name: 'Mid 2', code: 'M2', description: 'Second midterm examination' },
                { id: 'Final', name: 'Final', code: 'F', description: 'Final examination' },
                { id: 'Pretest', name: 'Pre-test', code: 'P', description: 'National pre-test examination' },
                { id: 'Model', name: 'Model Exam', code: 'M', description: 'National model examination' }
            ],
            subjects: initialSubjects,
            grade12NationalSubjects: grade12NationalSubjects
        },
        exams: initialExams
    };
}

class Database {
    constructor() {
        this.load();
    }

    load() {
        try {
            if (!fs.existsSync(DB_FILE)) {
                if (bundledSeedData) {
                    this.data = JSON.parse(JSON.stringify(bundledSeedData));
                } else {
                    this.data = getInitialData();
                }
                this.save();
            } else {
                const raw = fs.readFileSync(DB_FILE, 'utf8');
                this.data = JSON.parse(raw);
            }

            // Sync with bundled questions: ONLY keep genuine authentic questions matching bundledSeedData
            if (bundledSeedData && bundledSeedData.questions && Array.isArray(bundledSeedData.questions)) {
                this.data.questions = bundledSeedData.questions;
                this.save();
            }

            // Ensure activityLogs container exists
            if (!this.data.activityLogs) {
                this.data.activityLogs = (bundledSeedData && Array.isArray(bundledSeedData.activityLogs)) ? bundledSeedData.activityLogs : [];
                this.save();
            }
        } catch (err) {
            console.warn('Failed to read db file, using seed data:', err.message);
            this.data = bundledSeedData ? JSON.parse(JSON.stringify(bundledSeedData)) : getInitialData();
            this.save();
        }
    }

    save() {
        try {
            const tempFile = DB_FILE + '.tmp';
            fs.writeFileSync(tempFile, JSON.stringify(this.data, null, 2), 'utf8');
            fs.renameSync(tempFile, DB_FILE);
        } catch (err) {
            console.warn('Could not write to disk (continuing in-memory):', err.message);
        }
    }

    // User operations
    findUserByUsername(username) {
        return this.data.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    }

    findUserByEmail(email) {
        return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    findUserById(id) {
        return this.data.users.find(u => u.id === id);
    }

    createUser(userData) {
        const newUser = {
            id: 'u_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            ...userData,
            createdAt: new Date().toISOString()
        };
        this.data.users.push(newUser);
        this.save();
        return newUser;
    }

    getUsers() {
        return this.data.users.map(({ passwordHash, ...safeUser }) => safeUser);
    }

    updateUserProfile(id, updateData) {
        const user = this.data.users.find(u => u.id === id);
        if (!user) return null;
        if (updateData.fullName) user.fullName = updateData.fullName.trim();
        if (updateData.email) user.email = updateData.email.trim();
        this.save();
        return user;
    }

    // Category operations
    getCategories() {
        return this.data.categories;
    }

    addGrade({ id, name, number, description }) {
        const cleanId = (id || name).replace(/[^a-zA-Z0-9]/g, '');
        if (this.data.categories.grades.some(g => g.id === cleanId)) {
            throw new Error(`Grade ${cleanId} already exists`);
        }
        const newGrade = {
            id: cleanId,
            name: name || cleanId,
            number: number || cleanId.replace(/\D/g, '') || '00',
            description: description || `Past examinations for ${name || cleanId}`
        };
        this.data.categories.grades.push(newGrade);
        if (!this.data.categories.subjects[cleanId]) {
            this.data.categories.subjects[cleanId] = [];
        }
        this.save();
        return newGrade;
    }

    deleteGrade(gradeId) {
        this.data.categories.grades = this.data.categories.grades.filter(g => g.id !== gradeId);
        delete this.data.categories.subjects[gradeId];
        // Also remove exams in this grade
        this.data.exams = this.data.exams.filter(e => e.grade !== gradeId);
        this.save();
        return true;
    }

    addSubject(gradeId, subjectName) {
        if (!this.data.categories.subjects[gradeId]) {
            this.data.categories.subjects[gradeId] = [];
        }
        const trimmed = subjectName.trim();
        if (!trimmed) throw new Error('Subject name cannot be empty');
        if (this.data.categories.subjects[gradeId].includes(trimmed)) {
            throw new Error(`Subject "${trimmed}" already exists in ${gradeId}`);
        }
        this.data.categories.subjects[gradeId].push(trimmed);
        this.save();
        return this.data.categories.subjects[gradeId];
    }

    deleteSubject(gradeId, subjectName) {
        if (!this.data.categories.subjects[gradeId]) return false;
        this.data.categories.subjects[gradeId] = this.data.categories.subjects[gradeId].filter(
            s => s !== subjectName
        );
        this.save();
        return true;
    }

    // Exam operations
    getExams(filters = {}) {
        let results = [...this.data.exams];
        if (filters.grade) {
            const g = filters.grade.toLowerCase();
            results = results.filter(e => e.grade && e.grade.toLowerCase() === g);
        }
        if (filters.semester) {
            const sem = filters.semester.toLowerCase();
            results = results.filter(e => e.semester && e.semester.toLowerCase() === sem);
        }
        if (filters.examType) {
            const et = filters.examType.toLowerCase();
            results = results.filter(e => e.examType && e.examType.toLowerCase() === et);
        }
        if (filters.subject) {
            const normSub = filters.subject.toLowerCase().replace(/\s+/g, '');
            results = results.filter(e => e.subject && e.subject.toLowerCase().replace(/\s+/g, '') === normSub);
        }
        if (filters.search) {
            const q = filters.search.toLowerCase().trim();
            results = results.filter(e => 
                (e.title && e.title.toLowerCase().includes(q)) ||
                (e.subject && e.subject.toLowerCase().includes(q)) ||
                (e.grade && e.grade.toLowerCase().includes(q)) ||
                (e.examType && e.examType.toLowerCase().includes(q)) ||
                (e.semester && e.semester.toLowerCase().includes(q))
            );
        }
        return results;
    }

    getExamById(id) {
        return this.data.exams.find(e => e.id === id);
    }

    createExam(examData) {
        const newExam = {
            id: 'exam_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            title: examData.title || `${examData.grade} ${examData.subject} ${examData.examType}`,
            grade: examData.grade,
            semester: examData.semester,
            examType: examData.examType,
            subject: examData.subject,
            year: examData.year || new Date().getFullYear().toString(),
            fileUrl: examData.fileUrl,
            fileName: examData.fileName || '',
            fileSize: examData.fileSize || 0,
            uploadedBy: examData.uploadedBy || 'admin',
            createdAt: new Date().toISOString()
        };
        this.data.exams.unshift(newExam);
        this.save();
        return newExam;
    }

    deleteExam(id) {
        const index = this.data.exams.findIndex(e => e.id === id);
        if (index === -1) return false;
        const exam = this.data.exams[index];
        this.data.exams.splice(index, 1);
        this.save();
        return exam;
    }

    // Interactive Question operations
    getQuestions(filters = {}) {
        if (!this.data.questions) this.data.questions = [];
        let results = [...this.data.questions];
        if (filters.examId) {
            results = results.filter(q => q.examId && q.examId.toLowerCase() === filters.examId.toLowerCase());
        }
        if (filters.grade) {
            results = results.filter(q => q.grade && q.grade.toLowerCase() === filters.grade.toLowerCase());
        }
        if (filters.subject) {
            const normSub = filters.subject.toLowerCase().replace(/\s+/g, '');
            results = results.filter(q => q.subject && q.subject.toLowerCase().replace(/\s+/g, '') === normSub);
        }
        if (filters.semester) {
            results = results.filter(q => q.semester && q.semester.toLowerCase() === filters.semester.toLowerCase());
        }
        if (filters.examType) {
            results = results.filter(q => q.examType && q.examType.toLowerCase() === filters.examType.toLowerCase());
        }
        if (filters.search) {
            const s = filters.search.toLowerCase().trim();
            results = results.filter(q => 
                (q.question && q.question.toLowerCase().includes(s)) ||
                (q.subject && q.subject.toLowerCase().includes(s)) ||
                (q.grade && q.grade.toLowerCase().includes(s))
            );
        }
        return results;
    }

    getQuestionById(id) {
        if (!this.data.questions) return null;
        return this.data.questions.find(q => q.id === id);
    }

    addQuestion(qData) {
        if (!this.data.questions) this.data.questions = [];
        const newQuestion = {
            id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            grade: qData.grade,
            subject: qData.subject,
            semester: qData.semester || 'Semester1',
            examType: qData.examType || 'Final',
            question: qData.question,
            options: qData.options || [],
            correctAnswer: typeof qData.correctAnswer === 'number' ? qData.correctAnswer : parseInt(qData.correctAnswer || 0),
            explanation: qData.explanation || '',
            points: qData.points || 1,
            createdAt: new Date().toISOString()
        };
        this.data.questions.unshift(newQuestion);
        this.save();
        return newQuestion;
    }

    deleteQuestion(id) {
        if (!this.data.questions) return false;
        const index = this.data.questions.findIndex(q => q.id === id);
        if (index === -1) return false;
        const removed = this.data.questions.splice(index, 1)[0];
        this.save();
        return removed;
    }

    // ========================================================
    // Student & User Activity Operations
    // ========================================================
    addActivityLog(logData) {
        if (!this.data.activityLogs) this.data.activityLogs = [];
        const newLog = {
            id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            type: logData.type, // 'login', 'download', 'preview', 'practice'
            userId: logData.userId || null,
            username: logData.username || 'student',
            fullName: logData.fullName || logData.username || 'Student',
            role: logData.role || 'student',
            grade: logData.grade || null,
            subject: logData.subject || null,
            semester: logData.semester || null,
            examType: logData.examType || null,
            examTitle: logData.examTitle || null,
            filePath: logData.filePath || null,
            score: typeof logData.score === 'number' ? logData.score : null,
            totalQuestions: typeof logData.totalQuestions === 'number' ? logData.totalQuestions : null,
            percentage: typeof logData.percentage === 'number' ? logData.percentage : null,
            durationSeconds: typeof logData.durationSeconds === 'number' ? logData.durationSeconds : null,
            mode: logData.mode || null, // 'practice' or 'timed'
            details: logData.details || '',
            ip: logData.ip || '',
            userAgent: logData.userAgent || '',
            timestamp: logData.timestamp || new Date().toISOString()
        };

        this.data.activityLogs.unshift(newLog);

        // Keep last 1,500 logs to maintain fast performance while preserving rich history
        if (this.data.activityLogs.length > 1500) {
            this.data.activityLogs = this.data.activityLogs.slice(0, 1500);
        }
        this.save();
        return newLog;
    }

    getActivityLogs(filters = {}) {
        if (!this.data.activityLogs) this.data.activityLogs = [];
        let logs = [...this.data.activityLogs];

        if (filters.type && filters.type !== 'all') {
            logs = logs.filter(l => l.type === filters.type);
        }
        if (filters.username) {
            const u = filters.username.toLowerCase().trim();
            logs = logs.filter(l => 
                (l.username && l.username.toLowerCase().includes(u)) ||
                (l.fullName && l.fullName.toLowerCase().includes(u))
            );
        }
        if (filters.grade && filters.grade !== 'all') {
            logs = logs.filter(l => l.grade === filters.grade);
        }
        if (filters.subject && filters.subject !== 'all') {
            const s = filters.subject.toLowerCase().trim();
            logs = logs.filter(l => l.subject && l.subject.toLowerCase() === s);
        }
        if (filters.search) {
            const q = filters.search.toLowerCase().trim();
            logs = logs.filter(l =>
                (l.fullName && l.fullName.toLowerCase().includes(q)) ||
                (l.username && l.username.toLowerCase().includes(q)) ||
                (l.subject && l.subject.toLowerCase().includes(q)) ||
                (l.examTitle && l.examTitle.toLowerCase().includes(q)) ||
                (l.details && l.details.toLowerCase().includes(q))
            );
        }

        const limit = parseInt(filters.limit) || 200;
        return logs.slice(0, limit);
    }

    getActivityStats() {
        if (!this.data.activityLogs) this.data.activityLogs = [];
        const logs = this.data.activityLogs;

        const totalLogins = logs.filter(l => l.type === 'login').length;
        const totalDownloads = logs.filter(l => l.type === 'download' || l.type === 'preview').length;
        const practiceLogs = logs.filter(l => l.type === 'practice');
        const totalPractices = practiceLogs.length;

        let totalScoreSum = 0;
        let scoreCount = 0;
        practiceLogs.forEach(l => {
            if (typeof l.percentage === 'number') {
                totalScoreSum += l.percentage;
                scoreCount++;
            }
        });
        const avgScore = scoreCount > 0 ? Math.round(totalScoreSum / scoreCount) : 0;

        // Group by user
        const userMap = {};
        logs.forEach(l => {
            const displayName = l.fullName || l.username || 'Anonymous';
            if (!userMap[displayName]) {
                userMap[displayName] = { fullName: displayName, username: l.username, role: l.role || 'student', logins: 0, downloads: 0, practices: 0, lastActive: l.timestamp };
            }
            if (l.type === 'login') userMap[displayName].logins++;
            if (l.type === 'download' || l.type === 'preview') userMap[displayName].downloads++;
            if (l.type === 'practice') userMap[displayName].practices++;
            if (new Date(l.timestamp) > new Date(userMap[displayName].lastActive)) {
                userMap[displayName].lastActive = l.timestamp;
            }
        });

        // Most engaged subjects
        const subjectMap = {};
        logs.forEach(l => {
            if (l.subject) {
                subjectMap[l.subject] = (subjectMap[l.subject] || 0) + 1;
            }
        });

        return {
            totalLogins,
            totalDownloads,
            totalPractices,
            avgScore,
            totalEvents: logs.length,
            activeUsers: Object.values(userMap).sort((a, b) => (b.downloads + b.practices + b.logins) - (a.downloads + a.practices + a.logins)).slice(0, 8),
            topSubjects: Object.entries(subjectMap).map(([subject, count]) => ({ subject, count })).sort((a, b) => b.count - a.count).slice(0, 6)
        };
    }

    getStats() {
        if (!this.data.questions) this.data.questions = [];
        if (!this.data.activityLogs) this.data.activityLogs = [];
        return {
            totalExams: this.data.exams.length,
            totalGrades: this.data.categories.grades.length,
            totalUsers: this.data.users.length,
            totalSubjects: Object.values(this.data.categories.subjects).reduce((acc, curr) => acc + curr.length, 0),
            totalQuestions: this.data.questions.length,
            totalLogins: this.data.activityLogs.filter(l => l.type === 'login').length,
            totalDownloads: this.data.activityLogs.filter(l => l.type === 'download' || l.type === 'preview').length,
            totalPractices: this.data.activityLogs.filter(l => l.type === 'practice').length
        };
    }
}

module.exports = new Database();
