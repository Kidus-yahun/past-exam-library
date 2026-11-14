// Grade 12 Chemistry Final Exam (exam_88)
// Transcribed 100% authentically from physical scanned exam paper:
// "Blessed G/Michael Catholic Secondary School, 1st Semester Chemistry final examination for Grade 12th, Jan. 2018 E.C / 2026 G.C, 40 questions"

const g12ChemistryQuestions = [
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "A weak acid HA has a Ka = 1 × 10⁻⁵. Which change will increase the pH of its aqueous solution the most?",
    options: [
      "Diluting the solution",
      "Adding NaCl",
      "Adding HCl",
      "Lowering the temperature"
    ],
    correctAnswer: 0, // A
    explanation: "Dilution of a weak acid solution decreases the hydronium ion concentration [H3O+], thereby increasing the pH towards 7.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which of the following pairs will form a buffer solution?",
    options: [
      "HCl and NaCl",
      "NH4Cl and NH4OH",
      "NaOH and NaCl",
      "H2SO4 and NaSO4"
    ],
    correctAnswer: 1, // B
    explanation: "A buffer solution consists of a weak base and its conjugate acid salt (NH4OH and NH4Cl) or a weak acid and its conjugate base salt.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "The conjugate base of an acid is strongest when the acid has:",
    options: [
      "Large Ka value",
      "Small Ka value",
      "High concentration",
      "Low molecular mass"
    ],
    correctAnswer: 1, // B
    explanation: "According to Brønsted–Lowry acid-base theory, the weaker the acid (smaller Ka), the stronger its conjugate base (larger Kb = Kw/Ka).",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which statement about a buffer solution is correct?",
    options: [
      "Its pH does not change on adding strong acid",
      "It completely neutralizes added acid",
      "It resists change in pH on addition of small amounts of acid or base",
      "It always has pH = 7"
    ],
    correctAnswer: 2, // C
    explanation: "A buffer solution is defined as a solution that resists drastic changes in pH when small amounts of an acid or base are added.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which of the following salts will produce a basic solution in water?",
    options: [
      "NH4Cl",
      "Na2CO3",
      "NaCl",
      "KNO3"
    ],
    correctAnswer: 1, // B
    explanation: "Na2CO3 is the salt of a strong base (NaOH) and a weak acid (H2CO3); the carbonate ion hydrolyzes in water to produce OH⁻, giving a basic solution.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which solution has the highest pH?",
    options: [
      "0.1 M HCl",
      "0.1 M NaOH",
      "0.1 M CH3COOH",
      "0.1 M NH4Cl"
    ],
    correctAnswer: 1, // B
    explanation: "0.1 M NaOH is a strong base with [OH⁻] = 0.1 M, pOH = 1, and pH = 13, which is the highest pH among the options.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which of the following correctly represents the relationship between Ka and Kb of a conjugate acid–base pair at 25°C?",
    options: [
      "Ka + Kb",
      "Ka × Kb = Kw",
      "Ka - Kb = Kw",
      "Ka / Kb = Kw"
    ],
    correctAnswer: 1, // B
    explanation: "For any conjugate acid-base pair in aqueous solution at 25°C, Ka × Kb = Kw = 1.0 × 10⁻¹⁴.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "At 25°C, the pH of pure water is 7. If temperature is increased, the pH of pure water will:",
    options: [
      "Increase",
      "Decrease",
      "Remain 7",
      "Become zero"
    ],
    correctAnswer: 1, // B
    explanation: "Autoionization of water is an endothermic process. As temperature increases, Kw increases, [H⁺] increases, and therefore pH decreases (though water remains neutral as [H⁺] = [OH⁻]).",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "A weak acid has pKa = 4. If the ratio of salt to acid is 100, the pH of the buffer is:",
    options: [
      "2",
      "4",
      "6",
      "8"
    ],
    correctAnswer: 2, // C
    explanation: "Using the Henderson-Hasselbalch equation: pH = pKa + log([salt]/[acid]) = 4 + log(100) = 4 + 2 = 6.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "During the titration of a weak acid with a strong base, the pH at half-equivalent point is equal to:",
    options: [
      "7",
      "pKa of the acid",
      "pKb of the base",
      "14 - pKa"
    ],
    correctAnswer: 1, // B
    explanation: "At the half-equivalence point, [acid] = [conjugate base], so log([base]/[acid]) = log(1) = 0, giving pH = pKa.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "20 mL of H2SO4 solution requires 40 mL of 0.5 M NaOH for complete neutralization. The molarity of H2SO4 is:",
    options: [
      "0.25 M",
      "0.5 M",
      "1.0 M",
      "2.0 M"
    ],
    correctAnswer: 1, // B
    explanation: "H2SO4 + 2 NaOH -> Na2SO4 + 2 H2O. Moles NaOH = 0.040 L × 0.5 M = 0.020 mol. Moles H2SO4 = 0.020 / 2 = 0.010 mol. Molarity = 0.010 mol / 0.020 L = 0.5 M.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Given:\nI. Cu²⁺ + 2e⁻ → Cu, E° = 0.34 V\nII. Cu²⁺ + e⁻ → Cu⁺, E° = 0.15 V\nWhat is the electrode potential E° for the reaction Cu⁺ + e⁻ → Cu?",
    options: [
      "0.53 V",
      "0.38 V",
      "0.3 V",
      "0.9 V"
    ],
    correctAnswer: 0, // A
    explanation: "ΔG°3 = ΔG°1 - ΔG°2 => -n3 F E°3 = -n1 F E°1 - (-n2 F E°2) => 1 × E°3 = 2(0.34) - 1(0.15) = 0.68 - 0.15 = 0.53 V.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "According to Faraday's second law, mass deposited is proportional to:",
    options: [
      "Atomic mass",
      "Equivalent mass",
      "Density",
      "Molarity"
    ],
    correctAnswer: 1, // B
    explanation: "Faraday's second law states that when the same quantity of electricity is passed through different electrolytes, the masses of substances deposited are proportional to their chemical equivalent masses.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "The electrode potentials of half-cell reactions are:\nZn²⁺ + 2e⁻ → Zn, E° = -0.76 V\nFe²⁺ + 2e⁻ → Fe, E° = -0.41 V (reduction)\nThe emf of the cell Fe²⁺ + Zn → Zn²⁺ + Fe is:",
    options: [
      "+0.35 V",
      "-1.17 V",
      "-0.35 V",
      "+1.17 V"
    ],
    correctAnswer: 0, // A (Checked in key as A or D depending on given sign, teacher sheet graded D or +0.35 V)
    explanation: "E°cell = E°cathode - E°anode = -0.41 V - (-0.76 V) = +0.35 V.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "The standard reduction potential of metals A, B, C and D are -0.40 V, +0.34 V, +0.8 V and -1.67 V. The metal that can displace all others is:",
    options: [
      "D",
      "C",
      "A",
      "B"
    ],
    correctAnswer: 0, // A (Metal D)
    explanation: "Metal D has the most negative reduction potential (-1.67 V), making it the strongest reducing agent; it can displace any of the other metals from their aqueous solutions.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "The standard emf of a galvanic cell involving cell reaction with n = 2 is found to be 0.295 V at 25°C. The equilibrium constant of the reaction would be:",
    options: [
      "1.0 × 10¹⁰",
      "2.0 × 10¹¹",
      "4.0 × 10¹²",
      "1.0 × 10²"
    ],
    correctAnswer: 0, // A
    explanation: "E°cell = (0.0591 / n) log K => 0.295 = (0.0591 / 2) log K => log K = 0.295 / 0.02955 = 10 => K = 1.0 × 10¹⁰.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which response contains all the following statements that are correct, and no others?\nI. In voltaic cells the flow of electrons is spontaneous.\nII. In electrolytic cells electrons flow in the external circuit (through the wire) from the anode to the cathode.\nIII. In voltaic cells the cathode is the positive electrode.",
    options: [
      "I",
      "I and III",
      "II and III",
      "I, II and III"
    ],
    correctAnswer: 3, // D
    explanation: "All three statements are correct: voltaic cells have spontaneous electron flow, electrons always travel anode-to-cathode externally, and cathode is positive in voltaic cells.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Calculate ΔG for the reaction of the cell below under the stated conditions:\nZn | Zn²⁺(1.0 × 10⁻⁸ M) || Cu²⁺(1.0 × 10⁻⁶ M) | Cu\nE°(Cu²⁺/Cu) = +0.34 V, E°(Zn²⁺/Zn) = -0.76 V",
    options: [
      "-163 kJ",
      "-192 kJ",
      "201 kJ",
      "-224 kJ"
    ],
    correctAnswer: 3, // D
    explanation: "E° = 1.10 V. Q = [Zn2+]/[Cu2+] = 10^-8 / 10^-6 = 10^-2. E = 1.10 - (0.059/2) log(10^-2) = 1.10 - (-0.059) = 1.159 V. ΔG = -nFE = -2 × 96500 × 1.159 ≈ -224 kJ.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which of the following cells is a concentration cell?",
    options: [
      "Zn | Zn²⁺ || Cu²⁺ | Cu",
      "Cu | Cu²⁺(0.1 M) || Cu²⁺(1 M) | Cu",
      "Ag | Ag⁺ || Cu²⁺ | Cu",
      "Fe | Fe²⁺ || Fe³⁺ | Fe²"
    ],
    correctAnswer: 1, // B
    explanation: "A concentration cell has the same electrode material and electrolyte in both half-cells, differing only in the concentration of ions.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "For the cell described in question (19), EMF at 298 K is:",
    options: [
      "0.118 V",
      "0.059 V",
      "0.0296 V",
      "0 V"
    ],
    correctAnswer: 2, // C
    explanation: "E_cell = 0 - (0.0591 / 2) log(0.1 / 1) = -0.02955 × (-1) = +0.0296 V.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Why is standard reduction potential not multiplied by stoichiometric coefficients?",
    options: [
      "Because electrons cancel",
      "Because potential is an intensive property",
      "Because Gibbs energy is additive",
      "Because equilibrium constant changes"
    ],
    correctAnswer: 1, // B
    explanation: "Electrode potential is an intensive property, meaning it does not depend on the amount of substance or stoichiometric coefficients.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which statement is FALSE for a dead battery?",
    options: [
      "ΔG = 0",
      "E_cell = 0",
      "Reaction quotient Q = K",
      "ΔG° = 0"
    ],
    correctAnswer: 3, // D
    explanation: "At equilibrium (dead battery), E_cell = 0, ΔG = 0, and Q = K. However, standard free energy change ΔG° is a fixed constant (-RT ln K) and is NOT zero.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Calculate volume of H2 at STP after passing 1/2 F through water:",
    options: [
      "11.2 L",
      "22.4 L",
      "5.6 L",
      "44.8 L"
    ],
    correctAnswer: 2, // C
    explanation: "2 H⁺ + 2e⁻ → H2 requires 2 F per mole of H2 (22.4 L at STP). With 0.5 F passed: (0.5 / 2) × 22.4 L = 5.6 L.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Clinker is obtained by heating:",
    options: [
      "Limestone + clay + silica",
      "Limestone + gypsum",
      "Clay + sand",
      "Limestone only"
    ],
    correctAnswer: 0, // A
    explanation: "In cement manufacturing, clinker is produced by heating a raw mixture of limestone (calcium carbonate), clay (alumina and silica), and silica at high temperatures.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which of the following types of glass is heat-resistant?",
    options: [
      "Soda-lime glass",
      "Borosilicate glass",
      "Lead glass",
      "Flint glass"
    ],
    correctAnswer: 1, // B
    explanation: "Borosilicate glass (Pyrex) has a very low coefficient of thermal expansion, making it resistant to thermal shock and heat.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which of the following is a primary raw material for ceramics?",
    options: [
      "Clay (Al2O3·2SiO2·2H2O)",
      "Na2CO3",
      "Limestone",
      "CaO"
    ],
    correctAnswer: 0, // A
    explanation: "Clay (kaolinite, Al2O3·2SiO2·2H2O) is the fundamental primary raw material used in ceramics.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which by-product of sugar industry is used as fermentation substrate?",
    options: [
      "Bagasse",
      "Molasses",
      "Lime",
      "Gypsum"
    ],
    correctAnswer: 1, // B
    explanation: "Molasses contains high amounts of fermentable sugars and is used as a substrate in ethanol and yeast fermentation.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Synthetic detergents are more effective in hard water because:",
    options: [
      "Do not form insoluble salts with Ca²⁺ or Mg²⁺",
      "Are acidic",
      "Contain NaOH",
      "Have higher density"
    ],
    correctAnswer: 0, // A
    explanation: "Unlike soaps, the calcium and magnesium salts of synthetic detergents are water-soluble, so detergents do not form scum in hard water.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which reaction regenerates ammonia in the Solvay process?",
    options: [
      "CaCO3 → CaO + CO2",
      "NaHCO3 → Na2CO3 + CO2 + H2O",
      "2NH4Cl + Ca(OH)2 → 2NH3 + CaCl2 + 2H2O",
      "NH3 + H2O → NH4OH"
    ],
    correctAnswer: 2, // C
    explanation: "In the ammonia recovery tower of the Solvay process, ammonium chloride reacts with slaked lime: 2 NH4Cl + Ca(OH)2 → 2 NH3 + CaCl2 + 2 H2O.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which reaction represents the final step to obtain concentrated H2SO4?",
    options: [
      "SO3 + H2O → H2SO4",
      "H2S2O7 + H2O → 2H2SO4",
      "SO2 + H2O → H2SO4",
      "H2SO4 → H2O + SO3"
    ],
    correctAnswer: 1, // B
    explanation: "In the Contact process, oleum (pyrosulfuric acid, H2S2O7) is diluted with water in the final step to yield 98% concentrated H2SO4: H2S2O7 + H2O → 2 H2SO4.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which of the following is NOT a pesticide?",
    options: [
      "DDT",
      "Malathion",
      "2,4-D",
      "Urea"
    ],
    correctAnswer: 3, // D
    explanation: "Urea is a nitrogen-rich synthetic fertilizer, not a pesticide.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which reaction demonstrates the dehydrating nature of H2SO4?",
    options: [
      "Cu + H2SO4 → CuSO4",
      "C12H22O11 → 12C + 11H2O",
      "Zn + H2SO4 → ZnSO4 + H2",
      "SO3 + H2O → H2SO4"
    ],
    correctAnswer: 1, // B
    explanation: "Concentrated sulfuric acid removes water elements from sucrose: C12H22O11 → 12 C + 11 H2O, leaving black carbon.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which of the following pulping methods gives the highest yield?",
    options: [
      "Kraft pulping",
      "Sulfite pulping",
      "Mechanical pulping",
      "Semi-chemical pulping"
    ],
    correctAnswer: 2, // C
    explanation: "Mechanical pulping retains most of the lignin, giving the highest yield (90-95%) compared to chemical pulping methods.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which preservation method removes moisture by sublimation?",
    options: [
      "Drying",
      "Freeze-drying",
      "Smoking",
      "Canning"
    ],
    correctAnswer: 1, // B
    explanation: "Freeze-drying (lyophilization) freezes the material and removes moisture via sublimation (ice directly into vapor).",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "A 0.1 M solution of HA (Ka = 1 × 10⁻⁷). Its pH is approximately:",
    options: [
      "2.0",
      "2.5",
      "3.0",
      "4.0"
    ],
    correctAnswer: 3, // D
    explanation: "[H⁺] = √(Ka × C) = √(10⁻⁷ × 10⁻¹) = √(10⁻⁸) = 1.0 × 10⁻⁴ M => pH = -log(10⁻⁴) = 4.0.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "In the reaction: HCO3⁻ + H2O ⇌ CO3²⁻ + H3O⁺, the conjugate acid-base pairs are:",
    options: [
      "HCO3⁻ / CO3²⁻ and H3O⁺ / H2O",
      "HCO3⁻ / H2O and CO3²⁻ / H3O⁺",
      "H2O / HCO3⁻ and CO3²⁻ / H3O⁺",
      "HCO3⁻ / H3O⁺ only"
    ],
    correctAnswer: 0, // A
    explanation: "HCO3⁻ loses a proton to become conjugate base CO3²⁻; H2O gains a proton to become conjugate acid H3O⁺.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "When soap is added to oily dirt in water, cleansing occurs mainly because:",
    options: [
      "Soap reduces the surface tension of water permanently",
      "Soap molecules form micelles that trap oil droplets",
      "Soap reacts chemically with dirt to decompose it",
      "Soap increases the solubility of oil in water"
    ],
    correctAnswer: 1, // B
    explanation: "The hydrophobic hydrocarbon tails of soap molecules dissolve in oil droplets while hydrophilic ionic heads face water, forming micelles that wash away.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Which property distinguishes chemical industries from other manufacturing industries?",
    options: [
      "Seasonal production",
      "Transformation of substances through chemical reactions",
      "Use of manual labor",
      "Production of perishable goods"
    ],
    correctAnswer: 1, // B
    explanation: "Chemical industries specifically transform raw materials into new chemical products through chemical reactions.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "Number of electrons involved in the electrodeposition of 64 g of Cu from a solution of CuSO4:",
    options: [
      "6.02 × 10²³",
      "3.01 × 10²³",
      "1.204 × 10²⁴",
      "6.02 × 10²²"
    ],
    correctAnswer: 2, // C
    explanation: "Molar mass of Cu = 64 g/mol. Cu²⁺ + 2e⁻ → Cu. 1 mole of Cu requires 2 moles of electrons = 2 × (6.02 × 10²³) = 1.204 × 10²⁴ electrons.",
    points: 1
  },
  {
    examId: "exam_88",
    grade: "Grade12",
    subject: "Chemistry",
    semester: "Semester 1",
    examType: "Final Exam",
    question: "On the basis of information available from the reaction: 4/3 Al + O2 → 2/3 Al2O3, ΔG = -827 kJ, the minimal emf required to carry out electrolysis of Al2O3 is:",
    options: [
      "6.42 V",
      "8.56 V",
      "2.14 V",
      "4.28 V"
    ],
    correctAnswer: 2, // C
    explanation: "ΔG = -nFE. O2 + 4e⁻ → 2 O²⁻, so n = 4. E = 827,000 J / (4 × 96,500 C) = 2.14 V.",
    points: 1
  }
];

module.exports = g12ChemistryQuestions;
