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
        if (filters.grade) results = results.filter(e => e.grade === filters.grade);
        if (filters.semester) results = results.filter(e => e.semester === filters.semester);
        if (filters.examType) results = results.filter(e => e.examType === filters.examType);
        if (filters.subject) results = results.filter(e => e.subject === filters.subject);
        if (filters.search) {
            const q = filters.search.toLowerCase();
            results = results.filter(e => 
                (e.title && e.title.toLowerCase().includes(q)) ||
                (e.subject && e.subject.toLowerCase().includes(q)) ||
                (e.grade && e.grade.toLowerCase().includes(q)) ||
                (e.examType && e.examType.toLowerCase().includes(q))
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

    getStats() {
        return {
            totalExams: this.data.exams.length,
            totalGrades: this.data.categories.grades.length,
            totalUsers: this.data.users.length,
            totalSubjects: Object.values(this.data.categories.subjects).reduce((acc, curr) => acc + curr.length, 0)
        };
    }
}

module.exports = new Database();
