const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

function formatExamTitle(e) {
    const sem = e.semester ? e.semester.replace(/Semester(\d)/, 'Semester $1') : '';
    const type = e.examType ? (e.examType.includes('Final') ? 'Final Examination' : e.examType.includes('Mid') ? `${e.examType} Examination` : `${e.examType} Exam`) : 'Examination';
    return `${sem} ${e.subject} ${type} for ${e.grade}`;
}

function generateCleanPdfForExam(exam, questions) {
    const relPath = exam.fileUrl.replace(/^\//, '');
    const fullOutPath = path.join(__dirname, '..', relPath);
    const parentDir = path.dirname(fullOutPath);
    if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'A4',
            margins: { top: 32, bottom: 32, left: 40, right: 40 },
            bufferPages: true
        });

        const writeStream = fs.createWriteStream(fullOutPath);
        doc.pipe(writeStream);

        // Header
        doc.fontSize(13).font('Helvetica-Bold').text('Blessed G/Michael Catholic Secondary School', { align: 'center' });
        doc.fontSize(11).font('Helvetica-Bold').text(formatExamTitle(exam), { align: 'center' });
        doc.moveDown(0.2);

        const isMid = exam.examType && exam.examType.toLowerCase().includes('mid');
        const timeStr = isMid ? "Time Allowed: 1:30'" : "Time Allowed: 2:00'";
        doc.fontSize(9.5).font('Helvetica').text(`Academic Year: 2024 / 2018 E.C.                                                                                     ${timeStr}`, { align: 'center' });
        doc.moveDown(0.3);
        doc.fontSize(9.5).font('Helvetica').text(`Name: _____________________________________   Grade & Sec: ${exam.grade || ''} _____   R.No: ______`, { align: 'left' });
        doc.moveDown(0.4);

        // Group questions by type
        const tfQuestions = [];
        const matchQuestions = [];
        const mcqQuestions = [];
        const workoutQuestions = [];

        questions.forEach((q, idx) => {
            const text = q.question || '';
            const opts = q.options || [];
            if (opts.length === 2 && opts.some(o => /true/i.test(o)) && opts.some(o => /false/i.test(o))) {
                tfQuestions.push({ ...q, origIdx: idx + 1 });
            } else if (/match/i.test(text) || opts.length > 5) {
                matchQuestions.push({ ...q, origIdx: idx + 1 });
            } else if (/workout|calculate|evaluate|solve/i.test(text) && opts.length === 0) {
                workoutQuestions.push({ ...q, origIdx: idx + 1 });
            } else {
                mcqQuestions.push({ ...q, origIdx: idx + 1 });
            }
        });

        let currentSectionNum = 1;
        const romanNums = ['I', 'II', 'III', 'IV', 'V'];

        function ensureSpace(heightNeeded = 36) {
            if (doc.y + heightNeeded > 780) {
                doc.addPage();
            }
        }

        // Section 1: True / False
        if (tfQuestions.length > 0) {
            ensureSpace(50);
            doc.fontSize(10).font('Helvetica-Bold').text(`${romanNums[currentSectionNum - 1]}. Write 'True' if the statement is correct and 'False' if it is incorrect.`, { underline: true });
            doc.moveDown(0.3);
            currentSectionNum++;

            tfQuestions.forEach(q => {
                ensureSpace(32);
                const cleanQText = q.question.replace(/^True or False:\s*/i, '').replace(/^True\/False:\s*/i, '').trim();
                doc.fontSize(9.5).font('Helvetica-Bold').text(`____ ${q.origIdx}. `, { continued: true });
                doc.font('Helvetica').text(cleanQText);
                doc.moveDown(0.25);
            });
            doc.moveDown(0.3);
        }

        // Section 2: Matching
        if (matchQuestions.length > 0) {
            ensureSpace(50);
            doc.fontSize(10).font('Helvetica-Bold').text(`${romanNums[currentSectionNum - 1]}. Match the items under Column A with the correct descriptions under Column B.`, { underline: true });
            doc.moveDown(0.3);
            currentSectionNum++;

            matchQuestions.forEach(q => {
                ensureSpace(45);
                doc.fontSize(9.5).font('Helvetica-Bold').text(`${q.origIdx}. `, { continued: true });
                doc.font('Helvetica').text(q.question);
                doc.moveDown(0.15);
                if (q.options && q.options.length > 0) {
                    const optLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
                    q.options.forEach((opt, oIdx) => {
                        ensureSpace(16);
                        doc.fontSize(9).font('Helvetica-Bold').text(`     ${optLabels[oIdx] || '*'}. `, { continued: true });
                        doc.font('Helvetica').text(String(opt));
                    });
                }
                doc.moveDown(0.25);
            });
            doc.moveDown(0.3);
        }

        // Section 3: Multiple Choice
        if (mcqQuestions.length > 0) {
            ensureSpace(50);
            doc.fontSize(10).font('Helvetica-Bold').text(`${romanNums[currentSectionNum - 1]}. Choose the best answer among the given alternatives.`, { underline: true });
            doc.moveDown(0.3);
            currentSectionNum++;

            mcqQuestions.forEach(q => {
                ensureSpace(48);
                doc.fontSize(9.5).font('Helvetica-Bold').text(`____ ${q.origIdx}. `, { continued: true });
                doc.font('Helvetica').text(q.question);
                doc.moveDown(0.15);

                const optLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
                const opts = q.options || [];

                const areShort = opts.every(o => String(o).length < 24);
                if (areShort && opts.length === 4) {
                    ensureSpace(20);
                    const yOpt = doc.y;
                    doc.fontSize(9).font('Helvetica-Bold').text(`     A. `, 40, yOpt, { continued: true });
                    doc.font('Helvetica').text(String(opts[0]));

                    doc.fontSize(9).font('Helvetica-Bold').text(`B. `, 180, yOpt, { continued: true });
                    doc.font('Helvetica').text(String(opts[1]));

                    doc.fontSize(9).font('Helvetica-Bold').text(`C. `, 310, yOpt, { continued: true });
                    doc.font('Helvetica').text(String(opts[2]));

                    doc.fontSize(9).font('Helvetica-Bold').text(`D. `, 435, yOpt, { continued: true });
                    doc.font('Helvetica').text(String(opts[3]));

                    doc.y = yOpt + 14;
                } else if (areShort && opts.length === 2) {
                    ensureSpace(20);
                    const yOpt = doc.y;
                    doc.fontSize(9).font('Helvetica-Bold').text(`     A. `, 40, yOpt, { continued: true });
                    doc.font('Helvetica').text(String(opts[0]));

                    doc.fontSize(9).font('Helvetica-Bold').text(`B. `, 260, yOpt, { continued: true });
                    doc.font('Helvetica').text(String(opts[1]));

                    doc.y = yOpt + 14;
                } else {
                    opts.forEach((opt, oIdx) => {
                        ensureSpace(16);
                        doc.fontSize(9).font('Helvetica-Bold').text(`     ${optLabels[oIdx] || '*'}. `, { continued: true });
                        doc.font('Helvetica').text(String(opt));
                    });
                }
                doc.moveDown(0.25);
            });
            doc.moveDown(0.3);
        }

        // Section 4: Workout
        if (workoutQuestions.length > 0) {
            ensureSpace(50);
            doc.fontSize(10).font('Helvetica-Bold').text(`${romanNums[currentSectionNum - 1]}. Workout: Show all necessary steps clearly.`, { underline: true });
            doc.moveDown(0.3);
            currentSectionNum++;

            workoutQuestions.forEach(q => {
                ensureSpace(85);
                doc.fontSize(9.5).font('Helvetica-Bold').text(`${q.origIdx}. `, { continued: true });
                doc.font('Helvetica').text(q.question);
                doc.moveDown(0.2);

                const boxY = doc.y + 4;
                doc.rect(40, boxY, 515, 65).stroke('#cccccc');
                doc.fontSize(8.5).font('Helvetica-Oblique').fillColor('#888888').text('Solution space / working steps:', 46, boxY + 6);
                doc.fillColor('#000000');
                doc.y = boxY + 72;
                doc.moveDown(0.3);
            });
        }

        // Add page numbers
        const totalPages = doc.bufferedPageRange().count;
        for (let i = 0; i < totalPages; i++) {
            doc.switchToPage(i);
            doc.fontSize(8).font('Helvetica').fillColor('#888888').text(
                `Page ${i + 1} of ${totalPages} - Blessed G/Michael Catholic Secondary School Past Exam Archive`,
                40,
                800,
                { align: 'center', width: 515 }
            );
        }

        doc.end();

        writeStream.on('finish', () => {
            const stats = fs.statSync(fullOutPath);
            resolve({ path: fullOutPath, size: stats.size, pages: totalPages });
        });
        writeStream.on('error', reject);
    });
}

