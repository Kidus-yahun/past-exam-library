// scripts/generate_questions.js
// Comprehensive Question Bank Generator for Catholic Past Exam Library
// Covers Grades 9, 10, 11, and 12 across all curriculum subjects

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

// Helper to create questions
function q(id, grade, subject, semester, examType, question, options, correctAnswer, explanation, points = 1) {
    return {
        id,
        grade,
        subject,
        semester,
        examType,
        question,
        options,
        correctAnswer,
        explanation,
        points
    };
}

const questions = [];

// ==========================================
// GRADE 9: PHYSICS (Includes Real Blessed G/Michael Exam Questions)
// ==========================================
questions.push(
    q('q_g9_phys_01', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which of the following is a fundamental physical quantity?',
        ['Area', 'Volume', 'Time', 'Density'],
        2,
        'Time is one of the seven base/fundamental SI physical quantities (along with mass, length, temperature, electric current, luminous intensity, and amount of substance). Area, volume, and density are derived quantities.'
    ),
    q('q_g9_phys_02', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'When adding or subtracting numbers with significant figures, the final result should have the same number of:',
        ['The most decimal places', 'The fewest significant figures', 'The fewest decimal places', 'The most significant figures'],
        2,
        'In addition and subtraction, the answer cannot be more precise than the least precise measurement, meaning it must have the same number of decimal places as the value with the fewest decimal places.'
    ),
    q('q_g9_phys_03', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'The metric prefix "nano" represents which factor?',
        ['10⁻⁶', '10⁶', '10⁹', '10⁻⁹'],
        3,
        'The prefix "nano" (symbol n) represents a factor of 10⁻⁹ (one billionth). Micro is 10⁻⁶, and giga is 10⁹.'
    ),
    q('q_g9_phys_04', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which scientific breakthrough was contributed by Sir Isaac Newton?',
        ['Universal law of gravitation', 'Calculus', 'Optics & laws of motion', 'All of the above'],
        3,
        'Sir Isaac Newton made groundbreaking contributions to the universal law of gravitation, the three laws of motion, calculus, and optics (corpuscular theory of light and prism dispersion).'
    ),
    q('q_g9_phys_05', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which of the following numbers has the greatest number of significant figures?',
        ['0.020', '2000', '0.001', '50000'],
        0,
        '0.020 has two significant figures (the 2 and trailing 0 after decimal). 2000 has 1 (without decimal point), 0.001 has 1 (leading zeros never count), and 50000 has 1.'
    ),
    q('q_g9_phys_06', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'The number 25.373 rounded to 3 significant figures is:',
        ['25.30', '25', '25.3', '25.4'],
        3,
        'Looking at 25.373: the first three significant digits are 2, 5, and 3. The fourth digit is 7 (≥ 5), so we round the 3 up to 4, giving 25.4.'
    ),
    q('q_g9_phys_07', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Multiply 500 × 2.4 and report the result with the correct number of significant figures:',
        ['872', '8700', '2000.0', '1000'],
        3,
        '500 has 1 significant figure and 2.4 has 2. In multiplication, the product must retain the fewest significant figures (1 sig fig). 500 × 2.4 = 1200, which rounds to 1000 (1 sig fig).'
    ),
    q('q_g9_phys_08', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Subtract 35.25 - 34 and report the answer with the correct number of significant figures:',
        ['1.25', '1.5', '1', '2'],
        2,
        '35.25 has 2 decimal places, while 34 has 0 decimal places. The result 1.25 must be rounded to 0 decimal places (the fewest decimal places), yielding 1.'
    ),
    q('q_g9_phys_09', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which of the following is NOT equivalent to 1 hour?',
        ['60 minutes', '3600 seconds', '0.24 day', 'None of the above'],
        2,
        'One day has 24 hours. 0.24 day equals 0.24 × 24 = 5.76 hours, which is NOT equal to 1 hour (1 hour is approximately 0.0417 day).'
    ),
    q('q_g9_phys_10', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'One metric ton is equivalent to which of the following?',
        ['1,000 kg', '10 quintals', '1,000,000 g', 'All of the above'],
        3,
        '1 metric ton = 1,000 kg = 10 quintals (1 quintal = 100 kg) = 1,000,000 grams. All options are equivalent.'
    ),
    q('q_g9_phys_11', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which branch of physics deals with the study of motion and forces?',
        ['Acoustics', 'Mechanics', 'Electromagnetism', 'Thermodynamics'],
        1,
        'Mechanics is the branch of physics concerned with the relationships between force, matter, and motion among physical objects.'
    ),
    q('q_g9_phys_12', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which branch of physics studies the behavior of heat, work, and temperature?',
        ['Thermodynamics', 'Optics', 'Astrophysics', 'Nuclear physics'],
        0,
        'Thermodynamics is the branch of physical science that deals with the relations between heat and other forms of energy.'
    ),
    q('q_g9_phys_13', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which branch of physics is concerned with the properties and propagation of light?',
        ['Acoustics', 'Optics', 'Fluid dynamics', 'Electrodynamics'],
        1,
        'Optics is the branch of physics that studies the behavior and properties of light, including its interactions with matter and the construction of instruments that use or detect it.'
    ),
    q('q_g9_phys_14', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which physicist formulated the laws of electromagnetic induction?',
        ['Michael Faraday', 'Albert Einstein', 'James Prescott Joule', 'Marie Curie'],
        0,
        'Michael Faraday discovered electromagnetic induction in 1831, showing that a changing magnetic field induces an electromotive force (EMF) in a conductor.'
    ),
    q('q_g9_phys_15', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'The traditional Ethiopian unit of mass called "Feresula" corresponds approximately to:',
        ['1 kg', '17 kg', '50 kg', '100 kg'],
        1,
        'In Ethiopian traditional commerce (especially for coffee and agricultural produce), 1 Feresula is approximately equal to 17 kilograms.'
    ),
    q('q_g9_phys_16', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'How many significant figures are present in the measurement 30.250 m?',
        ['2', '3', '4', '5'],
        3,
        'All non-zero digits are significant, the zero between non-zeros is significant, and the trailing zero in a decimal number is significant. Thus, 30.250 has 5 significant figures.'
    ),
    q('q_g9_phys_17', 'Grade9', 'Physics', 'Semester1', 'Final',
        'What is the SI unit of electric current?',
        ['Volt (V)', 'Ampere (A)', 'Ohm (Ω)', 'Coulomb (C)'],
        1,
        'The Ampere (A) is the SI base unit of electric current. The Volt is potential difference, Ohm is resistance, and Coulomb is electric charge.'
    ),
    q('q_g9_phys_18', 'Grade9', 'Physics', 'Semester1', 'Final',
        'A vehicle travels 150 meters in 5 seconds. What is its average speed?',
        ['15 m/s', '25 m/s', '30 m/s', '750 m/s'],
        2,
        'Average speed = distance / time = 150 m / 5 s = 30 m/s.'
    ),
    q('q_g9_phys_19', 'Grade9', 'Physics', 'Semester1', 'Final',
        'Which of Newton\'s laws states that an object at rest will remain at rest unless acted upon by a net external force?',
        ['First Law (Law of Inertia)', 'Second Law (F = ma)', 'Third Law (Action-Reaction)', 'Universal Law of Gravitation'],
        0,
        'Newton\'s First Law of Motion, also known as the Law of Inertia, states that an object continues in its state of rest or uniform velocity unless acted upon by a resultant external force.'
    ),
    q('q_g9_phys_20', 'Grade9', 'Physics', 'Semester1', 'Final',
        'What is the weight of a 50 kg student on Earth where acceleration due to gravity g ≈ 9.8 m/s²?',
        ['5.1 N', '50 N', '490 N', '980 N'],
        2,
        'Weight W = m × g = 50 kg × 9.8 m/s² = 490 N.'
    )
);

