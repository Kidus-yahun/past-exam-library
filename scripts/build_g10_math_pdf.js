const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const outPath = path.join(__dirname, '..', 'exams', 'Grade10', 'Semester1', 'Mid1', 'Mathematics.pdf');
const scanImgPath = path.join(__dirname, 'g10_math_clean_scan.jpg');

const fontRegular = path.join(__dirname, '..', 'fonts', 'DejaVuSans.ttf');
const fontBold = path.join(__dirname, '..', 'fonts', 'DejaVuSans-Bold.ttf');

const PAGE_WIDTH = 595.28;  // A4 pt
const PAGE_HEIGHT = 841.89; // A4 pt
const LEFT_MARGIN = 42;
const RIGHT_MARGIN = 42;
const CONTENT_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN; // ~511pt

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  autoFirstPage: true
});

const writeStream = fs.createWriteStream(outPath);
doc.pipe(writeStream);

if (fs.existsSync(fontRegular) && fs.existsSync(fontBold)) {
  doc.registerFont('Regular', fontRegular);
  doc.registerFont('Bold', fontBold);
} else {
  doc.registerFont('Regular', 'Helvetica');
  doc.registerFont('Bold', 'Helvetica-Bold');
}

// ==========================================
// PAGE 1: AUTHENTIC SCANNED EXAM PAPER
// ==========================================
const pad = 18;
doc.image(scanImgPath, pad, pad, {
  fit: [PAGE_WIDTH - (pad * 2), PAGE_HEIGHT - (pad * 2)],
  align: 'center',
  valign: 'center'
});

// ==========================================
// PAGE 2: OFFICIAL ANSWER SHEET & TEACHER SOLUTIONS
// ==========================================
doc.addPage({
  margins: { top: 34, bottom: 36, left: LEFT_MARGIN, right: RIGHT_MARGIN }
});

doc.x = LEFT_MARGIN;
doc.y = 34;

// Header
doc.fontSize(13.5).font('Bold').fillColor('#000000').text('Blessed G/Michael Catholic General Secondary School', LEFT_MARGIN, doc.y, { align: 'center', width: CONTENT_WIDTH });
doc.moveDown(0.2);
doc.fontSize(11).font('Bold').fillColor('#1e3a8a').text('OFFICIAL EXAM ANSWER SHEET & TEACHER SOLUTIONS', LEFT_MARGIN, doc.y, { align: 'center', width: CONTENT_WIDTH });
doc.moveDown(0.18);
doc.fontSize(9.5).font('Bold').fillColor('#334155').text('Semester 1 Mathematics Test 1 (Mid 1) for Grade 10th (2018 E.C.)', LEFT_MARGIN, doc.y, { align: 'center', width: CONTENT_WIDTH });
doc.fillColor('#000000');
doc.moveDown(0.3);

// Banner
const bannerY = doc.y;
doc.rect(LEFT_MARGIN, bannerY, CONTENT_WIDTH, 22).fillAndStroke('#f1f5f9', '#cbd5e1');
doc.fontSize(8.5).font('Regular').fillColor('#475569').text('Official Answer Key & Teacher Guide — Fully aligned with the authentic 2018 E.C. school paper.', LEFT_MARGIN + 6, bannerY + 6, { width: CONTENT_WIDTH - 12, align: 'center' });
doc.fillColor('#000000');
doc.y = bannerY + 30;

// Part I: Quick Reference Matrix
doc.fontSize(10).font('Bold').text('Part I: Quick Reference Answer Key', LEFT_MARGIN, doc.y, { underline: true });
doc.moveDown(0.35);

const answers = [
  { q: 1, key: 'D', text: 'Quotient of polynomials is not always a polynomial' },
  { q: 2, key: 'C', text: 'Graph of f is an upward parabola (a = 6 > 0)' },
  { q: 3, key: 'B', text: 'Remainder is 9 [f(-1) = 9]' },
  { q: 4, key: 'A', text: 'Value of k is 3 [f(1) = 4]' },
  { q: 5, key: 'A', text: 'Value of M is -5 [P(2)=0, P(-2)=0]' },
  { q: 6, key: 'B', text: 'Value of N is 12 [2m + N = 2]' },
  { q: 7, key: 'B', text: 'Value of A is 3 [P(-3)=0, P(-1)=-6]' },
  { q: 8, key: 'C', text: 'Value of B is -4 [A - B = 7]' },
  { q: 9, key: 'D', text: 'Other factor is x + 3 [(2x+1)(x+3)]' },
  { q: 10, key: 'D', text: 'Minimum value is -3.125 [-25/8]' }
];

const colW = CONTENT_WIDTH / 2;
const rowH = 17;
const tableStartY = doc.y;

