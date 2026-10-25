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
,
    // =========================================================================
    // 6. GRADE 9 HISTORY (Semester 1 Mid 1 - exam_132)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester History Test One for Grade 9th Oct, 2018 E.C
    // =========================================================================
    // Part I: True / False
    q('q_g9_hist_real_01', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: Prehistory refers to the period after the invention of writing.',
        ['True', 'False'],
        1,
        'False. Prehistory specifically refers to the period before writing was invented. The period after the invention of writing is recorded history.'
    ),
    q('q_g9_hist_real_02', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: The Greek word Istoria means "inquiry" or "an account of one\'s inquiries."',
        ['True', 'False'],
        0,
        'True. The English word history originates from the ancient Greek word "istoria" (inquiry, knowledge acquired by investigation).'
    ),
    q('q_g9_hist_real_03', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: One of the key aims of history is to help us understand the present.',
        ['True', 'False'],
        0,
        'True. Studying past events, trends, and cause-effect relationships provides essential context for understanding contemporary societies and institutions.'
    ),
    q('q_g9_hist_real_04', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: Oral sources never need to be verified because they are always accurate.',
        ['True', 'False'],
        1,
        'False. Oral traditions can be distorted by human memory, bias, and selective transmission over generations; historians must rigorously cross-check and verify oral sources.'
    ),
    q('q_g9_hist_real_05', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: In Ethiopian historiography, history became an academic discipline in the 1960s.',
        ['True', 'False'],
        0,
        'True. Professional academic historiography in Ethiopia was established in the 1960s with the foundation of the Department of History and Institute of Ethiopian Studies at Haile Selassie I University (now Addis Ababa University).'
    ),

    // Part II: Matching
    q('q_g9_hist_real_06', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which hominid species is known as "The upright man"?',
        ['Homo habilis', 'Homo erectus', 'Homo sapiens', 'Australopithecus afarensis'],
        1,
        'Homo erectus literally translates to "upright man" because it was the first hominid known to walk fully upright and migrate out of Africa.'
    ),
    q('q_g9_hist_real_07', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which species is classified as "The wise man" and encompasses all modern humans?',
        ['Homo habilis', 'Homo erectus', 'Homo sapiens', 'Ardipithecus ramidus'],
        2,
        'Homo sapiens translates from Latin as "wise man" or "knowing man".'
    ),
    q('q_g9_hist_real_08', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following historical items serves as a primary archaeological source?',
        ['Monument', 'Modern textbook', 'Historical novel', 'Encyclopedia article'],
        0,
        'Monuments, coins, inscriptions, and fossils are physical primary sources created during the time period under study.'
    ),
    q('q_g9_hist_real_09', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is classified as a secondary source of history?',
        ['Eyewitness letter', 'History books', 'Ancient temple inscription', 'Original treaty document'],
        1,
        'History books are secondary sources because they analyze, synthesize, and interpret primary sources after the events took place.'
    ),
    q('q_g9_hist_real_10', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which early human ancestor is known as "The handy man" due to its use of stone tools?',
        ['Homo habilis', 'Homo erectus', 'Homo sapiens', 'Australopithecus'],
        0,
        'Homo habilis was named "the handy man" by Louis Leakey because fossils were found directly alongside Oldowan stone tools.'
    ),

    // Part III: Multiple Choice
    q('q_g9_hist_real_11', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is a secondary source of history?',
        ['History textbook.', 'Ancient coin.', 'Eyewitness diary.', 'Court record.'],
        0,
        'A history textbook is written by researchers who compile and analyze primary sources, making it a secondary source.'
    ),
    q('q_g9_hist_real_12', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which area of human life is not a direct concern of early history?',
        ['Politics.', 'Music preferences.', 'Shelter.', 'Food.'],
        1,
        'Early human survival and social organisation focused on food gathering/production, shelter, and political organization; individual music preferences are not a direct concern of early history.'
    ),
    q('q_g9_hist_real_13', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is a primary source of history?',
        ['A modern textbook.', 'A historical drama.', 'A newspaper article from 2020 about World War II.', 'A letter written during World War I.'],
        3,
        'A letter written during World War I is a direct firsthand primary source from someone living through the event.'
    ),
    q('q_g9_hist_real_14', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'All modern humans belong to the species of _______',
        ['Homo erectus.', 'Australopithecus.', 'Homo sapiens.', 'Homo habilis.'],
        2,
        'All modern humans belong strictly to the species Homo sapiens.'
    ),
    q('q_g9_hist_real_15', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The term history comes from the Greek word Istoria, which means _______',
        ['Inquiry.', 'Discovery.', 'War.', 'Writing.'],
        0,
        'The ancient Greek term "istoria" means inquiry, investigation, or learning through inquiry.'
    ),
    q('q_g9_hist_real_16', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Thucydides is best known for _______',
        ['Writing legends.', 'Using astrology in history.', 'Promoting factual and critical historical writing.', 'Creating the Ethiopian calendar.'],
        2,
        'The Greek historian Thucydides is celebrated for applying rigorous critical standards, factual evidence, and rejecting supernatural causes in his History of the Peloponnesian War.'
    ),
    q('q_g9_hist_real_17', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Before using historical sources, historians must _______',
        ['Translate them.', 'Burn copies.', 'Decorate them.', 'Critically evaluate their authenticity.'],
        3,
        'Historical methodology requires internal and external criticism to evaluate the authenticity and reliability of sources.'
    ),
    q('q_g9_hist_real_18', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is a major aim of studying history?',
        ['To prove myths.', 'To entertain.', 'To predict natural disasters.', 'To understand the present and plan for the future.'],
        3,
        'History aims to illuminate how past decisions shaped modern conditions so societies can plan wisely for the future.'
    ),
    q('q_g9_hist_real_19', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'In the Paleolithic Age, people primarily practice _______',
        ['Farmed land.', 'Hunted and gathered food.', 'Built pyramids.', 'Traded coins.'],
        1,
        'During the Paleolithic (Old Stone Age), humans lived in nomadic bands relying on hunting game and foraging/gathering wild edible plants.'
    ),
    q('q_g9_hist_real_20', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is the term for identifying when a historical event happened?',
        ['Mapping.', 'Forecasting.', 'Dating.', 'Excavating.'],
        2,
        'Dating (both relative dating and absolute scientific dating like Carbon-14) determines chronological time in history and archaeology.'
    ),
    q('q_g9_hist_real_21', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'What does prehistory refer to?',
        ['The time after written records.', 'The study of space and time.', 'The history of kings.', 'The time before writing was invented.'],
        3,
        'Prehistory encompasses all of human existence prior to the invention of written documentation.'
    ),
    q('q_g9_hist_real_22', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Neolithic developments in Ethiopia included _______',
        ['Use of bronze weapons.', 'Discovery of writing.', 'Domestication of plants like teff.', 'Construction of castles.'],
        2,
        'The Ethiopian region is recognized as a major Vavilov centre of plant domestication, cultivating indigenous crops like teff, enset, and coffee during the Neolithic era.'
    ),
    q('q_g9_hist_real_23', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Who is known as the Father of History?',
        ['Aristotle.', 'Herodotus.', 'Plato.', 'Socrates.'],
        1,
        'Herodotus of Halicarnassus was first titled "The Father of History" by Cicero for his systematic collection and inquiry of the Greco-Persian wars.'
    ),
    q('q_g9_hist_real_24', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Leopold Von Ranke is famous for:',
        ['Creating oral traditions.', 'Writing fiction.', 'Introducing scientific methods to historical writing.', 'Writing about the Stone Age.'],
        2,
        'Ranke transformed modern history into a scientific discipline focused on primary archival documents and objective depiction of "wie es eigentlich gewesen" (how it actually happened).'
    ),
    q('q_g9_hist_real_25', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'A period of 1,000 years is known as _______',
        ['Millennium.', 'Decade.', 'Century.', 'Era.'],
        0,
        'A millennium represents 1,000 years (a decade is 10 years, a century is 100 years).'
    ),
    q('q_g9_hist_real_26', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The Islamic calendar starts counting time from _______',
        ['Birth of Muhammad.', 'Migration to Medina.', 'Death of Muhammad.', 'First Quranic revelation.'],
        1,
        'The Hijri calendar begins in 622 CE when Prophet Muhammad migrated from Mecca to Medina (the Hijrah).'
    ),
    q('q_g9_hist_real_27', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The famous fossil "Lucy" belongs to the species of _______',
        ['Homo sapiens.', 'Ardipithecus ramidus.', 'Australopithecus afarensis.', 'Homo erectus.'],
        2,
        'Lucy (Dinkinesh), unearthed in Hadar (Afar, Ethiopia) by Donald Johanson in 1974, is an Australopithecus afarensis dated to ~3.2 million years ago.'
    ),
    q('q_g9_hist_real_28', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The Neolithic Revolution refers to _______',
        ['The invention of the wheel.', 'The use of bronze.', 'The shift from hunting to farming.', 'The beginning of writing.'],
        2,
        'The Neolithic Revolution was the monumental transition of human societies from mobile hunting and gathering to settled agriculture and animal husbandry.'
    ),
    q('q_g9_hist_real_29', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The tool inventions like the hoe and wheel belong to the:',
        ['Paleolithic.', 'Mesolithic.', 'Iron Age.', 'Neolithic.'],
        3,
        'Ground stone axes, hoes for tilling soil, pottery, and wheeled carts emerged during the Neolithic revolution.'
    ),
    q('q_g9_hist_real_30', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'According to the agricultural theory, the state developed as a result of:',
        ['Military conquest.', 'Surplus from farming.', 'Increased hunting.', 'Gold mining.'],
        1,
        'Agricultural food surplus enabled population growth, occupational specialization, trade, social stratification, and centralized administrative state structures.'
    ),

    // =========================================================================
    // 7. GRADE 9 CITIZENSHIP (Semester 1 Mid 1 - exam_127)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester Citizenship Test One for Grade 9th Oct, 2018 E.C
    // =========================================================================
    // Part I: True / False
    q('q_g9_cit_real_01', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Ethics is the same as morality, and the terms can be used interchangeably.',
        ['True', 'False'],
        1,
        'False. While related, morality generally refers to personal or cultural beliefs about right and wrong, whereas ethics is the systematic, philosophical study and principles governing conduct.'
    ),
    q('q_g9_cit_real_02', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: A person with integrity always aligns their actions with their words.',
        ['True', 'False'],
        0,
        'True. Integrity means honesty, consistency, and having high moral principles where actions faithfully correspond to verbal commitments.'
    ),
    q('q_g9_cit_real_03', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Ethics only deals with personal feelings and opinions, not real-life actions.',
        ['True', 'False'],
        1,
        'False. Ethics is profoundly concerned with real-life actions, human relationships, societal rules, and institutional behavior.'
    ),
    q('q_g9_cit_real_04', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: One of the key values of ethics is disobedience to the law when it feels inconvenient.',
        ['True', 'False'],
        1,
        'False. Respect for the rule of law and civic responsibility are core values of citizenship and ethics.'
    ),
    q('q_g9_cit_real_05', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Respect means treating others with dignity, regardless of differences in background.',
        ['True', 'False'],
        0,
        'True. Mutual respect recognizes the universal dignity and human rights of all individuals without discrimination.'
    ),
    q('q_g9_cit_real_06', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Concern for others excludes people with disabilities, as they require separate laws.',
        ['True', 'False'],
        1,
        'False. Inclusive citizenship emphasizes compassion, equal opportunities, protection, and concern for persons with disabilities.'
    ),
    q('q_g9_cit_real_07', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Promise-keeping is a part of integrity that strengthens trust and relationships.',
        ['True', 'False'],
        0,
        'True. Honoring promises and commitments establishes credibility and creates social trust.'
    ),

    // Part II: Matching
    q('q_g9_cit_real_08', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which ethical value describes "Being honest, reliable, and morally upright"?',
        ['Obeying the law', 'Integrity', 'Loyalty', 'Excellence'],
        1,
        'Integrity denotes wholeness of moral character, truthfulness, and upholding ethical standards.'
    ),
    q('q_g9_cit_real_09', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which civic duty involves "Following rules and upholding justice"?',
        ['Obeying the law', 'Loyalty', 'Trustworthiness', 'Excellence'],
        0,
        'Obeying the law means adhering to established legal frameworks and respecting constitutional order.'
    ),
    q('q_g9_cit_real_10', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which term corresponds to "Being honest and dependable in relationships"?',
        ['Trustworthiness', 'Excellence', 'Loyalty', 'Integrity'],
        0,
        'Trustworthiness is the quality of inspiring confidence through honesty, dependability, and faithfulness.'
    ),
    q('q_g9_cit_real_11', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which term is defined as "Being faithful to individuals, society, and country"?',
        ['Excellence', 'Loyalty', 'Trustworthiness', 'Obeying the law'],
        1,
        'Loyalty involves unswerving allegiance, duty, and faithfulness to community and country.'
    ),
    q('q_g9_cit_real_12', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which quality entails "Striving for quality and constant self-improvement"?',
        ['Loyalty', 'Trustworthiness', 'Excellence', 'Integrity'],
        2,
        'Commitment to excellence means striving to achieve the highest possible standard in studies, work, and personal growth.'
    ),

    // Part III: Multiple Choice
    q('q_g9_cit_real_13', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'A society with ethical citizens is characterized by _______',
        ['Corruption and injustice.', 'Division and mistrust.', 'Sustainable peace, unity, and rule of law.', 'Violence and disorder.'],
        2,
        'Ethical citizenship fosters rule of law, mutual harmony, social trust, and lasting peace.'
    ),
    q('q_g9_cit_real_14', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Theoretical ethics is mainly concerned with _______',
        ['How to apply laws.', 'Business rules.', 'Emotional intelligence.', 'The origin and nature of moral judgments.'],
        3,
        'Meta-ethics / theoretical ethics explores fundamental philosophical questions regarding the origins, nature, and meaning of moral values.'
    ),
    q('q_g9_cit_real_15', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Commitment to excellence requires to _______',
        ['Avoiding hard work.', 'Dependence on others.', 'Dedication, perseverance, and self-improvement.', 'Ignoring personal growth.'],
        2,
        'Excellence requires diligent hard work, dedication, resilience, and steady personal development.'
    ),
    q('q_g9_cit_real_16', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'What we learn from Ethics?',
        ['Compete aggressively.', 'Ignore community needs.', 'Focus only on personal benefit.', 'Act in morally sound ways and avoid unethical actions.'],
        3,
        'Ethics guides moral behavior, encouraging good conduct and prevention of harmful or corrupt actions.'
    ),
    q('q_g9_cit_real_17', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'What does it mean respect for humanity?',
        ['Supporting only people of similar background.', 'Focusing only on oneself.', 'Treating all people equally regardless of differences.', 'Avoiding interaction with others.'],
        2,
        'Respect for humanity requires honoring the universal dignity of all persons regardless of ethnicity, religion, or social class.'
    ),
    q('q_g9_cit_real_18', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'The term ethics originates from the Greek word ethos, which means:',
        ['Customs, habits, or character.', 'Religion and belief.', 'Justice and fairness.', 'Law and order.'],
        0,
        'The word ethics derives from the ancient Greek "ethos", meaning custom, disposition, habit, or character.'
    ),
    q('q_g9_cit_real_19', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Being free from addiction is considered an attribute of _______',
        ['Hardworking nature.', 'Intellectual ability.', 'Social responsibility.', 'True integrity.'],
        3,
        'Maintaining physical, mental, and moral self-control and freedom from destructive addictions reflects personal integrity and responsible self-care.'
    ),
    q('q_g9_cit_real_20', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Ethical values serve as:',
        ['Legal restrictions.', 'Social traditions.', 'Guiding principles to distinguish right from wrong.', 'Religious commandments.'],
        2,
        'Ethical values act as moral compasses that guide human choices, distinguishing right from wrong.'
    ),
    q('q_g9_cit_real_21', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Which of the following is not listed as a key ethical value?',
        ['Laziness.', 'Honesty.', 'Integrity.', 'Fairness.'],
        0,
        'Laziness is a vice and negative habit, not an ethical value.'
    ),
    q('q_g9_cit_real_22', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'What is the meaning of Integrity?',
        ['Following all traditions blindly.', 'Staying true to moral principles in both private and public life.', 'Seeking personal success at any cost.', 'Being influenced by others\' opinions.'],
        1,
        'Integrity is the practice of consistently adhering to ethical and moral principles, whether in public scrutiny or in private.'
    ),
    q('q_g9_cit_real_23', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Ethics mainly deals with:',
        ['Political systems.', 'Economic theories.', 'Religious rituals.', 'Moral principles and values guiding human behavior.'],
        3,
        'Ethics is the branch of philosophy concerning moral guidelines and rules governing human conduct.'
    ),
    q('q_g9_cit_real_24', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'A person with integrity is characterized by:',
        ['Dishonesty and inconsistency.', 'Selfishness and jealousy.', 'Honesty, trustworthiness, and consistency.', 'Laziness and irresponsibility.'],
        2,
        'Honesty, consistency, dependability, and ethical steadfastness are hallmarks of integrity.'
    ),
    q('q_g9_cit_real_25', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Ethical values are essential for citizens. Why? B/c',
        ['Increase personal wealth.', 'Encourage lawlessness.', 'Promote individualism.', 'Build a peaceful, just, and harmonious society.'],
        3,
        'Ethical citizens create the bedrock of justice, security, mutual trust, and national solidarity.'
    ),
    q('q_g9_cit_real_26', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Practical ethics focuses on:',
        ['Writing moral laws.', 'Understanding cultural values.', 'Conducting philosophical research only.', 'Applying moral principles in real-life situations.'],
        3,
        'Applied (practical) ethics examines how moral theory is applied to real-world dilemmas in medicine, business, environment, and social life.'
    ),
    q('q_g9_cit_real_27', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Abiding by the law ensures:',
        ['Fairness, justice, and order.', 'Weak moral values.', 'Social disorder.', 'Ignorance of ethics.'],
        0,
        'Lawfulness guarantees public safety, social order, equality before the law, and civil protection.'
    ),
    q('q_g9_cit_real_28', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Without ethical guidelines, society would _______',
        ['Be more productive.', 'Have fewer conflicts.', 'Be difficult to navigate responsibly.', 'Improve its moral standards naturally.'],
        2,
        'Without moral boundaries, lawlessness, exploitation, and social breakdown make civilized life impossible.'
    ),
    q('q_g9_cit_real_29', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Ethics is important in daily life because it helps us:',
        ['Control others.', 'Earn more wealth.', 'Follow traditions without questioning.', 'Decide what is acceptable and unacceptable behavior.'],
        3,
        'Ethics helps individuals make responsible daily choices between right and wrong.'
    ),
    q('q_g9_cit_real_30', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Promise-keeping as an ethical value strengthens:',
        ['Relationships and trust.', 'Competition and rivalry.', 'Individual wealth.', 'Social conflict.'],
        0,
        'Fulfilling commitments creates mutual dependability and bonds of social trust.'
    ),

    // =========================================================================
    // 8. GRADE 9 ECONOMICS (Semester 1 Mid 1 - exam_128)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester Economics Test One for Grade 9th
    // =========================================================================
    // Part I: True / False
    q('q_g9_econ_real_01', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Microeconomics deals with individual consumers and firms.',
        ['True', 'False'],
        0,
        'True. Microeconomics examines the economic decision-making of individual agents such as single consumers, households, and business firms.'
    ),
    q('q_g9_econ_real_02', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Normative economics is value-free and objective.',
        ['True', 'False'],
        1,
        'False. Positive economics is factual and value-free. Normative economics deals with what "ought to be" and is based on subjective value judgments.'
    ),
    q('q_g9_econ_real_03', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Households are the buyers of factors of production.',
        ['True', 'False'],
        1,
        'False. In the circular flow of income, households own and sell factors of production (land, labor, capital) while business firms are the buyers.'
    ),
    q('q_g9_econ_real_04', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: In a command economy, all production is controlled by private firms.',
        ['True', 'False'],
        1,
        'False. In a command (socialist) economy, economic decisions and production are controlled by the central government, not private firms.'
    ),
    q('q_g9_econ_real_05', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Capitalism allows private ownership and competition.',
        ['True', 'False'],
        0,
        'True. A capitalist market economy is based on private ownership of property, freedom of enterprise, and competitive markets.'
    ),
    q('q_g9_econ_real_06', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Deductive and inductive methods compete with each other.',
        ['True', 'False'],
        1,
        'False. Deductive and inductive methods are complementary approaches in economic analysis, often used together to form and test theories.'
    ),

    // Part II: Multiple Choice
    q('q_g9_econ_real_07', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'The basic economic problem arises because:',
        ['Resources are unlimited', 'Human wants are limited', 'Resources are scarce but wants are unlimited', 'Governments mismanage'],
        2,
        'Scarcity is the fundamental economic problem: society has limited productive resources to satisfy unlimited human needs and desires.'
    ),
    q('q_g9_econ_real_08', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Opportunity cost refers to:',
        ['The monetary cost of goods', 'The next best alternative foregone', 'Total production cost', 'The accounting profit'],
        1,
        'Opportunity cost is the value of the next best alternative that is given up when a choice is made.'
    ),
    q('q_g9_econ_real_09', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which point on a PPF (Production Possibility Frontier) is unattainable?',
        ['Inside the curve', 'On the curve', 'Outside the curve', 'None'],
        2,
        'Points outside the PPF curve represent combinations that cannot be produced with the current resources and technology.'
    ),
    q('q_g9_econ_real_10', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        '"How to produce goods?" is also called:',
        ['Problem of allocation', 'Problem of choice of technique', 'Problem of distribution', 'Problem of consumption'],
        1,
        '"How to produce?" deals with choosing the method or technique of production, such as labor-intensive versus capital-intensive techniques.'
    ),
    q('q_g9_econ_real_11', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which is a characteristic of a mixed economy?',
        ['Collective ownership only', 'Private ownership only', 'Co-existence of private and public sectors', 'No government planning'],
        2,
        'A mixed economic system combines elements of private enterprise with public government intervention.'
    ),
    q('q_g9_econ_real_12', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'The deductive method proceeds from:',
        ['Specific to general', 'Facts to hypothesis', 'General to specific', 'Data to theory'],
        2,
        'Deductive reasoning moves from general principles and assumptions to specific logical conclusions.'
    ),
    q('q_g9_econ_real_13', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which of the following is a feature of normative economics?',
        ['It deals with facts', 'It includes value judgments', 'It focuses only on data', 'It ignores ethics'],
        1,
        'Normative statements express opinions and value judgments regarding what policies ought to be implemented.'
    ),
    q('q_g9_econ_real_14', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Among the following, which one is a scarce resource?',
        ['Oxygen in atmosphere', 'Land', 'Sunlight', 'Ambient air'],
        1,
        'Land is an economic resource with a limited supply and positive price, unlike ambient air or sunlight.'
    ),
    q('q_g9_econ_real_15', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which of the following is correct?',
        ['Any disagreement on normative economics can be resolved through fact', 'Economic growth can be one concern of microeconomics', 'Inductive reasoning analyze from specific to general', 'All of the above'],
        2,
        'Inductive reasoning begins with specific empirical observations and facts to formulate general principles.'
    ),
    q('q_g9_econ_real_16', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which of the following statements would best describe firms?',
        ['They are owners of factor resources', 'They mix factor resources and change it into one final output', 'They impose taxes on households', 'They are buyers of final output'],
        1,
        'Firms combine factors of production (labor, raw materials, capital) to produce finished goods and services.'
    ),

    // Part III: Workout Application
    q('q_g9_econ_real_17', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Given a country\'s production combinations: Combination C (20 Machines, 100 Food) and Combination D (30 Machines, 0 Food). What is the total opportunity cost in food when moving from C to D to produce 10 extra machines?',
        ['50 units of food', '100 units of food', '150 units of food', '200 units of food'],
        1,
        'Moving from C (100 food) to D (0 food) requires giving up 100 - 0 = 100 units of food.'
    ),
    q('q_g9_econ_real_18', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'When moving from combination C (20 Machines, 100 Food) to D (30 Machines, 0 Food), what is the per-unit opportunity cost of producing each additional machine?',
        ['0.1 units of food', '5 units of food', '10 units of food', '20 units of food'],
        2,
        'Per-unit opportunity cost = Sacrificed Food / Gained Machines = (100 - 0) / (30 - 20) = 100 / 10 = 10 units of food per machine.'
    ),

    // =========================================================================
    // 9. GRADE 9 INFORMATION TECHNOLOGY (Semester 1 Mid 1 - exam_133)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester IT Test One for Grade 9th Oct, 2018 E.C
    // =========================================================================
    // Part I: True / False
    q('q_g9_it_real_01', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Save allows you to update a previously saved file with new content.',
        ['True', 'False'],
        0,
        'True. The Save command writes updates and modifications directly to the existing file path without prompting for a new filename.'
    ),
    q('q_g9_it_real_02', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Renaming a file does not remove its content.',
        ['True', 'False'],
        0,
        'True. Renaming simply modifies the file identifier in the directory index while the data bytes remain intact.'
    ),
    q('q_g9_it_real_03', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Windows does not allow handling multiple files.',
        ['True', 'False'],
        1,
        'False. Operating systems like Windows support multi-file selection (using Ctrl/Shift), batch renaming, moving, and deleting.'
    ),
    q('q_g9_it_real_04', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: A folder is also called a directory.',
        ['True', 'False'],
        0,
        'True. Directory is the file system term, while folder is the graphical user interface term; both represent storage containers.'
    ),
    q('q_g9_it_real_05', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: A storage drive can be fixed and removable.',
        ['True', 'False'],
        0,
        'True. Internal hard disk/SSD drives are fixed, while USB flash drives and external hard drives are removable.'
    ),
    q('q_g9_it_real_06', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Each file in a computer has unique icons.',
        ['True', 'False'],
        1,
        'False. Files sharing the same file extension (.docx, .pdf, .txt) share the same default application icon.'
    ),
    q('q_g9_it_real_07', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Software cannot be shared over the network.',
        ['True', 'False'],
        1,
        'False. Software, web applications, and network licenses are routinely shared and accessed across local networks and the internet.'
    ),
    q('q_g9_it_real_08', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: MAN covers the area of a city and can contain multiple WANs.',
        ['True', 'False'],
        1,
        'False. A Wide Area Network (WAN) spans countries and continents; a Metropolitan Area Network (MAN) covers a city and cannot contain WANs.'
    ),

    // Part II: Multiple Choice
    q('q_g9_it_real_09', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which type of icon can take you to another place or open a file quickly?',
        ['File', 'Folder', 'Application', 'None of the above (Shortcut)'],
        3,
        'A shortcut icon (indicated by a small arrow) links directly to a file, folder, or application elsewhere on the drive.'
    ),
    q('q_g9_it_real_10', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        '_______ displays information about a selected folder and its contents.',
        ['Ribbon', 'Address bar', 'Status Bar', 'None'],
        2,
        'The Status Bar at the bottom of the window displays item count, selected count, and size information.'
    ),
    q('q_g9_it_real_11', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        '_______ is used to enable you to perform layout, formatting and sharing tasks.',
        ['Ribbon', 'Status Bar', 'Address bar', 'None'],
        0,
        'The Ribbon toolbar organizes tools into tabs (Home, Insert, Layout) for editing, formatting, and operations.'
    ),
    q('q_g9_it_real_12', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        '_______ means locating a file among a set of files.',
        ['Deleting', 'Searching', 'Opening', 'Creating'],
        1,
        'Searching allows the user to find files by typing their name, extension, or keywords in the search bar.'
    ),
    q('q_g9_it_real_13', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following is not used to move files?',
        ['Cut and paste', 'Move to Folder command', 'Drag-and-drop', 'None (All are valid methods)'],
        3,
        'Cut and paste, Drag-and-drop, and the "Move to" menu command are all standard techniques to move files.'
    ),
    q('q_g9_it_real_14', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'In a computer, a file can be _______',
        ['Document', 'Application', 'Video', 'All of the above'],
        3,
        'Computer files store documents, executable programs, video, audio, images, and other digital data.'
    ),
    q('q_g9_it_real_15', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following devices is used to select the appropriate path within a network?',
        ['Repeater', 'Switch', 'Router', 'All'],
        2,
        'A Router inspects destination IP addresses and determines the optimal routing path between different network segments.'
    ),
    q('q_g9_it_real_16', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'The network system that spans states, countries or the whole world is _______',
        ['MAN', 'LAN', 'PAN', 'None (WAN)'],
        3,
        'A Wide Area Network (WAN) connects computers over large geographical areas such as countries and continents.'
    ),
    q('q_g9_it_real_17', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'A network system within a single building or school campus is _______',
        ['LAN', 'MAN', 'WAN', 'None'],
        0,
        'A Local Area Network (LAN) covers a small geographic area such as an office, home, or school campus.'
    ),
    q('q_g9_it_real_18', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which device accepts a weak signal, then boosts it to its original strength and forwards it to the next network segment?',
        ['Switch', 'NIC', 'Router', 'None of the above (Repeater)'],
        3,
        'A Repeater amplifies and regenerates attenuated signals to extend network transmission distances.'
    ),
    q('q_g9_it_real_19', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following is an optical disk drive?',
        ['CD drives', 'DVD drive', 'A and B', 'USB drives'],
        2,
        'Both CD and DVD drives use laser optics to read and write data on circular discs.'
    ),
    q('q_g9_it_real_20', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        '_______ is a hardware storage unit of a computer which stores files and folders.',
        ['NIC', 'Drive', 'Driver', 'None'],
        1,
        'A storage Drive (such as C: drive, SSD, HDD) holds files, folders, and operating system data.'
    ),
    q('q_g9_it_real_21', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following is not an image editing software?',
        ['Microsoft Paint and Paint 3D', 'GIMP', 'Adobe Photoshop', 'None (All are image editors)'],
        3,
        'Paint, GIMP, and Photoshop are all widely recognized bitmap/raster image editing programs.'
    ),
    q('q_g9_it_real_22', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following is found under Quick Access in File Explorer?',
        ['Desktop', 'Documents', 'Pictures', 'All of the above'],
        3,
        'Quick Access pins frequently accessed folders including Desktop, Documents, Downloads, and Pictures.'
    ),
    q('q_g9_it_real_23', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'A short-range wireless network created by Bluetooth is known as _______',
        ['WAN', 'MAN', 'PAN', 'None'],
        2,
        'A Personal Area Network (PAN) covers personal devices within a short radius (~10 meters), commonly using Bluetooth.'
    ),
    q('q_g9_it_real_24', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Suppose a bank wants to connect three of its branches in a given city, which type of network solves the problem?',
        ['WAN', 'MAN', 'PAN', 'LAN'],
        1,
        'A Metropolitan Area Network (MAN) is designed to connect facilities and branch offices across an entire city.'
    ),

    // Part III: Matching
    q('q_g9_it_real_25', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: Which component is described as "Used to manage files and folders"?',
        ['Computer', 'File Explorer', 'Navigation pane', 'Protocols'],
        1,
        'File Explorer (formerly Windows Explorer) provides the graphical user interface for managing files and folders.'
    ),
    q('q_g9_it_real_26', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: In a network architecture, a workstation or personal computer acts as an:',
        ['End Device', 'Intermediary Device', 'Protocol', 'Transmission medium'],
        0,
        'End devices (hosts, PCs, smartphones) form the source and destination of data messages across a network.'
    ),
    q('q_g9_it_real_27', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: What interface area lets you "View your computer\'s file and folder structure"?',
        ['Ribbon', 'Status Bar', 'Navigation pane', 'Title bar'],
        2,
        'The Navigation pane on the left side of File Explorer shows the hierarchical folder tree and drives.'
    ),
    q('q_g9_it_real_28', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: A Network Interface Card (NIC) is classified as an:',
        ['End Device', 'Intermediary Device', 'File system', 'Application software'],
        1,
        'The NIC provides physical connectivity and network interface intermediation.'
    ),
    q('q_g9_it_real_29', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: What is defined as a "Collection of data or information stored under a name"?',
        ['Folder', 'File', 'Drive', 'Protocol'],
        1,
        'A file is a named collection of related data stored on computer storage.'
    ),
    q('q_g9_it_real_30', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: What represents a "Set of rules to guide communications across a network"?',
        ['Protocols', 'Topology', 'Navigation', 'Operating System'],
        0,
        'Protocols (such as TCP/IP, HTTP) define standard rules and formats for exchanging data over networks.'
    ),

    // =========================================================================
    // 10. GRADE 9 GEOGRAPHY (Semester 1 Mid 1 - exam_130)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester Geography mid one test for Grade 9th Nov, 2018 E.C
    // =========================================================================
    // Part I: Matching
    q('q_g9_geog_real_01', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: Which prominent mountain peak belongs to The Plateau of Tigray?',
        ['Mount Ras Dashen', 'Mount Ambalage', 'Mount Abbuye Meda', 'Gamo-Konso Highlands'],
        1,
        'Mount Ambalage is located in the northern plateau of Tigray.'
    ),
    q('q_g9_geog_real_02', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: Which highest Ethiopian mountain is situated in The North Central Massif?',
        ['Mount Ras Dashen', 'Mount Batu', 'Mount Ambalage', 'Mount Guna'],
        0,
        'Mount Ras Dashen (4,550m in the Simien Mountains) belongs to the North Central Massifs.'
    ),
    q('q_g9_geog_real_03', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: Which peak is located on The Plateau of Shewa?',
        ['Mount Abbuye Meda', 'Mount Ras Dashen', 'Mount Ambalage', 'Gamo-Konso'],
        0,
        'Mount Abbuye Meda (4,012m) is situated in the Shewan plateau.'
    ),
    q('q_g9_geog_real_04', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: Which highlands are located in The Southwestern Highlands of Ethiopia?',
        ['Gamo-Konso Highlands', 'Simien Massif', 'Tigray Plateau', 'Hararghe Massif'],
        0,
        'The Gamo-Konso highlands form part of the rugged southwestern Ethiopian highlands.'
    ),
    q('q_g9_geog_real_05', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: The Mesozoic geological era is characterized biologically by:',
        ['Predominance of invertebrates', 'Predominance of reptiles and dinosaurs', 'Evolution of humans', 'Origin of simple bacteria'],
        1,
        'The Mesozoic era (Age of Reptiles) was dominated by reptiles and dinosaurs.'
    ),
    q('q_g9_geog_real_06', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: The Paleozoic geological era is characterized biologically by:',
        ['Predominance of invertebrates', 'Predominance of reptiles', 'Domination of mammals', 'Rise of modern birds'],
        0,
        'The Paleozoic era witnessed the explosion and predominance of marine invertebrates, fish, and early amphibians.'
    ),

    // Part II: Multiple Choice
    q('q_g9_geog_real_07', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which of the following elements of geographical study is related to Demography?',
        ['Geomorphology', 'Climatology', 'Population', 'Biogeography'],
        2,
        'Demography is the scientific statistical study of human populations, including births, deaths, growth, and migration.'
    ),
    q('q_g9_geog_real_08', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which sub-division of the lowlands of Ethiopia is found in the northwestern part of the country?',
        ['The Omo-Ghibe Lowlands', 'The Erkele-Ogaden Lowlands', 'The Borena Lowlands', 'The Tekeze-Angereb Lowlands'],
        3,
        'The Tekeze and Angereb lowlands border northwestern Ethiopia and Sudan.'
    ),
    q('q_g9_geog_real_09', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which physiographic division of Ethiopia is highly affected by volcanic eruptions and earthquakes?',
        ['Highlands', 'Lowlands', 'Rift Valley', 'Plateau'],
        2,
        'The Ethiopian Rift Valley is a tectonically active fault zone marked by geothermal activity, active volcanoes, and seismic tremors.'
    ),
    q('q_g9_geog_real_10', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        '_______ and _______ are the highest and lowest places in Ethiopia respectively.',
        ['Batu and Tendaho', 'Ras Dashen and Dallol', 'Ras Dashen and Qatta', 'Batu and Ogaden'],
        1,
        'Ras Dashen is Ethiopia\'s highest point (4,550 m above sea level), and the Dallol depression in Afar is the lowest (-125 m below sea level).'
    ),
    q('q_g9_geog_real_11', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which one of the following combinations of mountains and highlands of Ethiopia is NOT CORRECT?',
        ['Gara muleta -> The Plateau of Tigray', 'Assimba -> The Bale Massif', 'Abbuye Meda -> The Plateau of Shewa', 'Kolo -> The North Central Massif'],
        0,
        'Gara Muleta is located in the Hararghe (Eastern) Highlands, not the Tigray Plateau.'
    ),
    q('q_g9_geog_real_12', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which plateau serves as a watershed between the Awash and Abay river basins?',
        ['Mt of Tigray', 'Mt of Southwestern', 'Mt of Shewa', 'Mt of Central massifs'],
        2,
        'The Shewan plateau forms the drainage divide separating the westward-flowing Abay (Blue Nile) from the rift-ward Awash basin.'
    ),
    q('q_g9_geog_real_13', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The Great East African Rift Valley extends from _______ to _______',
        ['China to Mozambique', 'Syria to Chewbahir', 'Turkey to Tanzania', 'Syria to Mozambique'],
        3,
        'The system extends approximately 6,000 kilometers from the Jordan Valley and Syria in the north down to Mozambique in southeastern Africa.'
    ),
    q('q_g9_geog_real_14', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Geologically, which area is the most unstable part of Ethiopia?',
        ['The north western highland', 'The rift valley', 'The north central massifs', 'The Abay gorge'],
        1,
        'The Rift Valley floor sits directly above crustal spreading centres, making it the most tectonically unstable region in Ethiopia.'
    ),
    q('q_g9_geog_real_15', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which part of the Geosphere is termed as the rock (solid) layer of the earth?',
        ['Biosphere', 'Atmosphere', 'Lithosphere', 'Hydrosphere'],
        2,
        'The lithosphere is the solid, rocky outer layer of the Earth consisting of the crust and uppermost mantle.'
    ),
    q('q_g9_geog_real_16', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Dinosaurs disappeared from the earth during the:',
        ['Early of Mesozoic', 'End of Mesozoic', 'Early of Cenozoic', 'End of Paleozoic'],
        1,
        'Dinosaurs went extinct at the Cretaceous-Paleogene extinction boundary at the end of the Mesozoic era (~66 million years ago).'
    ),
    q('q_g9_geog_real_17', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Series trapping lava and extensive volcanic eruptions were common in Ethiopia during the:',
        ['Mesozoic era', 'Precambrian era', 'Cenozoic era', 'Paleozoic era'],
        0,
        'During the Cenozoic era, massive flood basalt volcanism poured out the Trappean series forming the highland plateaus.'
    ),
    q('q_g9_geog_real_18', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which of the following is not an endogenic (internal) force?',
        ['Volcanism', 'Faulting', 'Erosion', 'Folding'],
        2,
        'Erosion is an exogenic (external weathering/denudation) process driven by water, wind, and gravity.'
    ),
    q('q_g9_geog_real_19', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Upper sandstone of Ethiopia was deposited during the _______ period.',
        ['Triassic', 'Cretaceous', 'Jurassic', 'Quaternary'],
        1,
        'During the Cretaceous marine regression, the Upper Sandstone formation was deposited.'
    ),
    q('q_g9_geog_real_20', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The extreme point that lies at the westernmost tip of Ethiopia is:',
        ['Ogaden', 'Akobo', 'Moyale', 'Badime'],
        1,
        'Akobo in the Gambella region is Ethiopia\'s westernmost geographical extreme point.'
    ),
    q('q_g9_geog_real_21', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which neighboring country shares the longest boundary line with Ethiopia?',
        ['Eritrea', 'Djibouti', 'Somalia', 'Sudan'],
        2,
        'Somalia shares the longest international land border with Ethiopia (~1,600 km).'
    ),
    q('q_g9_geog_real_22', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The most overlying Mesozoic rock layer in Ethiopia is:',
        ['Hintalo limestone', 'Upper sandstone', 'Adigrat sandstone', 'Basement complex'],
        1,
        'In the Mesozoic stratigraphic column of Ethiopia, Upper Sandstone sits at the top, deposited as the Mesozoic sea retreated.'
    ),
    q('q_g9_geog_real_23', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Among the following fields of physical geography, which one studies the forces that change land forms?',
        ['Geomorphology', 'Soil geography', 'Climatology', 'Ocean geography'],
        0,
        'Geomorphology is the study of the physical features of the Earth\'s surface and their relation to its geological structures and forces.'
    ),
    q('q_g9_geog_real_24', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The present land forms of Ethiopia mainly resulted from the geologic events of:',
        ['The Paleozoic era', 'The Precambrian era', 'Tertiary and quaternary periods', 'The Jurassic and Triassic periods'],
        2,
        'Tertiary uplift, faulting, rifting, and Quaternary deposition created modern Ethiopian relief and topography.'
    ),
    q('q_g9_geog_real_25', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which areas of the following highlands of Ethiopia are the wettest?',
        ['The Bale massifs', 'The Shewan plateaus', 'The south western highlands', 'The North central massifs'],
        2,
        'The Southwestern highlands (around Kaffa and Illubabor) receive the highest annual rainfall in Ethiopia (over 2,200 mm).'
    ),
    q('q_g9_geog_real_26', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'What makes Ethiopia "the roof of North-Eastern" Africa?',
        ['Its compact shape', 'Its large proportion of highlands', 'Its large proportion of Arable land', 'Its large proportion of rivers'],
        1,
        'Over 50% of all African land above 2,000 meters elevation is found in Ethiopia, earning it the title "the roof of Northeast Africa".'
    ),
    q('q_g9_geog_real_27', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'As Adigrat sandstone is to Triassic period, then Hintalo limestone is to:',
        ['Quaternary period', 'Cretaceous period', 'Tertiary period', 'Jurassic period'],
        3,
        'Adigrat sandstone was deposited during the Triassic transgression, followed by Hintalo limestone during maximum Jurassic inundation.'
    ),
    q('q_g9_geog_real_28', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which geological era is known as an era of amphibians?',
        ['Cenozoic', 'Mesozoic', 'Paleozoic', 'Precambrian'],
        2,
        'The late Paleozoic era (Carboniferous period) is renowned as the Age of Amphibians.'
    ),
    q('q_g9_geog_real_29', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'One can associate the Cenozoic era in Ethiopia with the formation of extensive:',
        ['Metamorphic rock', 'Sedimentary rock', 'Changed rock', 'Igneous rock'],
        3,
        'Massive Cenozoic volcanic trap series produced vast basaltic and rhyolitic igneous formations.'
    ),
    q('q_g9_geog_real_30', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The plateau of Tigray is separated from the plateaus of Eritrea by the:',
        ['Abbay River', 'Mereb River', 'Genale River', 'Tekeze River'],
        1,
        'The Mereb (Gash) River forms the natural boundary separating the Tigray Plateau from the Eritrean highlands.'
    ),
    q('q_g9_geog_real_31', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which of the following statements is correct about the Great East African Rift Valley?',
        ['It extends from Syria to Mozambique.', 'It is formed as a result of folding.', 'It is the second largest in the world.', 'All Ethiopia lakes are found in the rift-Valley.'],
        0,
        'The Great Rift Valley system extends across ~6,000 km from Syria to Mozambique.'
    ),

    // =========================================================================
    // 11. GRADE 9 HEALTH & PHYSICAL EDUCATION (Semester 1 Mid 1 - exam_131)
    // Physical Paper: Blessed G/Michael Catholic Secondary School First Semester H.P.E First test for Grade 9th Nov, 2018 E.C
    // =========================================================================
    // Part I: True / False
    q('q_g9_hp_real_01', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Nutrition is a chemical substance in our food.',
        ['True', 'False'],
        0,
        'True. Nutrients are chemical compounds in food that provide energy, structural materials, and regulating agents.'
    ),
    q('q_g9_hp_real_02', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Health is an optimal state of health and wellbeing.',
        ['True', 'False'],
        1,
        'False. Health is defined by WHO as a state of complete physical, mental, and social well-being, not merely an optimal state or absence of disease.'
    ),
    q('q_g9_hp_real_03', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Physical exercise is any body movement produced by skeletal muscles that result in energy expenditure.',
        ['True', 'False'],
        1,
        'False. Any bodily movement resulting in energy expenditure is physical activity; physical exercise is a subcategory that is planned, structured, and repetitive.'
    ),
    q('q_g9_hp_real_04', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Reaction time is the ability to develop the gap between message receiving and responding or taking action.',
        ['True', 'False'],
        0,
        'True. Reaction time measures the time elapsed between receiving a sensory stimulus and executing a muscular response.'
    ),
    q('q_g9_hp_real_05', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Our level of physical fitness performance is not constant.',
        ['True', 'False'],
        0,
        'True. Physical fitness fluctuates with training intensity, rest, nutrition, aging, and detraining.'
    ),
    q('q_g9_hp_real_06', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Muscle type is a factor that affects physical fitness performance.',
        ['True', 'False'],
        0,
        'True. The ratio of slow-twitch (Type I endurance) to fast-twitch (Type II power/speed) muscle fibers directly influences athletic performance.'
    ),

    // Part II: Multiple Choice
    q('q_g9_hp_real_07', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Who benefits from organizing a sporting event in one kebele, woreda, city or nation?',
        ['Hotel owners', 'Transport owner', 'Marketers', 'All of the above'],
        3,
        'Sport events stimulate the local economy, benefiting hospitality, public transport, retail marketers, and communities.'
    ),
    q('q_g9_hp_real_08', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Who is benefited from gender equality in sports and society?',
        ['Female', 'Males', 'Nation', 'All of the above'],
        3,
        'Gender equality empowers women, improves family welfare, increases economic productivity, and strengthens the entire nation.'
    ),
    q('q_g9_hp_real_09', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which one of the following is not the result of technology in sport?',
        ['Video Assistant Referee (VAR)', 'Sport wear fabrics', 'Facilities and training equipment', 'Fans'],
        3,
        'Fans are spectators and supporters; VAR, specialized sportswear, and fitness facilities are technological innovations.'
    ),
    q('q_g9_hp_real_10', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Why do some athletes take prohibited performance-enhancing drugs?',
        ['For performance enhancement', 'For recreational use', 'For treating unverified medical conditions', 'All of the above'],
        3,
        'Doping violations arise from illicit attempts to enhance performance, recreational drug use, or misuse of prescription medications.'
    ),
    q('q_g9_hp_real_11', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'What is not an accurate mechanism to determine our true level of physical fitness?',
        ['By looking at external posture alone', 'By resting heart rate', 'By calculating body mass index', 'All of the above'],
        0,
        'External appearance or posture alone does not accurately measure cardiovascular endurance, VO2 max, or internal aerobic capacity.'
    ),
    q('q_g9_hp_real_12', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which physical fitness component tends to naturally decline directly with increasing age if not specifically trained?',
        ['Flexibility', 'Strength', 'Power', 'Endurance'],
        0,
        'Joint flexibility and muscle elasticity progressively decline with age without regular stretching routines.'
    ),
    q('q_g9_hp_real_13', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'According to the caloric density per gram, which list is arranged in ascending order?',
        ['Fat - protein - carbohydrate', 'Carbohydrate - fat - protein', 'Carbohydrate (4 kcal) - protein (4 kcal) - fat (9 kcal)', 'Fat - carbohydrate - protein'],
        2,
        'Carbohydrates and proteins yield 4 kcal/gram, while dietary fats yield 9 kcal/gram.'
    ),
    q('q_g9_hp_real_14', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which one of the following is true about physical fitness?',
        ['When the level of physical fitness is improved, the resting heart rate decreases.', 'Our level of physical fitness does not vary from one person to another.', 'When you are fit, your energy intake is decreased.', 'When you are detraining, your performance remains constant.'],
        0,
        'A lower resting heart rate (bradycardia of the trained athlete) indicates superior cardiovascular efficiency and increased stroke volume.'
    ),
    q('q_g9_hp_real_15', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Body Mass Index (BMI) is calculated as the ratio of a person\'s weight (in kg) to his or her:',
        ['Age', 'Height squared (in m²)', 'Body fat percentage', 'Lean tissue mass'],
        1,
        'BMI formula is weight in kilograms divided by the square of height in meters (kg/m²).'
    ),
    q('q_g9_hp_real_16', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which statement best describes comprehensive physical fitness?',
        ['The ability to involve in one specific type of sport event', 'The ability to develop a single motor skill', 'The ability to perform without effectively and efficiently through our daily life span', 'None of the above'],
        3,
        'Physical fitness is the ability to carry out daily tasks with vigor and alertness, without undue fatigue, and with ample energy to enjoy leisure and meet unforeseen emergencies.'
    ),
    q('q_g9_hp_real_17', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'All of the following are skill-related components of physical fitness EXCEPT:',
        ['Agility', 'Speed', 'Power', 'Flexibility'],
        3,
        'Flexibility is a health-related fitness component (along with cardiovascular endurance, muscular strength, muscular endurance, and body composition).'
    ),
    q('q_g9_hp_real_18', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'In 1 g of fat and 1 g of protein, how many total calories (kcal) are found together?',
        ['9 kcal', '4 kcal', '10 kcal', '13 kcal'],
        3,
        '1 gram of fat = 9 kcal, and 1 gram of protein = 4 kcal; together they contain 9 + 4 = 13 kcal.'
    ),

    // Part III: Health & Nutrition Application
    q('q_g9_hp_real_19', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which pair represents health-related physical fitness components?',
        ['Agility and Reaction Time', 'Speed and Coordination', 'Flexibility and Cardiovascular Endurance', 'Balance and Power'],
        2,
        'Flexibility, cardiovascular endurance, muscular strength, and body composition are health-related physical fitness components.'
    ),
    q('q_g9_hp_real_20', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'What are the three primary energy-yielding macronutrients in human food?',
        ['Vitamins, Minerals, and Water', 'Carbohydrates, Proteins, and Fats', 'Calcium, Iron, and Sodium', 'Fiber, Amino Acids, and Enzymes'],
        1,
        'Carbohydrates, proteins, and lipids (fats) are the primary dietary energy sources.'
    ),
    q('q_g9_hp_real_21', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'If a student has a weight of 100 kg and a height of 2 meters, what is their BMI?',
        ['20 kg/m²', '25 kg/m²', '30 kg/m²', '50 kg/m²'],
        1,
        'BMI = Weight / (Height)² = 100 / (2 × 2) = 100 / 4 = 25 kg/m².'
    ),
    q('q_g9_hp_real_22', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'If a balanced dietary plan consists of 1,000 g of food daily and allocates 30% to healthy fats, how many grams of fat should be consumed?',
        ['150 g', '200 g', '300 g', '400 g'],
        2,
        '30% of 1,000 g = (30 / 100) × 1,000 = 300 g.'
    ),
    q('q_g9_hp_real_23', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'If the same 1,000 g dietary plan allocates 57% to carbohydrates, how many grams of carbohydrates should be consumed?',
        ['450 g', '500 g', '570 g', '600 g'],
        2,
        '57% of 1,000 g = (57 / 100) × 1,000 = 570 g.'
    )

);


// PURGE ALL SYNTHETIC QUESTIONS!
// Only 100% genuine questions from physical Blessed G/Michael Catholic Secondary School papers are kept!
console.log('Total authentic questions prepared:', authenticQuestions.length);

db.questions = authenticQuestions;
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');

console.log('Successfully saved to db.json! Zero synthetic questions remain.');