// ==========================================
// GRADE 9: BIOLOGY (Includes Real Blessed G/Michael Exam Questions)
// ==========================================
questions.push(
    q('q_g9_bio_01', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which laboratory apparatus is used to provide pressurized steam for sterilizing instruments?',
        ['Autoclave', 'Incubator', 'Hot air oven', 'Desiccator'],
        0,
        'An autoclave utilizes high-pressure saturated steam at approximately 121°C for 15-20 minutes to achieve complete sterilization of microbiological tools and glassware.'
    ),
    q('q_g9_bio_02', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Who divided animals into two broad groups: those with red blood and those without red blood?',
        ['Robert Whittaker', 'Aristotle', 'Carolus Linnaeus', 'Antonie van Leeuwenhoek'],
        1,
        'Aristotle, the ancient Greek philosopher, classified animals into Enaima (animals with red blood, vertebrates) and Anaima (animals without red blood, invertebrates).'
    ),
    q('q_g9_bio_03', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'The criteria used in Whittaker\'s five-kingdom classification system include:',
        ['Cell structure (prokaryotic vs eukaryotic)', 'Mode of nutrition', 'Phylogenetic relationships', 'All of the above'],
        3,
        'Whittaker\'s five-kingdom classification (Monera, Protista, Fungi, Plantae, Animalia) was based on cell complexity, body organization, mode of nutrition, and phylogenetic evolutionary links.'
    ),
    q('q_g9_bio_04', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which organisms are included in Whittaker\'s five kingdoms?',
        ['Viruses and Prions', 'Bacteria and Algae', 'Lichens and Bacteriophages', 'Viroids only'],
        1,
        'Bacteria belong to Kingdom Monera, and unicellular algae belong to Kingdom Protista. Viruses, viroids, and prions are acellular and are not included in Whittaker\'s kingdoms.'
    ),
    q('q_g9_bio_05', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Who was the creator of binomial nomenclature and the author of "Systema Naturae"?',
        ['Carolus Linnaeus', 'Charles Darwin', 'Gregor Mendel', 'Jean-Baptiste Lamarck'],
        0,
        'Carolus Linnaeus developed the formal system of naming species of living things by giving each a name composed of two parts (Genus and species) in his work Systema Naturae.'
    ),
    q('q_g9_bio_06', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'What type of asexual reproduction is characteristically used by yeast cells?',
        ['Binary fission', 'Budding', 'Regeneration', 'Conjugation'],
        1,
        'Yeasts primarily reproduce asexually by budding, where a small daughter outgrowth forms on the parent cell, receives a replicated nucleus, and eventually separates.'
    ),
    q('q_g9_bio_07', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Protists are ecologically vital because they:',
        ['Produce atmospheric oxygen via photosynthesis', 'Support aquatic food chains', 'Recycle nutrients as decomposers', 'All of the above'],
        3,
        'Phytoplankton and protists generate a massive portion of global oxygen, form the foundational trophic level in marine/freshwater food webs, and assist in nutrient cycling.'
    ),
    q('q_g9_bio_08', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Fungi are critical components of an ecosystem because their primary ecological role is as:',
        ['Primary producers', 'Decomposers', 'Top carnivores', 'Nitrogen-fixing symbionts only'],
        1,
        'Fungi are primary saprotrophic decomposers that secrete extracellular digestive enzymes to break down complex dead organic matter into basic nutrients.'
    ),
    q('q_g9_bio_09', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following is an example of a non-hyphal, unicellular fungus?',
        ['Yeast', 'Mucor', 'Rhizopus', 'Mushroom (Agaricus)'],
        0,
        'Yeast (such as Saccharomyces cerevisiae) is a unicellular, non-hyphal fungus, unlike filamentous molds like Mucor and Rhizopus.'
    ),
    q('q_g9_bio_10', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following cellular structures are used for locomotion in microorganisms?',
        ['Flagella', 'Cilia', 'Pseudopodia', 'All of the above'],
        3,
        'Microorganisms use flagella (e.g., Euglena), cilia (e.g., Paramecium), or pseudopodia (e.g., Amoeba) for locomotion.'
    ),
    q('q_g9_bio_11', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following protists is a free-living, non-pathogenic organism?',
        ['Paramecium', 'Plasmodium', 'Giardia', 'Entamoeba histolytica'],
        0,
        'Paramecium is a free-living ciliate in ponds and fresh waters. Plasmodium causes malaria, and Giardia causes giardiasis.'
    ),
    q('q_g9_bio_12', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'The individual thread-like filaments that compose the mycelium of a fungus are called:',
        ['Hyphae', 'Spores', 'Rhizoids', 'Sporangia'],
        0,
        'Hyphae (singular: hypha) are long branching filamentous structures that together form the vegetative mycelium of fungi.'
    ),
    q('q_g9_bio_13', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following is an endemic plant of immense cultural and agricultural importance in Ethiopia?',
        ['Ensete ventricosum (Enset)', 'Zea mays (Maize)', 'Triticum aestivum (Wheat)', 'Oryza sativa (Rice)'],
        0,
        'Ensete ventricosum (false banana or Enset) is endemic and indigenous to Ethiopia, serving as a staple food security crop for millions in southern Ethiopia.'
    ),
    q('q_g9_bio_14', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which endangered wild mammal is strictly endemic to the Semien Mountains of Ethiopia?',
        ['Walia Ibex (Capra walie)', 'Bengal Tiger', 'Spotted Hyena', 'African Lion'],
        0,
        'The Walia Ibex (Capra walie) is a critically unique mountain goat species endemic exclusively to the Semien Mountains of Ethiopia.'
    ),
    q('q_g9_bio_15', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'On an optical light microscope, which component controls the amount of light reaching the specimen?',
        ['Diaphragm', 'Coarse adjustment knob', 'Stage clips', 'Ocular lens'],
        0,
        'The iris diaphragm (located beneath the stage) regulates the cone of light that reaches the specimen, adjusting brightness and contrast.'
    ),
    q('q_g9_bio_16', 'Grade9', 'Biology', 'Semester1', 'Final',
        'Which organelle is often referred to as the powerhouse of the eukaryotic cell?',
        ['Mitochondria', 'Ribosome', 'Endoplasmic reticulum', 'Golgi apparatus'],
        0,
        'Mitochondria generate the majority of cellular adenosine triphosphate (ATP) through aerobic cellular respiration.'
    ),
    q('q_g9_bio_17', 'Grade9', 'Biology', 'Semester1', 'Final',
        'Plant cell walls are primarily composed of which complex carbohydrate?',
        ['Cellulose', 'Chitin', 'Glycogen', 'Peptidoglycan'],
        0,
        'Plant cell walls are made of cellulose. Fungal cell walls are made of chitin, and bacterial cell walls are made of peptidoglycan.'
    ),
    q('q_g9_bio_18', 'Grade9', 'Biology', 'Semester1', 'Final',
        'Which blood vessels carry oxygenated blood away from the heart to the rest of the body?',
        ['Arteries', 'Veins', 'Venules', 'Lymphatic vessels'],
        0,
        'Arteries transport blood under high pressure away from the heart to bodily tissues. The systemic arteries carry oxygenated blood.'
    )
);