for (let i = 0; i < 5; i++) {
  const yRow = tableStartY + (i * rowH);
  if (i % 2 === 0) {
    doc.rect(LEFT_MARGIN, yRow - 1, CONTENT_WIDTH, rowH).fill('#f8fafc');
  }

  // Left column (Q1 - Q5)
  const a1 = answers[i];
  doc.fontSize(8.5).font('Bold').fillColor('#1e293b').text(`Q${a1.q}:`, LEFT_MARGIN + 6, yRow + 3, { continued: true });
  doc.fillColor('#15803d').text(`  ${a1.key}  `, { continued: true });
  doc.font('Regular').fillColor('#475569').text(`— ${a1.text}`, { width: colW - 30 });

  // Right column (Q6 - Q10)
  const a2 = answers[i + 5];
  doc.fontSize(8.5).font('Bold').fillColor('#1e293b').text(`Q${a2.q}:`, LEFT_MARGIN + colW + 6, yRow + 3, { continued: true });
  doc.fillColor('#15803d').text(`  ${a2.key}  `, { continued: true });
  doc.font('Regular').fillColor('#475569').text(`— ${a2.text}`, { width: colW - 30 });
}

doc.fillColor('#000000');
doc.y = tableStartY + (5 * rowH) + 12;

// Part II: Step-by-Step Teacher Explanations
doc.fontSize(10).font('Bold').text('Part II: Step-by-Step Teacher Solutions', LEFT_MARGIN, doc.y, { underline: true });
doc.moveDown(0.35);

const explanations = [
  {
    q: '1. Closure Property of Polynomials',
    ans: 'D (Quotient is not always a polynomial)',
    step: 'Polynomials are closed under addition, subtraction, and multiplication. The quotient of two polynomials is generally a rational function, which is not a polynomial unless the denominator divides the numerator evenly (e.g. x / x^2 = 1/x is not a polynomial).'
  },
  {
    q: '2. Quadratic Graph Direction',
    ans: 'C (The graph of f is an upward parabola)',
    step: 'For f(x) = ax^2 + bx + c = 6x^2 - x - 1, the leading coefficient a = 6 > 0. A quadratic curve with a positive leading coefficient opens upward.'
  },
  {
    q: '3. Remainder Theorem',
    ans: 'B (9)',
    step: 'By the Remainder Theorem, dividing f(x) by (x + 1) gives remainder f(-1). f(-1) = 2(-1)^3 + 4(-1)^2 - 5(-1) + 2 = -2 + 4 + 5 + 2 = 9.'
  },
  {
    q: '4. Finding Parameter k from Remainder',
    ans: 'A (3)',
    step: 'Dividing kx^2 - 5x + 6 by (x - 1) gives remainder f(1) = k(1)^2 - 5(1) + 6 = k + 1. Since remainder is 4: k + 1 = 4 => k = 3.'
  },
  {
    q: '5 & 6. Polynomial Factor System for M and N',
    ans: 'Q5: A (-5), Q6: B (12)',
    step: 'P(x) = 3x^3 + mx^2 - Nx + 20.\n(x - 2) is factor => P(2) = 24 + 4m - 2N + 20 = 0 => 2m - N = -22.\n(x + 2) is factor => P(-2) = -24 + 4m + 2N + 20 = 0 => 2m + N = 2.\nAdding both gives 4m = -20 => m = -5. Substituting into 2m + N = 2 gives 2(-5) + N = 2 => N = 12.'
  },
  {
    q: '7 & 8. Determining Coefficients A and B',
    ans: 'Q7: B (3), Q8: C (-4)',
    step: 'P(x) = x^3 + Ax^2 + Bx - 12.\nDivisible by (x + 3) => P(-3) = -27 + 9A - 3B - 12 = 0 => 3A - B = 13.\nRemainder -6 when divided by (x + 1) => P(-1) = -1 + A - B - 12 = -6 => A - B = 7.\nSubtracting equations: (3A - B) - (A - B) = 13 - 7 => 2A = 6 => A = 3. Then 3 - B = 7 => B = -4.'
  },
  {
    q: '9. Quadratic Factoring',
    ans: 'D (x + 3)',
    step: 'Factoring 2x^2 + 7x + 3: 2x^2 + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3). Since 2x + 1 is given, the other factor is x + 3.'
  },
  {
    q: '10. Minimum Value of Quadratic Function',
    ans: 'D (-3.125)',
    step: 'For f(x) = 2x^2 + 7x + 3, the vertex x-coordinate is x = -b/(2a) = -7/4 = -1.75.\nThe minimum value (y-coordinate) is f(-7/4) = 2(-7/4)^2 + 7(-7/4) + 3 = 49/8 - 98/8 + 24/8 = -25/8 = -3.125 (Option D).'
  }
];

explanations.forEach((item) => {
  doc.fontSize(8.5).font('Bold').fillColor('#0f172a').text(item.q, LEFT_MARGIN + 4, doc.y, { continued: true });
  doc.fillColor('#15803d').text(`  [Key: ${item.ans}]`);
  doc.fontSize(8).font('Regular').fillColor('#334155').text(item.step, LEFT_MARGIN + 12, doc.y, { width: CONTENT_WIDTH - 16 });
  doc.moveDown(0.22);
});

doc.end();

writeStream.on('finish', () => {
  const stats = fs.statSync(outPath);
  console.log(`Successfully generated PDF: ${outPath} (${(stats.size / 1024).toFixed(1)} KB)`);
});
