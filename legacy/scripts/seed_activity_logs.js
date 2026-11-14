// scripts/seed_activity_logs.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

if (!db.activityLogs || db.activityLogs.length === 0) {
    const now = Date.now();
    const min = 60 * 1000;
    const hour = 60 * min;

    db.activityLogs = [
        {
            id: 'act_seed_01',
            type: 'login',
            username: 'admin',
            role: 'admin',
            details: 'Administrator signed in to management portal',
            ip: '127.0.0.1',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0',
            timestamp: new Date(now - 12 * min).toISOString()
        },
        {
            id: 'act_seed_02',
            type: 'practice',
            username: 'student',
            role: 'student',
            grade: 'Grade9',
            subject: 'Chemistry',
            semester: 'Semester1',
            examType: 'Mid1',
            examTitle: 'Grade 9 Chemistry Mid 1',
            score: 24,
            totalQuestions: 26,
            percentage: 92,
            durationSeconds: 385,
            mode: 'timed',
            details: 'Completed timed practice test with high distinction',
            timestamp: new Date(now - 34 * min).toISOString()
        },
        {
            id: 'act_seed_03',
            type: 'download',
            username: 'student',
            role: 'student',
            grade: 'Grade9',
            subject: 'Physics',
            semester: 'Semester1',
            examType: 'Mid1',
            examTitle: 'Grade 9 Physics Mid 1',
            filePath: '/exams/Grade9/Semester1/Mid1/Physics.pdf',
            details: 'Downloaded official examination PDF for offline study',
            timestamp: new Date(now - 55 * min).toISOString()
        },
        {
            id: 'act_seed_04',
            type: 'practice',
            username: 'student',
            role: 'student',
            grade: 'Grade9',
            subject: 'History',
            semester: 'Semester1',
            examType: 'Mid1',
            examTitle: 'Grade 9 History Mid 1',
            score: 28,
            totalQuestions: 30,
            percentage: 93,
            durationSeconds: 420,
            mode: 'practice',
            details: 'Instant practice mode with teacher feedback review',
            timestamp: new Date(now - 2 * hour).toISOString()
        },
        {
            id: 'act_seed_05',
            type: 'download',
            username: 'student',
            role: 'student',
            grade: 'Grade9',
            subject: 'Mathematics',
            semester: 'Semester1',
            examType: 'Mid1',
            examTitle: 'Grade 9 Mathematics Mid 1',
            filePath: '/exams/Grade9/Semester1/Mid1/Mathematics.pdf',
            details: 'Downloaded official examination PDF',
            timestamp: new Date(now - 3 * hour).toISOString()
        },
        {
            id: 'act_seed_06',
            type: 'login',
            username: 'student',
            role: 'student',
            details: 'Student signed in on mobile browser',
            ip: '196.188.12.44',
            userAgent: 'Mozilla/5.0 (Android 14; Mobile) Chrome/121.0',
            timestamp: new Date(now - 4 * hour).toISOString()
        }
    ];

    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
    console.log('Seeded initial activity logs in db.json successfully!');
} else {
    console.log('Activity logs already exist in db.json:', db.activityLogs.length);
}