// ==========================================
// GRADE 9: CHEMISTRY
// ==========================================
questions.push(
    q('q_g9_chem_01', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Who proposed the atomic theory stating that matter is made of indivisible, indestructible particles called atoms?',
        ['John Dalton', 'J.J. Thomson', 'Ernest Rutherford', 'Niels Bohr'],
        0,
        'John Dalton formulated the modern atomic theory in 1803, stating that all matter is composed of tiny indivisible particles called atoms.'
    ),
    q('q_g9_chem_02', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which subatomic particle carries a negative electric charge?',
        ['Electron', 'Proton', 'Neutron', 'Positron'],
        0,
        'Electrons carry a negative charge (-1.602 × 10⁻¹⁹ C) and orbit the nucleus. Protons are positive and neutrons are neutral.'
    ),
    q('q_g9_chem_03', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'The atomic number (Z) of a neutral atom is equal to the number of:',
        ['Protons in the nucleus', 'Neutrons in the nucleus', 'Protons plus neutrons', 'Valence electrons only'],
        0,
        'The atomic number (Z) uniquely identifies an element and equals the number of protons in the nucleus of an atom.'
    ),
    q('q_g9_chem_04', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'What is the mass number (A) of an atom with 6 protons and 8 neutrons?',
        ['6', '8', '14', '48'],
        2,
        'Mass number A = Protons + Neutrons = 6 + 8 = 14 (Carbon-14 isotope).'
    ),
    q('q_g9_chem_05', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Elements located in Group 1 (IA) of the modern periodic table are known as:',
        ['Alkali metals', 'Alkaline earth metals', 'Halogens', 'Noble gases'],
        0,
        'Group 1 elements (Li, Na, K, Rb, Cs, Fr) are alkali metals. Group 2 are alkaline earth metals, Group 17 are halogens, and Group 18 are noble gases.'
    ),
    q('q_g9_chem_06', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which type of chemical bond is formed by the complete transfer of electrons from a metal to a non-metal?',
        ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'],
        0,
        'An ionic bond is formed by the electrostatic attraction between oppositely charged ions created when electrons transfer from a metal to a non-metal.'
    ),
    q('q_g9_chem_07', 'Grade9', 'Chemistry', 'Semester1', 'Final',
        'What is the correct chemical formula for aluminum sulfate?',
        ['AlSO₄', 'Al₂(SO₄)₃', 'Al₃(SO₄)₂', 'Al(SO₄)₂'],
        1,
        'Aluminum has a +3 oxidation state (Al³⁺) and sulfate is SO₄²⁻. Crossing charges yields Al₂(SO₄)₃.'
    ),
    q('q_g9_chem_08', 'Grade9', 'Chemistry', 'Semester1', 'Final',
        'When balancing the equation: N₂ + _ H₂ → 2 NH₃, what is the stoichiometric coefficient for H₂?',
        ['1', '2', '3', '4'],
        2,
        'There are 2 × 3 = 6 hydrogen atoms on the product side. Therefore, 3 H₂ molecules are required: N₂ + 3 H₂ → 2 NH₃.'
    ),
    q('q_g9_chem_09', 'Grade9', 'Chemistry', 'Semester1', 'Final',
        'A solution with a pH value of 3 is classified as:',
        ['Strongly basic', 'Neutral', 'Acidic', 'Weakly alkaline'],
        2,
        'On the pH scale: pH 7 is neutral, pH < 7 is acidic, and pH > 7 is basic. A pH of 3 is distinctly acidic.'
    ),
    q('q_g9_chem_10', 'Grade9', 'Chemistry', 'Semester1', 'Final',
        'Which of the following is an example of a chemical change?',
        ['Melting of ice', 'Rusting of iron', 'Dissolving sugar in water', 'Boiling water into steam'],
        1,
        'Rusting of iron involves a chemical reaction with oxygen and moisture to form iron oxide (rust), creating new substances.'
    )
);

