// scripts/inject_g10_mid1_full_papers.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const newG10Questions = [
    // ==========================================
    // GRADE 10 MATHEMATICS MID 1 (exam_22) - target 25
    // ==========================================
    {
        id: 'q_g10_math_m1_16', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the degree and leading coefficient of the polynomial P(x) = -4x^5 + 7x^3 - 2x + 9?',
        options: ['Degree 5, leading coefficient -4', 'Degree 5, leading coefficient 9', 'Degree 3, leading coefficient 7', 'Degree 9, leading coefficient -4'],
        correctAnswer: 0, explanation: 'The degree is the highest exponent of x (5), and the leading coefficient is the coefficient of that term (-4).', points: 1
    },
    {
        id: 'q_g10_math_m1_17', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'If f(x) = x^2 - 4 and g(x) = x + 2, what is (f / g)(x) for x != -2?',
        options: ['x - 2', 'x + 2', 'x^2 - 2', '1'],
        correctAnswer: 0, explanation: '(f / g)(x) = (x^2 - 4) / (x + 2) = (x - 2)(x + 2) / (x + 2) = x - 2.', points: 1
    },
    {
        id: 'q_g10_math_m1_18', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the minimum value of the quadratic function f(x) = x^2 - 6x + 13?',
        options: ['4', '13', '3', '-4'],
        correctAnswer: 0, explanation: 'Vertex x = -b/(2a) = 6/2 = 3. Minimum value f(3) = 3^2 - 6(3) + 13 = 9 - 18 + 13 = 4.', points: 1
    },
    {
        id: 'q_g10_math_m1_19', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Solve the exponential equation: 2^(3x + 1) = 128',
        options: ['x = 2', 'x = 3', 'x = 7', 'x = 1'],
        correctAnswer: 0, explanation: '128 = 2^7. Therefore, 3x + 1 = 7 => 3x = 6 => x = 2.', points: 1
    },
    {
        id: 'q_g10_math_m1_20', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the value of log_5(1/125)?',
        options: ['-3', '3', '1/3', '-1/3'],
        correctAnswer: 0, explanation: '1/125 = 5^(-3). Therefore log_5(5^(-3)) = -3.', points: 1
    },
    {
        id: 'q_g10_math_m1_21', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following functions is strictly increasing on R?',
        options: ['f(x) = 2^x', 'f(x) = (1/2)^x', 'f(x) = -3x + 4', 'f(x) = -x^2'],
        correctAnswer: 0, explanation: 'An exponential function with base b > 1 (like 2^x) is strictly increasing across its entire domain R.', points: 1
    },
    {
        id: 'q_g10_math_m1_22', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'The solution set of the inequality x^2 - 5x + 6 < 0 is:',
        options: ['(2, 3)', '[2, 3]', '(-infinity, 2) U (3, infinity)', '(-3, -2)'],
        correctAnswer: 0, explanation: '(x - 2)(x - 3) < 0. Testing the three intervals demonstrates negative products strictly between 2 and 3: (2, 3).', points: 1
    },
    {
        id: 'q_g10_math_m1_23', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'If log(x) + log(x - 3) = 1 (base 10), what is the value of x?',
        options: ['5', '-2', '2', '10'],
        correctAnswer: 0, explanation: 'log[x(x - 3)] = 1 => x^2 - 3x = 10 => x^2 - 3x - 10 = 0 => (x - 5)(x + 2) = 0. Since log requires positive arguments, x = 5.', points: 1
    },
    {
        id: 'q_g10_math_m1_24', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the sum of the roots of the quadratic equation 3x^2 - 12x + 5 = 0?',
        options: ['4', '-4', '5/3', '-5/3'],
        correctAnswer: 0, explanation: 'By Vieta\'s formulas, sum of roots = -b / a = -(-12) / 3 = 12 / 3 = 4.', points: 1
    },
    {
        id: 'q_g10_math_m1_25', examId: 'exam_22', grade: 'Grade10', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the range of the exponential function f(x) = 3^x - 2?',
        options: ['(-2, infinity)', '[-2, infinity)', '(0, infinity)', '(-infinity, -2)'],
        correctAnswer: 0, explanation: 'Since 3^x > 0 for all real x, 3^x - 2 > -2. Thus the range is (-2, infinity).', points: 1
    },

    // ==========================================
    // GRADE 10 PHYSICS MID 1 (exam_23) - target 25
    // ==========================================
    {
        id: 'q_g10_phys_m1_13', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'A 1000 kg vehicle moves in a circle of radius 50 m at a speed of 10 m/s. What centripetal force is required?',
        options: ['2,000 N', '500 N', '10,000 N', '1,000 N'],
        correctAnswer: 0, explanation: 'Fc = m * v^2 / r = 1000 * (10^2) / 50 = 1000 * 100 / 50 = 2,000 N.', points: 1
    },
    {
        id: 'q_g10_phys_m1_14', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which law of physics states that the total momentum of an isolated system remains constant in the absence of external forces?',
        options: ['Law of Conservation of Linear Momentum', 'Newton\'s Law of Universal Gravitation', 'Hooke\'s Law', 'Coulomb\'s Law'],
        correctAnswer: 0, explanation: 'Conservation of momentum follows directly from Newton\'s third law when no net external force acts.', points: 1
    },
    {
        id: 'q_g10_phys_m1_15', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'A ball is thrown vertically upward with initial velocity 30 m/s. How high does it rise? (g = 10 m/s^2)',
        options: ['45 m', '90 m', '30 m', '15 m'],
        correctAnswer: 0, explanation: 'v^2 = u^2 - 2gh => 0 = 30^2 - 2(10)h => 20h = 900 => h = 45 meters.', points: 1
    },
    {
        id: 'q_g10_phys_m1_16', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The slope of a velocity-time (v-t) graph represents:',
        options: ['Acceleration', 'Displacement', 'Speed', 'Force'],
        correctAnswer: 0, explanation: 'The rate of change of velocity with respect to time (Delta v / Delta t) is acceleration.', points: 1
    },
    {
        id: 'q_g10_phys_m1_17', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The area under a force-displacement (F-d) graph represents:',
        options: ['Work done (energy transferred)', 'Power', 'Momentum', 'Acceleration'],
        correctAnswer: 0, explanation: 'Work is the integral of force with respect to displacement: W = int F dd.', points: 1
    },
    {
        id: 'q_g10_phys_m1_18', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the kinetic energy of a 2 kg object moving at a velocity of 6 m/s?',
        options: ['36 J', '12 J', '72 J', '18 J'],
        correctAnswer: 0, explanation: 'KE = (1/2)m*v^2 = (1/2)(2)(6^2) = 1 * 36 = 36 Joules.', points: 1
    },
    {
        id: 'q_g10_phys_m1_19', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'If the net force acting on a moving object is suddenly reduced to zero, the object will:',
        options: [
            'Continue moving with constant velocity in a straight line',
            'Immediately stop moving',
            'Gradually slow down and stop',
            'Accelerate rapidly'
        ],
        correctAnswer: 0, explanation: 'By Newton\'s First Law of Inertia, zero net force maintains uniform motion at constant velocity.', points: 1
    },
    {
        id: 'q_g10_phys_m1_20', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the weight of an 8 kg mass on the surface of the Moon? (g_moon = 1.6 m/s^2)',
        options: ['12.8 N', '80 N', '50 N', '0 N'],
        correctAnswer: 0, explanation: 'Weight W = m * g_moon = 8 kg * 1.6 m/s^2 = 12.8 N.', points: 1
    },
    {
        id: 'q_g10_phys_m1_21', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'A crate of mass 20 kg rests on a horizontal floor where coefficient of static friction mu_s = 0.4. What minimum horizontal force is needed to start it moving? (g = 10 m/s^2)',
        options: ['80 N', '200 N', '50 N', '8 N'],
        correctAnswer: 0, explanation: 'Normal force N = mg = 20 * 10 = 200 N. F_s = mu_s * N = 0.4 * 200 = 80 N.', points: 1
    },
    {
        id: 'q_g10_phys_m1_22', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is true regarding work done by gravity on a satellite in a circular orbit around Earth?',
        options: ['Work done is zero because gravity is perpendicular to velocity', 'Work is positive', 'Work is negative', 'Work equals kinetic energy'],
        correctAnswer: 0, explanation: 'At every point, the gravitational force is radial (perpendicular to tangential displacement, cos 90° = 0), so W = 0.', points: 1
    },
    {
        id: 'q_g10_phys_m1_23', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'Two vectors have equal magnitudes of 10 units each. If their resultant magnitude is also 10 units, what is the angle between them?',
        options: ['120 degrees', '60 degrees', '90 degrees', '180 degrees'],
        correctAnswer: 0, explanation: 'R^2 = A^2 + B^2 + 2AB cos(theta) => 100 = 100 + 100 + 200 cos(theta) => -100 = 200 cos(theta) => cos(theta) = -0.5 => theta = 120°.', points: 1
    },
    {
        id: 'q_g10_phys_m1_24', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the power delivered by an engine lifting a 400 kg elevator 10 m upward in 5 seconds at constant speed? (g = 10 m/s^2)',
        options: ['8,000 W (8 kW)', '4,000 W', '40,000 W', '2,000 W'],
        correctAnswer: 0, explanation: 'Work = mgh = 400 * 10 * 10 = 40,000 J. Power = Work / time = 40,000 / 5 = 8,000 W.', points: 1
    },
    {
        id: 'q_g10_phys_m1_25', examId: 'exam_23', grade: 'Grade10', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'An object has a momentum of 24 kg*m/s and a kinetic energy of 48 J. What is its mass?',
        options: ['6 kg', '4 kg', '8 kg', '12 kg'],
        correctAnswer: 0, explanation: 'KE = p^2 / (2m) => 48 = (24^2) / (2m) = 576 / (2m) => 96m = 576 => m = 6 kg.', points: 1
    },

    // ==========================================
    // GRADE 10 CHEMISTRY MID 1 (exam_15) - target 25
    // ==========================================
    {
        id: 'q_g10_chem_m1_11', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Which property of carbon allows it to form endless chains and rings of covalent bonds?',
        options: ['Catenation', 'Allotropy', 'Electronegativity', 'Radioactivity'],
        correctAnswer: 0, explanation: 'Catenation is the unique self-linking ability of carbon atoms via strong C-C covalent bonds.', points: 1
    },
    {
        id: 'q_g10_chem_m1_12', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'The bond angles in ethene (C2H4) around each sp2-hybridized carbon atom are approximately:',
        options: ['120 degrees', '109.5 degrees', '180 degrees', '90 degrees'],
        correctAnswer: 0, explanation: 'sp2 hybridization forms a trigonal planar geometry with characteristic 120° bond angles.', points: 1
    },
    {
        id: 'q_g10_chem_m1_13', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the principal component of natural gas (often exceeding 90% by volume)?',
        options: ['Methane (CH4)', 'Propane (C3H8)', 'Butane (C4H10)', 'Ethyne (C2H2)'],
        correctAnswer: 0, explanation: 'Natural gas is predominantly composed of methane (CH4), the simplest saturated alkane.', points: 1
    },
    {
        id: 'q_g10_chem_m1_14', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the IUPAC name of the compound CH3-C(CH3)2-CH3?',
        options: ['2,2-dimethylpropane', 'Neopentane', '2-methylbutane', 'Tetramethylmethane'],
        correctAnswer: 0, explanation: 'The 3-carbon propane chain has two methyl substituents at position 2: 2,2-dimethylpropane.', points: 1
    },
    {
        id: 'q_g10_chem_m1_15', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Fractional distillation of petroleum separates crude oil fractions based on differences in their:',
        options: ['Boiling points', 'Densities', 'Solubility in water', 'Chemical reactivity'],
        correctAnswer: 0, explanation: 'Petroleum fractions vaporize and condense at different vertical tray heights in a fractionating column based on boiling point.', points: 1
    },
    {
        id: 'q_g10_chem_m1_16', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following hydrocarbons burns with the sootiest, most luminous yellow flame due to high carbon content?',
        options: ['Ethyne (C2H2)', 'Methane (CH4)', 'Ethane (C2H6)', 'Propane (C3H8)'],
        correctAnswer: 0, explanation: 'Ethyne has a 1:1 carbon-to-hydrogen ratio; unburned incandescent carbon particles produce heavy soot.', points: 1
    },
    {
        id: 'q_g10_chem_m1_17', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Catalytic cracking in petroleum refining is primarily carried out to:',
        options: [
            'Convert long-chain heavy alkanes into shorter, high-demand gasoline fractions and alkenes',
            'Extract sulfur impurities only',
            'Synthesize coal',
            'Cool down petroleum tanks'
        ],
        correctAnswer: 0, explanation: 'Cracking breaks C-C bonds in heavy gas oils using zeolites to yield volatile gasoline fuels.', points: 1
    },
    {
        id: 'q_g10_chem_m1_18', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the functional group of alkenes?',
        options: ['Carbon-carbon double bond (C=C)', 'Carbon-carbon triple bond', 'Hydroxyl group (-OH)', 'Carbonyl group (>C=O)'],
        correctAnswer: 0, explanation: 'Alkenes are characterized by their localized carbon-carbon double bond (one sigma and one pi bond).', points: 1
    },
    {
        id: 'q_g10_chem_m1_19', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Which gas is commonly used in commercial agriculture to artificially accelerate fruit ripening?',
        options: ['Ethene (ethylene, C2H4)', 'Methane', 'Acetylene', 'Carbon monoxide'],
        correctAnswer: 0, explanation: 'Ethene acts as a natural gaseous plant hormone promoting fruit ripening and leaf abscission.', points: 1
    },
    {
        id: 'q_g10_chem_m1_20', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the general molecular formula of alkynes?',
        options: ['CnH2n-2', 'CnH2n+2', 'CnH2n', 'CnH2n-4'],
        correctAnswer: 0, explanation: 'Alkynes are acyclic unsaturated hydrocarbons containing one C#C triple bond: CnH2n-2.', points: 1
    },
    {
        id: 'q_g10_chem_m1_21', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Reaction of calcium carbide (CaC2) with water produces which gas?',
        options: ['Ethyne (acetylene, C2H2)', 'Methane', 'Ethene', 'Hydrogen gas only'],
        correctAnswer: 0, explanation: 'CaC2 + 2H2O -> Ca(OH)2 + C2H2(g). This is the classic laboratory preparation of acetylene.', points: 1
    },
    {
        id: 'q_g10_chem_m1_22', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Hydrogenation of vegetable oils into solid margarine in the presence of nickel catalyst is an example of:',
        options: ['Catalytic addition reaction across C=C bonds', 'Substitution reaction', 'Polymerization', 'Oxidation'],
        correctAnswer: 0, explanation: 'Hydrogen adds across unsaturated alkene double bonds, converting liquid oils to saturated solid fats.', points: 1
    },
    {
        id: 'q_g10_chem_m1_23', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'In fractional distillation of liquid air, which gas boils off first due to its lower boiling point (-196°C)?',
        options: ['Nitrogen (N2)', 'Oxygen (O2, bp -183°C)', 'Argon (Ar, bp -186°C)', 'Carbon dioxide'],
        correctAnswer: 0, explanation: 'Nitrogen has the lowest boiling point (-196°C) and distills off from liquid air before argon and oxygen.', points: 1
    },
    {
        id: 'q_g10_chem_m1_24', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'The major organic product formed when chlorine reacts with benzene in the presence of FeCl3 catalyst is:',
        options: ['Chlorobenzene', 'Hexachlorocyclohexane', 'Benzyl chloride', 'Phenol'],
        correctAnswer: 0, explanation: 'Electrophilic aromatic substitution of benzene with Cl2/FeCl3 yields chlorobenzene.', points: 1
    },
    {
        id: 'q_g10_chem_m1_25', examId: 'exam_15', grade: 'Grade10', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Which test visually distinguishes terminal alkynes (like ethyne) from internal alkynes?',
        options: [
            'Formation of red precipitate with ammoniacal cuprous chloride Cu2Cl2',
            'Bromine water decolorization',
            'Litmus paper change',
            'Combustion in air'
        ],
        correctAnswer: 0, explanation: 'Terminal alkynes have weakly acidic acetylenic protons that form insoluble copper/silver acetylide precipitates.', points: 1
    },

    // ==========================================
    // GRADE 10 BIOLOGY MID 1 (exam_14) - target 25
    // ==========================================
    {
        id: 'q_g10_bio_m1_11', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which organelle contains hydrolytic digestive enzymes that break down worn-out cell parts and cellular debris?',
        options: ['Lysosome', 'Ribosome', 'Peroxisome', 'Centrosome'],
        correctAnswer: 0, explanation: 'Lysosomes are acid hydrolase-containing vesicles acting as the cellular digestive and recycling system.', points: 1
    },
    {
        id: 'q_g10_bio_m1_12', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'In cell membranes, the fluid mosaic model proposes that:',
        options: [
            'Proteins float within a fluid phospholipid bilayer matrix',
            'Proteins form a rigid solid outer shell',
            'Membranes consist exclusively of nucleic acids',
            'Carbohydrates form the central fluid core'
        ],
        correctAnswer: 0, explanation: 'Singer and Nicolson\'s model depicts integral proteins embedded in a laterally mobile fluid lipid bilayer.', points: 1
    },
    {
        id: 'q_g10_bio_m1_13', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Active transport differs from passive transport because active transport:',
        options: [
            'Requires metabolic energy (ATP) to move solutes against their concentration gradient',
            'Does not involve membrane transport proteins',
            'Occurs only in dead cells',
            'Always moves water along its concentration gradient'
        ],
        correctAnswer: 0, explanation: 'Active transport pumps solutes "uphill" from low to high concentration using ATP hydrolysis.', points: 1
    },
    {
        id: 'q_g10_bio_m1_14', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What is cytokinesis in cell biology?',
        options: [
            'The division of cytoplasm following nuclear division (karyokinesis)',
            'The condensation of chromatin into chromosomes',
            'The synthesis of nuclear membrane',
            'The duplication of centrioles'
        ],
        correctAnswer: 0, explanation: 'Cytokinesis physically splits the parent cell into two daughter cells via a cleavage furrow (animals) or cell plate (plants).', points: 1
    },
    {
        id: 'q_g10_bio_m1_15', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which lens system in a compound light microscope is positioned closest to the specimen slide?',
        options: ['Objective lens', 'Ocular (eyepiece) lens', 'Condenser lens', 'Iris diaphragm'],
        correctAnswer: 0, explanation: 'The objective lens (mounted on the revolving nosepiece) sits directly above the specimen stage.', points: 1
    },
    {
        id: 'q_g10_bio_m1_16', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'If an eyepiece has a magnification of 10x and the high-power objective is 40x, what is the total magnification?',
        options: ['400x', '50x', '40x', '140x'],
        correctAnswer: 0, explanation: 'Total Magnification = Eyepiece Magnification * Objective Magnification = 10 * 40 = 400x.', points: 1
    },
    {
        id: 'q_g10_bio_m1_17', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'During which mitotic stage do chromosomes align along the equatorial plane of the cell?',
        options: ['Metaphase', 'Anaphase', 'Prophase', 'Telophase'],
        correctAnswer: 0, explanation: 'During metaphase, spindle fibers maneuver condensed sister chromatids onto the central metaphase plate.', points: 1
    },
    {
        id: 'q_g10_bio_m1_18', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the nuclear condition of human somatic cells compared to mature gametes (sperm/egg)?',
        options: ['Somatic cells are diploid (2n = 46), gametes are haploid (n = 23)', 'Both are diploid', 'Both are haploid', 'Somatic cells are tetraploid'],
        correctAnswer: 0, explanation: 'Body cells contain 23 homologous pairs (46 chromosomes), while meiotically produced sex cells contain 23 unpaired chromosomes.', points: 1
    },
    {
        id: 'q_g10_bio_m1_19', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which organelle synthesizes steroid hormones and detoxifies foreign chemical drugs in liver hepatocytes?',
        options: ['Smooth Endoplasmic Reticulum (SER)', 'Rough Endoplasmic Reticulum (RER)', 'Lysosome', 'Nucleolus'],
        correctAnswer: 0, explanation: 'Smooth ER lacks ribosomes and specializes in lipid synthesis, steroid metabolism, and drug biotransformation.', points: 1
    },
    {
        id: 'q_g10_bio_m1_20', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Plasmolysis in plant cells occurs when the cell is immersed in a:',
        options: ['Hypertonic solution', 'Hypotonic solution', 'Isotonic solution', 'Distilled water'],
        correctAnswer: 0, explanation: 'Water exits the central vacuole into the hypertonic external solution, pulling the protoplast away from the rigid cell wall.', points: 1
    },
    {
        id: 'q_g10_bio_m1_21', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which scientist formulated the cell theory stating that all new cells originate from pre-existing cells ("Omnis cellula e cellula")?',
        options: ['Rudolf Virchow', 'Robert Hooke', 'Anton van Leeuwenhoek', 'Louis Pasteur'],
        correctAnswer: 0, explanation: 'Virchow completed the classical cell theory in 1855 by establishing that cells arise exclusively from cell division.', points: 1
    },
    {
        id: 'q_g10_bio_m1_22', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Centrioles are cellular structures involved in:',
        options: [
            'Organizing microtubule spindle fibers during animal cell division',
            'Synthesizing starch granules',
            'Conducting photosynthesis',
            'Pumping sodium ions'
        ],
        correctAnswer: 0, explanation: 'Centrioles form the centrosome organizing center for mitotic spindle assembly in animal cells.', points: 1
    },
    {
        id: 'q_g10_bio_m1_23', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which cellular process engulfs large solid particles or whole bacteria by extending pseudopodia?',
        options: ['Phagocytosis ("cellular eating")', 'Pinocytosis ("cellular drinking")', 'Exocytosis', 'Osmosis'],
        correctAnswer: 0, explanation: 'Phagocytosis is a specialized endocytic mechanism where macrophages and amoebae ingest solid microorganisms.', points: 1
    },
    {
        id: 'q_g10_bio_m1_24', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'The circular region of dense RNA and protein inside the nucleus where ribosomal subunits are assembled is the:',
        options: ['Nucleolus', 'Nuclear pore', 'Chromatin granule', 'Nuclear lamina'],
        correctAnswer: 0, explanation: 'The nucleolus transcribes rRNA and couples it with ribosomal proteins to synthesize nascent ribosome subunits.', points: 1
    },
    {
        id: 'q_g10_bio_m1_25', examId: 'exam_14', grade: 'Grade10', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Uncontrolled mitotic cell division resulting from mutations in cell cycle checkpoint genes leads to:',
        options: ['Cancer (tumor formation)', 'Apoptosis', 'Tissue regeneration', 'Cellular differentiation'],
        correctAnswer: 0, explanation: 'Defects in proto-oncogenes and tumor-suppressor genes cause unregulated cellular proliferation leading to neoplasms.', points: 1
    },

    // ==========================================
    // GRADE 10 ENGLISH MID 1 (exam_18) - target 22
    // ==========================================
    {
        id: 'q_g10_eng_m1_08', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct first conditional form: "If it ______ this afternoon, we will postpone the soccer match."',
        options: ['rains', 'will rain', 'rained', 'would rain'],
        correctAnswer: 0, explanation: 'First conditional structure: If + present simple (rains), will + base verb (will postpone).', points: 1
    },
    {
        id: 'q_g10_eng_m1_09', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct second conditional form: "If I ______ you, I would consult the school academic advisor."',
        options: ['were', 'am', 'was been', 'would be'],
        correctAnswer: 0, explanation: 'Hypothetical second conditionals use "were" for all subject persons in formal English.', points: 1
    },
    {
        id: 'q_g10_eng_m1_10', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the passive voice sentence:',
        options: [
            'Past exam papers are reviewed by thousands of Ethiopian secondary students.',
            'Ethiopian students review past exam papers daily.',
            'The teachers prepare model examinations.',
            'Everyone downloaded the application package.'
        ],
        correctAnswer: 0, explanation: 'The object receives the action: "are reviewed by..." is present simple passive.', points: 1
    },
    {
        id: 'q_g10_eng_m1_11', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Select the correct question tag: "She has completed her chemistry revision, ______?"',
        options: ['hasn\'t she', 'didn\'t she', 'doesn\'t she', 'isn\'t she'],
        correctAnswer: 0, explanation: 'Positive statement with auxiliary "has" takes a negative tag with the matching auxiliary: "hasn\'t she?".', points: 1
    },
    {
        id: 'q_g10_eng_m1_12', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct preposition: "Kidist is exceptionally good ______ solving complex physics problems."',
        options: ['at', 'in', 'with', 'for'],
        correctAnswer: 0, explanation: 'The standard adjective collocation is "good at" doing an activity.', points: 1
    },
    {
        id: 'q_g10_eng_m1_13', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Select the word that means "having the ability to speak two languages fluently":',
        options: ['Bilingual', 'Monolingual', 'Multilateral', 'Bi-monthly'],
        correctAnswer: 0, explanation: 'The prefix "bi-" means two; "bilingual" describes someone fluent in two languages.', points: 1
    },
    {
        id: 'q_g10_eng_m1_14', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Complete: "The higher you climb up Mount Entoto, ______ the air becomes."',
        options: ['the colder', 'colder', 'more cold', 'the coldest'],
        correctAnswer: 0, explanation: 'Double comparative structure: "The + comparative..., the + comparative...".', points: 1
    },
    {
        id: 'q_g10_eng_m1_15', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the antonym of the word "voluntary":',
        options: ['Compulsory', 'Willing', 'Optional', 'Charitable'],
        correctAnswer: 0, explanation: '"Voluntary" means done by choice; its opposite is "compulsory" or mandatory.', points: 1
    },
    {
        id: 'q_g10_eng_m1_16', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Which sentence uses commas correctly in a direct quotation?',
        options: [
            '"Past exam papers help build confidence," the teacher remarked.',
            '"Past exam papers help build confidence" the teacher remarked.',
            '"Past exam papers help build confidence", the teacher remarked.',
            '"Past exam papers help build confidence." The teacher remarked.'
        ],
        correctAnswer: 0, explanation: 'The comma belongs inside the closing quotation marks before the attribution tag.', points: 1
    },
    {
        id: 'q_g10_eng_m1_17', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the conjunction showing contrast:',
        options: ['However', 'Therefore', 'Furthermore', 'Consequently'],
        correctAnswer: 0, explanation: '"However" marks contrast or opposition between two statements.', points: 1
    },
    {
        id: 'q_g10_eng_m1_18', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Complete the sentence: "I look forward to ______ you at the science fair."',
        options: ['meeting', 'meet', 'met', 'have met'],
        correctAnswer: 0, explanation: 'In "look forward to", "to" is a preposition requiring a following gerund (-ing form: meeting).', points: 1
    },
    {
        id: 'q_g10_eng_m1_19', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct modal of deduction: "The lights are off and the gate is locked; they ______ be at home."',
        options: ['can\'t', 'must', 'should', 'might'],
        correctAnswer: 0, explanation: '"Can\'t" expresses negative logical certainty based on clear observed evidence.', points: 1
    },
    {
        id: 'q_g10_eng_m1_20', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Select the synonym for "diligent":',
        options: ['Hardworking', 'Indolent', 'Careless', 'Arrogant'],
        correctAnswer: 0, explanation: '"Diligent" means showing persistent effort and careful conscientiousness (hardworking).', points: 1
    },
    {
        id: 'q_g10_eng_m1_21', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the main topic sentence of a well-organized body paragraph in an essay?',
        options: [
            'The sentence that introduces the main idea and controlling focus of that paragraph',
            'The final closing quotation',
            'A random statistical calculation',
            'A transitional heading'
        ],
        correctAnswer: 0, explanation: 'A topic sentence states the primary argument that the remainder of the paragraph supports.', points: 1
    },
    {
        id: 'q_g10_eng_m1_22', examId: 'exam_18', grade: 'Grade10', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct indirect speech: She asked, "Where is the library located?"',
        options: [
            'She asked where the library was located.',
            'She asked where was the library located.',
            'She asked where is the library located.',
            'She asked that the library was located where.'
        ],
        correctAnswer: 0, explanation: 'Embedded questions adopt affirmative word order (subject + verb: "where the library was located").', points: 1
    },

    // ==========================================
    // GRADE 10 HISTORY MID 1 (exam_20) - target 22
    // ==========================================
    {
        id: 'q_g10_hist_m1_08', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'Who was the renowned Renaissance artist who painted the Mona Lisa and The Last Supper?',
        options: ['Leonardo da Vinci', 'Michelangelo Buonarroti', 'Raphael Sanzio', 'Donatello'],
        correctAnswer: 0, explanation: 'Leonardo da Vinci is celebrated as the archetypal Renaissance polymath and painter of the Mona Lisa.', points: 1
    },
    {
        id: 'q_g10_hist_m1_09', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'The invention of the movable-type printing press around 1440 in Mainz, Germany, is credited to:',
        options: ['Johannes Gutenberg', 'Martin Luther', 'Desiderius Erasmus', 'Francis Bacon'],
        correctAnswer: 0, explanation: 'Gutenberg revolutionized knowledge dissemination across Europe by mechanizing printing with movable metal type.', points: 1
    },
    {
        id: 'q_g10_hist_m1_10', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'Which Ethiopian emperor established the permanent imperial capital city of Gondar in 1636?',
        options: ['Emperor Fasilides', 'Emperor Susenyos', 'Emperor Iyasu I', 'Emperor Bakaffa'],
        correctAnswer: 0, explanation: 'Emperor Fasilides founded Gondar in 1636, ending the era of mobile roving imperial tent capitals.', points: 1
    },
    {
        id: 'q_g10_hist_m1_11', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'Emperor Susenyos declared Catholicism the official state religion of Ethiopia in 1622 under the influence of which Jesuit patriarch?',
        options: ['Afonso Mendes', 'Pedro Páez', 'Francisco Álvares', 'Ignatius Loyola'],
        correctAnswer: 0, explanation: 'Patriarch Afonso Mendes aggressively enforced Latin liturgical practices, sparking widespread rebellion until Fasilides expelled the Jesuits.', points: 1
    },
    {
        id: 'q_g10_hist_m1_12', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'The Ottoman Empire supported the Adal Sultanate during the 16th-century wars primarily by supplying:',
        options: [
            'Firearms, cannon artillery, and Ottoman Turkish musketeers',
            'Naval wooden galleys for Lake Tana',
            'Horses from Arabia exclusively',
            'Grain and agricultural seeds'
        ],
        correctAnswer: 0, explanation: 'Ottoman firearms and mercenaries provided technical tactical superiority to Imam Ahmad\'s army.', points: 1
    },
    {
        id: 'q_g10_hist_m1_13', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'In the Gadaa system, how many years does each age-set generation class stay in a single grade stage?',
        options: ['8 years', '5 years', '10 years', '12 years'],
        correctAnswer: 0, explanation: 'The Gadaa system transitions every 8 years through 5 distinct 8-year cycles (totaling a 40-year generational cycle).', points: 1
    },
    {
        id: 'q_g10_hist_m1_14', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'The spiritual leader and ritual mediator of traditional Oromo society is the:',
        options: ['Qallu', 'Abba Gadaa', 'Abba Dula', 'Chafe'],
        correctAnswer: 0, explanation: 'The Qallu is the sacred hereditary spiritual leader maintaining equilibrium between Waaqa (God) and human society.', points: 1
    },
    {
        id: 'q_g10_hist_m1_15', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'Which Spanish explorer circumnavigated the globe between 1519 and 1522 (completed by Juan Sebastián Elcano)?',
        options: ['Ferdinand Magellan', 'Hernán Cortés', 'Francisco Pizarro', 'Christopher Columbus'],
        correctAnswer: 0, explanation: 'Magellan\'s Spanish expedition sailed west across the Pacific, successfully proving the continuous spherical ocean routes.', points: 1
    },
    {
        id: 'q_g10_hist_m1_16', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'The great stone castle "Fasil Ghebbi" was constructed during which period of Ethiopian history?',
        options: ['Gondarine period', 'Aksumite period', 'Zagwe period', 'Zemene Mesafint'],
        correctAnswer: 0, explanation: 'Fasil Ghebbi (Royal Enclosure) in Gondar was built during the 17th-century Gondarine golden age.', points: 1
    },
    {
        id: 'q_g10_hist_m1_17', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'What historical event ended the Christian-Adal conflict in 1543?',
        options: [
            'The death of Imam Ahmad Gragn at the Battle of Wayna Daga',
            'The Treaty of Gondar',
            'The arrival of the British army',
            'The coronation of Emperor Fasilides'
        ],
        correctAnswer: 0, explanation: 'Emperor Gelawdewos\' combined Ethiopian-Portuguese forces routed Adal troops and killed Imam Ahmad at Wayna Daga.', points: 1
    },
    {
        id: 'q_g10_hist_m1_18', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'The Polish astronomer who proposed the heliocentric model (placing the Sun at the center of the solar system) was:',
        options: ['Nicolaus Copernicus', 'Galileo Galilei', 'Johannes Kepler', 'Isaac Newton'],
        correctAnswer: 0, explanation: 'Copernicus published "De revolutionibus orbium coelestium" in 1543, initiating the scientific revolution.', points: 1
    },
    {
        id: 'q_g10_hist_m1_19', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'Which military commander of the Gadaa system is elected to command armed defensive and offensive operations?',
        options: ['Abba Dula', 'Abba Gadaa', 'Abba Sera', 'Qallu'],
        correctAnswer: 0, explanation: 'The Abba Dula (Father of War) was the supreme elected military commander of the Gadaa cohort.', points: 1
    },
    {
        id: 'q_g10_hist_m1_20', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'Who was the empress of Emperor Lebna Dengel who appealed to the King of Portugal for military assistance in 1535?',
        options: ['Empress Seble Wongel', 'Empress Mentewab', 'Empress Taytu Betul', 'Empress Zewditu'],
        correctAnswer: 0, explanation: 'Empress Seble Wongel played a heroic leadership role, rallying resistance and receiving the Portuguese relief expedition.', points: 1
    },
    {
        id: 'q_g10_hist_m1_21', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'The council of European Catholic bishops that launched the Catholic Counter-Reformation (1545–1563) was the:',
        options: ['Council of Trent', 'Council of Nicaea', 'Council of Chalcedon', 'First Vatican Council'],
        correctAnswer: 0, explanation: 'The Council of Trent clarified Catholic dogma, reformed clerical discipline, and established Jesuit teaching missions.', points: 1
    },
    {
        id: 'q_g10_hist_m1_22', examId: 'exam_20', grade: 'Grade10', subject: 'History', semester: 'Semester1', examType: 'Mid1',
        question: 'What term designates the historical period of political fragmentation in Ethiopia from 1769 to 1855?',
        options: ['Zemene Mesafint (Era of the Princes)', 'Gondarine Era', 'Medieval Golden Age', 'Zagwe Renaissance'],
        correctAnswer: 0, explanation: 'The Zemene Mesafint was marked by regional warlords (Rases) holding real political power over puppet Gondar monarchs.', points: 1
    },

    // ==========================================
    // GRADE 10 GEOGRAPHY MID 1 (exam_19) - target 21
    // ==========================================
    {
        id: 'q_g10_geog_m1_07', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'The longitudinal location of Ethiopia spans approximately:',
        options: ['33°E to 48°E', '10°W to 20°E', '40°E to 60°E', '0° to 15°E'],
        correctAnswer: 0, explanation: 'Ethiopia is situated between 33°E (western border near Akobo) and 48°E longitude (eastern tip near Ogaden).', points: 1
    },
    {
        id: 'q_g10_geog_m1_08', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is the highest mountain peak in Ethiopia at 4,550 meters above sea level?',
        options: ['Ras Dejen (Simien Mountains)', 'Mount Batu (Bale Mountains)', 'Mount Guna', 'Mount Choke'],
        correctAnswer: 0, explanation: 'Ras Dejen in the Simien Mountain National Park is the highest geographical elevation point in Ethiopia.', points: 1
    },
    {
        id: 'q_g10_geog_m1_09', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the Danakil (Afar) Depression famous for in African physical geography?',
        options: [
            'Being one of the lowest and hottest places on Earth (at ~125 meters below sea level)',
            'Being the highest plateau in Africa',
            'Having the longest tropical river',
            'Containing glacier ice fields'
        ],
        correctAnswer: 0, explanation: 'The Kobar Sink in the Danakil Depression drops to ~125 m below sea level with extreme geothermal volcanic activity.', points: 1
    },
    {
        id: 'q_g10_geog_m1_10', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'On a map with a scale of 1 : 50,000, what actual ground distance is represented by 4 cm on the map?',
        options: ['2 km', '20 km', '0.2 km', '200 km'],
        correctAnswer: 0, explanation: 'Ground distance = 4 cm * 50,000 = 200,000 cm = 2,000 meters = 2 km.', points: 1
    },
    {
        id: 'q_g10_geog_m1_11', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the vertical difference in elevation between two successive contour lines on a topographic map called?',
        options: ['Contour interval', 'Horizontal equivalent', 'Gradient', 'Grid index'],
        correctAnswer: 0, explanation: 'The contour interval is the constant vertical altitude step chosen for a specific topographic sheet.', points: 1
    },
    {
        id: 'q_g10_geog_m1_12', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'During which geological era was crystalline basement complex rock (granites and schists) formed in Ethiopia?',
        options: ['Precambrian Era', 'Paleozoic Era', 'Mesozoic Era', 'Cenozoic Era'],
        correctAnswer: 0, explanation: 'Precambrian igneous and metamorphic rocks form the ancient continental basement foundation of the Horn.', points: 1
    },
    {
        id: 'q_g10_geog_m1_13', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'The Mesozoic Era in the Horn of Africa was predominantly characterized by:',
        options: [
            'Marine transgression and regression depositing limestone, sandstone, and shale',
            'Major volcanic trap series basalt flooding',
            'Extensive mountain building (orogeny)',
            'Continental glaciations'
        ],
        correctAnswer: 0, explanation: 'Incursion of the Indian Ocean in the Mesozoic deposited Adigrat sandstone, Antalo limestone, and Upper sandstone.', points: 1
    },
    {
        id: 'q_g10_geog_m1_14', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'Which Ethiopian river basin flows westward across Sudan to join the White Nile, contributing over 80% of Nile waters at Khartoum?',
        options: ['Abay (Blue Nile)', 'Awash River', 'Wabe Shebelle', 'Omo River'],
        correctAnswer: 0, explanation: 'The Abay River originating from Lake Tana provides the vast majority of water and fertile silt to the main Nile.', points: 1
    },
    {
        id: 'q_g10_geog_m1_15', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'The traditional Ethiopian agro-climatic altitude zone situated between 2,300 m and 3,300 m above sea level is called:',
        options: ['Dega (Cool temperate highland)', 'Woina Dega (Subtropical)', 'Kolla (Warm lowlands)', 'Bereha (Hot arid desert)'],
        correctAnswer: 0, explanation: 'Dega zones (2,300–3,300 m) experience cool temperatures suitable for barley, wheat, and pulses.', points: 1
    },
    {
        id: 'q_g10_geog_m1_16', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'What type of drainage pattern resembles the branching limbs of an oak tree, typical of uniform geological strata?',
        options: ['Dendritic drainage pattern', 'Radial drainage pattern', 'Trellis drainage pattern', 'Centripetal drainage pattern'],
        correctAnswer: 0, explanation: 'Dendritic patterns (from Greek dendron = tree) develop on homogeneous rocks with uniform resistance.', points: 1
    },
    {
        id: 'q_g10_geog_m1_17', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'Which rift valley lake in Ethiopia has no surface river outlet and terminates inside a closed endorheic basin?',
        options: ['Lake Abiyata and Lake Shala', 'Lake Tana', 'Lake Victoria', 'Lake Albert'],
        correctAnswer: 0, explanation: 'Lakes in the central and southern Ethiopian Rift Valley are closed hydrological sinks with high mineral alkalinity.', points: 1
    },
    {
        id: 'q_g10_geog_m1_18', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'The bearing of an object measured directly south-east corresponds to an azimuth of:',
        options: ['135 degrees', '45 degrees', '225 degrees', '315 degrees'],
        correctAnswer: 0, explanation: 'Whole circle bearings measure clockwise from North: North = 0°, East = 90°, South-East = 135°.', points: 1
    },
    {
        id: 'q_g10_geog_m1_19', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'Which instrument is traditionally used to measure atmospheric air pressure?',
        options: ['Barometer', 'Anemometer', 'Hygrometer', 'Thermometer'],
        correctAnswer: 0, explanation: 'Barometers measure atmospheric barometric pressure in millibars (hPa) or millimeters of mercury.', points: 1
    },
    {
        id: 'q_g10_geog_m1_20', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the largest national regional state in Ethiopia by land area?',
        options: ['Oromia Region', 'Amhara Region', 'Somali Region', 'Tigray Region'],
        correctAnswer: 0, explanation: 'Oromia is the largest region by territorial expanse, covering over 284,000 square kilometers.', points: 1
    },
    {
        id: 'q_g10_geog_m1_21', examId: 'exam_19', grade: 'Grade10', subject: 'Geography', semester: 'Semester1', examType: 'Mid1',
        question: 'What type of map projection preserves conformal shape over large continental areas but distorts polar area sizes?',
        options: ['Mercator projection', 'Peters equal-area projection', 'Mollweide projection', 'Gnomonic projection'],
        correctAnswer: 0, explanation: 'The Mercator cylindrical projection preserves rhumb-line navigational angles while exaggerating landmass sizes near poles.', points: 1
    },

    // ==========================================
    // GRADE 10 ECONOMICS MID 1 (exam_17) - target 21
    // ==========================================
    {
        id: 'q_g10_econ_m1_07', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'What are the four primary factors of production in economic theory?',
        options: [
            'Land, Labor, Capital, and Entrepreneurship',
            'Money, Gold, Stocks, and Bonds',
            'Factories, Machinery, Trucks, and Fuel',
            'Government, Taxes, Banks, and Consumers'
        ],
        correctAnswer: 0, explanation: 'Economic inputs comprise natural resources (land), human effort (labor), manufactured tools (capital), and organizing innovation (entrepreneurship).', points: 1
    },
    {
        id: 'q_g10_econ_m1_08', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which economic system relies primarily on custom, culture, and ancestral heritage to answer the fundamental questions of what, how, and for whom to produce?',
        options: ['Traditional economy', 'Command (socialist) economy', 'Market (capitalist) economy', 'Mixed economy'],
        correctAnswer: 0, explanation: 'A traditional economy organizes resource allocation around ancestral customs and subsistence traditions.', points: 1
    },
    {
        id: 'q_g10_econ_m1_09', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'Microeconomics focuses on:',
        options: [
            'Individual consumers, households, and single business firms',
            'National inflation and gross domestic product (GDP)',
            'Aggregate national unemployment rates',
            'Monetary policy of the central bank'
        ],
        correctAnswer: 0, explanation: 'Microeconomics analyzes decision-making at the micro level (individual market equilibrium, price mechanisms).', points: 1
    },
    {
        id: 'q_g10_econ_m1_10', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'When the price of tea rises, consumers purchase more coffee. This demonstrates that coffee and tea are:',
        options: ['Substitute goods', 'Complementary goods', 'Inferior goods', 'Giffen goods'],
        correctAnswer: 0, explanation: 'Substitutes have positive cross-price elasticity: an increase in the price of one good raises demand for the replacement good.', points: 1
    },
    {
        id: 'q_g10_econ_m1_11', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'What happens to the market demand curve for a normal good when consumer household incomes rise?',
        options: [
            'The entire demand curve shifts rightward',
            'The demand curve shifts leftward',
            'There is movement down along the existing curve',
            'Supply drops to zero'
        ],
        correctAnswer: 0, explanation: 'For normal goods, higher disposable income increases willingness and ability to buy at every price point (rightward shift).', points: 1
    },
    {
        id: 'q_g10_econ_m1_12', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'If quantity demanded changes by 20% in response to a 10% change in price, what is the price elasticity of demand (Ped)?',
        options: ['2.0 (Elastic demand)', '0.5 (Inelastic demand)', '1.0 (Unitary)', '0.0'],
        correctAnswer: 0, explanation: 'Ped = % Delta Qd / % Delta P = 20% / 10% = 2.0. Since |Ped| > 1, demand is price elastic.', points: 1
    },
    {
        id: 'q_g10_econ_m1_13', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'The Law of Diminishing Marginal Utility states that:',
        options: [
            'As an individual consumes more units of a good, the additional satisfaction derived from each successive unit decreases',
            'Total satisfaction eventually becomes infinite',
            'Prices always decline over time',
            'Production costs rise continuously'
        ],
        correctAnswer: 0, explanation: 'Each extra unit consumed yields smaller incremental utility than the preceding unit.', points: 1
    },
    {
        id: 'q_g10_econ_m1_14', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'What occurs in a competitive market if the government imposes a legal maximum price (price ceiling) below equilibrium?',
        options: ['A persistent market shortage (excess demand)', 'A market surplus (excess supply)', 'Increased equilibrium price', 'Zero consumer demand'],
        correctAnswer: 0, explanation: 'Price ceilings below market clearing price cause quantity demanded to exceed quantity supplied, creating shortages.', points: 1
    },
    {
        id: 'q_g10_econ_m1_15', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'The reward or payment to the factor of production "Capital" is termed:',
        options: ['Interest', 'Rent', 'Wages', 'Profit'],
        correctAnswer: 0, explanation: 'Factor payments: Land receives Rent, Labor receives Wages, Capital receives Interest, and Entrepreneurship receives Profit.', points: 1
    },
    {
        id: 'q_g10_econ_m1_16', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'A market structure characterized by a single seller producing a unique product with impossible barriers to entry is a:',
        options: ['Monopoly', 'Perfect competition', 'Oligopoly', 'Monopolistic competition'],
        correctAnswer: 0, explanation: 'A pure monopoly has 100% market power without viable close substitutes protected by high barriers to entry.', points: 1
    },
    {
        id: 'q_g10_econ_m1_17', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following causes an outward shift (expansion) of the Production Possibility Curve (PPC)?',
        options: [
            'Technological innovation and an increase in productive resources',
            'High unemployment',
            'Depletion of mineral reserves',
            'Decreased labor training'
        ],
        correctAnswer: 0, explanation: 'Economic growth resulting from technological advances or expanded labor/capital shifts potential PPC frontier outward.', points: 1
    },
    {
        id: 'q_g10_econ_m1_18', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'Goods for which demand decreases when consumer income rises are known as:',
        options: ['Inferior goods', 'Normal goods', 'Luxury goods', 'Capital goods'],
        correctAnswer: 0, explanation: 'Inferior goods have negative income elasticity; consumers switch to superior quality goods as income grows.', points: 1
    },
    {
        id: 'q_g10_econ_m1_19', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the slope of a typical supply curve?',
        options: ['Upward-sloping (positive slope)', 'Downward-sloping (negative slope)', 'Horizontal (zero slope)', 'Vertical (infinite slope)'],
        correctAnswer: 0, explanation: 'By the Law of Supply, higher prices incentivize suppliers to bring greater quantities to market (positive slope).', points: 1
    },
    {
        id: 'q_g10_econ_m1_20', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'The financial difference between the maximum price a consumer is willing to pay and the actual market price paid is called:',
        options: ['Consumer surplus', 'Producer surplus', 'Deadweight loss', 'Economic profit'],
        correctAnswer: 0, explanation: 'Consumer surplus represents the net economic welfare gain enjoyed by buyers paying less than their reservation price.', points: 1
    },
    {
        id: 'q_g10_econ_m1_21', examId: 'exam_17', grade: 'Grade10', subject: 'Economics', semester: 'Semester1', examType: 'Mid1',
        question: 'In a command economy, economic production decisions are primarily directed by:',
        options: ['The central government authority', 'Decentralized private price mechanisms', 'Tribal elders', 'Foreign investors exclusively'],
        correctAnswer: 0, explanation: 'Command socialist systems utilize centralized governmental planning committees to determine resource allocation.', points: 1
    },

    // ==========================================
    // GRADE 10 IT MID 1 (exam_21) - target 20
    // ==========================================
    {
        id: 'q_g10_it_m1_06', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which computer component synchronizes all internal operations using periodic electrical clock pulses?',
        options: ['System Clock', 'Hard Disk Drive', 'Graphics Processing Unit', 'Network Switch'],
        correctAnswer: 0, explanation: 'The system clock emits crystal oscillations measured in Gigahertz (GHz) synchronizing CPU execution cycles.', points: 1
    },
    {
        id: 'q_g10_it_m1_07', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'How many bytes are in exactly one Kilobyte (KB) in binary computing (IEC standard)?',
        options: ['1,024 bytes', '1,000 bytes', '512 bytes', '2,048 bytes'],
        correctAnswer: 0, explanation: 'In digital binary architecture: 2^10 = 1,024 bytes = 1 KiB.', points: 1
    },
    {
        id: 'q_g10_it_m1_08', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which type of computer software coordinates hardware operations and provides a platform for application programs?',
        options: ['System Software (Operating System)', 'Application Software', 'Utility Software', 'Firmware only'],
        correctAnswer: 0, explanation: 'Operating systems (Windows, Linux, Android) are system software managing hardware abstractions for apps.', points: 1
    },
    {
        id: 'q_g10_it_m1_09', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which network covers a small localized geographic area such as a school laboratory or office building?',
        options: ['Local Area Network (LAN)', 'Wide Area Network (WAN)', 'Metropolitan Area Network (MAN)', 'Personal Area Network (PAN)'],
        correctAnswer: 0, explanation: 'LANs interconnect local computers within short physical distances without requiring leased telecommunication lines.', points: 1
    },
    {
        id: 'q_g10_it_m1_10', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the function of the BIOS (Basic Input/Output System) chip during computer startup?',
        options: [
            'Executes the Power-On Self-Test (POST) and loads the operating system kernel into RAM',
            'Connects to the Wi-Fi router automatically',
            'Formats infected hard drives',
            'Runs spreadsheet calculations'
        ],
        correctAnswer: 0, explanation: 'BIOS firmware in ROM initializes hardware components during POST before booting the main OS.', points: 1
    },
    {
        id: 'q_g10_it_m1_11', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which transmission medium uses pulses of light transmitted through glass cores to transfer data at the speed of light?',
        options: ['Fiber optic cable', 'Coaxial cable', 'Shielded twisted pair', 'Copper telephone wire'],
        correctAnswer: 0, explanation: 'Optical fiber utilizes total internal reflection of laser light pulses, offering massive bandwidth immunity to EMI.', points: 1
    },
    {
        id: 'q_g10_it_m1_12', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is phishing in information security?',
        options: [
            'A fraudulent attempt to steal sensitive passwords and financial data by impersonating trustworthy entities in emails or websites',
            'Searching for files in Windows Explorer',
            'Catching optical cable signals with radio',
            'Backing up database tables to flash drives'
        ],
        correctAnswer: 0, explanation: 'Phishing tricks human users into revealing confidential credentials through spoofed deceptive communications.', points: 1
    },
    {
        id: 'q_g10_it_m1_13', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which printer technology sprays microscopic droplets of liquid ink onto paper to produce high-resolution color documents?',
        options: ['Inkjet printer', 'Laser printer', 'Dot matrix printer', 'Thermal printer'],
        correctAnswer: 0, explanation: 'Inkjet printers propel piezo-electric ink droplets, ideal for color prints and home/office documents.', points: 1
    },
    {
        id: 'q_g10_it_m1_14', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is open-source software?',
        options: [
            'Software whose source code is freely available for inspection, modification, and redistribution (e.g. Linux)',
            'Software that requires commercial paid licenses only',
            'Software that only works without an internet connection',
            'Software that expires after 30 days'
        ],
        correctAnswer: 0, explanation: 'Open-source software grants users rights to view, enhance, and share underlying programming code.', points: 1
    },
    {
        id: 'q_g10_it_m1_15', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What does the acronym GUI stand for in operating systems?',
        options: ['Graphical User Interface', 'General Universal Instruction', 'Global Unit Interconnect', 'Geographic User Index'],
        correctAnswer: 0, explanation: 'A GUI provides graphical elements (windows, icons, buttons) manipulated with a mouse or touch.', points: 1
    },
    {
        id: 'q_g10_it_m1_16', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which port interface is the modern universal standard for connecting peripherals, keyboards, mice, and flash drives?',
        options: ['USB (Universal Serial Bus)', 'VGA port', 'Parallel LPT port', 'Serial RS-232 port'],
        correctAnswer: 0, explanation: 'USB replaced legacy serial and parallel ports for plug-and-play peripheral connectivity.', points: 1
    },
    {
        id: 'q_g10_it_m1_17', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is an example of an input device?',
        options: ['Scanner and Optical Barcode Reader', 'LCD Monitor', 'Laser Printer', 'Audio Speakers'],
        correctAnswer: 0, explanation: 'Scanners digitize physical paper documents and feed data into the computer system (input).', points: 1
    },
    {
        id: 'q_g10_it_m1_18', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the primary function of an Uninterruptible Power Supply (UPS)?',
        options: [
            'Provides immediate battery backup power during mains power failure to prevent sudden data loss',
            'Increases computer CPU processing speed',
            'Supplies high-speed internet data',
            'Cools down motherboard components'
        ],
        correctAnswer: 0, explanation: 'A UPS protects electronics from surges and provides emergency battery runtime during power cuts.', points: 1
    },
    {
        id: 'q_g10_it_m1_19', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'In computer networking, which device modulates digital computer signals into analog frequencies for telephone line transmission?',
        options: ['Modem (Modulator-Demodulator)', 'Hub', 'Repeater', 'Bridge'],
        correctAnswer: 0, explanation: 'A Modem converts digital computer signals to analog and vice-versa across telecom transmission lines.', points: 1
    },
    {
        id: 'q_g10_it_m1_20', examId: 'exam_21', grade: 'Grade10', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is cloud storage (such as Google Drive or OneDrive)?',
        options: [
            'Saving digital files on remote online servers accessible over the internet rather than local hard drives',
            'Storing data inside storm clouds with radio waves',
            'Backing up files to DVD discs',
            'Printing files to paper archives'
        ],
        correctAnswer: 0, explanation: 'Cloud storage maintains data on distributed remote data centers accessible anywhere via web connections.', points: 1
    },

    // ==========================================
    // GRADE 10 CITIZENSHIP MID 1 (exam_16) - target 20
    // ==========================================
    {
        id: 'q_g10_cit_m1_05', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'Which principle of democratic governance ensures that no branch of government becomes tyrannical by balancing their powers?',
        options: ['Separation of powers with checks and balances', 'Authoritarian centralism', 'Military supremacy', 'Decree rule'],
        correctAnswer: 0, explanation: 'Separating legislative, executive, and judicial functions prevents concentration and abuse of power.', points: 1
    },
    {
        id: 'q_g10_cit_m1_06', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'The supreme law of the land that overrides all subsidiary statutes and regulations is the:',
        options: ['Constitution', 'Civil code', 'Administrative directive', 'Police manual'],
        correctAnswer: 0, explanation: 'Under constitutionalism, the national constitution is the highest legal authority; contradictory laws are null and void.', points: 1
    },
    {
        id: 'q_g10_cit_m1_07', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following rights belongs to the category of fundamental civil rights?',
        options: ['The right to life, liberty, and personal security', 'The right to holiday pay', 'The right to social security pensions', 'The right to free housing'],
        correctAnswer: 0, explanation: 'Civil rights safeguard personal physical integrity, liberty, and protection from arbitrary state intrusion.', points: 1
    },
    {
        id: 'q_g10_cit_m1_08', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'In a parliamentary democracy, the Prime Minister and cabinet are accountable to:',
        options: ['The elected parliament (legislature)', 'The supreme military council', 'The judicial bench exclusively', 'The municipal council'],
        correctAnswer: 0, explanation: 'The executive branch is formed from and remains democratically accountable to the legislative parliament.', points: 1
    },
    {
        id: 'q_g10_cit_m1_09', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'What is civic competence in a democratic society?',
        options: [
            'Possessing the knowledge, values, and skills necessary to participate actively and constructively in civic life',
            'Obeying commands without questioning',
            'Voting only once in a lifetime',
            'Avoiding community discussions'
        ],
        correctAnswer: 0, explanation: 'Civic competence empowers informed citizens to debate public policy, vote responsibly, and hold leaders accountable.', points: 1
    },
    {
        id: 'q_g10_cit_m1_10', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'Which body is charged with the independent constitutional duty to interpret laws and administer justice?',
        options: ['The Judiciary (Courts of Law)', 'The Federal Police', 'The Ministry of Finance', 'The City Administration'],
        correctAnswer: 0, explanation: 'Judicial independence ensures impartial adjudication free from political interference from the executive or parliament.', points: 1
    },
    {
        id: 'q_g10_cit_m1_11', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'Patriotism in a multi-cultural constitutional democracy means:',
        options: [
            'Love for one\'s country demonstrated through upholding constitutional rights, unity, peace, and mutual respect among all citizens',
            'Blind devotion to a single regime',
            'Hostility toward neighboring nations',
            'Rejecting diversity'
        ],
        correctAnswer: 0, explanation: 'Democratic constitutional patriotism is grounded in universal civic values, rule of law, and social solidarity.', points: 1
    },
    {
        id: 'q_g10_cit_m1_12', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'The United Nations Universal Declaration of Human Rights (UDHR) was officially adopted by the General Assembly in:',
        options: ['1948', '1919', '1963', '1975'],
        correctAnswer: 0, explanation: 'The landmark UDHR was proclaimed in Paris on December 10, 1948, establishing global human rights benchmarks.', points: 1
    },
    {
        id: 'q_g10_cit_m1_13', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'A citizen\'s duty to pay legally assessed taxes is essential because taxes:',
        options: [
            'Finance public social services such as healthcare, education, infrastructure, and national security',
            'Enrich private tax collectors personally',
            'Are punishments for working',
            'Go exclusively to international charities'
        ],
        correctAnswer: 0, explanation: 'Taxation provides public revenues that fund schools, roads, medical services, and civil administration.', points: 1
    },
    {
        id: 'q_g10_cit_m1_14', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'Which democratic value emphasizes peaceful dialogue, compromise, and mutual accommodation in resolving community disputes?',
        options: ['Conflict resolution through peaceful negotiation', 'Violent confrontation', 'Authoritarian decree', 'Total avoidance'],
        correctAnswer: 0, explanation: 'Constructive conflict resolution seeks win-win solutions respecting the legitimate interests of all stakeholders.', points: 1
    },
    {
        id: 'q_g10_cit_m1_15', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the role of an Ombudsman institution in democratic governance?',
        options: [
            'To investigate citizen complaints regarding administrative malpractice, maladministration, and abuse of power by public bodies',
            'To command military troops in emergencies',
            'To set international currency exchange rates',
            'To prosecute criminal trials'
        ],
        correctAnswer: 0, explanation: 'The Ombudsman acts as an independent citizen advocate promoting governmental transparency and good governance.', points: 1
    },
    {
        id: 'q_g10_cit_m1_16', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'Rule of law fundamentally ensures that:',
        options: [
            'All persons, institutions, and leaders (public and private) are equally subject to publicly promulgated laws',
            'The government is above the law',
            'Only poor citizens are punished',
            'Laws change arbitrarily each morning'
        ],
        correctAnswer: 0, explanation: 'Rule of law prohibits arbitrary authority, guaranteeing equality, legal certainty, and due process for all.', points: 1
    },
    {
        id: 'q_g10_cit_m1_17', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is considered a collective (solidarity / third-generation) right?',
        options: ['The right to a healthy environment and sustainable development', 'Right to vote', 'Right to fair trial', 'Right to freedom of conscience'],
        correctAnswer: 0, explanation: 'Third-generation rights are communal, focusing on peace, self-determination, and a clean ecology.', points: 1
    },
    {
        id: 'q_g10_cit_m1_18', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'Active citizen participation in voluntary non-governmental organizations (NGOs) and community self-help associations strengthens:',
        options: ['Civil society and grassroots democracy', 'Military dictatorship', 'State monopoly on information', 'Political apathy'],
        correctAnswer: 0, explanation: 'Civil society organizations (Iddir, Equb, community groups) build social capital and foster democratic culture.', points: 1
    },
    {
        id: 'q_g10_cit_m1_19', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'What does the term "transparency" mean regarding public governmental institutions?',
        options: [
            'Openness and public accessibility of governmental decisions, budgets, and operational information to citizens',
            'Government operations conducted in complete secret',
            'Deleting public records every year',
            'Censoring national statistics'
        ],
        correctAnswer: 0, explanation: 'Transparency ensures government actions and spending are visible, reducing corruption and building trust.', points: 1
    },
    {
        id: 'q_g10_cit_m1_20', examId: 'exam_16', grade: 'Grade10', subject: 'Citizenship', semester: 'Semester1', examType: 'Mid1',
        question: 'Tolerance in a diverse society requires:',
        options: [
            'Respecting, acknowledging, and appreciating cultural, religious, and opinion differences among all groups',
            'Forcing everyone into a single lifestyle',
            'Suppressing minority languages',
            'Ignoring constitutional guarantees'
        ],
        correctAnswer: 0, explanation: 'Democratic tolerance upholds human dignity and peaceful coexistence across cultural and ideological diversity.', points: 1
    }
];

let added = 0;
newG10Questions.forEach(q => {
    if (!db.questions.some(existing => existing.id === q.id)) {
        db.questions.push(q);
        added++;
    }
});

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully added ${added} Grade 10 Mid 1 questions! Total questions now: ${db.questions.length}`);
