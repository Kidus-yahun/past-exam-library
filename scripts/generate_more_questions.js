// scripts/generate_more_questions.js
// Broad expansion of curriculum-aligned practice questions for all grades and subjects

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

function q(id, grade, subject, semester, examType, question, options, correctAnswer, explanation) {
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
        points: 1
    };
}

const list = [];

// ========================================================
// GRADE 9: EXPANSION (Chemistry, English, Math, IT, Hist, Geog, Civics, Econ, HP, Amharic)
// ========================================================
list.push(
    // Chemistry G9
    q('q_g9_chem_11', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which laboratory apparatus is most suitable for accurately measuring a specific volume of liquid?',
        ['Beaker', 'Graduated cylinder', 'Test tube', 'Evaporating dish'],
        1,
        'A graduated cylinder (or volumetric pipette) is marked with precise calibration lines, making it far more accurate for volume measurement than a beaker.'
    ),
    q('q_g9_chem_12', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'What type of mixture is salt dissolved completely in water?',
        ['Heterogeneous mixture', 'Homogeneous mixture (solution)', 'Suspension', 'Colloid'],
        1,
        'When salt dissolves in water, it forms a homogeneous solution with uniform composition and properties throughout.'
    ),
    q('q_g9_chem_13', 'Grade9', 'Chemistry', 'Semester1', 'Mid1',
        'Which scientist discovered the electron using the cathode ray tube experiment?',
        ['Ernest Rutherford', 'J.J. Thomson', 'James Chadwick', 'John Dalton'],
        1,
        'J.J. Thomson discovered the electron in 1897 through his cathode ray deflection experiments, later proposing the "plum pudding" atomic model.'
    ),
    q('q_g9_chem_14', 'Grade9', 'Chemistry', 'Semester1', 'Final',
        'What is the common name for the compound sodium bicarbonate (NaHCO₃)?',
        ['Table salt', 'Baking soda', 'Caustic soda', 'Washing soda'],
        1,
        'NaHCO₃ is sodium bicarbonate, commonly known as baking soda. Table salt is NaCl, and caustic soda is NaOH.'
    ),
    q('q_g9_chem_15', 'Grade9', 'Chemistry', 'Semester1', 'Final',
        'Which gas turns moist red litmus paper blue, indicating its basic nature?',
        ['Sulfur dioxide (SO₂)', 'Carbon dioxide (CO₂)', 'Ammonia (NH₃)', 'Hydrogen chloride (HCl)'],
        2,
        'Ammonia (NH₃) is an alkaline gas that reacts with moisture to form ammonium hydroxide, turning red litmus paper blue.'
    ),

    // Mathematics G9
    q('q_g9_math_09', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'What is the solution set of the linear inequality 2x - 5 < 7?',
        ['x < 6', 'x > 6', 'x < 1', 'x > 1'],
        0,
        'Add 5 to both sides: 2x < 12. Divide by 2: x < 6.'
    ),
    q('q_g9_math_10', 'Grade9', 'Mathematics', 'Semester1', 'Mid1',
        'What is the distance between points P(1, 2) and Q(4, 6) in the Cartesian plane?',
        ['3', '4', '5', '7'],
        2,
        'Distance formula: d = √[(4 - 1)² + (6 - 2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5.'
    ),
    q('q_g9_math_11', 'Grade9', 'Mathematics', 'Semester1', 'Final',
        'If the radius of a circle is 7 cm, what is its circumference? (Use π ≈ 22/7)',
        ['22 cm', '44 cm', '88 cm', '154 cm'],
        1,
        'Circumference C = 2πr = 2 × (22/7) × 7 = 44 cm.'
    ),
    q('q_g9_math_12', 'Grade9', 'Mathematics', 'Semester1', 'Final',
        'What is the area of a trapezoid with parallel bases b₁ = 8 cm, b₂ = 12 cm, and height h = 5 cm?',
        ['40 cm²', '50 cm²', '60 cm²', '100 cm²'],
        1,
        'Area = (b₁ + b₂) / 2 × h = (8 + 12) / 2 × 5 = 20 / 2 × 5 = 10 × 5 = 50 cm².'
    ),

    // English G9
    q('q_g9_eng_06', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Choose the correct modal verb: "You ______ wear a helmet while riding a motorbike; it is required by law."',
        ['might', 'must', 'can', 'may'],
        1,
        '"Must" indicates legal obligation or mandatory necessity.'
    ),
    q('q_g9_eng_07', 'Grade9', 'English', 'Semester1', 'Mid1',
        'Identify the antonym of the word "Abundant":',
        ['Plentiful', 'Scarce', 'Generous', 'Vast'],
        1,
        '"Abundant" means existing in large quantities; its antonym is "scarce" (limited or rare).'
    ),
    q('q_g9_eng_08', 'Grade9', 'English', 'Semester1', 'Final',
        'Complete the sentence: "Neither my brother nor my sisters ______ attending the ceremony."',
        ['is', 'are', 'was', 'has'],
        1,
        'With "neither... nor", the verb agrees with the closer subject ("sisters" is plural, so "are").'
    ),

    // History G9
    q('q_g9_hist_04', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which ancient port city on the Red Sea served as the chief international trading port of the Aksumite Kingdom?',
        ['Adulis', 'Massawa', 'Zeila', 'Berbera'],
        0,
        'Adulis was the major commercial seaport of the Kingdom of Aksum, connecting inland trade routes with Greco-Roman, Arab, and Indian merchants.'
    ),
    q('q_g9_hist_05', 'Grade9', 'History', 'Semester1', 'Final',
        'Who was the courageous Ethiopian empress who played an instrumental military and diplomatic role during the Battle of Adwa in 1896?',
        ['Empress Taytu Betul', 'Empress Zewditu', 'Queen of Sheba', 'Empress Mentewab'],
        0,
        'Empress Taytu Betul commanded her own strategic battalion and devised the plan to cut off the Italian water supply at Enda Yesus (Mekelle).'
    ),

    // Geography G9
    q('q_g9_geog_03', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Lines of latitude run horizontally around the globe and measure angular distance north or south of the:',
        ['Equator', 'Prime Meridian', 'Tropic of Capricorn', 'International Date Line'],
        0,
        'The Equator (0° latitude) is the baseline reference from which latitude is measured north and south to the poles.'
    ),
    q('q_g9_geog_04', 'Grade9', 'Geography', 'Semester1', 'Final',
        'Which lake is the largest lake in Ethiopia and the hydrological source of the Blue Nile River?',
        ['Lake Tana', 'Lake Abaya', 'Lake Hawassa', 'Lake Chamo'],
        0,
        'Lake Tana, located in the northwestern highlands of Amhara Region, is Ethiopia\'s largest lake and the source of the Blue Nile (Abay).'
    ),

    // Citizenship G9
    q('q_g9_cit_03', 'Grade9', 'Citizen ship', 'Semester1', 'Mid1',
        'Which constitutional principle asserts that all governmental powers originate from the will of the citizens?',
        ['Popular sovereignty', 'Authoritarianism', 'Oligarchy', 'Totalitarianism'],
        0,
        'Popular sovereignty means the authority of a state and its government are created and sustained by the consent of its people through elected representatives.'
    ),
    q('q_g9_cit_04', 'Grade9', 'Citizen ship', 'Semester1', 'Final',
        'Which fundamental human right cannot be suspended even during a state of emergency?',
        ['Right to life and freedom from torture', 'Freedom of movement', 'Freedom of assembly', 'Right to strike'],
        0,
        'Non-derogable human rights, including the right to life and protection from torture and cruel punishment, cannot be suspended under any circumstance.'
    ),

    // Economics G9
    q('q_g9_econ_03', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'What occurs in a free market when the quantity demanded of a product exceeds the quantity supplied at the current price?',
        ['Shortage (excess demand)', 'Surplus (excess supply)', 'Market equilibrium', 'Deflation'],
        0,
        'When quantity demanded exceeds quantity supplied at the prevailing price, a shortage occurs, putting upward pressure on price.'
    ),
    q('q_g9_econ_04', 'Grade9', 'Economics', 'Semester1', 'Final',
        'Which factor of production is compensated with payment in the form of "wages"?',
        ['Land', 'Labor', 'Capital', 'Entrepreneurship'],
        1,
        'The reward for labor is wages; for land is rent; for capital is interest; and for entrepreneurship is profit.'
    ),

    // HP G9
    q('q_g9_hp_02', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which component of physical fitness refers to the ability of the heart and lungs to supply oxygen to working muscles during sustained exercise?',
        ['Cardiorespiratory endurance', 'Muscular flexibility', 'Reaction time', 'Agility'],
        0,
        'Cardiorespiratory endurance is the capacity of the cardiovascular and respiratory systems to deliver oxygen to tissues during continuous physical exertion.'
    ),
    q('q_g9_hp_03', 'Grade9', 'HP', 'Semester1', 'Final',
        'In athletics, which of the following is categorized as a field event rather than a track event?',
        ['Long Jump', '100m Sprint', '400m Hurdles', '4 × 100m Relay'],
        0,
        'Long jump is a jumping field event. Sprints, hurdles, and relays are running track events.'
    ),

    // Amharic G9
    q('q_g9_amh_02', 'Grade9', 'Amharic', 'Semester1', 'Mid1',
        '«ድር ቢያብር አንበሳ ያስር» የሚለው የአማርኛ ምሳሌያዊ አነጋገር የሚያስተምረው ዋና ቁምነገር ምንድን ነው?',
        ['የህብረትና የአንድነትን ጥንካሬ', 'የእንስሳትን አያያዝ', 'የፍጥነት አስፈላጊነትን', 'የብቸኝነትን ጥቅም'],
        0,
        '«ድር ቢያብር አንበሳ ያስር» ህዝቦች በተባበሩና በአንድነት በቆሙ ጊዜ የማይፈታ ችግር እንደሌለና የህብረትን ሃይል ያሳያል።'
    )
);