// ==========================================
// GRADE 9: MATHEMATICS
// ==========================================
questions.push(
    q('q_g9_math_01', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'If set A = {1, 2, 3, 4} and set B = {3, 4, 5, 6}, what is A ∩ B (the intersection)?',
        ['{1, 2, 5, 6}', '{3, 4}', '{1, 2, 3, 4, 5, 6}', '∅'],
        1,
        'The intersection A ∩ B consists of elements that belong to both set A and set B: {3, 4}.'
    ),
    q('q_g9_math_02', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Solve the linear equation for x: 3(2x - 4) = 18.',
        ['3', '5', '6', '10'],
        1,
        'Expand: 6x - 12 = 18. Add 12: 6x = 30. Divide by 6: x = 5.'
    ),
    q('q_g9_math_03', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Which of the following numbers is an irrational number?',
        ['0.75', '√16', '√7', '2/3'],
        2,
        '√7 cannot be expressed as a fraction of two integers and has a non-terminating, non-repeating decimal expansion, making it irrational. √16 = 4, which is rational.'
    ),
    q('q_g9_math_04', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'What is the slope (m) of the line passing through points (2, 3) and (6, 11)?',
        ['2', '4', '8', '1/2'],
        0,
        'Slope m = (y₂ - y₁) / (x₂ - x₁) = (11 - 3) / (6 - 2) = 8 / 4 = 2.'
    ),
    q('q_g9_math_05', 'Grade9', 'Mathematics', 'Semester1', 'Final',
        'What is the sum of the interior angles of a pentagon (5-sided polygon)?',
        ['360°', '540°', '720°', '900°'],
        1,
        'Sum of interior angles = (n - 2) × 180°. For n = 5: (5 - 2) × 180° = 3 × 180° = 540°.'
    ),
    q('q_g9_math_06', 'Grade9', 'Mathematics', 'Semester1', 'Final',
        'In a right-angled triangle, if legs are a = 6 cm and b = 8 cm, what is the hypotenuse c?',
        ['10 cm', '12 cm', '14 cm', '100 cm'],
        0,
        'By the Pythagorean theorem: c² = a² + b² = 6² + 8² = 36 + 64 = 100. c = √100 = 10 cm.'
    ),
    q('q_g9_math_07', 'Grade9', 'Mathematics', 'Semester1', 'Final',
        'Find the median of the data set: 12, 5, 8, 20, 15.',
        ['8', '12', '14', '15'],
        1,
        'Sort data in ascending order: 5, 8, 12, 15, 20. The middle value is 12.'
    ),
    q('q_g9_math_08', 'Grade9', 'Mathematics', 'Semester1', 'Final',
        'What is the value of 2⁻³?',
        ['-6', '-8', '1/8', '1/6'],
        2,
        '2⁻³ = 1 / 2³ = 1 / 8.'
    )
);

// ==========================================
// GRADE 9: ENGLISH
// ==========================================
questions.push(
    q('q_g9_eng_01', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Choose the correct verb tense: "By the time the teacher entered, the students ______ their homework."',
        ['have finished', 'had finished', 'finish', 'are finishing'],
        1,
        'Past perfect tense ("had finished") is used to denote an action completed before another past event ("teacher entered").'
    ),
    q('q_g9_eng_02', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Choose the correct pronoun: "The scientist ______ discovered the vaccine won a Nobel Prize."',
        ['which', 'who', 'whom', 'whose'],
        1,
        '"Who" is the subject relative pronoun referring to people ("the scientist").'
    ),
    q('q_g9_eng_03', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Identify the passive voice for: "The librarian sorted the new books yesterday."',
        ['The new books were sorted by the librarian yesterday.', 'The librarian had been sorted by the books.', 'The new books are being sorted.', 'Yesterday the librarian sorted books.'],
        0,
        'In passive voice with simple past: Subject + was/were + past participle + by agent ("The new books were sorted by the librarian yesterday").'
    ),
    q('q_g9_eng_04', 'Grade9', 'English', 'Semester1', 'Final',
        'Select the appropriate conditional sentence: "If it ______ tomorrow, we will postpone the football match."',
        ['rains', 'will rain', 'rained', 'would rain'],
        0,
        'First conditional structure: If + present simple ("rains"), will + base verb ("will postpone").'
    ),
    q('q_g9_eng_05', 'Grade9', 'English', 'Semester1', 'Final',
        'What is the synonym of the word "Diligent"?',
        ['Lazy', 'Hardworking', 'Careless', 'Arrogant'],
        1,
        '"Diligent" means showing care and conscientiousness in one\'s work or duties; hardworking.'
    )
);

// ==========================================
// GRADE 9: IT & COMPUTER SCIENCE
// ==========================================
questions.push(
    q('q_g9_it_01', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which component is known as the "brain" of the computer that carries out arithmetic and logical instructions?',
        ['Central Processing Unit (CPU)', 'Random Access Memory (RAM)', 'Hard Disk Drive', 'Motherboard'],
        0,
        'The CPU (Central Processing Unit) performs the fetch-decode-execute cycle and executes program instructions.'
    ),
    q('q_g9_it_02', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which type of memory is volatile, losing its contents when the power is turned off?',
        ['ROM (Read Only Memory)', 'RAM (Random Access Memory)', 'Flash Drive', 'Hard Disk Drive'],
        1,
        'RAM is volatile primary memory. When the computer loses power, all data stored in RAM is lost.'
    ),
    q('q_g9_it_03', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'How many bits make up one byte of digital data?',
        ['4', '8', '16', '32'],
        1,
        'One byte consists of exactly 8 bits. A nibble consists of 4 bits.'
    ),
    q('q_g9_it_04', 'Grade9', 'IT', 'Semester1', 'Final',
        'Which network type connects computers within a localized geographic area such as a school laboratory or office building?',
        ['LAN (Local Area Network)', 'WAN (Wide Area Network)', 'MAN (Metropolitan Area Network)', 'Internet'],
        0,
        'A LAN (Local Area Network) spans a small physical area like a classroom, office, or building.'
    ),
    q('q_g9_it_05', 'Grade9', 'IT', 'Semester1', 'Final',
        'What does HTTP stand for in web technology?',
        ['Hypertext Transfer Protocol', 'High Technical Transfer Program', 'Hyperlink Transmission Path', 'Hybrid Terminal Test Protocol'],
        0,
        'HTTP stands for Hypertext Transfer Protocol, the foundational protocol used for transmitting web pages over the Internet.'
    )
);

