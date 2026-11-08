// scripts/inject_mid1_expansion.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const expansionQuestions = [
    // --- GRADE 10 EXPANSIONS ---
    {
        id: 'q_g10_bio_m1_07', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following microscopes uses beams of electrons rather than light to achieve magnifications up to 1,000,000x?',
        options: ['Compound light microscope', 'Transmission electron microscope (TEM)', 'Dissecting stereomicroscope', 'Fluorescence microscope'],
        correctAnswer: 1, explanation: 'Electron microscopes utilize electron beams with much shorter wavelengths than visible light, enabling atomic-level resolving power.', points: 1
    },
    {
        id: 'q_g10_bio_m1_08', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What happens to a red blood cell placed into a hypertonic salt solution?',
        options: ['It absorbs water and lyses (bursts)', 'It loses water and crenates (shrinks)', 'It remains unchanged in shape', 'It divides by mitosis'],
        correctAnswer: 1, explanation: 'In a hypertonic environment, water exits the erythrocyte down the osmotic gradient into the higher solute surrounding, causing crenation.', points: 1
    },
    {
        id: 'q_g10_bio_m1_09', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which component of the cytoskeleton forms the mitotic spindle fibers during nuclear cell division?',
        options: ['Microfilaments (actin)', 'Intermediate filaments', 'Microtubules (tubulin)', 'Collagen fibers'],
        correctAnswer: 2, explanation: 'Spindle fibers are composed of alpha and beta tubulin dimers forming dynamic microtubules that guide chromosomes.', points: 1
    },
    {
        id: 'q_g10_bio_m1_10', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the end product of normal mitotic cell division?',
        options: ['Four genetically distinct haploid gametes', 'Two genetically identical diploid daughter cells', 'Two haploid zygotes', 'One multinucleated clone'],
        correctAnswer: 1, explanation: 'Mitosis produces two genetically identical diploid (2n) somatic cells for growth, tissue repair, and maintenance.', points: 1
    },
    {
        id: 'q_g10_chem_m1_09', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What type of isomerism is exhibited by but-2-ene in cis and trans arrangements?',
        options: ['Chain isomerism', 'Positional isomerism', 'Geometric (stereoisomerism)', 'Functional group isomerism'],
        correctAnswer: 2, explanation: 'Restricted rotation around the carbon-carbon double bond allows substituents to be on the same side (cis) or opposite sides (trans).', points: 1
    },
    {
        id: 'q_g10_chem_m1_10', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Which reagent is used as a test for unsaturation (decolorized by alkenes and alkynes)?',
        options: ['Bromine water (Br2 in CCl4)', 'Dilute hydrochloric acid', 'Sodium hydroxide solution', 'Litmus indicator'],
        correctAnswer: 0, explanation: 'Alkenes and alkynes rapidly decolorize reddish-brown bromine water by electrophilic halogen addition across pi bonds.', points: 1
    },
    {
        id: 'q_g10_phys_m1_11', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'A 1500 kg truck travelling at 20 m/s brakes to a complete stop in 4 seconds. What magnitude of braking force was applied?',
        options: ['3,000 N', '5,000 N', '7,500 N', '15,000 N'],
        correctAnswer: 2, explanation: 'a = (0 - 20) / 4 = -5 m/s^2. Force magnitude F = m * |a| = 1500 * 5 = 7,500 N.', points: 1
    },
    {
        id: 'q_g10_phys_m1_12', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the work done when a force of 40 N moves a box 5 meters in the exact direction of the force?',
        options: ['8 J', '45 J', '200 J', '800 J'],
        correctAnswer: 2, explanation: 'Work W = F * d * cos(0°) = 40 * 5 * 1 = 200 Joules.', points: 1
    },
    {
        id: 'q_g10_hist_m1_06', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'The European maritime exploration that inaugurated direct oceanic sea routes to India was achieved by:',
        options: ['Christopher Columbus', 'Vasco da Gama', 'Ferdinand Magellan', 'Marco Polo'],
        correctAnswer: 1, explanation: 'In 1498, Portuguese navigator Vasco da Gama sailed around the Cape of Good Hope, reaching Calicut, India.', points: 1
    },
    {
        id: 'q_g10_hist_m1_07', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'The great Christian king of Ethiopia who defeated Sultan Jamal ad-Din and extended royal authority in the 14th century was:',
        options: ['Emperor Amda Seyon I', 'Emperor Zara Yaqob', 'Emperor Lalibela', 'Emperor Tewodros II'],
        correctAnswer: 0, explanation: 'Emperor Amda Seyon I (1314–1344) commanded renowned military campaigns consolidating royal control across the central highlands.', points: 1
    },
    {
        id: 'q_g10_geog_m1_05', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'Which neighboring country borders Ethiopia directly to the east?',
        options: ['Sudan', 'Kenya', 'Somalia and Djibouti', 'South Sudan'],
        correctAnswer: 2, explanation: 'Ethiopia is bounded on the east and southeast by Somalia and Djibouti.', points: 1
    },
    {
        id: 'q_g10_geog_m1_06', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'Closely spaced contour lines on a topographic map indicate a:',
        options: ['Gentle slope', 'Steep slope or cliff', 'Broad flat plain', 'Deep lake'],
        correctAnswer: 1, explanation: 'When contour intervals are close together, elevation changes rapidly over short horizontal distances, indicating steep terrain.', points: 1
    },
    {
        id: 'q_g10_econ_m1_05', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'A point located inside the Production Possibility Curve (PPC) represents:',
        options: ['Unattainable production level', 'Inefficient use or underemployment of resources', 'Maximum potential output', 'Economic growth'],
        correctAnswer: 1, explanation: 'Points inside the PPC show that society is not fully utilizing its available resources or technology efficiently.', points: 1
    },
    {
        id: 'q_g10_econ_m1_06', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'If demand for injera teff increases while its supply remains constant, what happens to the equilibrium price and quantity?',
        options: ['Both price and quantity increase', 'Price increases but quantity decreases', 'Both price and quantity decrease', 'Price decreases but quantity increases'],
        correctAnswer: 0, explanation: 'A rightward shift in demand along an upward-sloping supply curve raises both the equilibrium market price and equilibrium quantity.', points: 1
    },
    {
        id: 'q_g10_it_m1_05', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which optical storage media typically holds up to 700 MB of digital data?',
        options: ['CD-ROM', 'DVD-ROM', 'Blu-ray Disc', 'Magnetic Tape'],
        correctAnswer: 0, explanation: 'Standard Compact Discs (CD-ROMs) have a data capacity of approximately 650–700 MB.', points: 1
    },
    {
        id: 'q_g10_cit_m1_04', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'A constitutional system where governmental authority is partitioned between central federal bodies and regional states is termed:',
        options: ['Unitary state', 'Federal state', 'Confederacy', 'Absolute monarchy'],
        correctAnswer: 1, explanation: 'Federalism divides sovereign constitutional authority between the national federal government and constitutionally recognized regional states.', points: 1
    },

    // --- GRADE 11 EXPANSIONS ---
    {
        id: 'q_g11_math_m1_08', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Decompose 5 / [(x - 1)(x + 4)] into partial fractions: A/(x - 1) + B/(x + 4). What is the value of A?',
        options: ['1', '2', '-1', '5'],
        correctAnswer: 0, explanation: '5 = A(x + 4) + B(x - 1). Setting x = 1 gives 5 = A(5) => A = 1.', points: 1
    },
    {
        id: 'q_g11_math_m1_09', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the distance between the points P(1, 2) and Q(4, 6)?',
        options: ['3', '4', '5', '7'],
        correctAnswer: 2, explanation: 'd = sqrt[(4 - 1)^2 + (6 - 2)^2] = sqrt[3^2 + 4^2] = sqrt[9 + 16] = 5.', points: 1
    },
    {
        id: 'q_g11_math_m1_10', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Find the vertex of the parabola y = x^2 - 4x + 7:',
        options: ['(2, 3)', '(-2, 3)', '(2, -3)', '(4, 7)'],
        correctAnswer: 0, explanation: 'x = -b/(2a) = 4 / 2 = 2. y = (2)^2 - 4(2) + 7 = 4 - 8 + 7 = 3. Vertex is (2, 3).', points: 1
    },
    {
        id: 'q_g11_phys_m1_08', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the cross product magnitude |A x B| if |A| = 6, |B| = 8, and the angle between them is 30 degrees?',
        options: ['12', '24', '48', '41.6'],
        correctAnswer: 1, explanation: '|A x B| = |A| * |B| * sin(theta) = 6 * 8 * sin(30°) = 48 * 0.5 = 24.', points: 1
    },
    {
        id: 'q_g11_phys_m1_09', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The gravitational potential energy of a 5 kg object raised 10 meters above the ground is: (take g = 9.8 m/s^2)',
        options: ['49 J', '98 J', '490 J', '980 J'],
        correctAnswer: 2, explanation: 'PE = mgh = 5 * 9.8 * 10 = 490 Joules.', points: 1
    },
    {
        id: 'q_g11_bio_m1_06', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which class of biomolecules has the primary cellular role of storing and transmitting genetic information?',
        options: ['Triglycerides', 'Polypeptides', 'Nucleic acids (DNA and RNA)', 'Phospholipids'],
        correctAnswer: 2, explanation: 'Deoxyribonucleic acid (DNA) and ribonucleic acid (RNA) encode the genetic instructions for all living organisms.', points: 1
    },
    {
        id: 'q_g11_bio_m1_07', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which test reagent produces a purple-violet color in the presence of peptide bonds in proteins?',
        options: ['Benedict’s reagent', 'Iodine solution', 'Biuret reagent', 'Sudan III stain'],
        correctAnswer: 2, explanation: 'Biuret solution reacts with peptide linkages in alkaline copper conditions to produce a characteristic violet color.', points: 1
    },
    {
        id: 'q_g11_eng_m1_05', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the mood in: "Had we known about the exam schedule earlier, we would have revised the chapters."',
        options: ['Indicative mood', 'Imperative mood', 'Conditional inversion', 'Subjunctive simple'],
        correctAnswer: 2, explanation: '"Had we known..." is an inverted conditional clause equivalent to "If we had known...".', points: 1
    },
    {
        id: 'q_g11_it_m1_04', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the primary role of the Domain Name System (DNS) in computer networking?',
        options: ['Encrypting outgoing passwords', 'Translating human-readable domain names into IP addresses', 'Compressing video streams', 'Filtering phishing emails'],
        correctAnswer: 1, explanation: 'DNS acts as the internet\'s directory, resolving names like "pastexamlibrary.org" into machine-routable IP addresses.', points: 1
    },
    {
        id: 'q_g11_web_m1_04', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which CSS selector selects all <p> elements located directly inside a <div>?',
        options: ['div p', 'div > p', 'div + p', 'div ~ p'],
        correctAnswer: 1, explanation: 'The child combinator (>) targets elements that are direct children of the specified parent.', points: 1
    },
    {
        id: 'q_g11_agri_m1_03', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which process in leguminous crops enriches soil with bioavailable nitrogen compounds?',
        options: ['Nitrification by Rhizobium root nodules', 'Denitrification by Pseudomonas', 'Ammonification by fungi', 'Photosynthesis by stomata'],
        correctAnswer: 0, explanation: 'Symbiotic Rhizobium bacteria inside legume root nodules fix atmospheric nitrogen gas into plant-absorbable ammonium.', points: 1
    },

    // --- GRADE 12 EXPANSIONS ---
    {
        id: 'q_g12_math_m1_08', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the derivative f\'(x) of the function f(x) = 3x^4 - 5x^2 + 8?',
        options: ['12x^3 - 10x', '12x^3 - 5x', '7x^3 - 10x', '3x^3 - 10x'],
        correctAnswer: 0, explanation: 'Applying the power rule: d/dx(3x^4) = 12x^3, d/dx(-5x^2) = -10x, and d/dx(8) = 0.', points: 1
    },
    {
        id: 'q_g12_math_m1_09', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'If the common ratio of a geometric progression is r = 3 and the first term is a1 = 2, what is the 5th term?',
        options: ['54', '162', '486', '243'],
        correctAnswer: 1, explanation: 'a5 = a1 * r^(5 - 1) = 2 * (3^4) = 2 * 81 = 162.', points: 1
    },
    {
        id: 'q_g12_math_m1_10', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Evaluate lim_{x -> 0} [(e^x - 1) / x]:',
        options: ['0', '1', 'e', 'Undefined'],
        correctAnswer: 1, explanation: 'By L’Hôpital’s rule or the definition of derivative of e^x at x=0: lim_{x -> 0} (e^x / 1) = e^0 = 1.', points: 1
    },
    {
        id: 'q_g12_phys_m1_06', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The electric potential V at a distance r from an isolated point charge Q in free space is given by:',
        options: ['k * Q / r', 'k * Q / r^2', 'k * Q^2 / r', 'k * Q * r'],
        correctAnswer: 0, explanation: 'Electric potential is a scalar quantity given by V = k * Q / r, whereas electric field magnitude is k * Q / r^2.', points: 1
    },
    {
        id: 'q_g12_phys_m1_07', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the capacitance of a parallel-plate capacitor with plate area A and separation distance d in air?',
        options: ['C = epsilon_0 * A / d', 'C = epsilon_0 * d / A', 'C = A * d / epsilon_0', 'C = epsilon_0 * A * d'],
        correctAnswer: 0, explanation: 'Capacitance is directly proportional to plate area and inversely proportional to plate separation: C = epsilon_0 * A / d.', points: 1
    },
    {
        id: 'q_g12_chem_m1_06', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'In an exothermic reversible reaction, what happens to the equilibrium constant Kc when the temperature is raised?',
        options: ['Kc increases', 'Kc decreases', 'Kc remains unchanged', 'Kc drops to zero'],
        correctAnswer: 1, explanation: 'According to Le Chatelier’s principle, adding heat to an exothermic reaction shifts the equilibrium toward reactants, reducing Kc.', points: 1
    },
    {
        id: 'q_g12_chem_m1_07', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the pH of a 0.001 M hydrochloric acid (HCl) solution at 25°C?',
        options: ['1', '2', '3', '11'],
        correctAnswer: 2, explanation: 'HCl is a strong monoprotic acid: [H+] = 10^(-3) M => pH = -log(10^(-3)) = 3.', points: 1
    },
    {
        id: 'q_g12_bio_m1_05', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Red-green color blindness in humans is inherited as an:',
        options: ['Autosomal dominant trait', 'Autosomal recessive trait', 'X-linked recessive trait', 'Y-linked trait'],
        correctAnswer: 2, explanation: 'The alleles responsible for red-green color vision pigments are located on the X chromosome and inherited in an X-linked recessive manner.', points: 1
    },
    {
        id: 'q_g12_bio_m1_06', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which nitrogenous base is found in RNA molecules but completely absent in DNA?',
        options: ['Thymine', 'Uracil', 'Adenine', 'Cytosine'],
        correctAnswer: 1, explanation: 'Uracil (U) replaces Thymine (T) in RNA and pairs with Adenine (A) during transcription and translation.', points: 1
    },
    {
        id: 'q_g12_eng_m1_04', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct preposition: "The candidate was fully absorbed ______ his mathematical derivation."',
        options: ['with', 'in', 'at', 'on'],
        correctAnswer: 1, explanation: 'The standard idiomatic collocation is "absorbed in" something (meaning deeply engrossed or focused).', points: 1
    },
    {
        id: 'q_g12_apt_m1_05', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'If a product priced at 800 Birr is discounted by 25%, what is the final selling price?',
        options: ['500 Birr', '600 Birr', '650 Birr', '700 Birr'],
        correctAnswer: 1, explanation: 'Discount = 800 * 0.25 = 200 Birr. Final price = 800 - 200 = 600 Birr.', points: 1
    },
    {
        id: 'q_g12_apt_m1_06', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'TELESCOPE is to ASTRONOMER as MICROSCOPE is to:',
        options: ['BIOLOGIST', 'GEOLOGIST', 'ENGINEER', 'PILOT'],
        correctAnswer: 0, explanation: 'A telescope is the primary observational tool of an astronomer, just as a microscope is the fundamental investigative tool of a biologist.', points: 1
    },
    {
        id: 'q_g12_it_m1_03', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following hash algorithms produces a 256-bit fixed-length cryptographic digest?',
        options: ['MD5', 'SHA-1', 'SHA-256', 'DES'],
        correctAnswer: 2, explanation: 'SHA-256 (Secure Hash Algorithm 256-bit) computes a deterministic, one-way 256-bit hash value widely used in security and blockchain.', points: 1
    },
    {
        id: 'q_g12_agri_m1_03', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Integrated Pest Management (IPM) prioritizes which strategy before applying chemical synthetic pesticides?',
        options: [
            'Immediate chemical saturation',
            'Biological controls, crop rotation, and cultural pest-resistant varieties',
            'Burning all adjacent vegetative fields',
            'Flooding crop furrows permanently'
        ],
        correctAnswer: 1, explanation: 'IPM emphasizes ecologically balanced cultural, physical, and biological methods to suppress pest populations below economic damage thresholds.', points: 1
    }
];

let added = 0;
expansionQuestions.forEach(q => {
    if (!db.questions.some(existing => existing.id === q.id)) {
        db.questions.push(q);
        added++;
    }
});

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully added ${added} expansion questions! Total questions now: ${db.questions.length}`);