// ========================================================
// GRADE 10: EXPANSION (All Subjects)
// ========================================================
list.push(
    // Physics G10
    q('q_g10_phys_06', 'Grade10', 'Physics', 'Semester1', 'Mid1',
        'An electric iron is connected to a 220 V outlet and draws a current of 5 A. What is the electrical resistance of the iron?',
        ['44 Ω', '1100 Ω', '22 Ω', '0.022 Ω'],
        0,
        'Using Ohm\'s Law: R = V / I = 220 V / 5 A = 44 Ohms (Ω).'
    ),
    q('q_g10_phys_07', 'Grade10', 'Physics', 'Semester1', 'Final',
        'Which simple machine is defined as a rigid bar that pivots on a fixed point called a fulcrum?',
        ['Lever', 'Pulley', 'Inclined plane', 'Wedge'],
        0,
        'A lever is a simple machine consisting of a rigid beam and a fulcrum about which it rotates.'
    ),
    q('q_g10_phys_08', 'Grade10', 'Physics', 'Semester1', 'Final',
        'What type of optical mirror is commonly used as a passenger-side rearview mirror in vehicles to provide a wider field of view?',
        ['Convex mirror', 'Concave mirror', 'Plane mirror', 'Parabolic reflector'],
        0,
        'Convex mirrors always form diminished, upright, virtual images, allowing drivers to see a broader field of view behind them.'
    ),

    // Chemistry G10
    q('q_g10_chem_05', 'Grade10', 'Chemistry', 'Semester1', 'Mid1',
        'What is the oxidation number of sulfur in sulfuric acid (H₂SO₄)?',
        ['+2', '+4', '+6', '-2'],
        2,
        'In H₂SO₄: (2 × +1) + S + (4 × -2) = 0 => 2 + S - 8 = 0 => S = +6.'
    ),
    q('q_g10_chem_06', 'Grade10', 'Chemistry', 'Semester1', 'Final',
        'Which family of organic compounds has the general functional group -OH (hydroxyl)?',
        ['Alcohols', 'Carboxylic acids', 'Aldehydes', 'Esters'],
        0,
        'Alcohols (such as ethanol, C₂H₅OH) contain the hydroxyl functional group (-OH) bonded to a saturated carbon.'
    ),

    // Biology G10
    q('q_g10_bio_04', 'Grade10', 'Biology', 'Semester1', 'Mid1',
        'Which blood type is considered the universal recipient in the ABO blood group system?',
        ['Type O-', 'Type A+', 'Type B+', 'Type AB+'],
        3,
        'Individuals with Type AB+ blood have both A and B antigens on their red blood cells and neither anti-A nor anti-B antibodies, allowing them to receive blood of any ABO/Rh type.'
    ),
    q('q_g10_bio_05', 'Grade10', 'Biology', 'Semester1', 'Final',
        'In human digestion, which organ produces bile that is stored in the gallbladder and emulsifies dietary fats?',
        ['Stomach', 'Liver', 'Pancreas', 'Small intestine'],
        1,
        'The liver synthesizes bile salts that break large fat globules into small droplets (emulsification) to increase surface area for pancreatic lipase.'
    ),

    // Math G10
    q('q_g10_math_04', 'Grade10', 'Mathematics', 'Semester1', 'Mid1',
        'What is the discriminant of the quadratic equation 2x² - 4x + 2 = 0?',
        ['0', '16', '-16', '32'],
        0,
        'Discriminant Δ = b² - 4ac = (-4)² - 4(2)(2) = 16 - 16 = 0 (indicating exactly one real repeated root).'
    ),
    q('q_g10_math_05', 'Grade10', 'Mathematics', 'Semester1', 'Final',
        'What is the value of cos(60°)?',
        ['1/2', '√3/2', '√2/2', '0'],
        0,
        'From standard trigonometric ratios, cos(60°) = 1/2.'
    ),

    // English G10
    q('q_g10_eng_02', 'Grade10', 'English', 'Semester1', 'Mid1',
        'Choose the correct preposition: "The Ethiopian national team succeeded ______ winning the CECAFA Cup."',
        ['in', 'on', 'at', 'with'],
        0,
        'The verb "succeed" collocates with the preposition "in" followed by a gerund ("succeeded in winning").'
    ),

    // History G10
    q('q_g10_hist_02', 'Grade10', 'History', 'Semester1', 'Final',
        'Which Ethiopian monarch began the process of modern state centralization and reunification during the mid-19th century?',
        ['Emperor Tewodros II', 'Emperor Yohannes IV', 'Emperor Menelik II', 'Emperor Haile Selassie I'],
        0,
        'Emperor Tewodros II (Kassa Hailu), crowned in 1855, ended the Zemene Mesafint (Era of Princes) and initiated modernization.'
    ),

    // Geography G10
    q('q_g10_geog_02', 'Grade10', 'Geography', 'Semester1', 'Final',
        'The low-lying arid depression in northern Ethiopia that is one of the hottest and lowest inhabited places on Earth is:',
        ['Danakil Depression (Afar)', 'Ogaden Basin', 'Bale Mountains', 'Gambella Plain'],
        0,
        'The Danakil Depression lies over 120 meters below sea level in the Afar triangle, renowned for its extreme temperatures, active volcanoes, and salt pans.'
    ),

    // Economics G10
    q('q_g10_econ_02', 'Grade10', 'Economics', 'Semester1', 'Final',
        'Gross Domestic Product (GDP) measures the total monetary market value of:',
        ['All final goods and services produced within a country in a year', 'All imported goods sold in local markets', 'Total personal savings in commercial banks', 'Total tax revenues collected by the state'],
        0,
        'GDP is the total market value of all officially recognized final goods and services produced within a nation\'s borders during a specific period.'
    ),

    // IT G10
    q('q_g10_it_02', 'Grade10', 'IT', 'Semester1', 'Final',
        'Which malicious software disguised as legitimate software creates a backdoor into an infected system?',
        ['Trojan Horse', 'Worm', 'Adware', 'Cookie'],
        0,
        'A Trojan horse disguises itself as genuine software to deceive users into executing it, thereby compromising system security.'
    ),

    // HP G10
    q('q_g10_hp_01', 'Grade10', 'Hp', 'Semester1', 'Final',
        'How many players per team are on the court simultaneously during an official basketball match?',
        ['5 players', '6 players', '7 players', '11 players'],
        0,
        'Official FIBA and NBA basketball matches are played with 5 players per team on the court at any one time.'
    ),

    // Amharic G10
    q('q_g10_amh_01', 'Grade10', 'Amharic', 'Semester1', 'Final',
        'በአማርኛ ስነ-ጽሁፍ ውስጥ ባለቅኔው ወይም ደራሲው የቃላትን ድምጽና ምት በመጠቀም ስሜቱን የሚገልጽበት ጥበባዊ ጽሁፍ ምን ይባላል?',
        ['ግጥም', 'ልቦለድ', 'ተውኔት', 'ድርሰት'],
        0,
        'ግጥም በዜማ፣ በስንኝና በቤት አመታት ተዋቅሮ ሃሳብንና ጥልቅ ስሜትን በተጨመቀ ቋንቋ የሚያስተላልፍ ጥበባዊ ስራ ነው።'
    )
);