// ==========================================
// GRADE 9: HISTORY & GEOGRAPHY & CITIZENSHIP
// ==========================================
questions.push(
    q('q_g9_hist_01', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Where was the famous fossil of Australopithecus afarensis ("Lucy" or "Dinkinesh") discovered in Ethiopia in 1974?',
        ['Hadar (Awash Valley)', 'Omo Kibish', 'Melka Kunture', 'Tiwi Valley'],
        0,
        'Lucy (Dinkinesh) was discovered at Hadar in the Awash Valley of the Afar depression by Donald Johanson in 1974.'
    ),
    q('q_g9_hist_02', 'Grade9', 'History', 'Semester1', 'Mid1',
        'During the reign of which Aksumite King did Christianity become the official state religion in the 4th century AD?',
        ['King Ezana', 'King Kaleb', 'King Armah', 'Emperor Gebre Mesqel'],
        0,
        'King Ezana of Aksum converted to Christianity around 330–340 AD under the guidance of Saint Frumentius (Abba Selama).'
    ),
    q('q_g9_hist_03', 'Grade9', 'History', 'Semester1', 'Final',
        'The historic Battle of Adwa, where Ethiopian forces defeated the Italian colonial army, took place on:',
        ['March 1, 1896', 'October 24, 1935', 'May 5, 1941', 'December 13, 1960'],
        0,
        'The Battle of Adwa was fought on March 1, 1896 (Yekatit 23, 1888 E.C.), preserving Ethiopia\'s national sovereignty.'
    ),
    q('q_g9_geog_01', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The traditional Ethiopian agro-climatic zone situated between 1,500 and 2,300 meters above sea level with moderate temperatures is called:',
        ['Kolla', 'Weyna Dega', 'Dega', 'Bereha'],
        1,
        'Weyna Dega (sub-tropical zone) lies between 1500m and 2300m elevation, featuring temperate conditions ideal for agriculture and human settlement.'
    ),
    q('q_g9_geog_02', 'Grade9', 'Geography', 'Semester1', 'Final',
        'Which prominent geological feature bisects the Ethiopian highlands into northwestern and southeastern massifs?',
        ['Great East African Rift Valley', 'Simien Mountains', 'Bale Mountains', 'Danakil Depression'],
        0,
        'The Great East African Rift Valley cuts diagonally across Ethiopia from northeast to southwest, dividing the Ethiopian highlands.'
    ),
    q('q_g9_cit_01', 'Grade9', 'Citizen ship', 'Semester1', 'Mid1',
        'Which branch of government is responsible for making laws in a constitutional democracy?',
        ['The Legislature (Parliament)', 'The Executive', 'The Judiciary', 'The Police Service'],
        0,
        'The Legislature (such as the House of Peoples\' Representatives in Ethiopia) has the constitutional authority to debate, enact, and amend legislation.'
    ),
    q('q_g9_cit_02', 'Grade9', 'Citizen ship', 'Semester1', 'Final',
        'Which peaceful conflict resolution method involves a neutral third party facilitating dialogue without imposing a binding decision?',
        ['Mediation', 'Arbitration', 'Litigation', 'Warfare'],
        0,
        'Mediation involves an impartial mediator who facilitates constructive dialogue and helps conflicting parties reach a mutually agreeable voluntary settlement.'
    ),
    q('q_g9_econ_01', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'What is the fundamental economic problem that faces all societies?',
        ['Scarcity (unlimited wants vs limited resources)', 'Excessive taxation', 'Hyperinflation', 'Trade surpluses'],
        0,
        'Scarcity is the fundamental economic problem: human wants are virtually unlimited, while productive resources to satisfy them are finite.'
    ),
    q('q_g9_econ_02', 'Grade9', 'Economics', 'Semester1', 'Final',
        'The value of the next best alternative given up when a decision is made is known as:',
        ['Opportunity cost', 'Marginal cost', 'Sunk cost', 'Variable cost'],
        0,
        'Opportunity cost represents the benefits an individual, investor, or business misses out on when choosing one alternative over another.'
    ),
    q('q_g9_hp_01', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'What does the acronym R.I.C.E. stand for in sports first aid for sprains and soft-tissue injuries?',
        ['Rest, Ice, Compression, Elevation', 'Run, Incline, Cool, Exercise', 'Rescue, Isolate, Calm, Emergency', 'Relief, Injection, Cast, Examination'],
        0,
        'R.I.C.E. is the standard first-aid treatment protocol for acute soft tissue and ligament injuries: Rest, Ice, Compression, and Elevation.'
    ),
    q('q_g9_amh_01', 'Grade9', 'Amharic', 'Semester1', 'Mid1',
        'በአማርኛ ሰዋሰው ውስጥ የአንድን ነገር፣ ቦታ ወይም ሰው ስም የሚገልጸው የቃል ክፍል ምን ይባላል?',
        ['ስም', 'ግሥ', 'ቅጽል', 'መስተዋድድ'],
        0,
        'ስም የማንኛውም ሰው፣ ቦታ፣ እንስሳ ወይም ረቂቅ ነገር መጠሪያ ሆኖ የሚያገለግል የቋንቋ ክፍል ነው።'
    )
);

