const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const outDir = path.join(__dirname, '..', 'exams', 'Grade10', 'Semester1', 'Mid2');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}
const outFile = path.join(outDir, 'Mathematics.pdf');

const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 32, bottom: 32, left: 40, right: 40 }
});

const writeStream = fs.createWriteStream(outFile);
doc.pipe(writeStream);

// Header
doc.fontSize(13).font('Helvetica-Bold').text('Blessed G/Michael Catholic Secondary School', { align: 'center' });
doc.fontSize(11).font('Helvetica-Bold').text('1st Semester Mathematics Test Two for Grade 10th', { align: 'center' });
doc.moveDown(0.2);
doc.fontSize(9.5).font('Helvetica').text('Dec, 2018 E.C.                                                                                     Time Allowed: 1:20\'', { align: 'center' });
doc.moveDown(0.3);
doc.fontSize(9.5).font('Helvetica').text('Name: _____________________________________   Sec: 10th _____   R.No: ______', { align: 'left' });
doc.moveDown(0.4);

// Part I
doc.fontSize(10).font('Helvetica-Bold').text('I. Choose the best answer among the given alternatives.', { underline: true });
doc.moveDown(0.3);

const mcqQuestions = [
    {
        num: 1,
        text: 'The Simplest form of  ((-3y)^2) / ((-y)^5)  is :-------',
        options: ['A. 9', 'B. -9', 'C. -9y^-3', 'D. 9 / (y^3)']
    },
    {
        num: 2,
        text: 'If log_3(y^2) = 2 then what is the value of y ?',
        options: ['A. 9', 'B. -9', 'C. 3', 'D. 0']
    },
    {
        num: 3,
        text: 'If 4^x = 1/16 then what is x ?',
        options: ['A. 1', 'B. -1', 'C. -2', 'D. 2']
    },
    {
        num: 4,
        text: 'The simplest form of 5th-root(243) is :-------------',
        options: ['A. 1/3', 'B. 3', 'C. 5', 'D. 1/5']
    },
    {
        num: 5,
        text: 'If (9^x)(4^x) = 6*sqrt(6) then x = -------------.',
        options: ['A. 3', 'B. 3/4', 'C. 4/3', 'D. 4']
    },
    {
        num: 6,
        text: 'For any positive real number x, which one is equal to (log_a x)^2 ?',
        options: ['A. 2 log_a x', 'B. log_a (x^2)', 'C. (log_a x) / 2', 'D. (log_a x) * (log_a x)']
    },
    {
        num: 7,
        text: 'For what value of x is the equation 3^(x-1) = sqrt(3) ?',
        options: ['A. 2', 'B. 1/2', 'C. 2/3', 'D. 3/2']
    },
    {
        num: 8,
        text: 'If log_a x = log_x a for positive numbers x & a (x, a ≠ 1) then x = -------------.',
        options: ['A. a^2', 'B. sqrt(a)', 'C. { }', 'D. 1/a']
    },
    {
        num: 9,
        text: 'If 3*(9/25)^(x-1) = 5*(27/125)^x then x = -------------.',
        options: ['A. 0', 'B. 1', 'C. 2', 'D. -1']
    },
    {
        num: 10,
        text: 'What is the value of x in log_2 x + log_2(x + 2) = log_2 8 then ?',
        options: ['A. -4', 'B. 2', 'C. 6', 'D. A & B']
    }
];

mcqQuestions.forEach(q => {
    doc.fontSize(9.5).font('Helvetica-Bold').text(`____ ${q.num}. `, { continued: true });
    doc.font('Helvetica').text(q.text);
    doc.moveDown(0.12);

    // 4 columns or 2x2 for options
    const yOpt = doc.y;
    doc.fontSize(9).font('Helvetica').text(q.options[0], 55, yOpt);
    doc.text(q.options[1], 180, yOpt);
    doc.text(q.options[2], 305, yOpt);
    doc.text(q.options[3], 430, yOpt);
    doc.y = yOpt + 14;
    doc.moveDown(0.15);
});

// Part II
doc.moveDown(0.3);
doc.fontSize(10).font('Helvetica-Bold').text('II. Give short answer only.', { underline: true });
doc.moveDown(0.3);

const shortAnswerQuestions = [
    {
        num: 11,
        text: 'The simplest form of  3/8 * (log_(1/8) (1/128))  is  ____________________'
    },
    {
        num: 12,
        text: 'If log_4 x - log_4(x - 1) = log_2 8 then x = ____________________'
    },
    {
        num: 13,
        text: 'log_4 x = 1/2 then x = ____________________'
    },
    {
        num: 14,
        text: 'What is the simplest form of  ((3rd-root(32))^2) / (4^(5/3)) = ____________________'
    },
    {
        num: 15,
        text: 'If log 2 = 0.3010 and log 3 = 0.4771 then log_(1/3) 0.0002 = ____________________'
    }
];

shortAnswerQuestions.forEach(q => {
    doc.fontSize(9.5).font('Helvetica-Bold').text(`${q.num}. `, 40, doc.y, { continued: true });
    doc.font('Helvetica').text(q.text);
    doc.moveDown(0.3);
});

// Add page for Part III (Workout)
doc.addPage();
doc.fontSize(11).font('Helvetica-Bold').text('III. Workout (Show all necessary steps clearly)', { underline: true });
doc.moveDown(0.6);

const workoutQuestions = [
    {
        num: 16,
        text: 'What is the simplest form of log_4 (sqrt(16)) ?'
    },
    {
        num: 17,
        text: 'Simplify:  ((n^2) * (n^3)) / (n^-2)'
    },
    {
        num: 18,
        text: 'If log_2(x - 1) + log_2 3 = 3 then find the value of x.'
    },
    {
        num: 19,
        text: 'Evaluate:  log 4 + log 25'
    },
    {
        num: 20,
        text: 'If log_x 3 = 1/3 then find the value of x.'
    }
];

workoutQuestions.forEach(q => {
    doc.fontSize(10).font('Helvetica-Bold').text(`${q.num}. `, 40, doc.y, { continued: true });
    doc.font('Helvetica').text(q.text);
    doc.moveDown(0.2);

    // Draw neat workout box / space for students
    const boxY = doc.y + 4;
    doc.rect(40, boxY, 515, 80).stroke('#cccccc');
    doc.fontSize(8.5).font('Helvetica-Oblique').fillColor('#888888').text('Solution space / working steps:', 46, boxY + 6);
    doc.fillColor('#000000');
    doc.y = boxY + 88;
    doc.moveDown(0.4);
});

doc.end();

writeStream.on('finish', () => {
    const stats = fs.statSync(outFile);
    console.log(`Clean Grade 10 Math Mid 2 PDF created: ${outFile} (${stats.size} bytes)`);
});
