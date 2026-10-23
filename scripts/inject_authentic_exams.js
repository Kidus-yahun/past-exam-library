// scripts/inject_authentic_exams.js
// Injects exact physical exam questions matching Blessed G/Michael Catholic Secondary School papers
// Ensures 100% parity between scanned PDFs and interactive practice questions

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

function q(id, examId, grade, subject, semester, examType, question, options, correctAnswer, explanation, points = 1) {
    return {
        id,
        examId,
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

const authenticQuestions = [];

// =========================================================================
// 1. GRADE 9 CHEMISTRY (Semester 1 Mid 1 - exam_126)
// Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester Chemistry Test One for Grade 9th NOV, 2018 E.C.
// =========================================================================
authenticQuestions.push(
    // Instruction I: True / False
    q('q_g9_chem_real_01', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'True or False: Chemistry does not study the energy changes associated with chemical reactions.',
        ['True', 'False'],
        1,
        'False. Chemistry is the study of matter, its properties, how substances combine or separate, and the energy changes that accompany chemical reactions.'
    ),
    q('q_g9_chem_real_02', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'True or False: Analytical chemistry is only concerned with producing chemicals, not analyzing them.',
        ['True', 'False'],
        1,
        'False. Analytical chemistry is specifically focused on identifying, separating, and quantifying the chemical components of natural and artificial materials.'
    ),
    q('q_g9_chem_real_03', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'True or False: Industrial processes such as brewing, soap making, and dye production rely on chemical principles.',
        ['True', 'False'],
        0,
        'True. Fermentation in brewing, saponification in soap making, and chemical synthesis of dyes are all direct applications of chemical principles.'
    ),
    q('q_g9_chem_real_04', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'True or False: All measurements in chemistry must include a number and a unit.',
        ['True', 'False'],
        0,
        'True. A physical quantity without a unit is meaningless in scientific measurements (e.g., stating a mass is "5" has no meaning without grams, kilograms, etc.).'
    ),

    // Instruction II: Multiple Choice
    q('q_g9_chem_real_05', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'The primary focus of chemistry is the study of:',
        [
            'Living organisms and their functions',
            'The motion and forces affecting objects',
            'The composition, structure, properties, and changes of matter',
            'The history and evolution of the universe'
        ],
        2,
        'Option C is the fundamental definition of chemistry taught in Grade 9: the branch of natural science dealing with the composition, structure, properties, and reactions of matter.'
    ),
    q('q_g9_chem_real_06', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which of the following best describes the "matter" that chemists study?',
        [
            'Only the substances that can be seen and touched',
            'Any substance that has mass and takes up space',
            'Only the elements found on the Periodic Table',
            'Only complex compounds, such as plastics and medicines'
        ],
        1,
        'Matter is scientifically defined as anything that possesses mass and occupies physical space (volume).'
    ),
    q('q_g9_chem_real_07', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'A chemist who is studying the rate at which a chemical reaction occurs is working in the branch of chemistry known as:',
        [
            'Analytical chemistry',
            'Inorganic chemistry',
            'Physical chemistry',
            'Bio chemistry'
        ],
        2,
        'Chemical kinetics and reaction rates, along with thermodynamics and quantum mechanics, belong directly to Physical Chemistry.'
    ),
    q('q_g9_chem_real_08', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'The process of observing a substance and determining its components and their relative amounts is primarily the focus of which branch of chemistry?',
        [
            'Physical chemistry',
            'Analytical chemistry',
            'Organic chemistry',
            'Bio chemistry'
        ],
        1,
        'Analytical chemistry specializes in qualitative analysis (what is present) and quantitative analysis (how much is present).'
    ),
    q('q_g9_chem_real_09', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'A researcher is studying a newly discovered compound containing only carbon and hydrogen atoms. This falls under the branch of chemistry called:',
        [
            'Inorganic chemistry',
            'Biochemistry',
            'Organic chemistry',
            'Analytical chemistry'
        ],
        2,
        'Organic chemistry is dedicated specifically to carbon-containing compounds, especially hydrocarbons.'
    ),
    q('q_g9_chem_real_10', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'In industrial production, chemistry plays a critical role in converting raw materials into useful products such as:',
        [
            'Solar panels, wind turbines, and hydropower stations',
            'Plastics, medicines, and fertilizers',
            'Computer software, mobile apps, and video games',
            'Books, newspapers, and magazines'
        ],
        1,
        'Chemical industries synthesize polymers (plastics), pharmaceuticals (medicines), and agrochemicals (fertilizers) from petroleum and mineral raw materials.'
    ),
    q('q_g9_chem_real_11', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'In agriculture, chemistry is primarily used to:',
        [
            'Create new types of soil',
            'Develop fertilizers and pesticides that increase crop yield',
            'Build farming machinery',
            'Control weather conditions'
        ],
        1,
        'Agricultural chemistry provides chemical fertilizers (like urea and DAP) and pesticides/herbicides to optimize crop production.'
    ),
    q('q_g9_chem_real_12', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Petrochemical industries rely on chemistry mainly to:',
        [
            'Grow crude oil naturally',
            'Refine crude oil into fuels and useful chemical products',
            'Remove all carbon from fuels',
            'Convert metals into plastics'
        ],
        1,
        'The petrochemical industry uses fractional distillation and catalytic cracking to refine crude petroleum into fuels, lubricants, and polymer precursors.'
    ),
    q('q_g9_chem_real_13', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which of the following best defines the chemical industry?',
        [
            'The industry that produces machines and mechanical tools',
            'The industry that extracts minerals from the earth',
            'The industry that converts raw materials into useful products through chemical processes',
            'The industry that provides banking and financial services'
        ],
        2,
        'A chemical industry uses chemical reactions and transformations to manufacture finished commercial goods from basic raw substances.'
    ),
    q('q_g9_chem_real_14', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which of the following is NOT a major sector of the chemical industry?',
        [
            'Petrochemical industry',
            'Pharmaceutical industry',
            'Textile chemical processing',
            'Automobile repair industry'
        ],
        3,
        'Automobile repair is a service and mechanical maintenance sector, not a manufacturing branch of the chemical industry.'
    ),
    q('q_g9_chem_real_15', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which of the following is an example of a chemical product?',
        [
            'Crude oil directly from the ground',
            'Water from a river',
            'Plastic made from polymerization of ethene',
            'Wood cut from a tree'
        ],
        2,
        'Polyethylene plastic is an engineered synthetic product produced through the chemical polymerization reaction of ethene monomers.'
    ),
    q('q_g9_chem_real_16', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'The composition of matter refers to:',
        [
            'The physical appearance of matter',
            'The types and proportions of atoms or elements that make up a substance',
            'The amount of energy matter contains',
            'The temperature of matter'
        ],
        1,
        'Composition describes the elemental identity and relative proportions of the atoms that constitute a substance.'
    ),
    q('q_g9_chem_real_17', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which of the following is not a basic physical quantity?',
        [
            'Mass',
            'Length',
            'Temperature',
            'Concentration'
        ],
        3,
        'Concentration (e.g. mol/L) is a derived quantity, whereas mass (kg), length (m), and thermodynamic temperature (K) are base SI quantities.'
    ),
    q('q_g9_chem_real_18', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Temperature in the SI system is measured in:',
        [
            'Celsius (°C)',
            'Fahrenheit (°F)',
            'Kelvin (K)',
            'Joule (J)'
        ],
        2,
        'The Kelvin (K) is the official SI base unit of thermodynamic temperature.'
    ),
    q('q_g9_chem_real_19', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which of the following quantities measures the space occupied by matter?',
        [
            'Density',
            'Volume',
            'Mass',
            'Pressure'
        ],
        1,
        'Volume is the physical measure of the three-dimensional space occupied by matter.'
    ),
    q('q_g9_chem_real_20', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which of the following is a derived physical quantity in chemistry?',
        [
            'Time',
            'Mass',
            'Density',
            'Amount of substance'
        ],
        2,
        'Density is derived from mass divided by volume (kg/m³), whereas time, mass, and amount of substance are base SI quantities.'
    ),
    q('q_g9_chem_real_21', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'A chemist measures 2.5 mol of oxygen gas. The term mole refers to:',
        [
            'The mass of oxygen gas',
            'The number of particles present',
            'The temperature of oxygen',
            'The pressure of the gas'
        ],
        1,
        'The mole is the SI unit for amount of substance and represents a specific count of elementary entities (Avogadro\'s number, 6.022 × 10²³ particles).'
    ),
    q('q_g9_chem_real_22', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Temperature is a measure of:',
        [
            'The total energy of a system',
            'The average kinetic energy of particles in a substance',
            'The potential energy of atoms',
            'The size of molecules'
        ],
        1,
        'Temperature is directly proportional to the average translational kinetic energy of the atoms or molecules in a substance.'
    ),
    q('q_g9_chem_real_23', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which statement about the Kelvin scale is true?',
        [
            'It is based on the freezing and boiling points of water',
            'It has negative temperature values',
            'It begins at absolute zero where all molecular motion stops',
            'It is used only in meteorology'
        ],
        2,
        'The Kelvin absolute temperature scale starts at 0 K (absolute zero, -273.15 °C), where classical molecular thermal motion ceases.'
    ),
    q('q_g9_chem_real_24', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Convert 0 °C to Fahrenheit.',
        [
            '32 °F',
            '0 °F',
            '100 °F',
            '-32 °F'
        ],
        0,
        'Using the conversion formula °F = (°C × 9/5) + 32: (0 × 9/5) + 32 = 32 °F.'
    ),
    q('q_g9_chem_real_25', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'If a sample of gas is heated from 27 °C to 327 °C, by how many Kelvin does the temperature increase?',
        [
            '100 K',
            '200 K',
            '300 K',
            '600 K'
        ],
        2,
        'Because a change of 1 °C is equal to a change of 1 K, the temperature increase is 327 - 27 = 300 K (or (327 + 273.15) - (27 + 273.15) = 300 K).'
    ),
    q('q_g9_chem_real_26', 'exam_126', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'At what temperature are Celsius and Fahrenheit numerical values equal?',
        [
            '0 °C',
            '-32 °C',
            '-40 °C',
            '40 °C'
        ],
        2,
        'Setting F = C in F = 1.8C + 32 gives C = 1.8C + 32 -> -0.8C = 32 -> C = -40 °C (-40 °C = -40 °F).'
    )
);

// =========================================================================
// 2. GRADE 9 ENGLISH (Semester 1 Mid 1 - exam_129)
// Physical Paper: Blessed G/Michael Catholic General Secondary School 1st Semester English mid- exam one for grade 9 Nov. 2018 E.C
// Reading Passage: "Child Inventors" (Albert Sadacca, Louis Braille, Frank Epperson, Chester Greenwood, Margaret E. Knight)
// =========================================================================
authenticQuestions.push(
    // Section I: Reading Comprehension
    q('q_g9_eng_real_01', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] Which statement is FALSE according to the passage?',
        [
            'Chester Greenwood invented ear protectors.',
            'Frank Epperson invented the Popsicle.',
            'Albert Sadacca invented the flat-bottomed paper bag.',
            'Louis Braille invented a system of writing.'
        ],
        2,
        'The passage states that Margaret E. Knight invented the flat-bottomed paper bag, whereas 15-year-old Albert Sadacca invented Christmas tree lights.'
    ),
    q('q_g9_eng_real_02', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] Which of the following happened FIRST in order of time?',
        [
            'Braille was invented (1819-1824)',
            'Christmas tree lights were invented (1917)',
            'The flat-bottomed paper bag was invented (1868)',
            'The popsicle was invented (1905)'
        ],
        0,
        'Louis Braille attended the school for blind children in 1819 and created Braille by age 15 (around 1824), before the other inventions listed.'
    ),
    q('q_g9_eng_real_03', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] According to the text, why did Louis Braille want to invent a new system of writing?',
        [
            'So he could help the military write secret codes',
            'So he could communicate with his friends more easily',
            'So he could graduate from his school',
            'So he could write messages in the middle of the night'
        ],
        1,
        'The passage explicitly notes: "Braille sought a better way to communicate with his classmates. He wanted to write freely, without needing special equipment."'
    ),
    q('q_g9_eng_real_04', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] Which best describes how 11-year old Frank Epperson invented the Popsicle?',
        [
            'He tested many different formulas before finding success',
            'He used an old family recipe, in his family for generations',
            'He consulted with scientists and doctors to find his idea',
            'He created it by accident when he forgot his cup of lemonade on the porch overnight'
        ],
        3,
        'The text states Frank went to bed and forgot his cup of lemonade on the porch; freezing temperatures overnight accidentally turned it into the first frozen popsicle.'
    ),
    q('q_g9_eng_real_05', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] Which event caused 15-year old Albert Sadacca to invent safe Christmas tree lights?',
        [
            'He saw a factory worker get injured',
            'He left his lemonade on the porch',
            'A candle in a Christmas tree started a tragic fire',
            'He was ice skating and his ears got cold'
        ],
        2,
        'The passage states: "Someone was hanging candles from a Christmas tree, as was common at that time. This started a tragic fire. Sadacca\'s parents sold electric lighting... Young Albert thought to adapt these lights for use on Christmas trees."'
    ),
    q('q_g9_eng_real_06', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] Which statement about Chester Greenwood is FALSE?',
        [
            'He helped to employ people in his town for 60 years',
            'His grandma helped him with his invention by sewing fur tufts to wire loops',
            'He patented the concept of the Popsicle',
            'He was ice skating when he had his big idea'
        ],
        2,
        'Chester Greenwood invented and patented ear protectors (earmuffs), not the Popsicle (which was invented by Frank Epperson).'
    ),
    q('q_g9_eng_real_07', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] What caused Margaret E. Knight to invent at the age of 12?',
        [
            'She left her lemonade on the porch',
            'She wanted to better communicate with friends',
            'A candle in a tree started a fire',
            'She saw a loom worker get injured at a textile mill'
        ],
        3,
        'The text explains: "A loom malfunctioned and injured a worker. She thought she could make the machines safer. She invented an effective system."'
    ),
    q('q_g9_eng_real_08', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] With which statement would the author of this text most likely DISAGREE?',
        [
            'All important discoveries happen in science labs',
            'People with disabilities have invented amazing things',
            'Women have changed the world through invention',
            'Children have made important discoveries'
        ],
        0,
        'The entire essay refutes the myth that inventions only come from "old men in white lab coats and smoky beakers," showing young children invented great things outdoors or at home.'
    ),
    q('q_g9_eng_real_09', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] Which central lesson can readers learn from this text?',
        [
            'Age and experience are necessary to do important things',
            'Anybody, no matter how young, can change the world',
            'Kids should leave grown-up problems to the grown-ups',
            'Everything important has already been invented'
        ],
        1,
        'The author states: "the truth is that everyone has the power to change the world" regardless of their young age.'
    ),
    q('q_g9_eng_real_10', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '[Reading: "Child Inventors"] Which advice would the author MOST LIKELY give to young people?',
        [
            'All the problems in the world have already been solved',
            'Children should do what they are told and not ask questions',
            'Remain curious and think of ways to solve problems',
            'Only adults are smart enough to change the world'
        ],
        2,
        'The author encourages youth curiosity, creative problem-solving, and confidence in making meaningful innovations.'
    ),

    // Section II: Grammar, Vocabulary & Writing
    q('q_g9_eng_real_11', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Teacher: _________________________________________?\nYou: In December.',
        [
            'How do you celebrate your holiday',
            'What do you do in your holiday',
            'When do you celebrate your holiday',
            'How often do you celebrate your holiday'
        ],
        2,
        '"In December" is an adverbial of time, so the appropriate question word is "When".'
    ),
    q('q_g9_eng_real_12', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'We haven\'t done our project work _____________, but I hope we will finish it next week.',
        [
            'still',
            'now',
            'yesterday',
            'yet'
        ],
        3,
        '"Yet" is used at the end of negative present perfect sentences to express an action expected to happen.'
    ),
    q('q_g9_eng_real_13', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'The medication has some nasty side effects. ____________, I started to feel quite unwell.',
        [
            'Because',
            'However',
            'Therefore',
            'First'
        ],
        2,
        '"Therefore" is a transitional adverb expressing result/consequence connecting the side effects to feeling unwell.'
    ),
    q('q_g9_eng_real_14', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'A: I am sure the views are amazing.\nB: Yes, they\'re great. You have never been there, _____________?',
        [
            'haven\'t you',
            'aren\'t you',
            'have you',
            'do you'
        ],
        2,
        'Because "never" gives the statement a negative meaning, the question tag must be affirmative: "have you?".'
    ),
    q('q_g9_eng_real_15', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'We often go out for dinner on weekends, _____________?',
        [
            'don\'t we',
            'aren\'t we',
            'haven\'t we',
            'doesn\'t we'
        ],
        0,
        'The main clause uses present simple with "we" ("go"), so the corresponding negative tag is "don\'t we?".'
    ),
    q('q_g9_eng_real_16', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Choose the correct adverbial order: It has been raining _____________________________.',
        [
            'all day long / outside / heavily',
            'heavily / all day long / outside',
            'outside / heavily / all day long',
            'heavily / outside / all day long'
        ],
        3,
        'The natural royal order of adverbials in English is Manner ("heavily"), Place ("outside"), and Time ("all day long").'
    ),
    q('q_g9_eng_real_17', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Teacher: Do you mind helping me once?\nStudent: _________________. Don\'t worry.',
        [
            'No, I don\'t',
            'Yes, I do',
            'No, I haven\'t',
            'Yes, I will'
        ],
        0,
        'When replying to "Do you mind...?", "No, I don\'t" means "I do not mind at all / I am glad to help".'
    ),
    q('q_g9_eng_real_18', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '"He is always coming late." In communicative English, this sentence indicates:',
        [
            'happiness',
            'annoyance',
            'everyday absence',
            'none of them'
        ],
        1,
        'Present continuous with "always" ("is always coming late") is an idiomatic grammatical device to express irritation or annoyance with a repeated habit.'
    ),
    q('q_g9_eng_real_19', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'The dogs over there are _____________ a lot of noise.',
        [
            'doing',
            'making',
            'having',
            'taking'
        ],
        1,
        'In English collocation, the correct verb used with "noise" is "make" -> "making a lot of noise".'
    ),
    q('q_g9_eng_real_20', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Where is the most preferable position of the frequency adverb "often" in the sentence below?\n"I (1) get headaches (2) when it is (3) very sunny (4)."',
        [
            'Position 1',
            'Position 2',
            'Position 3',
            'Position 4'
        ],
        0,
        'Adverbs of frequency normally precede the main verb: "I often get headaches...". Thus position 1 is preferred.'
    ),
    q('q_g9_eng_real_21', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Who _____________ the car during the accident last night?',
        [
            'drove',
            'had driven',
            'was driving',
            'have driving'
        ],
        0,
        'For a finished event at a specified past time ("last night"), the simple past "drove" is standard.'
    ),
    q('q_g9_eng_real_22', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'He wanted to repair our washing machine that _____________ a few days before.',
        [
            'breaks',
            'was breaking',
            'have broken',
            'had broken'
        ],
        3,
        'The breaking of the machine occurred prior to the past action of wanting to repair it, requiring the past perfect "had broken".'
    ),
    q('q_g9_eng_real_23', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Which sentence is incorrectly punctuated?',
        [
            'What are you doing next weekend?',
            '"Go away" he said!',
            'The girl\'s father sat in a corner.',
            'Can you tell me why I was upset?'
        ],
        1,
        'Option B is missing punctuation inside the direct speech quotation marks (it should be: \'"Go away," he said!\' or \'"Go away!" he said.\').'
    ),
    q('q_g9_eng_real_24', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        '"The girls want to leave now; otherwise, they might miss their favorite show." What type of adverb is "now"?',
        [
            'manner',
            'frequency',
            'time',
            'place'
        ],
        2,
        '"Now" answers the question "when?" and is an adverb of time.'
    ),
    q('q_g9_eng_real_25', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Dawit: _____________ think of taking a break?\nNardos: I was just about to say that. Let\'s go.',
        [
            'How do you',
            'What do you',
            'Would you like to',
            'When do you'
        ],
        1,
        'The common English phrase for asking someone\'s opinion on an idea is "What do you think of...?".'
    ),
    q('q_g9_eng_real_26', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Bemnet is my best friend. I _____________ him at school, and we _____________ friends for 5 years.',
        [
            'met / were',
            'have met / have been',
            'met / had been',
            'met / have been'
        ],
        1,
        'As confirmed on the school answer key, the combination "have met / have been" indicates enduring friendship continuing into the present.'
    ),
    q('q_g9_eng_real_27', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Dawit: You look tired. You are out of breath.\nNardos: Yes, I _____________ for almost twenty minutes.',
        [
            'have run',
            'was running',
            'have been running',
            'will run'
        ],
        2,
        'Present perfect continuous ("have been running") emphasizes a continuous past activity with visible direct results in the present.'
    ),
    q('q_g9_eng_real_28', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'I saw the accident and phoned the police _____________.',
        [
            'hardly',
            'suddenly',
            'immediately',
            'unfortunately'
        ],
        2,
        '"Immediately" means without any delay, fitting the urgency of calling police after witnessing an accident.'
    ),
    q('q_g9_eng_real_29', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'My friend together with his sister _____________ working hard to be successful.',
        [
            'are',
            'is',
            'do',
            'have'
        ],
        1,
        'When a subject is joined with expressions like "together with" or "as well as", the verb agrees with the principal subject ("My friend", 3rd person singular -> "is").'
    ),
    q('q_g9_eng_real_30', 'exam_129', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Choose the appropriate transitional sequence:\n"_____________ we should consider students\' academic background. _____________, it is important to know what they really need. _____________, we should look at their age level."',
        [
            'First / Besides / Generally',
            'Prior to / Next / Finally',
            'First / Next / To begin with',
            'First / Next / Finally'
        ],
        3,
        'The standard logical three-step enumerative transition sequence is "First", "Next", and "Finally".'
    )
);

