const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const examId = 'exam_33';

// 1. Update or confirm exam entry
let exam = db.exams.find(e => e.id === examId);
if (!exam) {
    exam = {
        id: examId,
        title: 'Grade10 Mathematics Semester1 Mid2',
        grade: 'Grade10',
        semester: 'Semester1',
        examType: 'Mid2',
        subject: 'Mathematics',
        year: '2024',
        fileUrl: '/exams/Grade10/Semester1/Mid2/Mathematics.pdf',
        fileName: 'Mathematics.pdf',
        fileSize: 4215,
        uploadedBy: 'academic-portal',
        createdAt: new Date().toISOString()
    };
    db.exams.push(exam);
} else {
    exam.fileUrl = '/exams/Grade10/Semester1/Mid2/Mathematics.pdf';
    exam.fileName = 'Mathematics.pdf';
    exam.fileSize = 4215;
}

// 2. Remove any old questions for this exam
db.questions = db.questions.filter(q => q.examId !== examId && !(q.grade === 'Grade10' && q.subject === 'Mathematics' && q.semester === 'Semester1' && q.examType === 'Mid2'));

// 3. All 20 Authentic Questions strictly from the exam paper
const questions = [
    {
        id: 'q_g10_math_s1_m2_01',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'The simplest form of ((-3y)^2) / ((-y)^5) is:',
        options: ['9', '-9', '-9y^-3', '9 / (y^3)'],
        correctAnswer: 2,
        explanation: 'Step 1: Simplify the numerator: (-3y)^2 = (-3)^2 * y^2 = 9y^2.\nStep 2: Simplify the denominator: (-y)^5 = (-1)^5 * y^5 = -y^5.\nStep 3: Divide numerator by denominator: (9y^2) / (-y^5) = -(9 / y^(5 - 2)) = -9 / y^3 = -9y^(-3).',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_02',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'If log_3(y^2) = 2, then what is the value of y?',
        options: ['9', '-9', '3', '0'],
        correctAnswer: 2,
        explanation: 'From the logarithmic definition: log_3(y^2) = 2 <=> y^2 = 3^2 = 9. Taking square roots gives y = ±3. Among the provided options (9, -9, 3, 0), the correct value is 3.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_03',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'If 4^x = 1/16, then what is x?',
        options: ['1', '-1', '-2', '2'],
        correctAnswer: 2,
        explanation: 'Express both sides with the same base: 1/16 = 1 / (4^2) = 4^(-2). Hence, 4^x = 4^(-2), which yields x = -2.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_04',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'The simplest form of 5th-root(243) is:',
        options: ['1/3', '3', '5', '1/5'],
        correctAnswer: 1,
        explanation: 'Prime factorize 243: 243 = 3 * 81 = 3 * 3^4 = 3^5. Therefore, 5th-root(243) = (3^5)^(1/5) = 3.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_05',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'If (9^x)(4^x) = 6*sqrt(6), then x =',
        options: ['3', '3/4', '4/3', '4'],
        correctAnswer: 1,
        explanation: 'Step 1: Combine the bases on the left: (9 * 4)^x = 36^x = (6^2)^x = 6^(2x).\nStep 2: Express the right side in base 6: 6*sqrt(6) = 6^1 * 6^(1/2) = 6^(3/2).\nStep 3: Equate exponents: 2x = 3/2 => x = 3/4.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_06',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'For any positive real number x, which one is equal to (log_a x)^2?',
        options: ['2 log_a x', 'log_a (x^2)', '(log_a x) / 2', 'log_a x * log_a x'],
        correctAnswer: 3,
        explanation: '(log_a x)^2 represents squaring the entire logarithmic value: (log_a x) * (log_a x). Notice that 2 log_a x = log_a(x^2), which is completely different from (log_a x)^2.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_07',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'For what value of x is the equation 3^(x-1) = sqrt(3)?',
        options: ['2', '1/2', '2/3', '3/2'],
        correctAnswer: 3,
        explanation: 'Convert sqrt(3) to fractional exponent form: sqrt(3) = 3^(1/2). Therefore, 3^(x-1) = 3^(1/2) => x - 1 = 1/2 => x = 1 + 1/2 = 3/2.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_08',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'If log_a x = log_x a for positive numbers x and a (x, a ≠ 1), then x =',
        options: ['a^2', 'sqrt(a)', '{ }', '1/a'],
        correctAnswer: 3,
        explanation: 'Using the change of base identity: log_x a = 1 / (log_a x). Thus, log_a x = 1 / (log_a x) => (log_a x)^2 = 1 => log_a x = ±1. If log_a x = 1, x = a. If log_a x = -1, x = a^(-1) = 1/a. Among the choices, 1/a is given.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_09',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'If 3*(9/25)^(x-1) = 5*(27/125)^x, then x =',
        options: ['0', '1', '2', '-1'],
        correctAnswer: 3,
        explanation: 'Express both fractions with base (3/5): 9/25 = (3/5)^2 and 27/125 = (3/5)^3. Divide both sides by 5: (3/5) * [(3/5)^2]^(x-1) = [(3/5)^3]^x => (3/5)^1 * (3/5)^(2x - 2) = (3/5)^(3x) => (3/5)^(2x - 1) = (3/5)^(3x). Equating exponents: 2x - 1 = 3x => x = -1.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_10',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'What is the value of x in log_2 x + log_2(x + 2) = log_2 8?',
        options: ['-4', '2', '6', 'A & B'],
        correctAnswer: 1,
        explanation: 'Combine the logs using the product rule: log_2[x(x + 2)] = log_2 8 => x^2 + 2x = 8 => x^2 + 2x - 8 = 0. Factoring: (x + 4)(x - 2) = 0 => x = -4 or x = 2. Since the domain of log_2 x requires x > 0, x = -4 is extraneous. Therefore, x = 2 is the only valid solution.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_11',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'The simplest form of (3/8) * (log_(1/8) (1/128)) is:',
        options: ['7/8', '3/8', '7/3', '64/63'],
        correctAnswer: 0,
        explanation: 'Evaluate log_(1/8) (1/128): Note that 1/8 = 2^(-3) and 1/128 = 2^(-7). Using change of base: log_(1/8)(1/128) = (-7 * log 2) / (-3 * log 2) = 7/3. Now multiply by 3/8: (3/8) * (7/3) = 7/8.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_12',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'If log_4 x - log_4(x - 1) = log_2 8, then find x:',
        options: ['64/63', '63/64', '8', '4'],
        correctAnswer: 0,
        explanation: 'Right hand side: log_2 8 = log_2(2^3) = 3. Left hand side: log_4[x / (x - 1)]. Thus: log_4[x / (x - 1)] = 3 => x / (x - 1) = 4^3 = 64 => x = 64(x - 1) => x = 64x - 64 => 63x = 64 => x = 64/63.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_13',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'If log_4 x = 1/2, then what is the value of x?',
        options: ['2', '16', '1/2', '4'],
        correctAnswer: 0,
        explanation: 'Convert logarithmic equation to exponential form: log_4 x = 1/2 <=> x = 4^(1/2) = sqrt(4) = 2.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_14',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'What is the simplest form of ((3rd-root(32))^2) / (4^(5/3))?',
        options: ['1', '2', '4', '1/2'],
        correctAnswer: 0,
        explanation: 'Numerator: 3rd-root(32) = 32^(1/3) = (2^5)^(1/3) = 2^(5/3). Squaring it: (2^(5/3))^2 = 2^(10/3).\nDenominator: 4^(5/3) = (2^2)^(5/3) = 2^(10/3).\nDividing: 2^(10/3) / 2^(10/3) = 1.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_15',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'If log 2 = 0.3010 and log 3 = 0.4771, then find log_(1/3) (0.0002):',
        options: ['7.753', '5.658', '-7.753', '2.699'],
        correctAnswer: 0,
        explanation: 'Change of base: log_(1/3)(0.0002) = log(0.0002) / log(1/3) = log(2 * 10^-4) / (-log 3). Calculate numerator: log 2 + log(10^-4) = 0.3010 - 4 = -3.6990. Calculate denominator: -log 3 = -0.4771. Dividing: (-3.6990) / (-0.4771) = 3.6990 / 0.4771 ≈ 7.753.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_16',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'Workout: What is the simplest form of log_4(sqrt(16))?',
        options: ['1', '2', '1/2', '4'],
        correctAnswer: 0,
        explanation: 'Step 1: Simplify the argument: sqrt(16) = 4.\nStep 2: Evaluate the logarithm: log_4 4 = 1.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_17',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'Workout: Simplify ((n^2) * (n^3)) / (n^-2):',
        options: ['n^7', 'n^3', 'n^-1', 'n^6'],
        correctAnswer: 0,
        explanation: 'Numerator: n^2 * n^3 = n^(2 + 3) = n^5. Divide by denominator: n^5 / n^(-2) = n^(5 - (-2)) = n^(5 + 2) = n^7.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_18',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'Workout: If log_2(x - 1) + log_2 3 = 3, then find x:',
        options: ['11/3', '3/11', '5', '7/3'],
        correctAnswer: 0,
        explanation: 'Using log addition property: log_2[3(x - 1)] = 3 => 3(x - 1) = 2^3 = 8 => 3x - 3 = 8 => 3x = 11 => x = 11/3.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_19',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'Workout: Evaluate log 4 + log 25:',
        options: ['2', '100', '1', '10'],
        correctAnswer: 0,
        explanation: 'Using product property of logarithms with common base 10: log 4 + log 25 = log(4 * 25) = log 100 = log_10(10^2) = 2.',
        points: 1
    },
    {
        id: 'q_g10_math_s1_m2_20',
        examId,
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid2',
        question: 'Workout: If log_x 3 = 1/3, then find x:',
        options: ['27', '9', '1', '81'],
        correctAnswer: 0,
        explanation: 'Convert to exponential form: log_x 3 = 1/3 <=> x^(1/3) = 3. Cube both sides: (x^(1/3))^3 = 3^3 => x = 27.',
        points: 1
    }
];

db.questions.push(...questions);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully added ${questions.length} questions for exam ${examId}. Total questions in db: ${db.questions.length}`);
