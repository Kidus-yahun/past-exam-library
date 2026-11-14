// scripts/inject_g10_mid1_questions.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const g10Questions = [
    // ==========================================
    // GRADE 10 MATHEMATICS MID 1 (exam_22)
    // ==========================================
    {
        id: 'q_g10_math_m1_03',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following relations is a function?',
        options: [
            '{(1, 2), (1, 3), (2, 4)}',
            '{(2, 5), (3, 7), (4, 9), (5, 11)}',
            '{(3, 1), (3, 2), (3, 3)}',
            '{(0, 1), (0, -1), (2, 3)}'
        ],
        correctAnswer: 1,
        explanation: 'A relation is a function if and only if each element of the domain is paired with exactly one element in the range. In {(2, 5), (3, 7), (4, 9), (5, 11)}, all first coordinates are distinct.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_04',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the domain of the function f(x) = sqrt(2x - 6)?',
        options: [
            '{x in R | x >= 3}',
            '{x in R | x > 3}',
            '{x in R | x <= 3}',
            '{x in R | x != 3}'
        ],
        correctAnswer: 0,
        explanation: 'For a real square root function, the radicand must be non-negative: 2x - 6 >= 0 => 2x >= 6 => x >= 3.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_05',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the remainder when P(x) = 2x^3 - 4x^2 + 5x - 3 is divided by (x - 2)?',
        options: ['3', '5', '7', '11'],
        correctAnswer: 2,
        explanation: 'By the Remainder Theorem, the remainder is P(2) = 2(2)^3 - 4(2)^2 + 5(2) - 3 = 16 - 16 + 10 - 3 = 7.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_06',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'If (x - 1) is a factor of P(x) = x^3 - 3x^2 + kx + 2, what is the value of k?',
        options: ['-2', '0', '1', '2'],
        correctAnswer: 1,
        explanation: 'By the Factor Theorem, P(1) = 0 => (1)^3 - 3(1)^2 + k(1) + 2 = 0 => 1 - 3 + k + 2 = 0 => k = 0.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_07',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the vertex of the parabola f(x) = 2(x - 3)^2 + 5?',
        options: ['(-3, 5)', '(3, 5)', '(3, -5)', '(-3, -5)'],
        correctAnswer: 1,
        explanation: 'In vertex form f(x) = a(x - h)^2 + k, the vertex is (h, k). Here h = 3 and k = 5, so the vertex is (3, 5).',
        points: 1
    },
    {
        id: 'q_g10_math_m1_09',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What are the zeros of the polynomial f(x) = x^2 - 7x + 12?',
        options: ['x = -3 and x = -4', 'x = 3 and x = 4', 'x = 2 and x = 6', 'x = -2 and x = -6'],
        correctAnswer: 1,
        explanation: 'Factoring: (x - 3)(x - 4) = 0 gives x = 3 and x = 4.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_10',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The axis of symmetry of the quadratic function y = -x^2 + 6x - 8 is:',
        options: ['x = -3', 'x = 3', 'x = 6', 'x = 1'],
        correctAnswer: 1,
        explanation: 'The axis of symmetry is given by x = -b / (2a) = -6 / (2 * -1) = 3.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_11',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the solution of 3^(2x - 1) = 27?',
        options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
        correctAnswer: 1,
        explanation: '27 = 3^3. Therefore, 2x - 1 = 3 => 2x = 4 => x = 2.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_12',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Evaluate log_2(32) - log_3(81):',
        options: ['-1', '0', '1', '2'],
        correctAnswer: 2,
        explanation: 'log_2(32) = 5 because 2^5 = 32. log_3(81) = 4 because 3^4 = 81. Thus, 5 - 4 = 1.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_13',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'If f(x) = 3x - 2 and g(x) = x^2 + 1, find (f o g)(2):',
        options: ['13', '15', '17', '21'],
        correctAnswer: 0,
        explanation: 'g(2) = (2)^2 + 1 = 5. Then f(g(2)) = f(5) = 3(5) - 2 = 13.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_14',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the inverse of the function f(x) = (2x + 3) / 5?',
        options: ['f^(-1)(x) = (5x - 3) / 2', 'f^(-1)(x) = (5x + 3) / 2', 'f^(-1)(x) = (2x - 5) / 3', 'f^(-1)(x) = 5 / (2x + 3)'],
        correctAnswer: 0,
        explanation: 'Let y = (2x + 3)/5 => 5y = 2x + 3 => 2x = 5y - 3 => x = (5y - 3)/2. Swapping variables gives f^(-1)(x) = (5x - 3)/2.',
        points: 1
    },
    {
        id: 'q_g10_math_m1_15',
        examId: 'exam_22',
        grade: 'Grade10',
        subject: 'Mathematics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following is the discriminant of the equation 2x^2 - 4x + 3 = 0?',
        options: ['-8', '8', '-40', '40'],
        correctAnswer: 0,
        explanation: 'Discriminant Delta = b^2 - 4ac = (-4)^2 - 4(2)(3) = 16 - 24 = -8. Since Delta < 0, there are no real roots.',
        points: 1
    },

    // ==========================================
    // GRADE 10 PHYSICS MID 1 (exam_23)
    // ==========================================
    {
        id: 'q_g10_phys_m1_01',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following is a pure vector quantity?',
        options: ['Speed', 'Mass', 'Displacement', 'Kinetic energy'],
        correctAnswer: 2,
        explanation: 'Displacement has both magnitude and a specific direction, making it a vector quantity, unlike speed, mass, or kinetic energy which are scalars.',
        points: 1
    },
    {
        id: 'q_g10_phys_m1_02',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Two vectors of magnitudes 3 N and 4 N act at a right angle (90 degrees) to each other. What is their resultant magnitude?',
        options: ['1 N', '5 N', '7 N', '12 N'],
        correctAnswer: 1,
        explanation: 'By the Pythagorean theorem: R = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5 N.',
        points: 1
    },
    {
        id: 'q_g10_phys_m1_03',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?',
        options: ['2 m/s^2', '4 m/s^2', '5 m/s^2', '10 m/s^2'],
        correctAnswer: 1,
        explanation: 'a = (v - u) / t = (20 - 0) / 5 = 4 m/s^2.',
        points: 1
    },
    {
        id: 'q_g10_phys_m1_04',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'How far does a body travel during 4 seconds of free fall from rest? (Take g = 10 m/s^2)',
        options: ['40 m', '60 m', '80 m', '100 m'],
        correctAnswer: 2,
        explanation: 's = ut + (1/2)gt^2. Since u = 0: s = (1/2)(10)(4^2) = 5 * 16 = 80 m.',
        points: 1
    },
    {
        id: 'q_g10_phys_m1_05',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'In projectile motion, what happens to the horizontal velocity component (neglecting air resistance)?',
        options: [
            'It increases continuously',
            'It decreases continuously',
            'It remains constant throughout the flight',
            'It becomes zero at maximum height'
        ],
        correctAnswer: 2,
        explanation: 'Since gravity acts only vertically downwards, there is zero horizontal acceleration (ax = 0). Thus, horizontal velocity vx remains constant.',
        points: 1
    },
    {
        id: 'q_g10_phys_m1_06',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What launch angle produces the maximum horizontal range for a projectile launched on level ground?',
        options: ['30 degrees', '45 degrees', '60 degrees', '90 degrees'],
        correctAnswer: 1,
        explanation: 'Range R = (u^2 * sin(2*theta)) / g. The maximum value occurs when sin(2*theta) = 1 => 2*theta = 90 => theta = 45 degrees.',
        points: 1
    },
    {
        id: 'q_g10_phys_m1_07',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Newton’s First Law of Motion is also known as the Law of:',
        options: ['Acceleration', 'Conservation of Momentum', 'Inertia', 'Gravitation'],
        correctAnswer: 2,
        explanation: 'Newton’s First Law defines inertia: an object remains at rest or in uniform motion unless acted upon by a net external force.',
        points: 1
    },
    {
        id: 'q_g10_phys_m1_08',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'A net force of 50 N acts on an object of mass 10 kg. What is the resulting acceleration?',
        options: ['0.2 m/s^2', '5 m/s^2', '50 m/s^2', '500 m/s^2'],
        correctAnswer: 1,
        explanation: 'By Newton’s Second Law: a = F / m = 50 N / 10 kg = 5 m/s^2.',
        points: 1
    },
    {
        id: 'q_g10_phys_m1_09',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Action and reaction force pairs mentioned in Newton’s Third Law:',
        options: [
            'Act on the same object and cancel each other',
            'Act on two different interacting bodies',
            'Are unequal in magnitude when there is acceleration',
            'Act in the same direction'
        ],
        correctAnswer: 1,
        explanation: 'Newton’s Third Law forces are equal in magnitude, opposite in direction, and act on two distinct objects, which is why they never cancel each other.',
        points: 1
    },
    {
        id: 'q_g10_phys_m1_10',
        examId: 'exam_23',
        grade: 'Grade10',
        subject: 'Physics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The coefficient of static friction (mu_s) compared to kinetic friction (mu_k) for the same surfaces is generally:',
        options: ['Greater', 'Smaller', 'Equal', 'Zero'],
        correctAnswer: 0,
        explanation: 'It takes more force to initiate motion from rest than to maintain motion; hence mu_s is always greater than mu_k.',
        points: 1
    },

    // ==========================================
    // GRADE 10 CHEMISTRY MID 1 (exam_15)
    // ==========================================
    {
        id: 'q_g10_chem_m1_01',
        examId: 'exam_15',
        grade: 'Grade10',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the general molecular formula of saturated hydrocarbons (Alkanes)?',
        options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnH2n-6'],
        correctAnswer: 1,
        explanation: 'Alkanes contain single carbon-carbon bonds and adhere to the general formula CnH2n+2.',
        points: 1
    },
    {
        id: 'q_g10_chem_m1_02',
        examId: 'exam_15',
        grade: 'Grade10',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the hybridization of carbon atoms in an alkane molecule like methane (CH4)?',
        options: ['sp', 'sp2', 'sp3', 'dsp2'],
        correctAnswer: 2,
        explanation: 'In alkanes, carbon forms four single sigma bonds with tetrahedral geometry and 109.5 degree bond angles, which corresponds to sp3 hybridization.',
        points: 1
    },
    {
        id: 'q_g10_chem_m1_03',
        examId: 'exam_15',
        grade: 'Grade10',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the IUPAC name for the hydrocarbon CH3-CH(CH3)-CH2-CH3?',
        options: ['2-methylpropane', '2-methylbutane', 'Isopentane', 'Dimethylpropane'],
        correctAnswer: 1,
        explanation: 'The longest continuous carbon chain has 4 carbons (butane) with a methyl group on carbon 2, making it 2-methylbutane.',
        points: 1
    },
    {
        id: 'q_g10_chem_m1_04',
        examId: 'exam_15',
        grade: 'Grade10',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'How many structural isomers does butane (C4H10) have?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: 'Butane (C4H10) has two structural isomers: normal butane (n-butane) and 2-methylpropane (isobutane).',
        points: 1
    },
    {
        id: 'q_g10_chem_m1_05',
        examId: 'exam_15',
        grade: 'Grade10',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Complete combustion of any hydrocarbon in excess oxygen produces:',
        options: ['CO and H2', 'CO2 and H2O', 'C and H2O', 'CO2 and H2'],
        correctAnswer: 1,
        explanation: 'Complete combustion of hydrocarbons yields carbon dioxide (CO2) and water vapor (H2O), releasing substantial thermal energy.',
        points: 1
    },
    {
        id: 'q_g10_chem_m1_06',
        examId: 'exam_15',
        grade: 'Grade10',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following hydrocarbons contains a triple bond between carbon atoms?',
        options: ['Ethene', 'Ethane', 'Ethyne', 'Propene'],
        correctAnswer: 2,
        explanation: 'Ethyne (acetylene, C2H2) belongs to the alkyne family and contains a carbon-carbon triple bond.',
        points: 1
    },
    {
        id: 'q_g10_chem_m1_07',
        examId: 'exam_15',
        grade: 'Grade10',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The reaction between methane and chlorine in the presence of ultraviolet light is an example of:',
        options: ['Addition reaction', 'Substitution reaction', 'Elimination reaction', 'Polymerization'],
        correctAnswer: 1,
        explanation: 'Alkanes undergo free-radical halogenation, which is a substitution reaction where hydrogen atoms are replaced by halogen atoms.',
        points: 1
    },
    {
        id: 'q_g10_chem_m1_08',
        examId: 'exam_15',
        grade: 'Grade10',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'According to Markovnikov’s rule, when HBr adds to propene (CH3-CH=CH2), the hydrogen atom attaches to:',
        options: [
            'The carbon with fewer hydrogen atoms',
            'The carbon with more hydrogen atoms',
            'The central carbon exclusively',
            'Any carbon randomly'
        ],
        correctAnswer: 1,
        explanation: 'Markovnikov’s rule states that in the addition of HX to an unsymmetrical alkene, the hydrogen attaches to the double-bonded carbon holding the greater number of hydrogen atoms.',
        points: 1
    },

    // ==========================================
    // GRADE 10 BIOLOGY MID 1 (exam_14)
    // ==========================================
    {
        id: 'q_g10_bio_m1_01',
        examId: 'exam_14',
        grade: 'Grade10',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which organelle is considered the "powerhouse of the cell" responsible for ATP synthesis?',
        options: ['Golgi apparatus', 'Ribosome', 'Mitochondrion', 'Lysosome'],
        correctAnswer: 2,
        explanation: 'Mitochondria generate most of the chemical energy needed by the cell through cellular respiration in the form of ATP.',
        points: 1
    },
    {
        id: 'q_g10_bio_m1_02',
        examId: 'exam_14',
        grade: 'Grade10',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The movement of water molecules from a region of lower solute concentration to higher solute concentration across a semi-permeable membrane is:',
        options: ['Active transport', 'Osmosis', 'Facilitated diffusion', 'Endocytosis'],
        correctAnswer: 1,
        explanation: 'Osmosis is specifically the passive diffusion of solvent (water) across a selectively permeable membrane.',
        points: 1
    },
    {
        id: 'q_g10_bio_m1_03',
        examId: 'exam_14',
        grade: 'Grade10',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'During which phase of mitosis do sister chromatids separate and move toward opposite poles?',
        options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
        correctAnswer: 2,
        explanation: 'During anaphase, the centromeres divide and the spindle fibers pull sister chromatids to opposite poles of the cell.',
        points: 1
    },
    {
        id: 'q_g10_bio_m1_04',
        examId: 'exam_14',
        grade: 'Grade10',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'In which stage of the cell cycle is DNA duplicated?',
        options: ['G1 phase', 'S phase', 'G2 phase', 'M phase'],
        correctAnswer: 1,
        explanation: 'The S phase (Synthesis phase) of interphase is when the cell replicates its genetic material (DNA).',
        points: 1
    },
    {
        id: 'q_g10_bio_m1_05',
        examId: 'exam_14',
        grade: 'Grade10',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which biological branch specifically studies heredity and variation in living organisms?',
        options: ['Ecology', 'Genetics', 'Cytology', 'Physiology'],
        correctAnswer: 1,
        explanation: 'Genetics is the branch of biology focused on how traits and genes are passed from parents to offspring.',
        points: 1
    },
    {
        id: 'q_g10_bio_m1_06',
        examId: 'exam_14',
        grade: 'Grade10',
        subject: 'Biology',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which structure is present in plant cells but absent in typical animal cells?',
        options: ['Cell wall and chloroplast', 'Ribosome and nucleus', 'Plasma membrane and cytoplasm', 'Mitochondria and vacuole'],
        correctAnswer: 0,
        explanation: 'Plant cells have a rigid cellulose cell wall and photosynthetic chloroplasts, which animal cells lack.',
        points: 1
    },

    // ==========================================
    // GRADE 10 ENGLISH MID 1 (exam_18)
    // ==========================================
    {
        id: 'q_g10_eng_m1_03',
        examId: 'exam_18',
        grade: 'Grade10',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Choose the correct form: If you heat water to 100 degrees Celsius, it ______.',
        options: ['boils', 'boiled', 'will boil', 'would boil'],
        correctAnswer: 0,
        explanation: 'This is a Zero Conditional representing a scientific universal fact: If + Present Simple, Present Simple.',
        points: 1
    },
    {
        id: 'q_g10_eng_m1_04',
        examId: 'exam_18',
        grade: 'Grade10',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Identify the passive voice: "The laboratory report ______ by Kidist yesterday."',
        options: ['was submitted', 'is submitted', 'has submitted', 'submitting'],
        correctAnswer: 0,
        explanation: 'The action occurred in the past ("yesterday"), so the past simple passive form is "was/were + past participle" -> "was submitted".',
        points: 1
    },
    {
        id: 'q_g10_eng_m1_05',
        examId: 'exam_18',
        grade: 'Grade10',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Select the correct relative pronoun: "The scientist ______ discovered the vaccine won the award."',
        options: ['which', 'who', 'whose', 'whom'],
        correctAnswer: 1,
        explanation: '"Who" is used as a subject relative pronoun to refer to people (the scientist).',
        points: 1
    },
    {
        id: 'q_g10_eng_m1_06',
        examId: 'exam_18',
        grade: 'Grade10',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Complete the sentence: "Neither the teacher nor the students ______ present in the auditorium."',
        options: ['was', 'were', 'is', 'has been'],
        correctAnswer: 1,
        explanation: 'When using "neither... nor", the verb agrees with the closer subject ("students", which is plural), so "were" is correct.',
        points: 1
    },
    {
        id: 'q_g10_eng_m1_07',
        examId: 'exam_18',
        grade: 'Grade10',
        subject: 'English',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which word contains a prefix meaning "against"?',
        options: ['Antibiotic', 'Prehistoric', 'Submarine', 'Supermarket'],
        correctAnswer: 0,
        explanation: 'The prefix "anti-" means against or opposing (e.g., antibiotic = against living bacterial pathogens).',
        points: 1
    },

    // ==========================================
    // GRADE 10 HISTORY MID 1 (exam_20)
    // ==========================================
    {
        id: 'q_g10_hist_m1_01',
        examId: 'exam_20',
        grade: 'Grade10',
        subject: 'History',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Where did the cultural movement known as the Renaissance begin in the 14th century?',
        options: ['Germany', 'England', 'Italy', 'France'],
        correctAnswer: 2,
        explanation: 'The Renaissance began in Italian city-states (such as Florence, Venice, and Genoa) before spreading across Europe.',
        points: 1
    },
    {
        id: 'q_g10_hist_m1_02',
        examId: 'exam_20',
        grade: 'Grade10',
        subject: 'History',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Who initiated the Protestant Reformation in 1517 by posting his Ninety-Five Theses?',
        options: ['John Calvin', 'Martin Luther', 'Henry VIII', 'Ignatius of Loyola'],
        correctAnswer: 1,
        explanation: 'Martin Luther sparked the Reformation in 1517 when he nailed his 95 Theses to the door of All Saints\' Church in Wittenberg, Germany.',
        points: 1
    },
    {
        id: 'q_g10_hist_m1_03',
        examId: 'exam_20',
        grade: 'Grade10',
        subject: 'History',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which Portuguese commander led the military expedition that aided Emperor Gelawdewos against Imam Ahmad Ibn Ibrahim (Gragn) in 1541?',
        options: ['Vasco da Gama', 'Cristóvão da Gama', 'Pedro Álvares Cabral', 'Alfonso de Albuquerque'],
        correctAnswer: 1,
        explanation: 'Cristóvão da Gama (the son of Vasco da Gama) commanded the Portuguese force of 400 musketeers sent to assist the Christian kingdom.',
        points: 1
    },
    {
        id: 'q_g10_hist_m1_04',
        examId: 'exam_20',
        grade: 'Grade10',
        subject: 'History',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'At which decisive battle in 1543 was Imam Ahmad Gragn defeated and killed by the forces of Emperor Gelawdewos?',
        options: ['Battle of Shimbra Kure', 'Battle of Wayna Daga', 'Battle of Wofla', 'Battle of Debre Abbay'],
        correctAnswer: 1,
        explanation: 'Imam Ahmad was defeated and killed at the Battle of Wayna Daga near Lake Tana on February 21, 1543.',
        points: 1
    },
    {
        id: 'q_g10_hist_m1_05',
        examId: 'exam_20',
        grade: 'Grade10',
        subject: 'History',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The traditional indigenous socio-political and democratic governing system of the Oromo people is called:',
        options: ['Gadaa system', 'Chafe council', 'Qallu institution', 'Luwa system'],
        correctAnswer: 0,
        explanation: 'The Gadaa system is the traditional Oromo democratic egalitarian system structured across 8-year age-grade cycles.',
        points: 1
    },

    // ==========================================
    // GRADE 10 GEOGRAPHY MID 1 (exam_19)
    // ==========================================
    {
        id: 'q_g10_geog_m1_01',
        examId: 'exam_19',
        grade: 'Grade10',
        subject: 'Geography',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following representative fractions represents the largest map scale?',
        options: ['1 : 25,000', '1 : 50,000', '1 : 100,000', '1 : 250,000'],
        correctAnswer: 0,
        explanation: 'A smaller denominator indicates a larger scale because features appear larger and in greater detail (1/25,000 > 1/250,000).',
        points: 1
    },
    {
        id: 'q_g10_geog_m1_02',
        examId: 'exam_19',
        grade: 'Grade10',
        subject: 'Geography',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Lines joining points of equal elevation above sea level on a topographical map are called:',
        options: ['Isobars', 'Isotherms', 'Contour lines', 'Isohyets'],
        correctAnswer: 2,
        explanation: 'Contour lines join points of equal altitude and indicate topography, slopes, and landforms on contour maps.',
        points: 1
    },
    {
        id: 'q_g10_geog_m1_03',
        examId: 'exam_19',
        grade: 'Grade10',
        subject: 'Geography',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'During which geological era was the Great East African Rift Valley formed through tectonic faulting and volcanic activity?',
        options: ['Precambrian Era', 'Paleozoic Era', 'Mesozoic Era', 'Cenozoic Era'],
        correctAnswer: 3,
        explanation: 'The Cenozoic Era (Tertiary and Quaternary periods) saw major rifting, volcanism, and the creation of the Ethiopian Rift Valley.',
        points: 1
    },
    {
        id: 'q_g10_geog_m1_04',
        examId: 'exam_19',
        grade: 'Grade10',
        subject: 'Geography',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the absolute latitudinal location of Ethiopia?',
        options: [
            '3°N to 15°N latitude',
            '10°S to 20°N latitude',
            '33°E to 48°E latitude',
            '0° to 10°N latitude'
        ],
        correctAnswer: 0,
        explanation: 'Ethiopia is located between approximately 3°N to 15°N latitude and 33°E to 48°E longitude.',
        points: 1
    },

    // ==========================================
    // GRADE 10 ECONOMICS MID 1 (exam_17)
    // ==========================================
    {
        id: 'q_g10_econ_m1_01',
        examId: 'exam_17',
        grade: 'Grade10',
        subject: 'Economics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the fundamental economic problem facing all human societies?',
        options: ['Inflation', 'Scarcity of resources', 'Unemployment', 'Poverty'],
        correctAnswer: 1,
        explanation: 'Scarcity arises because human wants are virtually unlimited while productive resources available to satisfy them are finite.',
        points: 1
    },
    {
        id: 'q_g10_econ_m1_02',
        examId: 'exam_17',
        grade: 'Grade10',
        subject: 'Economics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The value of the next best alternative foregone when a choice is made is termed:',
        options: ['Explicit cost', 'Sunk cost', 'Opportunity cost', 'Marginal cost'],
        correctAnswer: 2,
        explanation: 'Opportunity cost measures the sacrifice incurred by choosing one option over its best forgone alternative.',
        points: 1
    },
    {
        id: 'q_g10_econ_m1_03',
        examId: 'exam_17',
        grade: 'Grade10',
        subject: 'Economics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'According to the Law of Demand, when the price of a good increases, ceteris paribus:',
        options: [
            'Quantity demanded increases',
            'Quantity demanded decreases',
            'Demand shifts rightward',
            'Supply decreases'
        ],
        correctAnswer: 1,
        explanation: 'The Law of Demand states an inverse relationship between price and quantity demanded when other factors remain constant.',
        points: 1
    },
    {
        id: 'q_g10_econ_m1_04',
        examId: 'exam_17',
        grade: 'Grade10',
        subject: 'Economics',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Market equilibrium occurs at the price level where:',
        options: [
            'Quantity demanded equals quantity supplied',
            'There is excess supply',
            'There is excess demand',
            'Government fixes price ceilings'
        ],
        correctAnswer: 0,
        explanation: 'Equilibrium is the state where buyers are willing to buy the exact quantity that sellers are willing to sell (Qd = Qs).',
        points: 1
    },

    // ==========================================
    // GRADE 10 IT MID 1 (exam_21)
    // ==========================================
    {
        id: 'q_g10_it_m1_01',
        examId: 'exam_21',
        grade: 'Grade10',
        subject: 'IT',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which component of the Central Processing Unit (CPU) performs mathematical calculations and logical comparisons?',
        options: ['Control Unit (CU)', 'Arithmetic Logic Unit (ALU)', 'Registers', 'Cache Memory'],
        correctAnswer: 1,
        explanation: 'The ALU executes all arithmetic operations (+, -, *, /) and logical evaluations (AND, OR, NOT, comparisons).',
        points: 1
    },
    {
        id: 'q_g10_it_m1_02',
        examId: 'exam_21',
        grade: 'Grade10',
        subject: 'IT',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which type of network topology connects all nodes to a central hub or switch?',
        options: ['Bus topology', 'Star topology', 'Ring topology', 'Mesh topology'],
        correctAnswer: 1,
        explanation: 'In a Star topology, every device is connected via dedicated point-to-point cables to a central central device (switch/hub).',
        points: 1
    },
    {
        id: 'q_g10_it_m1_03',
        examId: 'exam_21',
        grade: 'Grade10',
        subject: 'IT',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'An IPv4 address consists of how many bits?',
        options: ['16 bits', '32 bits', '64 bits', '128 bits'],
        correctAnswer: 1,
        explanation: 'An IPv4 address is formatted as 4 octets separated by dots (e.g. 192.168.1.1), totaling 32 bits (unlike IPv6 which is 128 bits).',
        points: 1
    },
    {
        id: 'q_g10_it_m1_04',
        examId: 'exam_21',
        grade: 'Grade10',
        subject: 'IT',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following is volatile memory that loses its contents when power is turned off?',
        options: ['ROM', 'RAM', 'Hard Disk Drive', 'Flash Memory'],
        correctAnswer: 1,
        explanation: 'RAM (Random Access Memory) requires power to maintain state and clears whenever the computer powers down.',
        points: 1
    },

    // ==========================================
    // GRADE 10 CITIZENSHIP MID 1 (exam_16)
    // ==========================================
    {
        id: 'q_g10_cit_m1_01',
        examId: 'exam_16',
        grade: 'Grade10',
        subject: 'Citizenship',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following is a core foundational pillar of a democratic system?',
        options: [
            'Rule of law and constitutional supremacy',
            'Concentration of power in one leader',
            'Restricted citizen participation',
            'Censorship of public discourse'
        ],
        correctAnswer: 0,
        explanation: 'A genuine democracy is founded on constitutionalism, rule of law, periodic free elections, and the protection of basic citizen rights.',
        points: 1
    },
    {
        id: 'q_g10_cit_m1_02',
        examId: 'exam_16',
        grade: 'Grade10',
        subject: 'Citizenship',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'First-generation human rights primarily encompass which category of rights?',
        options: [
            'Civil and political rights',
            'Economic and social rights',
            'Environmental and solidarity rights',
            'Developmental rights'
        ],
        correctAnswer: 0,
        explanation: 'First-generation rights deal with liberty and political participation (freedom of speech, right to fair trial, voting, freedom of religion).',
        points: 1
    },
    {
        id: 'q_g10_cit_m1_03',
        examId: 'exam_16',
        grade: 'Grade10',
        subject: 'Citizenship',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the primary function of the legislative branch of government?',
        options: ['Enforcing laws', 'Interpreting laws', 'Making and enacting laws', 'Administering punishments'],
        correctAnswer: 2,
        explanation: 'The Legislature (Parliament/Congress) has the primary constitutional responsibility to draft, debate, and enact legislation.',
        points: 1
    }
];

// Append newly crafted questions
let added = 0;
g10Questions.forEach(q => {
    if (!db.questions.some(existing => existing.id === q.id)) {
        db.questions.push(q);
        added++;
    }
});

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully injected ${added} Grade 10 Mid 1 questions. Total questions now: ${db.questions.length}`);