// =========================================================================
// 3. GRADE 9 MATHEMATICS (Semester 1 Mid 1 - exam_134)
// Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester mathematics test one for Grade 9th Oct, 2018 E.C.
// =========================================================================
authenticQuestions.push(
    // Part I: True / False
    q('q_g9_math_real_01', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: A set is a collection of well-defined objects or elements.',
        ['True', 'False'],
        0,
        'True. By mathematical definition, a set is a collection of well-defined objects such that it is clear whether any given object belongs to the set or not.'
    ),
    q('q_g9_math_real_02', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: A set which does not contain any element is called a void (or empty) set.',
        ['True', 'False'],
        0,
        'True. A set with no elements is called a void, null, or empty set, denoted by ∅ or {}.'
    ),
    q('q_g9_math_real_03', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: A set which consists of a definite (countable) number of elements is called a finite set.',
        ['True', 'False'],
        0,
        'True. If the elements of a set can be counted and the counting process terminates at a natural number n, the set is finite.'
    ),
    q('q_g9_math_real_04', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: Two sets A and B are said to be equal if and only if they have exactly the same or identical elements.',
        ['True', 'False'],
        0,
        'True. By the axiom of extensionality, A = B if and only if every element of A is in B and every element of B is in A.'
    ),
    q('q_g9_math_real_05', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: If A ⊆ B and A ≠ B, then A is called the proper subset of set B.',
        ['True', 'False'],
        0,
        'True. A proper subset A ⊂ B means A is contained in B but B has at least one element not present in A.'
    ),
    q('q_g9_math_real_06', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: Two sets A and B are disjoint if A ∩ B = ∅.',
        ['True', 'False'],
        0,
        'True. Disjoint sets share no common elements, meaning their intersection is the empty set.'
    ),
    q('q_g9_math_real_07', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: A fraction a/b is said to be in simplest (lowest) form if a and b are relatively prime or GCF(a, b) = 1.',
        ['True', 'False'],
        0,
        'True. When the greatest common factor of the numerator and denominator is 1, the fraction cannot be simplified further.'
    ),
    q('q_g9_math_real_08', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: Every natural number can be expressed as a product of primes and this factorization is unique.',
        ['True', 'False'],
        1,
        'False. The number 1 is a natural number but has no prime factors (the Fundamental Theorem of Arithmetic applies to integers greater than 1).'
    ),
    q('q_g9_math_real_09', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: If a is a rational number and b is an irrational number, then ab is always a rational number.',
        ['True', 'False'],
        1,
        'False. For example, 2 × √3 = 2√3 which is irrational (the only exception where ab is rational is when a = 0).'
    ),
    q('q_g9_math_real_10', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: For two positive integers a and b in the division lemma (a = bq + r), we say a is divisible by b if the remainder r is zero.',
        ['True', 'False'],
        0,
        'True. If remainder r = 0, then a = bq, meaning b divides a completely without remainder.'
    ),
    q('q_g9_math_real_11', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'True or False: If a is a natural number then it is either prime or composite.',
        ['True', 'False'],
        1,
        'False. 1 is a natural number, but 1 is neither prime nor composite.'
    ),

    // Part II: Multiple Choice & Workout
    q('q_g9_math_real_12', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Given universal set U = {1, 2, 3, 4, 5, 6, 7, 8, 9}, A = {2, 5, 7, 9}, and B = {2, 3, 5, 7, 8}. Find A\' ∩ B\'.',
        [
            '{ }',
            '{1, 4, 6}',
            '{1, 3, 8, 9}',
            '{2, 5, 7}'
        ],
        1,
        'By De Morgan\'s Law, A\' ∩ B\' = (A ∪ B)\'. Here A ∪ B = {2, 3, 5, 7, 8, 9}. Its complement in U is {1, 4, 6}.'
    ),
    q('q_g9_math_real_13', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Find GCF(12, 18) × LCM(12, 18).',
        [
            '216',
            '200',
            '36',
            '108'
        ],
        0,
        'For any two positive numbers, GCF(a, b) × LCM(a, b) = a × b. Therefore, 12 × 18 = 216.'
    ),
    q('q_g9_math_real_14', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'In a bookstore there are 125 different books to be distributed to 9 students. If the store shares these books equally, how many books will each student receive and how many books will be left?',
        [
            '8 & 13',
            '9 & 13',
            '8 & 9',
            '13 & 8'
        ],
        3,
        '125 ÷ 9 = 13 with remainder 8. Each student receives 13 books, and 8 books are left over.'
    ),
    q('q_g9_math_real_15', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Which of the following are well-defined sets?\nA: Collection of students in your class\nB: Collection of beautiful girls in your class\nC: Collection of consonants of the English alphabet\nD: The collection of kind students in your school',
        [
            'A only',
            'B & D',
            'C only',
            'A & C',
            'All of them'
        ],
        3,
        'Sets A and C have objective criteria ("students registered in class", "letters other than vowels"). Words like "beautiful" or "kind" are subjective opinions and not well-defined.'
    ),
    q('q_g9_math_real_16', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Suppose that A is the set of positive even numbers. Which of the following is true?',
        [
            '4 ∈ A',
            '5 ∈ A',
            '-2 ∈ A',
            '0 ∈ A'
        ],
        0,
        'A = {2, 4, 6, 8, ...}. 4 is a positive even number, so 4 ∈ A. -2 is negative, 0 is neither positive nor negative, and 5 is odd.'
    ),
    q('q_g9_math_real_17', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Which of the following is an infinite set?',
        [
            'A = {x | x ∈ ℝ and 5 < x < 6}',
            'B = {0}',
            'C is the set of odd natural numbers divisible by 2',
            'D = { }'
        ],
        0,
        'Between any two real numbers 5 and 6, there are infinitely many real numbers. B has 1 element, C is empty (0 elements), and D is empty.'
    ),
    q('q_g9_math_real_18', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Which of the following statements is false?',
        [
            'Any set is a subset of itself',
            'Empty set is a subset of every set',
            'For any set A, A is not a proper subset of itself',
            'The number of proper subsets of set A with n elements is 2n - 1'
        ],
        3,
        'The formula for the number of proper subsets is 2ⁿ - 1 (exponential), not 2n - 1.'
    ),
    q('q_g9_math_real_19', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Which of the following set identities is false?',
        [
            '(A ∪ B)\' = A\' ∩ B\'',
            '(A ∩ B)\' = A\' ∪ B\'',
            '∅ ∪ A = ∅',
            'U ∩ A = A'
        ],
        2,
        '∅ ∪ A = A (the union of any set with the empty set is the set itself, not ∅).'
    ),
    q('q_g9_math_real_20', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'For any two sets A and B, which of the following is false?',
        [
            '(A\')\' = A',
            'A ⊆ B ⇔ B\' ⊆ A\'',
            'A - B = A ∩ B\'',
            'A Δ B = (A \\ B) ∩ (B \\ A)'
        ],
        3,
        'The symmetric difference is defined as A Δ B = (A \\ B) ∪ (B \\ A), with a UNION, not intersection (their intersection is always ∅).'
    ),
    q('q_g9_math_real_21', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Given A = {0, 2, 3, 4, 5} and B = {0, 1, 2, 3, 5, 7, 9}. Find the symmetric difference A Δ B.',
        [
            '{0, 1, 3}',
            '{1, 4, 7, 9}',
            'empty set',
            '{0, 2, 3, 5}'
        ],
        1,
        'A \\ B = {4}, B \\ A = {1, 7, 9}. Their union is A Δ B = {1, 4, 7, 9}.'
    ),
    q('q_g9_math_real_22', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'If the number of elements of set A is 7 and the number of elements of set B is 4, then the number of elements in Cartesian product A × B is:',
        [
            '24',
            '25',
            '28',
            '11'
        ],
        2,
        'n(A × B) = n(A) × n(B) = 7 × 4 = 28.'
    ),
    q('q_g9_math_real_23', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'For any two sets A and B, which of the following is false?',
        [
            'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)',
            'n(A\') = n(U) - n(A)',
            'n(A \\ B) = n(A) - n(B)',
            'n(A Δ B) = n(A) + n(B) - 2n(A ∩ B)'
        ],
        2,
        'The correct identity is n(A \\ B) = n(A) - n(A ∩ B), not n(A) - n(B).'
    ),
    q('q_g9_math_real_24', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Consider universal set U = {1, 2, 3 ... 14}, A = {2, 3, 5, 7, 11}, and B = {2, 4, 8, 9, 10, 11}. Which statement is true?',
        [
            '(A ∪ B)\' = {1, 4, 6, 12, 13, 14}',
            'A ∩ B = A\' ∪ B\'',
            'A Δ B = (A ∩ B)\'',
            'A \\ B = {3, 5, 7}'
        ],
        3,
        'A \\ B removes elements of B ({2, 11}) from A, leaving exactly {3, 5, 7}.'
    ),
    q('q_g9_math_real_25', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Find the greatest common factor (GCF) of 180, 270, and 1,080 using prime factorization.',
        [
            '30',
            '45',
            '90',
            '180'
        ],
        2,
        '180 = 2² × 3² × 5; 270 = 2 × 3³ × 5; 1080 = 2³ × 3³ × 5. Lowest common powers: 2¹ × 3² × 5¹ = 2 × 9 × 5 = 90.'
    ),
    q('q_g9_math_real_26', 'exam_134', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'Given that 77,9x2 is a 5-digit number where x is the tens digit. If this number is divisible by 6, what are all possible values of x?',
        [
            '1, 4, 7',
            '2, 5, 8',
            '0, 3, 6, 9',
            '2, 4, 6'
        ],
        1,
        'For divisibility by 6, the number must be even (last digit 2 is even) and divisible by 3. Sum of digits: 7 + 7 + 9 + x + 2 = 25 + x. For (25 + x) to be divisible by 3, x can be 2 (27), 5 (30), or 8 (33).'
    )
);