// ==========================================
// GRADE 10: COMPLETE COMPREHENSIVE CURRICULUM
// ==========================================
questions.push(
    // Grade 10 Physics
    q('q_g10_phys_01', 'Grade10', 'Physics', 'Semester1', 'Final',
        'According to Newton\'s Second Law of Motion, what happens to acceleration when net force is doubled and mass remains constant?',
        ['Acceleration is halved', 'Acceleration is doubled', 'Acceleration remains unchanged', 'Acceleration quadruples'],
        1,
        'Since a = F / m, acceleration is directly proportional to net force. Doubling the net force doubles the acceleration.'
    ),
    q('q_g10_phys_02', 'Grade10', 'Physics', 'Semester1', 'Final',
        'A worker does 1200 Joules of work lifting a crate in 6 seconds. What is the power exerted?',
        ['7200 W', '200 W', '120 W', '20 W'],
        1,
        'Power = Work / time = 1200 J / 6 s = 200 Watts (W).'
    ),
    q('q_g10_phys_03', 'Grade10', 'Physics', 'Semester1', 'Mid1',
        'What type of wave is a sound wave in air?',
        ['Transverse wave', 'Longitudinal mechanical wave', 'Electromagnetic wave', 'Surface wave'],
        1,
        'Sound waves travel through gases and liquids as longitudinal mechanical waves composed of alternating compressions and rarefactions.'
    ),
    q('q_g10_phys_04', 'Grade10', 'Physics', 'Semester1', 'Mid1',
        'Coulomb\'s Law states that the electrostatic force between two point charges is inversely proportional to the:',
        ['Distance between them', 'Square of the distance between them', 'Product of the charges', 'Sum of the charges'],
        1,
        'F = k·|q₁·q₂| / r². The electrostatic force is inversely proportional to the square of the distance (r²) between the charges.'
    ),
    q('q_g10_phys_05', 'Grade10', 'Physics', 'Semester1', 'Final',
        'What phenomenon causes a pencil submerged in a glass of water to appear bent at the surface?',
        ['Refraction', 'Total internal reflection', 'Diffraction', 'Polarization'],
        0,
        'Refraction is the bending of light waves as they pass obliquely from one transparent optical medium (water) into another (air) of differing optical density.'
    ),

    // Grade 10 Chemistry
    q('q_g10_chem_01', 'Grade10', 'Chemistry', 'Semester1', 'Final',
        'Which gas law states that at constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure?',
        ['Charles\'s Law', 'Boyle\'s Law', 'Gay-Lussac\'s Law', 'Avogadro\'s Law'],
        1,
        'Boyle\'s Law states that P₁V₁ = P₂V₂ at constant temperature.'
    ),
    q('q_g10_chem_02', 'Grade10', 'Chemistry', 'Semester1', 'Final',
        'What is the molar mass of Calcium Carbonate (CaCO₃)? [Atomic masses: Ca=40, C=12, O=16]',
        ['68 g/mol', '84 g/mol', '100 g/mol', '120 g/mol'],
        2,
        'Molar mass = 40 + 12 + (3 × 16) = 52 + 48 = 100 g/mol.'
    ),
    q('q_g10_chem_03', 'Grade10', 'Chemistry', 'Semester1', 'Mid1',
        'Which organic family of hydrocarbons contains only single carbon-carbon covalent bonds and follows formula CnH₂n+₂?',
        ['Alkanes', 'Alkenes', 'Alkynes', 'Arenes'],
        0,
        'Alkanes are saturated aliphatic hydrocarbons possessing only single C-C bonds with general formula CnH₂n+₂.'
    ),
    q('q_g10_chem_04', 'Grade10', 'Chemistry', 'Semester1', 'Mid1',
        'Across a period in the periodic table from left to right, electronegativity generally:',
        ['Decreases', 'Increases', 'Remains unchanged', 'Drops to zero'],
        1,
        'Across a period, nuclear charge increases while valence electrons are added to the same shell, pulling electrons more strongly and increasing electronegativity.'
    ),

    // Grade 10 Biology
    q('q_g10_bio_01', 'Grade10', 'Biology', 'Semester1', 'Final',
        'Which phase of mitosis is characterized by sister chromatids separating and moving to opposite poles of the cell?',
        ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
        2,
        'During anaphase, the centromeres split and sister chromatids are pulled apart by spindle fibers toward opposite poles.'
    ),
    q('q_g10_bio_02', 'Grade10', 'Biology', 'Semester1', 'Final',
        'In Mendel\'s monohybrid cross of pea plants (Bb × Bb), what is the expected phenotypic ratio of dominant to recessive traits?',
        ['1:1', '2:1', '3:1', '9:3:3:1'],
        2,
        'A heterozygous Bb × Bb cross yields genotypes 1 BB : 2 Bb : 1 bb, resulting in a 3:1 dominant to recessive phenotypic ratio.'
    ),
    q('q_g10_bio_03', 'Grade10', 'Biology', 'Semester1', 'Mid1',
        'Which blood vessels possess one-way valves to prevent backflow of blood as it returns to the heart?',
        ['Arteries', 'Capillaries', 'Veins', 'Arterioles'],
        2,
        'Veins contain pocket valves that ensure one-way flow of blood against gravity toward the heart.'
    ),

    // Grade 10 Mathematics
    q('q_g10_math_01', 'Grade10', 'Mathematics', 'Semester1', 'Final',
        'What are the roots of the quadratic equation x² - 5x + 6 = 0?',
        ['x = -2, -3', 'x = 2, 3', 'x = 1, 6', 'x = -1, -6'],
        1,
        'Factoring: (x - 2)(x - 3) = 0, which yields roots x = 2 and x = 3.'
    ),
    q('q_g10_math_02', 'Grade10', 'Mathematics', 'Semester1', 'Final',
        'What is the exact value of sin(30°)?',
        ['1/2', '√3/2', '√2/2', '1'],
        0,
        'In trigonometry, sin(30°) = 1/2.'
    ),
    q('q_g10_math_03', 'Grade10', 'Mathematics', 'Semester1', 'Mid1',
        'If two fair six-sided dice are rolled, what is the probability of rolling a sum equal to 7?',
        ['1/12', '1/6', '5/36', '7/36'],
        1,
        'Combinations summing to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes out of 36 total. P = 6/36 = 1/6.'
    ),

    // Grade 10 English, History, Geography, Economics, IT
    q('q_g10_eng_01', 'Grade10', 'English', 'Semester1', 'Final',
        'Identify the correct reported speech: She said, "I have lived in Addis Ababa for five years."',
        ['She said that she had lived in Addis Ababa for five years.', 'She said that she has lived in Addis Ababa.', 'She said she lives in Addis Ababa.', 'She told she was living in Addis Ababa.'],
        0,
        'In indirect reported speech, present perfect ("have lived") shifts back into past perfect ("had lived").'
    ),
    q('q_g10_hist_01', 'Grade10', 'History', 'Semester1', 'Final',
        'Which historic Ethiopian ruler constructed the iconic eleven monolithic rock-hewn churches in Roha (Lalibela)?',
        ['King Lalibela', 'Emperor Tewodros II', 'Emperor Menelik II', 'King Ezana'],
        0,
        'King Gebre Mesqel Lalibela of the Zagwe Dynasty ordered the creation of the 11 rock-hewn monolithic churches in the 12th–13th centuries.'
    ),
    q('q_g10_geog_01', 'Grade10', 'Geography', 'Semester1', 'Final',
        'Which river is the longest river in Ethiopia and is known internationally as the Blue Nile upon entering Sudan?',
        ['Awash River', 'Abay River', 'Omo River', 'Wabe Shebelle River'],
        1,
        'The Abay River originates at Lake Tana and flows into Sudan, where it converges with the White Nile at Khartoum.'
    ),
    q('q_g10_econ_01', 'Grade10', 'Economics', 'Semester1', 'Final',
        'A market structure characterized by a single seller supplying a unique product with no close substitutes is a:',
        ['Perfect competition', 'Monopoly', 'Oligopoly', 'Monopolistic competition'],
        1,
        'A monopoly is a market structure dominated by a solitary firm that exerts substantial market power over price.'
    ),
    q('q_g10_it_01', 'Grade10', 'IT', 'Semester1', 'Final',
        'Which database query language is universally used to create, read, update, and delete relational data?',
        ['HTML', 'CSS', 'SQL (Structured Query Language)', 'JSON'],
        2,
        'SQL (Structured Query Language) is the standard language designed for managing data held in relational database management systems.'
    ),
    q('q_g10_cit_01', 'Grade10', 'Citizen ship', 'Semester1', 'Final',
        'The principle where governmental authority is divided between a central national government and regional states is called:',
        ['Unitary system', 'Federalism', 'Monarchy', 'Anarchy'],
        1,
        'Federalism divides sovereign power constitutionally between a central federal government and regional constituent state units.'
    )
);

