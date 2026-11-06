const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const examId = 'exam_g11_chem_s1_m1';

// 1. Add Exam if not already present
const existingExamIdx = db.exams.findIndex(e => e.id === examId);
const examObj = {
    id: examId,
    title: 'Grade11 Chemistry Semester1 Mid1',
    grade: 'Grade11',
    semester: 'Semester1',
    examType: 'Mid1',
    subject: 'Chemistry',
    year: '2024',
    fileUrl: '/exams/Grade11/Semester1/Mid1/Chemistry.pdf',
    fileName: 'Chemistry.pdf',
    fileSize: 8133,
    uploadedBy: 'academic-portal',
    createdAt: new Date().toISOString()
};

if (existingExamIdx >= 0) {
    db.exams[existingExamIdx] = examObj;
} else {
    db.exams.push(examObj);
}

// 2. Add Questions
const questionsData = [
    {
        id: 'q_g11_chem_s1_m1_01',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following postulate of Daltons atomic theory disproved by the modern atomic theory?',
        options: [
            'Atoms of different element has different masses',
            'All atoms of the same element are identical and have the same masses',
            'elements are made up of small particles called atoms',
            'atoms combine in small whole number to form compound'
        ],
        correctAnswer: 1,
        explanation: "Dalton stated that all atoms of a given element have identical mass. The discovery of isotopes (atoms of the same element with different numbers of neutrons and therefore different masses, like Carbon-12 and Carbon-13) disproved this postulate.",
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_02',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which atomic model compared the structure of an atom with the solar system?',
        options: ["Dalton's", "Thomson's", "Rutherford's", "Quantum Mechanical"],
        correctAnswer: 2,
        explanation: "Rutherford's nuclear/planetary model proposed that negatively charged electrons revolve around a tiny, dense, positively charged nucleus in orbits, analogous to planets orbiting the Sun.",
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_03',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: "Which of the following is not true about Bohr's atomic postulate?",
        options: [
            'The energy of an electron remains the same as long as it stays in the same orbit',
            'electrons release or absorb energy when they move between orbits',
            'electrons revolve around the nucleus in circular orbits',
            'When electrons fall from a higher (excited) state they absorb a fixed amount of energy.'
        ],
        correctAnswer: 3,
        explanation: "According to Bohr's postulate, when electrons fall from a higher (excited) orbit to a lower energy orbit, they EMIT (release) energy in the form of a photon. They only absorb energy when jumping to a higher orbit.",
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_04',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Carbon has two isotopes, C-12 and C-13 that exists in 9:1 abundance ratio. Determine the average atomic mass of carbon?',
        options: ['12.1 amu', '13.2 amu', '12.5 amu', '13.1 amu'],
        correctAnswer: 0,
        explanation: 'Average atomic mass = (Mass1 × Ratio1 + Mass2 × Ratio2) / (Total Ratio) = (12 × 9 + 13 × 1) / (9 + 1) = (108 + 13) / 10 = 121 / 10 = 12.1 amu.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_05',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'A light with a wavelength of 400nm strikes the metal surface of metallic cesium in a photocell, and the maximum kinetic energy of the electron ejected is 1.54 * 10^-19 J. Calculate the work function of cesium.',
        options: ['3.34 * 10^-19 J', '4.97 * 10^-19 J', '5.18 * 10^14 J', '4.0 * 10^7 J'],
        correctAnswer: 1,
        explanation: 'Photon energy E = hc / λ = (6.626 × 10^-34 J·s × 3.0 × 10^8 m/s) / (400 × 10^-9 m) = 4.97 × 10^-19 J. Work function Φ = E - KE_max = 4.97 × 10^-19 - 1.54 × 10^-19 = 3.43 × 10^-19 J (Option A with rounding). The official answer key marked B (4.97 × 10^-19 J, the incident photon energy).',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_06',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the wavelength associated with an electron of mass, m = 9.11 * 10^-28 g travelling at 40% of the velocity of light?',
        options: ['6.06 * 10^-15 m', '2.42 * 10^-15 m', '6.06 * 10^-12 m', '2.42 * 10^-11 m'],
        correctAnswer: 1,
        explanation: 'De Broglie wavelength λ = h / (m × v). With m = 9.11 × 10^-31 kg and v = 0.40 × 3.0 × 10^8 m/s = 1.2 × 10^8 m/s: λ = 6.626 × 10^-34 / (9.11 × 10^-31 × 1.2 × 10^8) = 6.06 × 10^-12 m (Option C). The exam paper answer key officially designated B.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_07',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What would be the wavelength of a radio wave having frequency of 3MHz?',
        options: ['300 nm', '100 m', '300 m', '100 nm'],
        correctAnswer: 1,
        explanation: 'λ = c / ν = (3.0 × 10^8 m/s) / (3 × 10^6 Hz) = 100 m.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_08',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which color corresponds to light of the longest wavelength?',
        options: ['Green', 'Red', 'Yellow', 'Blue'],
        correctAnswer: 1,
        explanation: 'In the visible spectrum, red light has the longest wavelength (~700 nm) and the lowest frequency/energy, while violet/blue has the shortest wavelength (~400 nm).',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_09',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following is fundamentally different from the other?',
        options: ['Radio wave', 'Light wave', 'Sound wave', 'Micro wave'],
        correctAnswer: 2,
        explanation: 'Radio waves, visible light, and microwaves are transverse electromagnetic waves that can propagate through vacuum at the speed of light. Sound waves are longitudinal mechanical waves requiring a material medium.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_10',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the frequency of light having a wavelength of 4.5 * 10^-5 cm?',
        options: ['2.84 * 10^-12 Hz', '2.1 * 10^4 Hz', '6.67 * 10^14 Hz', '4.29 * 10^14 Hz'],
        correctAnswer: 2,
        explanation: 'Convert λ to meters: λ = 4.5 × 10^-7 m. Frequency ν = c / λ = (3.0 × 10^8 m/s) / (4.5 × 10^-7 m) = 6.67 × 10^14 Hz.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_11',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following is not true about cathode rays? Cathode rays',
        options: [
            'travel in straight lines from cathode to the anode.',
            'Contain particles, which are negatively charged.',
            'are common constituents of all matter and their m/e is constant for all gases.',
            'contains particles, which are positively charged.'
        ],
        correctAnswer: 3,
        explanation: 'Cathode rays are streams of electrons, which are negatively charged fundamental particles. They do not contain positively charged particles.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_12',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following is not true about the photoelectric effect?',
        options: [
            'most metals require ultraviolet light to emit electrons.',
            'a bright light causes more electrons to be emitted than a weak light.',
            'a bright light causes fewer electrons to be emitted than a weak light.',
            'higher frequency light emits electrons with higher kinetic energy.'
        ],
        correctAnswer: 2,
        explanation: 'Light intensity (brightness) is proportional to the number of incident photons. Therefore, bright light ejects MORE photoelectrons per unit time than weak light of the same frequency, never fewer.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_13',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The maximum kinetic energy of a photoelectron emitted from metal is 1.03 * 10^-19 J when light that has a 656nm wavelength shines on the surface. What is the threshold frequency for this metal?',
        options: ['4.57 * 10^14 s^-1', '3.02 * 10^14 s^-1', '3.02 * 10^14 s^-1', '4.57 * 10^14 s^-1'],
        correctAnswer: 2,
        explanation: 'E = hc / λ = (6.626 × 10^-34 × 3 × 10^8) / (656 × 10^-9) = 3.03 × 10^-19 J. Work function Φ = E - KE_max = 3.03 × 10^-19 - 1.03 × 10^-19 = 2.00 × 10^-19 J. Threshold frequency ν0 = Φ / h = (2.00 × 10^-19) / (6.626 × 10^-34) = 3.02 × 10^14 s^-1.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_14',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following transition will have minimum wavelength?',
        options: ['n4 -> n1', 'n2 -> n1', 'n4 -> n2', 'n3 -> n1'],
        correctAnswer: 0,
        explanation: 'Wavelength is inversely proportional to energy: λ = hc / ΔE. Minimum wavelength corresponds to MAXIMUM energy difference. The transition from n=4 to n=1 has ΔE ∝ (1 - 1/16) = 15/16 = 0.9375, which is the largest energy gap among the choices.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_15',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the energy associated with one photon of microwave radiation having frequency of 2.45 * 10^9 s^-1?',
        options: ['1.62 * 10^24 J', '2.45 * 10^9 J', '2.45 * 10^3 J', '1.62 * 10^-24 J'],
        correctAnswer: 3,
        explanation: 'E = h × ν = 6.626 × 10^-34 J·s × 2.45 × 10^9 s^-1 = 1.62 × 10^-24 J.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_16',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'What is the distance that a radio wave will travel in 0.25 sec?',
        options: ['1.2 * 10^7 m', '12 * 10^7 m', '7.5 * 10^7 m', '5.6 * 10^7 m'],
        correctAnswer: 2,
        explanation: 'Distance = speed × time = c × t = (3.0 × 10^8 m/s) × 0.25 s = 7.5 × 10^7 m.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_17',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The wave number of an electromagnetic radiation is 1 * 10^5 cm^-1. The frequency of the radiation would be:',
        options: ['3 * 10^8 s^-1', '3 * 10^6 s^-1', '3 * 10^10 s^-1', '3 * 10^15 s^-1'],
        correctAnswer: 3,
        explanation: 'Frequency ν = c × ν̄ = (3.0 × 10^10 cm/s) × (1 × 10^5 cm^-1) = 3.0 × 10^15 s^-1.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_18',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The velocity of two particles A and B are 0.05 ms^-1 and 0.01 ms^-1 respectively. The mass of B is five times of mass of A, the ratio of their De Broglie wavelength is;',
        options: ['2:1', '1:4', '1:1', '4:1'],
        correctAnswer: 2,
        explanation: 'λ = h / (m × v). Ratio λA / λB = (mB × vB) / (mA × vA) = (5 mA × 0.01) / (mA × 0.05) = 0.05 / 0.05 = 1, meaning the ratio is 1:1.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_19',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The De Broglie wavelength of an electron waves in two orbits are 3:5. The ratio of kinetic energy of electron will be;',
        options: ['25:9', '5:3', '9:25', '3:5'],
        correctAnswer: 0,
        explanation: 'Since p = h / λ and KE = p² / (2m), kinetic energy is inversely proportional to λ² (KE ∝ 1/λ²). Ratio KE1 / KE2 = (λ2 / λ1)² = (5 / 3)² = 25:9.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_20',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The rest mass of a proton is 1.673 * 10^-27 Kg and that of the electron is 9.109 * 10^-31 Kg. What must be the speed of the proton which has the same De Broglie wavelength as an electron moving with a speed of 9 * 10^6 m/s?',
        options: ['3600 m/s', '4900 m/s', '4300 m/s', '5600 m/s'],
        correctAnswer: 1,
        explanation: 'Equating wavelengths gives mp × vp = me × ve. Solving for vp: vp = (me × ve) / mp = (9.109 × 10^-31 × 9 × 10^6) / (1.673 × 10^-27) = 8.198 × 10^-24 / 1.673 × 10^-27 ≈ 4900 m/s.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_21',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The Bohr orbit radius for the hydrogen atom (n=1) is approximately 0.53 Å. The radius for the first excited state (n=2) orbit is (in Å):',
        options: ['4.77', '0.13', '1.06', '2.12'],
        correctAnswer: 3,
        explanation: 'rn = r1 × n² / Z. For hydrogen (Z=1) in the first excited state (n=2): r2 = 0.53 Å × 2² = 0.53 × 4 = 2.12 Å.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_22',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The radius of hydrogen atom in the ground state is 0.53 Å. The radius of Li^2+ ion (atomic number=3) in a similar state (in Å) is;',
        options: ['0.53', '0.17', '1.06', '0.265'],
        correctAnswer: 1,
        explanation: 'For hydrogen-like ions, r = r1 × n² / Z. For Li²⁺ (Z=3) in ground state (n=1): r = 0.53 / 3 = 0.177 Å ≈ 0.17 Å.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_23',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'The ratio of the speed of electron in first orbit of hydrogen atom to speed of light in vacuum is;',
        options: ['137', '1/137', '100', '10^-2'],
        correctAnswer: 1,
        explanation: 'The ratio v1 / c is known as the fine-structure constant α ≈ 1 / 137. The orbital speed of the electron in ground state hydrogen is approximately 2.18 × 10^6 m/s, which is 1/137th the speed of light.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_24',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'Which of the following particle was discovered by the cathode experiment?',
        options: ['electrons', 'neutrons', 'nucleus', 'protons'],
        correctAnswer: 0,
        explanation: 'J.J. Thomson discovered electrons in 1897 through his cathode ray tube experiments, determining their charge-to-mass (e/m) ratio.',
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_25',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: "What aspect of modern view of atomic structure was proved by Rutherford's gold foil experiment?",
        options: ['the charge on a particle', 'the existence of the nucleus', 'the charge on an electron', 'the existence of electrons'],
        correctAnswer: 1,
        explanation: "Rutherford's alpha particle scattering experiment showed that most alpha particles passed straight through, but a few deflected at large angles, proving that the positive charge and mass of the atom are concentrated in a tiny central nucleus.",
        points: 1
    },
    {
        id: 'q_g11_chem_s1_m1_bonus',
        examId,
        grade: 'Grade11',
        subject: 'Chemistry',
        semester: 'Semester1',
        examType: 'Mid1',
        question: 'BONUS: Surface of a certain metal is first illuminated with light of wavelength λ1 = 350 nm and then by light of wavelength λ2 = 540 nm. It is found that maximum speed of the electrons in the two cases differ by factor of 2. The work function of the metal (eV) is close to: (energy of photon = 1240 / λ eV)',
        options: ['1.2 eV', '1.9 eV', '2.5 eV', '3.1 eV'],
        correctAnswer: 1,
        explanation: 'E1 = 1240 / 350 = 3.543 eV; E2 = 1240 / 540 = 2.296 eV. Since v1 = 2 × v2, KE1 = 4 × KE2. Using Einstein photoelectric relation: (E1 - Φ) = 4 × (E2 - Φ) => 3Φ = 4E2 - E1 = 4(2.296) - 3.543 = 5.641 eV => Φ = 5.641 / 3 = 1.88 eV ≈ 1.9 eV.',
        points: 2
    }
];

// Remove existing questions for this exam if any and append fresh ones
db.questions = db.questions.filter(q => q.examId !== examId);
db.questions.push(...questionsData);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully added exam ${examId} and ${questionsData.length} questions to ${dbPath}`);
console.log(`Total exams now: ${db.exams.length}, Total questions now: ${db.questions.length}`);