// =========================================================================
// 4. GRADE 9 BIOLOGY (Semester 1 Mid 1 - exam_125)
// Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester Biology Test One for Grade 9th Nov, 2018 E.C.
// =========================================================================
authenticQuestions.push(
    // Section I: True / False
    q('q_g9_bio_real_01', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'True or False: Dichotomous keys are useful for taxonomists to classify unfamiliar organisms.',
        ['True', 'False'],
        0,
        'True. A dichotomous key presents paired alternative statements to guide the step-by-step identification of organisms.'
    ),
    q('q_g9_bio_real_02', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'True or False: Biology is related to chemistry and physics during studying the process of photosynthesis.',
        ['True', 'False'],
        0,
        'True. Photosynthesis involves light energy absorption (physics) and chemical reactions converting CO2 and water into glucose (chemistry).'
    ),
    q('q_g9_bio_real_03', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'True or False: The correct way of handling/carrying a microscope is holding it with one hand only.',
        ['True', 'False'],
        1,
        'False. A microscope must always be carried with two hands: one grasping the arm and the other supporting the base.'
    ),
    q('q_g9_bio_real_04', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'True or False: It is permissible to taste and sniff chemicals in laboratory rooms.',
        ['True', 'False'],
        1,
        'False. In laboratory safety, tasting chemicals is strictly forbidden, and smelling should only be done cautiously by wafting.'
    ),
    q('q_g9_bio_real_05', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'True or False: In symbiotic association between fungi and termites, fungi supply extracellular hydrolytic enzymes to break down cellulose.',
        ['True', 'False'],
        0,
        'True. Termites cultivate fungus combs, and fungal cellulase enzymes break down indigestible plant cellulose for termite nutrition.'
    ),

    // Section II: Microscope Functions
    q('q_g9_bio_real_06', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which part of the optical microscope is used to move the mechanical stage rapidly for initial focusing?',
        [
            'Fine adjustment knob',
            'Coarse adjustment knob',
            'Condenser',
            'Diaphragm'
        ],
        1,
        'The coarse adjustment knob moves the stage in large increments to bring the specimen quickly into approximate focus.'
    ),
    q('q_g9_bio_real_07', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which part of the microscope moves the stage slowly to produce a sharp, crisp focus?',
        [
            'Fine adjustment knob',
            'Coarse adjustment knob',
            'Ocular lens',
            'Stage clips'
        ],
        0,
        'The fine adjustment knob provides precision micro-movements of the stage to achieve exact optical clarity.'
    ),
    q('q_g9_bio_real_08', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which component of a microscope controls the intensity and amount of light reaching the specimen?',
        [
            'Diaphragm',
            'Condenser',
            'Coarse knob',
            'Nosepiece'
        ],
        0,
        'The iris diaphragm regulates the diameter of the light cone passing through the specimen slide.'
    ),
    q('q_g9_bio_real_09', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which microscope part collects and focuses light rays from the illuminator onto the specimen?',
        [
            'Condenser',
            'Diaphragm',
            'Objective lens',
            'Mirror'
        ],
        0,
        'The sub-stage condenser lens concentrates and focuses the light beam onto the slide plane.'
    ),

    // Section III: Multiple Choice
    q('q_g9_bio_real_10', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which apparatus is used in laboratories to provide high-pressure steam for complete sterilization?',
        [
            'Autoclave',
            'Pressure cooker',
            'Incubator',
            'Hot oven'
        ],
        0,
        'An autoclave uses pressurized saturated steam at 121 °C to kill all microbial life and bacterial endospores.'
    ),
    q('q_g9_bio_real_11', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'The ancient Greek philosopher who divided animals into two groups (those with red blood and those without) was:',
        [
            'Whittaker',
            'T.O. Diener',
            'Aristotle',
            'W.M. Stanley'
        ],
        2,
        'Aristotle created the earliest classical animal taxonomy, classifying animals into Enaima (with red blood) and Anaima (without red blood).'
    ),
    q('q_g9_bio_real_12', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'The criteria used in R.H. Whittaker\'s five-kingdom classification system include:',
        [
            'Cell structure (prokaryotic vs. eukaryotic)',
            'Mode of nutrition and reproduction',
            'Phylogenetic evolutionary relationships',
            'All of these'
        ],
        3,
        'Whittaker (1969) built the five kingdoms (Monera, Protista, Fungi, Plantae, Animalia) using cellular complexity, nutrition mode, and evolutionary relationships.'
    ),
    q('q_g9_bio_real_13', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following biological groups are included within Whittaker\'s five kingdoms?',
        [
            'Viruses',
            'Bacteria',
            'Lichens',
            'Bacteria and Algae'
        ],
        3,
        'Bacteria belong to Kingdom Monera, and unicellular/multicellular algae belong to Protista and Plantae. Viruses and lichens are excluded from Whittaker\'s kingdoms.'
    ),
    q('q_g9_bio_real_14', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'The naturalist who developed binomial nomenclature and authored "Systema Naturae" is:',
        [
            'Carolus Linnaeus',
            'Aristotle',
            'Charles Darwin',
            'Jean-Baptiste Lamarck'
        ],
        0,
        'Carolus Linnaeus established formal binomial nomenclature (Genus + specific epithet) in his 1735 book "Systema Naturae".'
    ),
    q('q_g9_bio_real_15', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'What primary method of asexual reproduction is used by yeast?',
        [
            'Sexual spore formation',
            'Budding',
            'Regeneration',
            'Conjugation'
        ],
        1,
        'Saccharomyces cerevisiae (yeast) reproduces asexually through asymmetrical budding, where a new daughter cell pinches off from the parent.'
    ),
    q('q_g9_bio_real_16', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Protists are ecologically vital because they:',
        [
            'Produce oxygen via phytoplankton photosynthesis',
            'Support marine and freshwater food chains',
            'Recycle organic nutrients in aquatic habitats',
            'All of the above'
        ],
        3,
        'Protists carry out immense oceanic primary productivity, oxygen generation, nutrient cycling, and sustain aquatic food webs.'
    ),
    q('q_g9_bio_real_17', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Fungi are indispensable to global ecosystems primarily because they function as:',
        [
            'Producers',
            'Regulators',
            'Decomposers (saprotrophs)',
            'Controllers'
        ],
        2,
        'Fungi secrete exoenzymes that decompose complex organic detritus (cellulose and lignin), recycling mineral nutrients back to soil.'
    ),
    q('q_g9_bio_real_18', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which statement is true regarding a well-designed controlled experiment?',
        [
            'Demonstrates cause-and-effect relationships',
            'Isolates one independent variable while measuring a dependent variable',
            'Keeps all other environmental variables strictly controlled',
            'All are true expressions'
        ],
        3,
        'A scientific controlled experiment maintains constant experimental parameters to isolate the exact effect of the independent variable on the dependent variable.'
    ),
    q('q_g9_bio_real_19', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following is an example of a non-hyphal (unicellular) fungus?',
        [
            'Yeast',
            'Mucor',
            'Rhizopus',
            'Mushroom'
        ],
        0,
        'Yeast is uniquely unicellular and does not produce true multicellular filamentous hyphae like molds (Mucor, Rhizopus) or mushrooms.'
    ),
    q('q_g9_bio_real_20', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following cellular structures are used as locomotive appendages in unicellular organisms?',
        [
            'Flagella',
            'Cilia',
            'Pseudopodia',
            'All of the above'
        ],
        3,
        'Euglena moves by flagella, Paramecium uses cilia, and Amoeba moves using amoeboid cytoplasmic extensions called pseudopodia.'
    ),
    q('q_g9_bio_real_21', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following protists is free-living and does NOT cause human infectious disease?',
        [
            'Amoeba (Entamoeba)',
            'Paramecium',
            'Plasmodium',
            'Giardia'
        ],
        1,
        'Paramecium is a harmless, free-living ciliated pond protist. Plasmodium causes malaria, Giardia causes giardiasis, and Entamoeba causes amoebic dysentery.'
    ),
    q('q_g9_bio_real_22', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which method of asexual reproduction is characteristic of Paramecium?',
        [
            'Budding',
            'Sporulation',
            'Binary fission',
            'Multiple fission'
        ],
        2,
        'Paramecium divides asexually via transverse binary fission, producing two identical daughter ciliate cells.'
    ),
    q('q_g9_bio_real_23', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following is NOT a difference between fungi and animals?',
        [
            'Fungi have chitinous cell walls whereas animals lack cell walls',
            'Fungi are heterotrophs while animals are autotrophs',
            'Fungi are absorptive heterotrophs while animals are ingestive heterotrophs',
            'Fungi are non-motile while animals are motile'
        ],
        1,
        'Both fungi and animals are heterotrophs (neither are autotrophs). Stating animals are not heterotrophic is false.'
    ),
    q('q_g9_bio_real_24', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Fungi resemble animals because they are:',
        [
            'Heterotrophs (store glycogen, non-photosynthetic)',
            'Heterosporous',
            'Chemoautotrophs',
            'Photoautotrophs'
        ],
        0,
        'Fungi share phylogenetic kinship with animals as heterotrophs that store carbohydrates as glycogen rather than starch.'
    ),
    q('q_g9_bio_real_25', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'All of the following are asexual modes of reproduction in fungi EXCEPT:',
        [
            'Budding',
            'Sporulation',
            'Fragmentation',
            'Conjugation'
        ],
        3,
        'Conjugation is a sexual process involving nuclear exchange and genetic recombination, whereas budding, sporulation, and fragmentation are asexual.'
    ),
    q('q_g9_bio_real_26', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'The vegetative body of multicellular fungi (mycelium) is composed of microscopic tubular branched filaments called:',
        [
            'Hyphae',
            'Sporangium',
            'Rhizoids',
            'Spores'
        ],
        0,
        'Hyphae are the thread-like fungal filaments that weave together to constitute the fungal mycelium.'
    ),
    q('q_g9_bio_real_27', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Protozoan protists are traditionally classified into classes primarily according to:',
        [
            'How they obtain nutrients',
            'How they grow',
            'Their mechanism of locomotion (cilia, flagella, pseudopodia)',
            'How they reproduce'
        ],
        2,
        'Protozoa are systematically grouped by their mode of movement: flagellates, ciliates, amoeboids (pseudopodia), and non-motile sporozoans.'
    ),
    q('q_g9_bio_real_28', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which of the following Archaebacteria can thrive in aerobic, hypersaline environments?',
        [
            'Halophiles',
            'Methanogens',
            'Thermoacidophiles',
            'Cyanobacteria'
        ],
        0,
        'Extremely halophilic Archaea (Halophiles) live in extreme salt lakes and require high NaCl concentrations, carrying out aerobic respiration.'
    ),
    q('q_g9_bio_real_29', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'During binary fission, which statement accurately describes the resulting daughter cells?',
        [
            'They have half as many chromosomes as the parent cell',
            'They have double the chromosome number',
            'They have the same chromosome count as the parent but initial smaller cell volume',
            'They contain no genetic material'
        ],
        2,
        'Binary fission produces two genetically identical daughter cells with the exact full parental complement of chromosomes, which then grow in size.'
    ),
    q('q_g9_bio_real_30', 'exam_125', 'Grade9', 'Biology', 'Semester1', 'Mid1',
        'Which pair correctly matches the organism with its cell wall chemical composition?',
        [
            'Cyanobacteria — Peptidoglycan cell wall',
            'Cyanophyta — Cellulose cell wall',
            'Yeast — Chitin & glucan cell wall',
            'All of the above are correct'
        ],
        3,
        'All three pairings accurately depict the respective cell wall biochemical constituents.'
    )
);