// ==========================================
// GRADE 11: ADVANCED SECONDARY & PREPARATORY
// ==========================================
questions.push(
    // Grade 11 Physics
    q('q_g11_phys_01', 'Grade11', 'Physics', 'Semester1', 'Final',
        'What is the scalar (dot) product of vectors A = 2i + 3j and B = 4i - 2j?',
        ['2', '8', '14', '-6'],
        0,
        'A · B = (Ax · Bx) + (Ay · By) = (2 × 4) + (3 × -2) = 8 - 6 = 2.'
    ),
    q('q_g11_phys_02', 'Grade11', 'Physics', 'Semester1', 'Final',
        'In projectile motion without air resistance, the horizontal component of velocity:',
        ['Increases continuously', 'Remains constant throughout flight', 'Decreases to zero at peak', 'Reverses direction'],
        1,
        'Because gravity acts only downward along the vertical axis, horizontal acceleration is zero (ax = 0), keeping vx constant.'
    ),
    q('q_g11_phys_03', 'Grade11', 'Physics', 'Semester1', 'Mid1',
        'According to Bernoulli\'s principle for fluid flow, where the velocity of a moving fluid increases, its internal pressure:',
        ['Increases', 'Decreases', 'Remains unchanged', 'Becomes infinite'],
        1,
        'Bernoulli\'s principle states that an increase in fluid speed occurs simultaneously with a decrease in static pressure.'
    ),

    // Grade 11 Chemistry
    q('q_g11_chem_01', 'Grade11', 'Chemistry', 'Semester1', 'Final',
        'What is the electronic geometry and bond angle of methane (CH₄) according to VSEPR theory?',
        ['Trigonal planar (120°)', 'Linear (180°)', 'Tetrahedral (109.5°)', 'Octahedral (90°)'],
        2,
        'Methane has 4 bonding pairs and 0 lone pairs on carbon, adopting a tetrahedral geometry with 109.5° bond angles.'
    ),
    q('q_g11_chem_02', 'Grade11', 'Chemistry', 'Semester1', 'Final',
        'According to Le Chatelier\'s Principle, what happens to the exothermic equilibrium N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + Heat when temperature is increased?',
        ['Shifts to the right (more NH₃)', 'Shifts to the left (more reactants)', 'Equilibrium constant increases', 'No change occurs'],
        1,
        'In an exothermic reaction, heat acts as a product. Adding heat causes the system to shift toward the endothermic backward direction (left).'
    ),

    // Grade 11 Biology
    q('q_g11_bio_01', 'Grade11', 'Biology', 'Semester1', 'Final',
        'Which metabolic pathway occurs in the cytoplasm and breaks down one molecule of glucose into two pyruvate molecules?',
        ['Glycolysis', 'Krebs Cycle', 'Oxidative phosphorylation', 'Calvin cycle'],
        0,
        'Glycolysis is the anaerobic initial stage of cellular respiration that takes place in the cytosol, yielding 2 pyruvate, 2 ATP, and 2 NADH.'
    ),
    q('q_g11_bio_02', 'Grade11', 'Biology', 'Semester1', 'Final',
        'What are the primary vascular tissues responsible for transporting water and dissolved mineral ions upward from roots in plants?',
        ['Phloem', 'Xylem', 'Cortex', 'Cambium'],
        1,
        'Xylem vessels transport water and dissolved minerals un-directionally upward from the roots to stems and leaves.'
    ),

    // Grade 11 Mathematics
    q('q_g11_math_01', 'Grade11', 'Mathematics', 'Semester1', 'Final',
        'What is the sum of the first 10 terms of an arithmetic progression with first term a₁ = 3 and common difference d = 4?',
        ['180', '210', '240', '420'],
        1,
        'Sn = (n/2)[2a + (n - 1)d] = (10/2)[2(3) + 9(4)] = 5[6 + 36] = 5[42] = 210.'
    ),
    q('q_g11_math_02', 'Grade11', 'Mathematics', 'Semester1', 'Mid1',
        'Solve for x: log₁₀(x) + log₁₀(x - 3) = 1.',
        ['x = 5', 'x = -2', 'x = 2', 'x = 10'],
        0,
        'log₁₀[x(x - 3)] = 1 => x² - 3x = 10 => x² - 3x - 10 = 0 => (x - 5)(x + 2) = 0. Since log argument must be positive, x = 5.'
    ),

    // Grade 11 IT, WEB, Agriculture, English
    q('q_g11_it_01', 'Grade11', 'IT', 'Semester1', 'Final',
        'Which network topology connects every computer to a single central device such as a hub or switch?',
        ['Bus topology', 'Star topology', 'Ring topology', 'Mesh topology'],
        1,
        'In a star topology, each network host is connected to a central hub or switch with a point-to-point connection.'
    ),
    q('q_g11_web_01', 'Grade11', 'WEB', 'Semester1', 'Mid1',
        'Which HTML5 semantic element is used to encapsulate self-contained standalone content such as a blog post or news story?',
        ['<article>', '<section>', '<div>', '<header>'],
        0,
        'The <article> tag specifies independent, self-contained content intended to be independently distributable.'
    ),
    q('q_g11_agri_01', 'Grade11', 'Agriculture', 'Semester1', 'Final',
        'Which soil conservation practice involves plowing and planting across a slope along elevation contour lines to slow runoff?',
        ['Contour farming', 'Deforestation', 'Overgrazing', 'Monoculture'],
        0,
        'Contour farming involves plowing along equal elevation contours, creating small ridges that capture runoff and prevent soil erosion.'
    )
);