// ========================================================
// GRADE 11 & 12: EXPANSION (Agriculture, WEB, IT, Aptitude, Sciences)
// ========================================================
list.push(
    // Agriculture G11 & G12
    q('q_g11_agri_02', 'Grade11', 'Agriculture', 'Semester1', 'Mid1',
        'Which macronutrient is primarily responsible for vigorous leafy green vegetative growth in crops?',
        ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Calcium (Ca)'],
        0,
        'Nitrogen is a major constituent of chlorophyll and amino acids, stimulating rapid stem and foliage growth in crops.'
    ),
    q('q_g12_agri_01', 'Grade12', 'Agriculture', 'Pretest', 'Pretest',
        'The practice of growing two or more different crops simultaneously on the same plot of land is termed:',
        ['Intercropping', 'Monoculture', 'Fallow farming', 'Hydroponics'],
        0,
        'Intercropping involves cultivating multiple crops in proximity to maximize spatial efficiency, suppress weeds, and reduce pest vulnerability.'
    ),

    // WEB G11
    q('q_g11_web_02', 'Grade11', 'WEB', 'Semester1', 'Mid1',
        'Which CSS layout model provides a one-dimensional system designed for aligning items in rows or columns?',
        ['Flexbox (Flexible Box Layout)', 'CSS Grid', 'Float layout', 'Table layout'],
        0,
        'Flexbox is a 1D layout model optimized for distributing space and aligning items along a single axis (either row or column).'
    ),

    // IT G12
    q('q_g12_it_01', 'Grade12', 'IT', 'Pretest', 'Pretest',
        'Which protocol ensures secure, encrypted communication between a web client browser and a web server?',
        ['HTTPS (using TLS/SSL)', 'HTTP', 'FTP', 'Telnet'],
        0,
        'HTTPS (Hypertext Transfer Protocol Secure) encrypts bidirectional communications using Transport Layer Security (TLS).'
    ),

    // Aptitude G12
    q('q_g12_apt_05', 'Grade12', 'Aptitude', 'Pretest', 'Pretest',
        'If 5 workers can dig a trench in 12 days, how many days will it take 15 workers working at the same pace?',
        ['3 days', '4 days', '6 days', '36 days'],
        1,
        'Man-days is constant: 5 workers × 12 days = 60 man-days. With 15 workers: 60 / 15 = 4 days.'
    ),
    q('q_g12_apt_06', 'Grade12', 'Aptitude', 'Model', 'Model',
        'Pointing to a photograph of a boy, Dawit said: "He is the son of the only son of my mother." How is Dawit related to the boy?',
        ['Brother', 'Father', 'Uncle', 'Grandfather'],
        1,
        'The "only son of my mother" is Dawit himself. Therefore, the boy is the son of Dawit, making Dawit the boy\'s father.'
    ),

    // Physics G12
    q('q_g12_phys_04', 'Grade12', 'Physics', 'Pretest', 'Pretest',
        'What is the de Broglie wavelength of a particle with momentum p?',
        ['λ = h / p', 'λ = h · p', 'λ = p / h', 'λ = h / p²'],
        0,
        'Louis de Broglie proposed that matter exhibits wave-particle duality with wavelength given by λ = h / p, where h is Planck\'s constant.'
    ),

    // Chemistry G12
    q('q_g12_chem_04', 'Grade12', 'Chemistry', 'Pretest', 'Pretest',
        'Which industrial chemical process combines atmospheric nitrogen and hydrogen gas under high pressure and catalyst to synthesize ammonia?',
        ['Haber-Bosch Process', 'Contact Process', 'Ostwald Process', 'Hall-Héroult Process'],
        0,
        'The Haber-Bosch process synthesizes NH₃ from N₂ and H₂ gas over an iron catalyst at elevated temperature and pressure.'
    ),

    // Biology G12
    q('q_g12_bio_03', 'Grade12', 'Biology', 'Pretest', 'Pretest',
        'In the genetic code, which codon serves as the universal START codon for protein translation and codes for methionine?',
        ['AUG', 'UAA', 'UAG', 'UGA'],
        0,
        'AUG is the universal start codon in messenger RNA, signaling the ribosome to begin translation with methionine.'
    ),

    // Mathematics G12
    q('q_g12_math_05', 'Grade12', 'Mathematics', 'Model', 'Model',
        'What is the area bounded by the curve y = x² and the x-axis from x = 0 to x = 3?',
        ['3', '6', '9', '27'],
        2,
        'Area = ∫₀³ x² dx = [x³ / 3]₀³ = (3³ / 3) - 0 = 27 / 3 = 9.'
    )
);

console.log(`Adding ${list.length} supplementary questions...`);

const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const questionMap = new Map();
if (db.questions && Array.isArray(db.questions)) {
    db.questions.forEach(q => questionMap.set(q.id, q));
}
list.forEach(q => questionMap.set(q.id, q));

db.questions = Array.from(questionMap.values());

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Updated database! Total questions in db.json: ${db.questions.length}`);