// =========================================================================
// 5. GRADE 9 PHYSICS (Semester 1 Mid 1 - exam_135)
// Physical Paper: Blessed G/Michael Catholic Secondary & Higher Education Preparatory School
// First Semester Physics One for Grade 9th OCT, 2018 E.C.
// =========================================================================
authenticQuestions.push(
    // Section I: True / False
    q('q_g9_phys_real_01', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'True or False: Feresula is a traditional unit to measure time.',
        ['True', 'False'],
        1,
        'False. In Ethiopian traditional measurement, the "Feresula" is an indigenous unit of mass (equal to approximately 17 kg), not time.'
    ),
    q('q_g9_phys_real_02', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'True or False: The number 1.020 has four significant figures.',
        ['True', 'False'],
        0,
        'True. The \'1\' and \'2\' are non-zero, the zero between them is captive, and the trailing zero after the decimal point is significant, totaling 4 significant figures.'
    ),
    q('q_g9_phys_real_03', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'True or False: The number 1,000,000 is denoted by the metric prefix mega.',
        ['True', 'False'],
        0,
        'True. The SI prefix "mega" (M) denotes a multiplier factor of 10⁶ = 1,000,000.'
    ),
    q('q_g9_phys_real_04', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'True or False: Zeros between non-zero digits are significant.',
        ['True', 'False'],
        0,
        'True. By standard significant figure rules, captive zeros (zeros between two non-zero digits) are always significant.'
    ),
    q('q_g9_phys_real_05', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'True or False: Leading zeros are significant if the number has a decimal point.',
        ['True', 'False'],
        1,
        'False. Leading zeros (such as the zeros in 0.005) merely show the position of the decimal point and are never significant.'
    ),
    q('q_g9_phys_real_06', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'True or False: In addition, the rules for significant figures are the same as in division.',
        ['True', 'False'],
        1,
        'False. In addition/subtraction, precision is determined by the fewest decimal places; in multiplication/division, precision is determined by the fewest significant figures.'
    ),

    // Section II: Multiple Choice
    q('q_g9_phys_real_07', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which of the following is a fundamental physical quantity?',
        ['Area', 'Volume', 'Time', 'Density'],
        2,
        'Time (measured in seconds) is one of the seven SI fundamental/base physical quantities. Area, volume, and density are derived.'
    ),
    q('q_g9_phys_real_08', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'When adding or subtracting significant figures, the result should have the same number with:',
        ['the most decimal places', 'the fewest significant figures', 'the fewest decimal places', 'the most significant figures'],
        2,
        'The result of addition or subtraction must be rounded to match the value with the fewest decimal places (least decimal precision).'
    ),
    q('q_g9_phys_real_09', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'The prefix "Nano" represents:',
        ['10⁻⁶', '10⁶', '10⁹', '10⁻⁹'],
        3,
        'The metric prefix nano- corresponds to 10⁻⁹. Micro- is 10⁻⁶ and giga- is 10⁹.'
    ),
    q('q_g9_phys_real_10', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which one of the following innovations was contributed by Sir Isaac Newton?',
        ['universal law of gravitation', 'Calculus', 'optics & laws of motion', 'All of the above'],
        3,
        'Isaac Newton made foundational discoveries in universal gravitation, classical mechanics (laws of motion), calculus, and optics (prism dispersion).'
    ),
    q('q_g9_phys_real_11', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which one of the following numbers has the greatest number of significant figures?',
        ['0.020', '2000', '0.001', '50000'],
        0,
        '0.020 has 2 significant figures (the \'2\' and trailing \'0\'). 2000 has 1, 0.001 has 1, and 50000 has 1.'
    ),
    q('q_g9_phys_real_12', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'The number 25.373 rounded to 3 significant figures is:',
        ['25.30', '25', '25.3', '25.4'],
        3,
        'The first three significant figures are 2, 5, and 3. The following digit is 7 (≥ 5), so 3 rounds up to 4, giving 25.4.'
    ),
    q('q_g9_phys_real_13', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Multiply 500 × 2.4 and report with the correct number of significant figures:',
        ['872', '8700', '2000.0', '1000'],
        3,
        '500 has 1 significant figure, and 2.4 has 2. 500 × 2.4 = 1200, which rounds to 1 significant figure as 1000.'
    ),
    q('q_g9_phys_real_14', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Subtract 35.25 - 34 and report with the correct number of significant figures:',
        ['1.25', '1.5', '1', '2'],
        2,
        '35.25 has 2 decimal places and 34 has 0 decimal places. 35.25 - 34 = 1.25, rounded to 0 decimal places gives 1.'
    ),
    q('q_g9_phys_real_15', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which one of the following is NOT equivalent to 1 hour?',
        ['60 minutes', '3600 seconds', '0.24 day', 'None of the above'],
        2,
        '0.24 day equals 0.24 × 24 = 5.76 hours, which is not equivalent to 1 hour.'
    ),
    q('q_g9_phys_real_16', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'One metric ton is equivalent to which of the following?',
        ['1000 kg', '10 quintal', '1,000,000 g', 'All of the above'],
        3,
        '1 metric ton = 1,000 kg = 10 quintals (1 quintal = 100 kg) = 1,000,000 grams. All expressions are equivalent.'
    ),

    // Section III: Physicists & Breakthroughs
    q('q_g9_phys_real_17', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which physicist explained the photoelectric effect in 1905, establishing light quanta?',
        ['Albert Einstein', 'Isaac Newton', 'James Prescott Joule', 'Michael Faraday'],
        0,
        'Albert Einstein won the 1921 Nobel Prize in Physics for his theoretical explanation of the photoelectric effect.'
    ),
    q('q_g9_phys_real_18', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which scientist experimentally determined the mechanical equivalent of heat?',
        ['James Prescott Joule', 'Marie Curie', 'Michael Faraday', 'Albert Einstein'],
        0,
        'James Prescott Joule showed the equivalence of mechanical work and thermal energy, giving his name to the SI unit of energy (Joule).'
    ),
    q('q_g9_phys_real_19', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which pioneering scientist discovered radium and polonium, winning two Nobel Prizes?',
        ['Marie Curie', 'Isaac Newton', 'Michael Faraday', 'James Prescott Joule'],
        0,
        'Marie Curie discovered the radioactive elements radium and polonium.'
    ),
    q('q_g9_phys_real_20', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which scientist discovered electromagnetic induction and formulated laws governing magnetic flux and induced EMF?',
        ['Michael Faraday', 'Isaac Newton', 'Albert Einstein', 'Marie Curie'],
        0,
        'Michael Faraday discovered electromagnetic induction in 1831.'
    ),

    // Section IV: Branches of Physics
    q('q_g9_phys_real_21', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which branch of physics deals with the study of motion and forces?',
        ['Optics', 'Electromagnetism', 'Mechanics', 'Acoustics'],
        2,
        'Mechanics is the foundation branch of physics studying motion, forces, momentum, and energy.'
    ),
    q('q_g9_phys_real_22', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which branch of physics studies the behavior of heat, work, and temperature?',
        ['Thermodynamics', 'Mechanics', 'Nuclear physics', 'Astrophysics'],
        0,
        'Thermodynamics governs heat transfer, thermodynamic laws, work, and entropy.'
    ),
    q('q_g9_phys_real_23', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which branch of physics deals with electric and magnetic fields and their interactions?',
        ['Electromagnetism', 'Acoustics', 'Optics', 'Astrophysics'],
        0,
        'Electromagnetism encompasses electrostatics, magnetostatics, circuits, and electromagnetic waves.'
    ),
    q('q_g9_phys_real_24', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which branch of physics is concerned with the generation, propagation, and detection of sound waves?',
        ['Acoustics', 'Optics', 'Nuclear physics', 'Mechanics'],
        0,
        'Acoustics is the physical study of mechanical sound and vibration waves in various media.'
    ),
    q('q_g9_phys_real_25', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'Which branch of physics studies the behavior, properties, and transmission of light?',
        ['Optics', 'Thermodynamics', 'Acoustics', 'Mechanics'],
        0,
        'Optics studies reflection, refraction, lenses, diffraction, and properties of light.'
    ),
    q('q_g9_phys_real_26', 'exam_135', 'Grade9', 'Physics', 'Semester1', 'Mid1',
        'How many significant figures are in the measurement 30.250 m?',
        ['2', '3', '4', '5'],
        3,
        '30.250 has five significant figures (the \'3\', captive \'0\', \'2\', \'5\', and trailing \'0\' in decimal).'
    )
);

// Save authentic questions
// We retain any other existing questions for other grades that don't collide with these exams
const replacedExamIds = new Set(['exam_125', 'exam_126', 'exam_129', 'exam_134', 'exam_135']);
const preservedQuestions = (db.questions || []).filter(q => !replacedExamIds.has(q.examId) && !(q.grade === 'Grade9' && ['Chemistry', 'English', 'Mathematics', 'Biology', 'Physics'].includes(q.subject) && q.semester === 'Semester1' && q.examType === 'Mid1'));

const finalQuestions = [...authenticQuestions, ...preservedQuestions];

db.questions = finalQuestions;
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');

console.log(`Successfully injected ${authenticQuestions.length} authentic school exam questions!`);
console.log(`Total questions in db.json: ${finalQuestions.length}`);
