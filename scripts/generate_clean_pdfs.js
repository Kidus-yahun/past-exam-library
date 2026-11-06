const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const fontRegular = path.join(__dirname, '..', 'fonts', 'DejaVuSans.ttf');
const fontBold = path.join(__dirname, '..', 'fonts', 'DejaVuSans-Bold.ttf');

const LEFT_MARGIN = 42;
const RIGHT_MARGIN = 42;
const PAGE_WIDTH = 595.28; // A4 standard width
const PAGE_HEIGHT = 841.89; // A4 standard height
const CONTENT_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN; // ~511pt

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
            margins: { top: 34, bottom: 38, left: LEFT_MARGIN, right: RIGHT_MARGIN },
            bufferPages: true,
            autoFirstPage: true
        });

        // Register full Unicode font
        if (fs.existsSync(fontRegular) && fs.existsSync(fontBold)) {
            doc.registerFont('Regular', fontRegular);
            doc.registerFont('Bold', fontBold);
        } else {
            doc.registerFont('Regular', 'Helvetica');
            doc.registerFont('Bold', 'Helvetica-Bold');
        }

        const writeStream = fs.createWriteStream(fullOutPath);
        doc.pipe(writeStream);

        // Header
        doc.fontSize(13.5).font('Bold').text('Blessed G/Michael Catholic Secondary School', LEFT_MARGIN, doc.y, { align: 'center', width: CONTENT_WIDTH });
        doc.moveDown(0.18);
        doc.fontSize(11).font('Bold').text(formatExamTitle(exam), LEFT_MARGIN, doc.y, { align: 'center', width: CONTENT_WIDTH });
        doc.moveDown(0.25);

        const isMid = exam.examType && exam.examType.toLowerCase().includes('mid');
        const timeStr = isMid ? "Time Allowed: 1:30'" : "Time Allowed: 2:00'";
        doc.fontSize(9.5).font('Regular').text(`Academic Year: 2024 / 2018 E.C.                                                                                     ${timeStr}`, LEFT_MARGIN, doc.y, { align: 'center', width: CONTENT_WIDTH });
        doc.moveDown(0.35);

        doc.fontSize(9.5).font('Bold').text('Name: ', LEFT_MARGIN, doc.y, { continued: true });
        doc.font('Regular').text('_____________________________________    ', { continued: true });
        doc.font('Bold').text(`Grade & Sec: `, { continued: true });
        doc.font('Regular').text(`${exam.grade || ''} _____    `, { continued: true });
        doc.font('Bold').text('R.No: ', { continued: true });
        doc.font('Regular').text('______');
        doc.moveDown(0.45);

        // Group questions
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

        function ensureSpace(heightNeeded = 40) {
            if (doc.y + heightNeeded > PAGE_HEIGHT - 48) {
                doc.addPage();
                doc.x = LEFT_MARGIN;
            }
        }

        // Section 1: True / False
        if (tfQuestions.length > 0) {
            ensureSpace(50);
            doc.x = LEFT_MARGIN;
            doc.fontSize(10).font('Bold').text(`${romanNums[currentSectionNum - 1]}. Write 'True' if the statement is correct and 'False' if it is incorrect.`, LEFT_MARGIN, doc.y, { underline: true, width: CONTENT_WIDTH });
            doc.moveDown(0.35);
            currentSectionNum++;

            tfQuestions.forEach(q => {
                ensureSpace(32);
                doc.x = LEFT_MARGIN;
                const cleanQText = q.question.replace(/^True or False:\s*/i, '').replace(/^True\/False:\s*/i, '').trim();
                doc.fontSize(9.5).font('Bold').text(`____ ${q.origIdx}. `, LEFT_MARGIN, doc.y, { continued: true });
                doc.font('Regular').text(cleanQText, { width: CONTENT_WIDTH - 15 });
                doc.moveDown(0.3);
                doc.x = LEFT_MARGIN;
            });
            doc.moveDown(0.35);
        }

        // Section 2: Matching
        if (matchQuestions.length > 0) {
            ensureSpace(50);
            doc.x = LEFT_MARGIN;
            doc.fontSize(10).font('Bold').text(`${romanNums[currentSectionNum - 1]}. Match the items under Column A with the correct descriptions under Column B.`, LEFT_MARGIN, doc.y, { underline: true, width: CONTENT_WIDTH });
            doc.moveDown(0.35);
            currentSectionNum++;

            matchQuestions.forEach(q => {
                ensureSpace(45);
                doc.x = LEFT_MARGIN;
                doc.fontSize(9.5).font('Bold').text(`${q.origIdx}. `, LEFT_MARGIN, doc.y, { continued: true });
                doc.font('Regular').text(q.question, { width: CONTENT_WIDTH - 20 });
                doc.moveDown(0.2);
                doc.x = LEFT_MARGIN;

                if (q.options && q.options.length > 0) {
                    const optLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
                    q.options.forEach((opt, oIdx) => {
                        ensureSpace(16);
                        doc.x = LEFT_MARGIN + 22;
                        doc.fontSize(9).font('Bold').text(`${optLabels[oIdx] || '*'}. `, LEFT_MARGIN + 22, doc.y, { continued: true });
                        doc.font('Regular').text(String(opt), { width: CONTENT_WIDTH - 30 });
                    });
                }
                doc.moveDown(0.3);
                doc.x = LEFT_MARGIN;
            });
            doc.moveDown(0.35);
        }

        // Section 3: Multiple Choice Questions
        if (mcqQuestions.length > 0) {
            ensureSpace(50);
            doc.x = LEFT_MARGIN;
            doc.fontSize(10).font('Bold').text(`${romanNums[currentSectionNum - 1]}. Choose the best answer among the given alternatives.`, LEFT_MARGIN, doc.y, { underline: true, width: CONTENT_WIDTH });
            doc.moveDown(0.35);
            currentSectionNum++;

            mcqQuestions.forEach(q => {
                const optLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
                const opts = (q.options || []).map(o => String(o).trim());

                // Measure question height
                doc.fontSize(9.5).font('Regular');
                const qHeight = doc.heightOfString(`____ ${q.origIdx}. ${q.question}`, { width: CONTENT_WIDTH });
                ensureSpace(qHeight + 45);

                // Print Question text
                doc.x = LEFT_MARGIN;
                doc.fontSize(9.5).font('Bold').text(`____ ${q.origIdx}. `, LEFT_MARGIN, doc.y, { continued: true });
                doc.font('Regular').text(q.question, { width: CONTENT_WIDTH - 15 });
                doc.moveDown(0.2);

                const maxOptLen = opts.reduce((max, o) => Math.max(max, o.length), 0);
                const hasMultiline = opts.some(o => o.includes('\n'));

                // CASE 1: 4 Short options (<= 14 chars, e.g. numbers, short sets, variables)
                // Dispersed in 4 distinct columns across the page
                if (opts.length === 4 && maxOptLen <= 14 && !hasMultiline) {
                    ensureSpace(22);
                    const yRow = doc.y;
                    const colWidth = 118;
                    const colStarts = [
                        LEFT_MARGIN + 20,
                        LEFT_MARGIN + 145,
                        LEFT_MARGIN + 270,
                        LEFT_MARGIN + 395
                    ];

                    let maxHeight = 14;
                    for (let i = 0; i < 4; i++) {
                        doc.fontSize(9).font('Bold').text(`${optLabels[i]}. `, colStarts[i], yRow, { continued: true, width: colWidth });
                        doc.font('Regular').text(opts[i], { width: colWidth - 16 });
                        const h = doc.y - yRow;
                        if (h > maxHeight) maxHeight = h;
                    }
                    doc.y = yRow + maxHeight + 4;
                    doc.x = LEFT_MARGIN;
                }
                // CASE 2: Medium options (<= 38 chars) -> Dispersed in 2 columns (Row 1: A & B; Row 2: C & D)
                else if (opts.length === 4 && maxOptLen <= 38 && !hasMultiline) {
                    ensureSpace(42);
                    const colWidth = 238;
                    const col1 = LEFT_MARGIN + 20;
                    const col2 = LEFT_MARGIN + 272;

                    // Row 1: A & B
                    let yRow = doc.y;
                    doc.fontSize(9).font('Bold').text(`A. `, col1, yRow, { continued: true, width: colWidth });
                    doc.font('Regular').text(opts[0], { width: colWidth - 18 });
                    const hA = doc.y - yRow;

                    doc.fontSize(9).font('Bold').text(`B. `, col2, yRow, { continued: true, width: colWidth });
                    doc.font('Regular').text(opts[1], { width: colWidth - 18 });
                    const hB = doc.y - yRow;

                    const row1H = Math.max(hA, hB, 13);
                    yRow = yRow + row1H + 3;

                    // Row 2: C & D
                    doc.fontSize(9).font('Bold').text(`C. `, col1, yRow, { continued: true, width: colWidth });
                    doc.font('Regular').text(opts[2], { width: colWidth - 18 });
                    const hC = doc.y - yRow;

                    doc.fontSize(9).font('Bold').text(`D. `, col2, yRow, { continued: true, width: colWidth });
                    doc.font('Regular').text(opts[3], { width: colWidth - 18 });
                    const hD = doc.y - yRow;

                    const row2H = Math.max(hC, hD, 13);
                    doc.y = yRow + row2H + 4;
                    doc.x = LEFT_MARGIN;
                }
                // CASE 3: 2 Options (e.g. True/False or 2 choices <= 38 chars)
                else if (opts.length === 2 && maxOptLen <= 38 && !hasMultiline) {
                    ensureSpace(22);
                    const yRow = doc.y;
                    const colWidth = 238;
                    doc.fontSize(9).font('Bold').text(`A. `, LEFT_MARGIN + 20, yRow, { continued: true, width: colWidth });
                    doc.font('Regular').text(opts[0], { width: colWidth - 18 });

                    doc.fontSize(9).font('Bold').text(`B. `, LEFT_MARGIN + 272, yRow, { continued: true, width: colWidth });
                    doc.font('Regular').text(opts[1], { width: colWidth - 18 });

                    doc.y = yRow + 16;
                    doc.x = LEFT_MARGIN;
                }
                // CASE 4: Long descriptive options -> Indented list stacked vertically
                else {
                    opts.forEach((opt, oIdx) => {
                        ensureSpace(18);
                        doc.x = LEFT_MARGIN + 20;
                        doc.fontSize(9).font('Bold').text(`${optLabels[oIdx] || '*'}. `, LEFT_MARGIN + 20, doc.y, { continued: true, width: CONTENT_WIDTH - 25 });
                        doc.font('Regular').text(opt, { width: CONTENT_WIDTH - 42 });
                        doc.moveDown(0.12);
                    });
                    doc.x = LEFT_MARGIN;
                }

                // Generous vertical breathing space between questions
                doc.moveDown(0.35);
                doc.x = LEFT_MARGIN;
            });
            doc.moveDown(0.35);
        }

        // Section 4: Workout
        if (workoutQuestions.length > 0) {
            ensureSpace(50);
            doc.x = LEFT_MARGIN;
            doc.fontSize(10).font('Bold').text(`${romanNums[currentSectionNum - 1]}. Workout: Show all necessary steps clearly.`, LEFT_MARGIN, doc.y, { underline: true, width: CONTENT_WIDTH });
            doc.moveDown(0.35);
            currentSectionNum++;

            workoutQuestions.forEach(q => {
                ensureSpace(90);
                doc.x = LEFT_MARGIN;
                doc.fontSize(9.5).font('Bold').text(`${q.origIdx}. `, LEFT_MARGIN, doc.y, { continued: true });
                doc.font('Regular').text(q.question, { width: CONTENT_WIDTH - 20 });
                doc.moveDown(0.2);

                const boxY = doc.y + 4;
                doc.rect(LEFT_MARGIN, boxY, CONTENT_WIDTH, 68).stroke('#cccccc');
                doc.fontSize(8.5).font('Regular').fillColor('#888888').text('Solution space / working steps:', LEFT_MARGIN + 6, boxY + 6);
                doc.fillColor('#000000');
                doc.y = boxY + 76;
                doc.moveDown(0.35);
                doc.x = LEFT_MARGIN;
            });
        }

        // Add page numbers without causing accidental page breaks
        const totalPages = doc.bufferedPageRange().count;
        for (let i = 0; i < totalPages; i++) {
            doc.switchToPage(i);
            const oldBottomMargin = doc.page.margins.bottom;
            doc.page.margins.bottom = 0;
            doc.fontSize(8).font('Regular').fillColor('#888888').text(
                `Page ${i + 1} of ${totalPages} - Blessed G/Michael Catholic Secondary School Past Exam Archive`,
                LEFT_MARGIN,
                PAGE_HEIGHT - 24,
                { align: 'center', width: CONTENT_WIDTH, lineBreak: false }
            );
            doc.page.margins.bottom = oldBottomMargin;
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
        // Skip Grade 10 Math Mid 2 and Grade 11 Chem Mid 1 since they have custom scripts, unless requested
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

    console.log(`Generating properly formatted, dispersed, readable PDFs for ${list.length} exams...`);

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