// ==========================================
// GRADE 12: NATIONAL EXAMINATION PRETEST & MODEL
// ==========================================
questions.push(
    // Grade 12 Mathematics
    q('q_g12_math_01', 'Grade12', 'Mathematics', 'Pretest', 'Pretest',
        'What is the derivative of f(x) = ln(x² + 4)?',
        ['2x / (x² + 4)', '1 / (x² + 4)', '2 / (x² + 4)', 'x / (x² + 4)'],
        0,
        'Using the chain rule: d/dx[ln(u)] = (1/u) · u\'. Here u = x² + 4, u\' = 2x. Thus f\'(x) = 2x / (x² + 4).'
    ),
    q('q_g12_math_02', 'Grade12', 'Mathematics', 'Pretest', 'Pretest',
        'Evaluate the definite integral: ∫ from 0 to 2 of (3x² + 2x) dx.',
        ['8', '12', '14', '16'],
        1,
        'Antiderivative: [x³ + x²] from 0 to 2 = (2³ + 2²) - (0) = 8 + 4 = 12.'
    ),
    q('q_g12_math_03', 'Grade12', 'Mathematics', 'Model', 'Model',
        'Evaluate the limit: lim (x → 0) [sin(5x) / x].',
        ['0', '1', '5', 'Does not exist'],
        2,
        'Using the standard limit lim(θ → 0)[sin(kθ)/θ] = k, we have lim(x → 0)[sin(5x)/x] = 5.'
    ),
    q('q_g12_math_04', 'Grade12', 'Mathematics', 'Model', 'Model',
        'If vector A = 3i - 4j, what is the magnitude ||A||?',
        ['1', '5', '7', '25'],
        1,
        '||A|| = √(3² + (-4)²) = √(9 + 16) = √25 = 5.'
    ),

    // Grade 12 Physics
    q('q_g12_phys_01', 'Grade12', 'Physics', 'Pretest', 'Pretest',
        'An object of mass 2 kg moves in a horizontal circular path of radius 0.5 m with a constant speed of 4 m/s. What is the centripetal force?',
        ['16 N', '32 N', '64 N', '8 N'],
        2,
        'Centripetal force Fc = (m · v²) / r = (2 · 4²) / 0.5 = (2 · 16) / 0.5 = 32 / 0.5 = 64 N.'
    ),
    q('q_g12_phys_02', 'Grade12', 'Physics', 'Model', 'Model',
        'In the photoelectric effect, increasing the frequency of the incident light above the threshold frequency increases the:',
        ['Number of emitted photoelectrons', 'Maximum kinetic energy of emitted photoelectrons', 'Stopping potential to zero', 'Work function of the metal'],
        1,
        'According to Einstein\'s equation KEmax = hf - Φ, increasing frequency (f) increases the maximum kinetic energy of emitted photoelectrons.'
    ),
    q('q_g12_phys_03', 'Grade12', 'Physics', 'Model', 'Model',
        'Two parallel wires carry currents in the same direction. What force do they exert on each other?',
        ['Attractive magnetic force', 'Repulsive magnetic force', 'Zero force', 'Electrostatic repulsive force only'],
        0,
        'By Ampère\'s force law and the right-hand rule, parallel conductors carrying currents in the same direction attract each other.'
    ),

    // Grade 12 Chemistry
    q('q_g12_chem_01', 'Grade12', 'Chemistry', 'Pretest', 'Pretest',
        'What is the pH of a 0.001 M solution of Hydrochloric acid (HCl)?',
        ['1', '2', '3', '11'],
        2,
        'HCl is a strong monoprotic acid, so [H⁺] = 0.001 M = 10⁻³ M. pH = -log₁₀[H⁺] = -log₁₀(10⁻³) = 3.'
    ),
    q('q_g12_chem_02', 'Grade12', 'Chemistry', 'Model', 'Model',
        'Which functional group characterizes carboxylic acids?',
        ['-OH (Hydroxyl)', '-CHO (Aldehyde)', '-COOH (Carboxyl)', '-CO- (Carbonyl)'],
        2,
        'Carboxylic acids are defined by the carboxyl functional group (-COOH), consisting of a carbonyl group bonded to a hydroxyl group.'
    ),
    q('q_g12_chem_03', 'Grade12', 'Chemistry', 'Model', 'Model',
        'In an electrochemical galvanic cell, oxidation occurs at the:',
        ['Anode', 'Cathode', 'Salt bridge', 'Voltmeter'],
        0,
        'Remember "An Ox and Red Cat": Oxidation always occurs at the Anode, while reduction occurs at the Cathode.'
    ),

    // Grade 12 Biology
    q('q_g12_bio_01', 'Grade12', 'Biology', 'Pretest', 'Pretest',
        'During cellular respiration, in which stage is the majority of ATP generated via oxidative phosphorylation?',
        ['Glycolysis', 'Krebs Cycle (Citric Acid Cycle)', 'Electron Transport Chain', 'Fermentation'],
        2,
        'The Electron Transport Chain and ATP synthase generate approximately 28–34 ATP molecules per glucose through chemiosmosis.'
    ),
    q('q_g12_bio_02', 'Grade12', 'Biology', 'Model', 'Model',
        'Which enzyme unzips and unwinds the DNA double helix during DNA replication?',
        ['DNA Helicase', 'DNA Polymerase', 'DNA Ligase', 'RNA Primase'],
        0,
        'DNA Helicase breaks the hydrogen bonds between complementary base pairs to unwind and separate DNA strands at the replication fork.'
    ),

    // Grade 12 Aptitude (Ethiopian Entrance Exam Standard)
    q('q_g12_apt_01', 'Grade12', 'Aptitude', 'Pretest', 'Pretest',
        'Find the next number in the sequence: 3, 7, 15, 31, 63, ?',
        ['95', '125', '127', '129'],
        2,
        'Each term is calculated by (Previous term × 2) + 1: (63 × 2) + 1 = 126 + 1 = 127.'
    ),
    q('q_g12_apt_02', 'Grade12', 'Aptitude', 'Model', 'Model',
        'If all Zips are Zaps, and some Zaps are Zops, which statement is DEFINITELY true?',
        ['All Zips are Zops', 'Some Zips are Zops', 'Some Zaps are Zips', 'No Zips are Zops'],
        2,
        'Because all Zips are Zaps, the set of Zips is a non-empty subset of Zaps; therefore, it is certain that some Zaps are Zips.'
    ),
    q('q_g12_apt_03', 'Grade12', 'Aptitude', 'Model', 'Model',
        'A train 120 meters long travels at a speed of 60 km/h. How many seconds will it take to pass a telegraph post?',
        ['5.4 seconds', '7.2 seconds', '8.0 seconds', '12.0 seconds'],
        1,
        'Speed = 60 km/h = 60 × (5/18) m/s = 50/3 m/s. Time = Distance / Speed = 120 / (50/3) = (120 × 3) / 50 = 360 / 50 = 7.2 seconds.'
    ),
    q('q_g12_apt_04', 'Grade12', 'Aptitude', 'Pretest', 'Pretest',
        'Complete the analogy: EPIDEMIOLOGY is to DISEASE as SEISMOLOGY is to:',
        ['Stars', 'Earthquakes', 'Fossils', 'Weather'],
        1,
        'Epidemiology is the scientific study of diseases; seismology is the scientific study of earthquakes.'
    ),

    // Grade 12 English
    q('q_g12_eng_01', 'Grade12', 'English', 'Pretest', 'Pretest',
        'Choose the correct word: "The minister\'s argument was so ______ that even his fiercest critics were convinced."',
        ['cogent', 'equivocal', 'spurious', 'tenuous'],
        0,
        '"Cogent" means clear, logical, and convincing.'
    ),
    q('q_g12_eng_02', 'Grade12', 'English', 'Model', 'Model',
        'Identify the figure of speech in: "The angry storm pounded against the trembling wooden cabin."',
        ['Simile', 'Personification', 'Hyperbole', 'Irony'],
        1,
        'Personification attributes human qualities (anger, pounding, trembling) to inanimate things (storm, cabin).'
    )
);

console.log(`Generated ${questions.length} total questions.`);

// Load existing database
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

// Deduplicate and merge: replace or add questions by ID
const questionMap = new Map();
if (db.questions && Array.isArray(db.questions)) {
    db.questions.forEach(q => questionMap.set(q.id, q));
}
questions.forEach(q => questionMap.set(q.id, q));

db.questions = Array.from(questionMap.values());

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully saved db.json with ${db.questions.length} questions!`);