async function run() {
    const list = [];
    db.exams.forEach(e => {
        // Skip Grade 10 Math Mid 2 and Grade 11 Chem Mid 1 since they already have specialized custom layouts
        if (e.id === 'exam_33' || e.id === 'exam_g11_chem_s1_m1') return;

        const qs = db.questions.filter(q => q.examId === e.id || (
            (q.grade || '').toLowerCase() === (e.grade || '').toLowerCase() &&
            (q.subject || '').toLowerCase() === (e.subject || '').toLowerCase() &&
            (!q.semester || !e.semester || (q.semester || '').toLowerCase().replace(/\s+/g, '') === (e.semester || '').toLowerCase().replace(/\s+/g, '')) &&
            (!q.examType || !e.examType || (q.examType || '').toLowerCase().replace(/\s+/g, '') === (e.examType || '').toLowerCase().replace(/\s+/g, ''))
        ));
        if (qs.length >= 10) {
            list.push({ exam: e, questions: qs });
        }
    });

    console.log(`Generating clean answer-free PDFs for ${list.length} exams...`);

    for (const item of list) {
        try {
            const res = await generateCleanPdfForExam(item.exam, item.questions);
            item.exam.fileSize = res.size;
            console.log(`✔ Generated: ${item.exam.title} (${item.questions.length} Qs, ${res.pages} pages, ${res.size} bytes)`);
        } catch (err) {
            console.error(`✘ Failed for ${item.exam.title}:`, err.message);
        }
    }

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log('Updated db.json with clean PDF sizes.');
}

run();
