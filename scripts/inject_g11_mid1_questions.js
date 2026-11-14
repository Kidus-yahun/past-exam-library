// scripts/inject_g11_mid1_questions.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const g11Questions = [
    // ==========================================
    // GRADE 11 MATHEMATICS MID 1 (exam_68)
    // ==========================================
    {
        id: 'q_g11_math_m1_02',
        examId: 'exam_68',
        grade: 'Grade11',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the domain of the rational function f(x) = (2x + 1) / (x^2 - 9)?',
        options: [
            '{x in R | x != 3 and x != -3}',
            '{x in R | x != 9}',
            '{x in R | x > 3}',
            'All real numbers R'
        ],
        correctAnswer: 0,
        explanation: 'The denominator must not equal zero: x^2 - 9 != 0 => (x - 3)(x + 3) != 0 => x != 3 and x != -3.',
        points: 1
    },
    {
        id: 'q_g11_math_m1_03',
        examId: 'exam_68',
        grade: 'Grade11',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the horizontal asymptote of the rational function f(x) = (3x^2 - 5) / (2x^2 + 7x - 4)?',
        options: ['y = 0', 'y = 3/2', 'y = -5/4', 'No horizontal asymptote'],
        correctAnswer: 1,
        explanation: 'Since the degree of numerator (2) equals the degree of denominator (2), the horizontal asymptote is the ratio of leading coefficients: y = 3/2.',
        points: 1
    },
    {
        id: 'q_g11_math_m1_04',
        examId: 'exam_68',
        grade: 'Grade11',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What are the coordinates of the center and radius of the circle with equation (x - 4)^2 + (y + 2)^2 = 25?',
        options: [
            'Center (4, -2), radius = 5',
            'Center (-4, 2), radius = 5',
            'Center (4, -2), radius = 25',
            'Center (-4, 2), radius = 25'
        ],
        correctAnswer: 0,
        explanation: 'In standard circle form (x - h)^2 + (y - k)^2 = r^2, center is (h, k) = (4, -2) and radius r = sqrt(25) = 5.',
        points: 1
    },
    {
        id: 'q_g11_math_m1_05',
        examId: 'exam_68',
        grade: 'Grade11',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the slope of a line perpendicular to 2x - 5y + 10 = 0?',
        options: ['2/5', '-2/5', '5/2', '-5/2'],
        correctAnswer: 3,
        explanation: 'Writing in slope-intercept form: 5y = 2x + 10 => y = (2/5)x + 2. The slope m1 = 2/5. A perpendicular line has slope m2 = -1 / m1 = -5/2.',
        points: 1
    },
    {
        id: 'q_g11_math_m1_06',
        examId: 'exam_68',
        grade: 'Grade11',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following functions is an odd function?',
        options: ['f(x) = x^2 + 4', 'f(x) = x^3 - 5x', 'f(x) = |x|', 'f(x) = cos(x)'],
        correctAnswer: 1,
        explanation: 'A function is odd if f(-x) = -f(x). For f(x) = x^3 - 5x, f(-x) = (-x)^3 - 5(-x) = -x^3 + 5x = -(x^3 - 5x) = -f(x).',
        points: 1
    },
    {
        id: 'q_g11_math_m1_07',
        examId: 'exam_68',
        grade: 'Grade11',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Solve for x: (x + 2) / (x - 1) = 3',
        options: ['x = 2.5', 'x = 3', 'x = 1.5', 'x = 4'],
        correctAnswer: 0,
        explanation: 'x + 2 = 3(x - 1) => x + 2 = 3x - 3 => 2x = 5 => x = 5/2 = 2.5.',
        points: 1
    },

    // ==========================================
    // GRADE 11 PHYSICS MID 1 (exam_69)
    // ==========================================
    {
        id: 'q_g11_phys_m1_02',
        examId: 'exam_69',
        grade: 'Grade11',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Given vector A = 3i + 4j and vector B = 2i - j, what is the dot product A · B?',
        options: ['2', '6', '10', '14'],
        correctAnswer: 0,
        explanation: 'A · B = (Ax * Bx) + (Ay * By) = (3 * 2) + (4 * -1) = 6 - 4 = 2.',
        points: 1
    },
    {
        id: 'q_g11_phys_m1_03',
        examId: 'exam_69',
        grade: 'Grade11',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'A projectile is launched with velocity 50 m/s at an angle of 30 degrees above horizontal. What is its initial vertical velocity component vy? (sin 30° = 0.5)',
        options: ['25 m/s', '43.3 m/s', '50 m/s', '10 m/s'],
        correctAnswer: 0,
        explanation: 'vy = v * sin(theta) = 50 * sin(30°) = 50 * 0.5 = 25 m/s.',
        points: 1
    },
    {
        id: 'q_g11_phys_m1_04',
        examId: 'exam_69',
        grade: 'Grade11',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'In uniform circular motion with radius r and constant speed v, the centripetal acceleration is directed:',
        options: [
            'Radially outward from the center',
            'Radially inward toward the center',
            'Tangential to the circle in the direction of motion',
            'Opposite to the velocity vector'
        ],
        correctAnswer: 1,
        explanation: 'Centripetal acceleration (ac = v^2 / r) is continuously directed along the radius toward the center of the circular path.',
        points: 1
    },
    {
        id: 'q_g11_phys_m1_05',
        examId: 'exam_69',
        grade: 'Grade11',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'A 2 kg mass attached to a string moves in a circle of radius 0.5 m with a speed of 4 m/s. What is the centripetal force?',
        options: ['16 N', '32 N', '64 N', '8 N'],
        correctAnswer: 2,
        explanation: 'Fc = m * v^2 / r = 2 * (4^2) / 0.5 = 2 * 16 / 0.5 = 64 N.',
        points: 1
    },
    {
        id: 'q_g11_phys_m1_06',
        examId: 'exam_69',
        grade: 'Grade11',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Work done by a conservative force along any closed path is always:',
        options: ['Maximum', 'Positive', 'Zero', 'Negative'],
        correctAnswer: 2,
        explanation: 'By definition, the work done by a conservative force (like gravity) over any closed loop is zero.',
        points: 1
    },
    {
        id: 'q_g11_phys_m1_07',
        examId: 'exam_69',
        grade: 'Grade11',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'An elastic collision is characterized by the conservation of:',
        options: [
            'Kinetic energy only',
            'Linear momentum only',
            'Both linear momentum and kinetic energy',
            'Neither linear momentum nor kinetic energy'
        ],
        correctAnswer: 2,
        explanation: 'In perfectly elastic collisions, both total momentum and total kinetic energy are strictly conserved.',
        points: 1
    },

    // ==========================================
    // GRADE 11 BIOLOGY MID 1 (exam_65)
    // ==========================================
    {
        id: 'q_g11_bio_m1_01',
        examId: 'exam_65',
        grade: 'Grade11',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which chemical bond links consecutive amino acids together in a polypeptide protein chain?',
        options: ['Phosphodiester bond', 'Glycosidic bond', 'Peptide bond', 'Ester bond'],
        correctAnswer: 2,
        explanation: 'A peptide bond forms between the carboxyl group of one amino acid and the amino group of another via condensation.',
        points: 1
    },
    {
        id: 'q_g11_bio_m1_02',
        examId: 'exam_65',
        grade: 'Grade11',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Enzymes accelerate biochemical reactions primarily by:',
        options: [
            'Increasing temperature',
            'Lowering activation energy',
            'Changing the equilibrium constant',
            'Supplying ATP directly'
        ],
        correctAnswer: 1,
        explanation: 'Enzymes are biological catalysts that speed up metabolic reactions by lowering the activation energy barrier required to reach the transition state.',
        points: 1
    },
    {
        id: 'q_g11_bio_m1_03',
        examId: 'exam_65',
        grade: 'Grade11',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which model of enzyme action proposed that the active site undergoes conformational changes upon substrate binding?',
        options: ['Lock-and-key model', 'Induced-fit model', 'Fluid mosaic model', 'Sliding filament model'],
        correctAnswer: 1,
        explanation: 'Daniel Koshland’s induced-fit model states that enzyme active sites flex slightly to snugly bind the substrate.',
        points: 1
    },
    {
        id: 'q_g11_bio_m1_04',
        examId: 'exam_65',
        grade: 'Grade11',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'A competitive enzyme inhibitor binds to:',
        options: [
            'The active site directly, competing with the substrate',
            'An allosteric site only',
            'The enzyme-substrate complex only',
            'The product molecules'
        ],
        correctAnswer: 0,
        explanation: 'Competitive inhibitors structurally resemble the substrate and bind directly to the active site, blocking substrate entry.',
        points: 1
    },
    {
        id: 'q_g11_bio_m1_05',
        examId: 'exam_65',
        grade: 'Grade11',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which disaccharide sugar is composed of glucose and fructose linked by a glycosidic bond?',
        options: ['Maltose', 'Lactose', 'Sucrose', 'Cellulose'],
        correctAnswer: 2,
        explanation: 'Sucrose (table sugar) is a disaccharide made of one glucose molecule and one fructose molecule.',
        points: 1
    },

    // ==========================================
    // GRADE 11 ENGLISH MID 1 (exam_66)
    // ==========================================
    {
        id: 'q_g11_eng_m1_01',
        examId: 'exam_66',
        grade: 'Grade11',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Choose the correct third conditional form: "If she ______ harder, she would have passed the scholarship exam."',
        options: ['studied', 'had studied', 'has studied', 'would study'],
        correctAnswer: 1,
        explanation: 'Third conditional (talking about hypothetical past situations): If + Past Perfect (had studied), would have + Past Participle.',
        points: 1
    },
    {
        id: 'q_g11_eng_m1_02',
        examId: 'exam_66',
        grade: 'Grade11',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Identify the inversion: "Rarely ______ such a passionate speech by a young orator."',
        options: ['we have heard', 'have we heard', 'we had heard', 'did we heard'],
        correctAnswer: 1,
        explanation: 'When negative or restrictive adverbs like "rarely", "seldom", or "never" begin a sentence, subject-auxiliary inversion is required: "have we heard".',
        points: 1
    },
    {
        id: 'q_g11_eng_m1_03',
        examId: 'exam_66',
        grade: 'Grade11',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Select the best transition word: "The national team trained rigorously; ______, they triumphed in the championship."',
        options: ['conversely', 'consequently', 'nonetheless', 'meanwhile'],
        correctAnswer: 1,
        explanation: '"Consequently" signifies a direct result or outcome of the rigorous training described in the first clause.',
        points: 1
    },
    {
        id: 'q_g11_eng_m1_04',
        examId: 'exam_66',
        grade: 'Grade11',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following sentences contains a non-defining relative clause?',
        options: [
            'The student who scored 100% received an award.',
            'Addis Ababa, which is the diplomatic capital of Africa, has expanded rapidly.',
            'The book that you recommended was thrilling.',
            'People who live in glass houses should not throw stones.'
        ],
        correctAnswer: 1,
        explanation: 'Non-defining relative clauses provide extra non-essential information enclosed by commas ("which is the diplomatic capital of Africa").',
        points: 1
    },

    // ==========================================
    // GRADE 11 IT MID 1 (exam_67)
    // ==========================================
    {
        id: 'q_g11_it_m1_01',
        examId: 'exam_67',
        grade: 'Grade11',
        subject: 'IT',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which layer of the OSI 7-layer reference model is responsible for routing data packets across disparate networks?',
        options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'],
        correctAnswer: 1,
        explanation: 'The Network layer (Layer 3) handles logical IP addressing, routing, and packet forwarding across network boundaries.',
        points: 1
    },
    {
        id: 'q_g11_it_m1_02',
        examId: 'exam_67',
        grade: 'Grade11',
        subject: 'IT',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which transport layer protocol provides reliable, connection-oriented data transmission with error checking?',
        options: ['UDP', 'TCP', 'IP', 'ICMP'],
        correctAnswer: 1,
        explanation: 'TCP (Transmission Control Protocol) establishes a connection via a 3-way handshake and guarantees ordered, error-checked packet delivery.',
        points: 1
    },
    {
        id: 'q_g11_it_m1_03',
        examId: 'exam_67',
        grade: 'Grade11',
        subject: 'IT',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'In a Relational Database Management System (RDBMS), a primary key must be:',
        options: [
            'Unique and cannot contain NULL values',
            'Numeric and allow duplicates',
            'Text-based and optional',
            'Shared between multiple tables without constraints'
        ],
        correctAnswer: 0,
        explanation: 'A Primary Key uniquely identifies each record in a relational database table and strictly forbids duplicate or NULL values.',
        points: 1
    },

    // ==========================================
    // GRADE 11 WEB MID 1 (exam_70)
    // ==========================================
    {
        id: 'q_g11_web_m1_01',
        examId: 'exam_70',
        grade: 'Grade11',
        subject: 'WEB',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which semantic HTML5 element represents standalone, self-contained content such as a blog post or news story?',
        options: ['<section>', '<article>', '<aside>', '<nav>'],
        correctAnswer: 1,
        explanation: 'The <article> tag specifies independent, self-contained content that could be distributed and reused independently.',
        points: 1
    },
    {
        id: 'q_g11_web_m1_02',
        examId: 'exam_70',
        grade: 'Grade11',
        subject: 'WEB',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'In CSS Flexbox, which property aligns flex items along the cross axis (vertically in a row container)?',
        options: ['justify-content', 'align-items', 'flex-direction', 'align-content'],
        correctAnswer: 1,
        explanation: 'justify-content aligns items along the main axis, while align-items controls alignment along the cross axis.',
        points: 1
    },
    {
        id: 'q_g11_web_m1_03',
        examId: 'exam_70',
        grade: 'Grade11',
        subject: 'WEB',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which HTTP method is specifically intended to submit form data to a server to create a new resource?',
        options: ['GET', 'POST', 'HEAD', 'OPTIONS'],
        correctAnswer: 1,
        explanation: 'POST sends payload data in the HTTP request body to the server to process and create/update resources.',
        points: 1
    },

    // ==========================================
    // GRADE 11 AGRICULTURE MID 1 (exam_63)
    // ==========================================
    {
        id: 'q_g11_agri_m1_01',
        examId: 'exam_63',
        grade: 'Grade11',
        subject: 'Agriculture',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which soil horizon contains the highest concentration of organic matter and humus?',
        options: ['A horizon (Topsoil)', 'B horizon (Subsoil)', 'C horizon (Parent material)', 'R horizon (Bedrock)'],
        correctAnswer: 0,
        explanation: 'The A horizon (topsoil) is rich in decomposed biological organic matter (humus) providing vital nutrients for plant roots.',
        points: 1
    },
    {
        id: 'q_g11_agri_m1_02',
        examId: 'exam_63',
        grade: 'Grade11',
        subject: 'Agriculture',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following is an effective soil conservation practice on sloped agricultural terrain?',
        options: ['Contour plowing and terracing', 'Downslope cultivation', 'Overgrazing', 'Deforestation'],
        correctAnswer: 0,
        explanation: 'Terracing and contour plowing slow surface water runoff, preventing topsoil erosion on steep slopes.',
        points: 1
    }
];

// Append newly crafted questions
let added = 0;
g11Questions.forEach(q => {
    if (!db.questions.some(existing => existing.id === q.id)) {
        db.questions.push(q);
        added++;
    }
});

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully injected ${added} Grade 11 Mid 1 questions. Total questions now: ${db.questions.length}`);
