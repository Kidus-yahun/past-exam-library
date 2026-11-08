// scripts/inject_g12_mid1_questions.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const g12Questions = [
    // ==========================================
    // GRADE 12 MATHEMATICS MID 1 (exam_100)
    // ==========================================
    {
        id: 'q_g12_math_m1_02',
        examId: 'exam_100',
        grade: 'Grade12',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the 10th term of an arithmetic sequence whose first term is 4 and common difference is 3?',
        options: ['28', '31', '34', '37'],
        correctAnswer: 1,
        explanation: 'an = a1 + (n - 1)d => a10 = 4 + (10 - 1)*3 = 4 + 27 = 31.',
        points: 1
    },
    {
        id: 'q_g12_math_m1_03',
        examId: 'exam_100',
        grade: 'Grade12',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the sum of the infinite geometric series: 12 + 6 + 3 + 3/2 + ...?',
        options: ['18', '24', '36', 'Diverges'],
        correctAnswer: 1,
        explanation: 'Here a = 12 and common ratio r = 6/12 = 1/2. Since |r| < 1, S = a / (1 - r) = 12 / (1 - 0.5) = 12 / 0.5 = 24.',
        points: 1
    },
    {
        id: 'q_g12_math_m1_04',
        examId: 'exam_100',
        grade: 'Grade12',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Evaluate the limit: lim_{x -> 0} (sin(5x) / x)',
        options: ['0', '1', '5', 'Undefined'],
        correctAnswer: 2,
        explanation: 'Using the standard trigonometric limit lim_{u -> 0} sin(u)/u = 1: lim_{x -> 0} 5 * [sin(5x) / (5x)] = 5 * 1 = 5.',
        points: 1
    },
    {
        id: 'q_g12_math_m1_05',
        examId: 'exam_100',
        grade: 'Grade12',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Evaluate the limit: lim_{x -> 2} (x^2 - 4) / (x - 2)',
        options: ['0', '2', '4', 'Infinity'],
        correctAnswer: 2,
        explanation: 'Factoring: (x - 2)(x + 2) / (x - 2) = x + 2 for x != 2. Substituting x = 2 gives 2 + 2 = 4.',
        points: 1
    },
    {
        id: 'q_g12_math_m1_06',
        examId: 'exam_100',
        grade: 'Grade12',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the value of lim_{x -> infinity} (4x^3 + 2x) / (5x^3 - 7x^2 + 1)?',
        options: ['0', '4/5', 'Infinity', '-2/7'],
        correctAnswer: 1,
        explanation: 'For rational limits at infinity with equal degrees, the limit equals the ratio of leading coefficients: 4/5.',
        points: 1
    },
    {
        id: 'q_g12_math_m1_07',
        examId: 'exam_100',
        grade: 'Grade12',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'A function f(x) is continuous at x = c if and only if:',
        options: [
            'f(c) is defined, lim_{x -> c} f(x) exists, and lim_{x -> c} f(x) = f(c)',
            'f(c) exists only',
            'lim_{x -> c} f(x) exists only',
            'f(x) has a derivative at all points'
        ],
        correctAnswer: 0,
        explanation: 'The three fundamental conditions for continuity at a point are: f(c) exists, the two-sided limit exists, and the limit matches the function value.',
        points: 1
    },

    // ==========================================
    // GRADE 12 PHYSICS MID 1 (exam_101)
    // ==========================================
    {
        id: 'q_g12_phys_m1_01',
        examId: 'exam_101',
        grade: 'Grade12',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'According to the First Law of Thermodynamics, the change in internal energy (Delta U) is given by:',
        options: ['Delta U = Q - W', 'Delta U = Q + W', 'Delta U = W - Q', 'Delta U = Q / W'],
        correctAnswer: 0,
        explanation: 'The First Law states Delta U = Q - W, where Q is heat added to the system and W is work done by the system.',
        points: 1
    },
    {
        id: 'q_g12_phys_m1_02',
        examId: 'exam_101',
        grade: 'Grade12',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'In an isothermal thermodynamic process, which physical variable remains constant?',
        options: ['Pressure', 'Volume', 'Temperature', 'Entropy'],
        correctAnswer: 2,
        explanation: 'An isothermal process occurs at constant temperature (Delta T = 0), which implies Delta U = 0 for an ideal gas.',
        points: 1
    },
    {
        id: 'q_g12_phys_m1_03',
        examId: 'exam_101',
        grade: 'Grade12',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the maximum theoretical efficiency of a Carnot heat engine operating between a hot reservoir at 600 K and a cold reservoir at 300 K?',
        options: ['25%', '33%', '50%', '75%'],
        correctAnswer: 2,
        explanation: 'Carnot efficiency eta = 1 - (Tc / Th) = 1 - (300 / 600) = 1 - 0.5 = 0.5 or 50%.',
        points: 1
    },
    {
        id: 'q_g12_phys_m1_04',
        examId: 'exam_101',
        grade: 'Grade12',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Two point charges of +2 microC and +8 microC are placed in vacuum separated by a distance r. If the distance is doubled (2r), the electrostatic force between them becomes:',
        options: ['Doubled', 'Halved', 'One-fourth as large', 'Four times larger'],
        correctAnswer: 2,
        explanation: 'According to Coulomb’s inverse-square law: F proportional to 1 / r^2. Doubling distance reduces force to 1/(2^2) = 1/4.',
        points: 1
    },
    {
        id: 'q_g12_phys_m1_05',
        examId: 'exam_101',
        grade: 'Grade12',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the electric field inside a hollow charged spherical conductor in electrostatic equilibrium?',
        options: ['Infinite', 'Zero', 'Uniform and non-zero', 'Dependent on radius'],
        correctAnswer: 1,
        explanation: 'By Gauss’s Law, all electrostatic excess charges reside entirely on the outer surface, leaving the internal electric field strictly zero.',
        points: 1
    },

    // ==========================================
    // GRADE 12 CHEMISTRY MID 1 (exam_97)
    // ==========================================
    {
        id: 'q_g12_chem_m1_01',
        examId: 'exam_97',
        grade: 'Grade12',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'For a reaction with rate law Rate = k[A]^2[B], what is the overall order of the reaction?',
        options: ['First order', 'Second order', 'Third order', 'Zero order'],
        correctAnswer: 2,
        explanation: 'The overall reaction order is the sum of exponents: 2 + 1 = 3 (third order).',
        points: 1
    },
    {
        id: 'q_g12_chem_m1_02',
        examId: 'exam_97',
        grade: 'Grade12',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What are the SI units of the rate constant (k) for a first-order chemical reaction?',
        options: ['mol / (L * s)', 's^(-1)', 'L / (mol * s)', 'L^2 / (mol^2 * s)'],
        correctAnswer: 1,
        explanation: 'For a first-order reaction: Rate = k[A] => (mol/(L*s)) = k * (mol/L) => k has units s^(-1).',
        points: 1
    },
    {
        id: 'q_g12_chem_m1_03',
        examId: 'exam_97',
        grade: 'Grade12',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'How does increasing the temperature affect the rate constant (k) according to the Arrhenius equation?',
        options: [
            'Increases k exponentially',
            'Decreases k',
            'Has no effect on k',
            'Decreases activation energy Ea'
        ],
        correctAnswer: 0,
        explanation: 'In k = A * e^(-Ea / RT), increasing T increases the fraction of colliding molecules with sufficient activation energy, increasing k exponentially.',
        points: 1
    },
    {
        id: 'q_g12_chem_m1_04',
        examId: 'exam_97',
        grade: 'Grade12',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'A catalyst speeds up a chemical reaction by:',
        options: [
            'Increasing enthalpy of reaction Delta H',
            'Providing an alternative pathway with lower activation energy',
            'Increasing the frequency of non-effective collisions',
            'Shifting the chemical equilibrium position to the right'
        ],
        correctAnswer: 1,
        explanation: 'A catalyst lowers the activation energy barrier for both forward and reverse reactions without altering Delta H or Kc.',
        points: 1
    },
    {
        id: 'q_g12_chem_m1_05',
        examId: 'exam_97',
        grade: 'Grade12',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The half-life of a first-order reaction is:',
        options: [
            'Independent of initial reactant concentration',
            'Inversely proportional to initial concentration',
            'Directly proportional to initial concentration',
            'Zero at equilibrium'
        ],
        correctAnswer: 0,
        explanation: 'For first order reactions, t_1/2 = ln(2) / k = 0.693 / k, which is strictly independent of starting concentration [A]0.',
        points: 1
    },

    // ==========================================
    // GRADE 12 BIOLOGY MID 1 (exam_96)
    // ==========================================
    {
        id: 'q_g12_bio_m1_01',
        examId: 'exam_96',
        grade: 'Grade12',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'In a monohybrid cross between two heterozygous pea plants (Tt x Tt), what is the expected phenotypic ratio of tall to dwarf offspring?',
        options: ['1 : 1', '3 : 1', '9 : 3 : 3 : 1', '1 : 2 : 1'],
        correctAnswer: 1,
        explanation: 'The genotypic ratio is 1 TT : 2 Tt : 1 tt, resulting in a 3 dominant (tall) to 1 recessive (dwarf) phenotypic ratio.',
        points: 1
    },
    {
        id: 'q_g12_bio_m1_02',
        examId: 'exam_96',
        grade: 'Grade12',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which enzyme is responsible for synthesizing new complementary DNA strands during semi-conservative replication?',
        options: ['RNA Polymerase', 'DNA Helicase', 'DNA Polymerase', 'DNA Ligase'],
        correctAnswer: 2,
        explanation: 'DNA polymerase adds complementary deoxyribonucleotides in the 5\' to 3\' direction to build the nascent strand.',
        points: 1
    },
    {
        id: 'q_g12_bio_m1_03',
        examId: 'exam_96',
        grade: 'Grade12',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The synthesis of mRNA from a DNA template strand in the cell nucleus is called:',
        options: ['Translation', 'Transcription', 'Transduction', 'Transformation'],
        correctAnswer: 1,
        explanation: 'Transcription is the enzymatic synthesis of RNA from a gene sequence on DNA catalyzed by RNA polymerase.',
        points: 1
    },
    {
        id: 'q_g12_bio_m1_04',
        examId: 'exam_96',
        grade: 'Grade12',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Human ABO blood groups demonstrate which non-Mendelian genetic inheritance pattern?',
        options: ['Incomplete dominance', 'Codominance and multiple alleles', 'Polygenic inheritance', 'Sex linkage'],
        correctAnswer: 1,
        explanation: 'The ABO system involves three alleles (IA, IB, i) where IA and IB are codominant with each other and dominant over i.',
        points: 1
    },

    // ==========================================
    // GRADE 12 ENGLISH MID 1 (exam_98)
    // ==========================================
    {
        id: 'q_g12_eng_m1_01',
        examId: 'exam_98',
        grade: 'Grade12',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Choose the correct subjunctive mood verb form: "The principal recommended that every candidate ______ punctual."',
        options: ['is', 'was', 'be', 'are'],
        correctAnswer: 2,
        explanation: 'Mandative subjunctive constructions following verbs of demanding/recommending use the base form of the verb ("be").',
        points: 1
    },
    {
        id: 'q_g12_eng_m1_02',
        examId: 'exam_98',
        grade: 'Grade12',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Identify the cleft sentence structure used for emphasis:',
        options: [
            'Nahom solved the physics problem quickly.',
            'It was Nahom who solved the physics problem.',
            'Solving the physics problem was easy for Nahom.',
            'The physics problem was solved by Nahom.'
        ],
        correctAnswer: 1,
        explanation: '"It was X who/that..." is an it-cleft sentence specifically focusing listener emphasis on the agent (Nahom).',
        points: 1
    },
    {
        id: 'q_g12_eng_m1_03',
        examId: 'exam_98',
        grade: 'Grade12',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Select the synonym for "ubiquitous":',
        options: ['Rare', 'Omnipresent', 'Obsolete', 'Temporary'],
        correctAnswer: 1,
        explanation: '"Ubiquitous" means present, appearing, or found everywhere at the same time (omnipresent).',
        points: 1
    },

    // ==========================================
    // GRADE 12 APTITUDE MID 1 (exam_95)
    // ==========================================
    {
        id: 'q_g12_apt_m1_01',
        examId: 'exam_95',
        grade: 'Grade12',
        subject: 'Aptitude',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Find the next number in the sequence: 2, 6, 12, 20, 30, ?',
        options: ['38', '40', '42', '46'],
        correctAnswer: 2,
        explanation: 'Differences between consecutive numbers are +4, +6, +8, +10. The next difference is +12 => 30 + 12 = 42 (also n*(n+1)).',
        points: 1
    },
    {
        id: 'q_g12_apt_m1_02',
        examId: 'exam_95',
        grade: 'Grade12',
        subject: 'Aptitude',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'OASIS is to DESERT as ISLAND is to:',
        options: ['OCEAN', 'SAND', 'FOREST', 'MOUNTAIN'],
        correctAnswer: 0,
        explanation: 'An oasis is a fertile isolated body of water surrounded by desert, just as an island is a body of land surrounded by ocean.',
        points: 1
    },
    {
        id: 'q_g12_apt_m1_03',
        examId: 'exam_95',
        grade: 'Grade12',
        subject: 'Aptitude',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'If 5 workers take 12 days to complete a construction project, how many days would 10 workers take at the same pace?',
        options: ['6 days', '10 days', '15 days', '24 days'],
        correctAnswer: 0,
        explanation: 'Work = Workers * Days = 5 * 12 = 60 worker-days. For 10 workers: 60 / 10 = 6 days.',
        points: 1
    },
    {
        id: 'q_g12_apt_m1_04',
        examId: 'exam_95',
        grade: 'Grade12',
        subject: 'Aptitude',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'If all Catholics are Christians, and all Christians value compassion, it logically follows that:',
        options: [
            'All compassionate people are Catholic',
            'All Catholics value compassion',
            'Some Christians are not compassionate',
            'No valid conclusion exists'
        ],
        correctAnswer: 1,
        explanation: 'By standard categorical syllogism: All A are B, and all B are C => All A are C (All Catholics value compassion).',
        points: 1
    },

    // ==========================================
    // GRADE 12 IT MID 1 (exam_99)
    // ==========================================
    {
        id: 'q_g12_it_m1_01',
        examId: 'exam_99',
        grade: 'Grade12',
        subject: 'IT',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'In asymmetric public-key cryptography, a message encrypted with a recipient’s public key can only be decrypted by:',
        options: [
            'The sender’s public key',
            'The recipient’s private key',
            'The sender’s private key',
            'A symmetric secret key'
        ],
        correctAnswer: 1,
        explanation: 'Asymmetric encryption uses keypairs: data encrypted with the public key can only be decrypted by the matching private key.',
        points: 1
    },
    {
        id: 'q_g12_it_m1_02',
        examId: 'exam_99',
        grade: 'Grade12',
        subject: 'IT',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which software development methodology emphasizes short iterative sprints, frequent releases, and continuous stakeholder feedback?',
        options: ['Waterfall model', 'Agile methodology', 'V-Model', 'Linear Sequential Model'],
        correctAnswer: 1,
        explanation: 'Agile development breaks projects into flexible sprint cycles adapting to evolving user feedback.',
        points: 1
    },

    // ==========================================
    // GRADE 12 AGRICULTURE MID 1 (exam_93)
    // ==========================================
    {
        id: 'q_g12_agri_m1_01',
        examId: 'exam_93',
        grade: 'Grade12',
        subject: 'Agriculture',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following is the most water-efficient modern irrigation system delivering water directly to root zones?',
        options: ['Flood irrigation', 'Furrow irrigation', 'Drip (trickle) irrigation', 'Sprinkler irrigation'],
        correctAnswer: 0,
        explanation: 'Drip irrigation minimizes water evaporation and runoff by applying water directly to the plant root zone via emitters.',
        points: 1
    },
    {
        id: 'q_g12_agri_m1_02',
        examId: 'exam_93',
        grade: 'Grade12',
        subject: 'Agriculture',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The three primary essential plant macronutrients supplied by standard NPK fertilizers are:',
        options: [
            'Nitrogen, Phosphorus, and Potassium',
            'Nickel, Platinum, and Krypton',
            'Nitrogen, Potassium, and Calcium',
            'Sodium, Phosphorus, and Potassium'
        ],
        correctAnswer: 0,
        explanation: 'NPK stands for Nitrogen (N) for vegetative foliage growth, Phosphorus (P) for roots/flowers, and Potassium (K) for disease resistance.',
        points: 1
    }
];

// Append newly crafted questions
let added = 0;
g12Questions.forEach(q => {
    if (!db.questions.some(existing => existing.id === q.id)) {
        db.questions.push(q);
        added++;
    }
});

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully injected ${added} Grade 12 Mid 1 questions. Total questions now: ${db.questions.length}`);
