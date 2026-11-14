// scripts/inject_g12_mid1_full_papers.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const newG12Questions = [
    // ==========================================
    // GRADE 12 MATHEMATICS MID 1 (exam_100) - target 25 total
    // ==========================================
    {
        id: 'q_g12_math_m1_11', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the sum of the first 20 terms of the arithmetic progression: 3, 7, 11, 15, ...?',
        options: ['820', '800', '840', '780'],
        correctAnswer: 0, explanation: 'Sn = (n/2)[2a + (n - 1)d] => S20 = (20/2)[2(3) + (19)(4)] = 10[6 + 76] = 10(82) = 820.', points: 1
    },
    {
        id: 'q_g12_math_m1_12', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Find the limit: lim_{x -> 0} [(sqrt(1 + x) - 1) / x]',
        options: ['1/2', '1', '0', '2'],
        correctAnswer: 0, explanation: 'Rationalizing numerator: [sqrt(1 + x) - 1][sqrt(1 + x) + 1] / [x(sqrt(1 + x) + 1)] = x / [x(sqrt(1 + x) + 1)] = 1 / (1 + 1) = 1/2.', points: 1
    },
    {
        id: 'q_g12_math_m1_13', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Evaluate lim_{x -> 1} (x^3 - 1) / (x - 1):',
        options: ['3', '1', '0', 'Infinity'],
        correctAnswer: 0, explanation: 'Factoring: (x - 1)(x^2 + x + 1) / (x - 1) = x^2 + x + 1. At x = 1: 1^2 + 1 + 1 = 3.', points: 1
    },
    {
        id: 'q_g12_math_m1_14', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the sum to infinity of the geometric series sum_{n=1}^infinity (3 / 4^n)?',
        options: ['1', '3/4', '4/3', '1/3'],
        correctAnswer: 0, explanation: 'First term a = 3/4, common ratio r = 1/4. Sum S = a / (1 - r) = (3/4) / (1 - 1/4) = (3/4) / (3/4) = 1.', points: 1
    },
    {
        id: 'q_g12_math_m1_15', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'If lim_{x -> 2} [f(x) - 5] / (x - 2) = 3, what is the value of lim_{x -> 2} f(x)?',
        options: ['5', '3', '0', '8'],
        correctAnswer: 0, explanation: 'Since denominator approaches 0, the numerator must also approach 0: lim_{x -> 2} [f(x) - 5] = 0 => lim_{x -> 2} f(x) = 5.', points: 1
    },
    {
        id: 'q_g12_math_m1_16', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Evaluate lim_{x -> 0} [tan(3x) / sin(2x)]:',
        options: ['3/2', '2/3', '1', '6'],
        correctAnswer: 0, explanation: 'lim_{x -> 0} [tan(3x)/ (3x)] * [ (2x) / sin(2x) ] * (3/2) = 1 * 1 * 3/2 = 3/2.', points: 1
    },
    {
        id: 'q_g12_math_m1_17', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following sequences is divergent?',
        options: ['an = n / (n + 1)', 'an = 1 / 2^n', 'an = (-1)^n * n', 'an = 3 + 1/n'],
        correctAnswer: 2, explanation: 'an = (-1)^n * n oscillates with unboundedly growing magnitude (-1, 2, -3, 4, ...), so it diverges.', points: 1
    },
    {
        id: 'q_g12_math_m1_18', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'If a sequence has general term an = (2n - 1) / (3n + 5), what is lim_{n -> infinity} an?',
        options: ['2/3', '-1/5', '0', 'Infinity'],
        correctAnswer: 0, explanation: 'Dividing numerator and denominator by n: (2 - 1/n) / (3 + 5/n) -> (2 - 0) / (3 + 0) = 2/3.', points: 1
    },
    {
        id: 'q_g12_math_m1_19', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'The product of three consecutive terms in a geometric progression is 216. What is the middle term?',
        options: ['6', '3', '12', '18'],
        correctAnswer: 0, explanation: 'Let the terms be a/r, a, ar. Their product is (a/r) * a * (ar) = a^3 = 216 => a = 6.', points: 1
    },
    {
        id: 'q_g12_math_m1_20', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Find the value of k that makes f(x) continuous at x = 3: f(x) = (x^2 - 9)/(x - 3) for x != 3, and f(3) = k.',
        options: ['6', '3', '0', '9'],
        correctAnswer: 0, explanation: 'lim_{x -> 3} (x - 3)(x + 3)/(x - 3) = lim_{x -> 3} (x + 3) = 6. For continuity, f(3) = k = 6.', points: 1
    },
    {
        id: 'q_g12_math_m1_21', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Evaluate lim_{x -> 0} (1 - cos(x)) / x^2:',
        options: ['1/2', '0', '1', '2'],
        correctAnswer: 0, explanation: 'Using L\'Hôpital\'s Rule twice: lim (sin x)/(2x) = lim (cos x)/2 = 1/2.', points: 1
    },
    {
        id: 'q_g12_math_m1_22', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the sum of the series sum_{n=1}^10 (2n + 1)?',
        options: ['120', '110', '100', '130'],
        correctAnswer: 0, explanation: '2 * sum(n) + sum(1) = 2 * [10(11)/2] + 10 = 110 + 10 = 120.', points: 1
    },
    {
        id: 'q_g12_math_m1_23', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Evaluate lim_{x -> infinity} [sqrt(x^2 + 4x) - x]:',
        options: ['2', '0', '4', 'Infinity'],
        correctAnswer: 0, explanation: 'Multiplying by conjugate: 4x / [sqrt(x^2 + 4x) + x] -> 4 / [sqrt(1 + 4/x) + 1] -> 4 / (1 + 1) = 2.', points: 1
    },
    {
        id: 'q_g12_math_m1_24', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following describes an arithmetic-geometric sequence?',
        options: [
            'A sequence where terms are the product of corresponding terms of an AP and a GP',
            'A sequence where differences are constant only',
            'A sequence with alternating signs only',
            'A Fibonacci sequence'
        ],
        correctAnswer: 0, explanation: 'An AGP has general term (a + (n-1)d) * r^(n-1).', points: 1
    },
    {
        id: 'q_g12_math_m1_25', examId: 'exam_100', grade: 'Grade12', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the limit of the sequence an = (1 + 1/n)^n as n -> infinity?',
        options: ['e (~2.718)', '1', 'Infinity', '0'],
        correctAnswer: 0, explanation: 'This is Euler\'s number e, the fundamental limit defining the base of natural logarithms.', points: 1
    },

    // ==========================================
    // GRADE 12 PHYSICS MID 1 (exam_101) - target 25 total
    // ==========================================
    {
        id: 'q_g12_phys_m1_08', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'In an adiabatic thermodynamic process:',
        options: ['No heat enters or leaves the system (Q = 0)', 'Temperature is strictly constant', 'Pressure is zero', 'Work done is zero'],
        correctAnswer: 0, explanation: 'An adiabatic process is thermally insulated so that Delta Q = 0; thus Delta U = -W.', points: 1
    },
    {
        id: 'q_g12_phys_m1_09', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The Second Law of Thermodynamics (Kelvin-Planck statement) asserts that:',
        options: [
            'It is impossible to construct a heat engine operating in a cycle that absorbs heat and converts 100% of it into work without rejecting waste heat',
            'Heat can spontaneously flow from a colder body to a hotter body',
            'Energy is not conserved in cycles',
            'Absolute zero is achievable in finite steps'
        ],
        correctAnswer: 0, explanation: 'No cyclic heat engine can have 100% thermal efficiency without rejecting heat to a low-temperature sink.', points: 1
    },
    {
        id: 'q_g12_phys_m1_10', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the change in entropy Delta S when 600 J of heat is added reversibly to an isothermal system at 300 K?',
        options: ['2.0 J/K', '0.5 J/K', '180,000 J/K', '120 J/K'],
        correctAnswer: 0, explanation: 'Delta S = Q / T = 600 J / 300 K = 2.0 J/K.', points: 1
    },
    {
        id: 'q_g12_phys_m1_11', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'According to Gauss\'s Law, the total electric flux through any closed Gaussian surface is equal to:',
        options: ['Q_enclosed / epsilon_0', 'Q_enclosed * epsilon_0', 'Zero always', 'E * Area'],
        correctAnswer: 0, explanation: 'Phi_E = oint E · dA = Q_enclosed / epsilon_0.', points: 1
    },
    {
        id: 'q_g12_phys_m1_12', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'Electric field lines always originate on:',
        options: ['Positive charges and terminate on negative charges', 'Negative charges and terminate on positive charges', 'Closed continuous loops only', 'Equipotential surfaces only'],
        correctAnswer: 0, explanation: 'By convention, test charges are positive, so lines point away from positive charges toward negative sinks.', points: 1
    },
    {
        id: 'q_g12_phys_m1_13', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The relation between electric field E and electric potential V in one dimension is:',
        options: ['E = -dV / dx', 'E = dV / dx', 'E = V * x', 'E = -V / x^2'],
        correctAnswer: 0, explanation: 'The electric field is the negative gradient of the electric potential: E = -dV/dx.', points: 1
    },
    {
        id: 'q_g12_phys_m1_14', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the work required to move a +5 microC charge across an equipotential surface between two points with potential difference Delta V = 0?',
        options: ['0 Joules', '5 Joules', '25 Joules', 'Undefined'],
        correctAnswer: 0, explanation: 'W = q * Delta V = q * 0 = 0 Joules. No work is done moving along equipotential surfaces.', points: 1
    },
    {
        id: 'q_g12_phys_m1_15', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'Inserting a dielectric material with constant k > 1 between the plates of an isolated charged capacitor:',
        options: ['Increases capacitance and decreases electric potential difference', 'Decreases capacitance', 'Leaves capacitance unchanged', 'Reduces charge on plates to zero'],
        correctAnswer: 0, explanation: 'C = k * C0 increases by factor k. For an isolated charge Q, V = Q / C decreases.', points: 1
    },
    {
        id: 'q_g12_phys_m1_16', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The electric energy U stored in a capacitor with capacitance C charged to voltage V is:',
        options: ['(1/2) * C * V^2', 'C * V', '(1/2) * C^2 * V', 'Q / V'],
        correctAnswer: 0, explanation: 'U = (1/2)CV^2 = (1/2)QV = Q^2 / (2C).', points: 1
    },
    {
        id: 'q_g12_phys_m1_17', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'Two capacitors of 6 microF and 3 microF are connected in series. What is the equivalent capacitance?',
        options: ['2 microF', '9 microF', '0.5 microF', '18 microF'],
        correctAnswer: 0, explanation: '1/C_eq = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 => C_eq = 2 microF.', points: 1
    },
    {
        id: 'q_g12_phys_m1_18', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the electric field at distance r outside an infinitely long straight wire with linear charge density lambda?',
        options: ['lambda / (2 * pi * epsilon_0 * r)', 'lambda / (4 * pi * epsilon_0 * r^2)', 'lambda / epsilon_0', 'Zero'],
        correctAnswer: 0, explanation: 'Applying Gauss\'s Law with a cylindrical surface yields E = lambda / (2*pi*epsilon_0*r).', points: 1
    },
    {
        id: 'q_g12_phys_m1_19', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'An ideal gas expands from 2 m^3 to 5 m^3 at constant pressure of 200 kPa. What is the work done by the gas?',
        options: ['600 kJ', '400 kJ', '1,000 kJ', '100 kJ'],
        correctAnswer: 0, explanation: 'W = P * Delta V = (200 * 10^3 Pa) * (5 - 2 m^3) = 200,000 * 3 = 600,000 J = 600 kJ.', points: 1
    },
    {
        id: 'q_g12_phys_m1_20', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The Zeroth Law of Thermodynamics provides the operational definition of which physical quantity?',
        options: ['Temperature', 'Entropy', 'Work', 'Heat capacity'],
        correctAnswer: 0, explanation: 'The Zeroth Law establishes thermal equilibrium as an equivalence relation, defining the concept of temperature.', points: 1
    },
    {
        id: 'q_g12_phys_m1_21', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the root-mean-square (rms) speed of ideal gas molecules of molar mass M at absolute temperature T?',
        options: ['sqrt(3RT / M)', 'sqrt(2RT / M)', '3RT / (2M)', 'sqrt(RT / 3M)'],
        correctAnswer: 0, explanation: 'From kinetic theory: (1/2)m*v_rms^2 = (3/2)k_B*T => v_rms = sqrt(3RT / M).', points: 1
    },
    {
        id: 'q_g12_phys_m1_22', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'An electric dipole placed in a uniform electric field experiences:',
        options: ['A net torque but zero net force', 'Both net force and net torque', 'A net force but zero torque', 'Neither force nor torque'],
        correctAnswer: 0, explanation: 'Equal and opposite forces on the two charges cancel (F_net = 0), but form a couple producing torque tau = p x E.', points: 1
    },
    {
        id: 'q_g12_phys_m1_23', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the dimension of electric potential (Volt)?',
        options: ['[M L^2 T^(-3) I^(-1)]', '[M L T^(-2) I^(-1)]', '[M L^2 T^(-2)]', '[M L^3 T^(-3) I]'],
        correctAnswer: 0, explanation: 'Volt = J / C = (kg*m^2/s^2) / (A*s) = M L^2 T^(-3) I^(-1).', points: 1
    },
    {
        id: 'q_g12_phys_m1_24', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'In an isobaric expansion of an ideal gas:',
        options: ['Pressure remains constant while volume and temperature change', 'Volume remains constant', 'Internal energy is zero', 'No work is done'],
        correctAnswer: 0, explanation: 'An isobaric process occurs at constant pressure (Delta P = 0).', points: 1
    },
    {
        id: 'q_g12_phys_m1_25', examId: 'exam_101', grade: 'Grade12', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the electric field magnitude at a distance of 3 m from a point charge of 9 nC in vacuum? (k = 9 * 10^9 N*m^2/C^2)',
        options: ['9 N/C', '1 N/C', '27 N/C', '81 N/C'],
        correctAnswer: 0, explanation: 'E = k * q / r^2 = (9 * 10^9 * 9 * 10^(-9)) / (3^2) = 81 / 9 = 9 N/C.', points: 1
    },

    // ==========================================
    // GRADE 12 CHEMISTRY MID 1 (exam_97) - target 25 total
    // ==========================================
    {
        id: 'q_g12_chem_m1_08', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'In the reaction 2NO + O2 -> 2NO2, doubling [NO] while keeping [O2] constant quadruples the rate. What is the order with respect to NO?',
        options: ['Second order', 'First order', 'Zero order', 'Third order'],
        correctAnswer: 0, explanation: 'Rate proportional to [NO]^x => 4 = 2^x => x = 2 (second order).', points: 1
    },
    {
        id: 'q_g12_chem_m1_09', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the relationship between Kp and Kc for the gaseous equilibrium: N2(g) + 3H2(g) <=> 2NH3(g)?',
        options: ['Kp = Kc * (RT)^(-2)', 'Kp = Kc * (RT)^2', 'Kp = Kc * (RT)', 'Kp = Kc'],
        correctAnswer: 0, explanation: 'Kp = Kc * (RT)^(Delta n_g). Here Delta n_g = 2 - (1 + 3) = -2 => Kp = Kc * (RT)^(-2).', points: 1
    },
    {
        id: 'q_g12_chem_m1_10', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following plots yields a straight line for a second-order reaction (A -> Products)?',
        options: ['1 / [A] versus time t', 'ln[A] versus time t', '[A] versus time t', 'sqrt([A]) versus time t'],
        correctAnswer: 0, explanation: 'The integrated second-order rate law is 1/[A] = 1/[A]0 + kt, giving a straight line with slope +k.', points: 1
    },
    {
        id: 'q_g12_chem_m1_11', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'According to collision theory, for a chemical collision to be effective, molecules must have:',
        options: [
            'Both energy equal to or greater than activation energy (Ea) and correct spatial orientation',
            'Sufficient kinetic energy only',
            'Correct orientation only',
            'Low molecular mass'
        ],
        correctAnswer: 0, explanation: 'Collision theory requires that reactants satisfy both the energy criterion (E >= Ea) and steric orientation criterion.', points: 1
    },
    {
        id: 'q_g12_chem_m1_12', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'For the Haber process N2(g) + 3H2(g) <=> 2NH3(g) (Delta H = -92 kJ/mol), increasing pressure shifts equilibrium:',
        options: ['Toward products (to the right)', 'Toward reactants (to the left)', 'Has no effect on equilibrium', 'Stops reaction completely'],
        correctAnswer: 0, explanation: 'Increasing pressure shifts equilibrium toward the side with fewer gas moles (4 moles reactants -> 2 moles product).', points: 1
    },
    {
        id: 'q_g12_chem_m1_13', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the conjugate base of the bisulfate ion (HSO4-)?',
        options: ['Sulfate ion (SO4^2-)', 'Sulfuric acid (H2SO4)', 'Sulfur trioxide (SO3)', 'Hydronium ion (H3O+)'],
        correctAnswer: 0, explanation: 'A conjugate base is formed when an acid loses a proton: HSO4- - H+ = SO4^2-.', points: 1
    },
    {
        id: 'q_g12_chem_m1_14', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'A solution with pH = 4 has a hydrogen ion concentration [H+] that is how many times greater than a solution with pH = 6?',
        options: ['100 times', '2 times', '10 times', '1000 times'],
        correctAnswer: 0, explanation: 'Each pH unit is a factor of 10. A difference of 2 units corresponds to 10^2 = 100 times greater [H+].', points: 1
    },
    {
        id: 'q_g12_chem_m1_15', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the ionic product constant of pure water (Kw) at 25°C?',
        options: ['1.0 * 10^(-14)', '1.0 * 10^(-7)', '1.0 * 10^(-1)', '7.0'],
        correctAnswer: 0, explanation: 'Kw = [H+][OH-] = 1.0 * 10^(-14) at standard 25°C.', points: 1
    },
    {
        id: 'q_g12_chem_m1_16', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'A buffer solution resists changes in pH when small amounts of acid or base are added. It is typically prepared from:',
        options: [
            'A weak acid and its conjugate base (salt)',
            'A strong acid and a strong base',
            'Pure sodium chloride in water',
            'A concentrated strong acid only'
        ],
        correctAnswer: 0, explanation: 'A buffer contains an equilibrium mixture of a weak acid (e.g. CH3COOH) and its conjugate base (CH3COO-).', points: 1
    },
    {
        id: 'q_g12_chem_m1_17', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the Henderson-Hasselbalch equation used to calculate buffer pH?',
        options: ['pH = pKa + log([Base] / [Acid])', 'pH = pKa - log([Base] / [Acid])', 'pH = -log(pKa)', 'pH = pKa * [Base] / [Acid]'],
        correctAnswer: 0, explanation: 'The Henderson-Hasselbalch equation is pH = pKa + log([A-] / [HA]).', points: 1
    },
    {
        id: 'q_g12_chem_m1_18', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'If the reaction quotient Q is greater than the equilibrium constant Kc (Q > Kc), the reaction will:',
        options: ['Proceed in the reverse direction (to the left) toward reactants', 'Proceed in the forward direction', 'Remain at equilibrium', 'Precipitate completely'],
        correctAnswer: 0, explanation: 'When Q > Kc, product concentration exceeds equilibrium proportion, driving the reverse reaction.', points: 1
    },
    {
        id: 'q_g12_chem_m1_19', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'The rate-determining step in a multi-step reaction mechanism is:',
        options: ['The slowest elementary step', 'The fastest elementary step', 'The first step always', 'The step with lowest activation energy'],
        correctAnswer: 0, explanation: 'The slowest elementary step acts as a bottleneck and governs the overall kinetic rate of the reaction.', points: 1
    },
    {
        id: 'q_g12_chem_m1_20', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the solubility product constant (Ksp) expression for silver chloride AgCl(s) <=> Ag+(aq) + Cl-(aq)?',
        options: ['Ksp = [Ag+][Cl-]', 'Ksp = [Ag+][Cl-] / [AgCl]', 'Ksp = [Ag+] + [Cl-]', 'Ksp = [Ag+]^2'],
        correctAnswer: 0, explanation: 'Pure solids have an activity of 1 and are excluded from Ksp: Ksp = [Ag+][Cl-].', points: 1
    },
    {
        id: 'q_g12_chem_m1_21', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'The common-ion effect describes the phenomenon where the solubility of a sparingly soluble salt:',
        options: ['Decreases when a common ion is introduced into the solution', 'Increases dramatically', 'Remains unchanged', 'Becomes infinite'],
        correctAnswer: 0, explanation: 'Adding a common ion shifts the dissolution equilibrium leftward by Le Chatelier\'s principle, suppressing solubility.', points: 1
    },
    {
        id: 'q_g12_chem_m1_22', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is a Lewis acid?',
        options: ['BF3 (Boron trifluoride)', 'NH3 (Ammonia)', 'OH- (Hydroxide)', 'H2O'],
        correctAnswer: 0, explanation: 'BF3 has an incomplete octet (6 valence electrons) on boron and acts as an electron pair acceptor (Lewis acid).', points: 1
    },
    {
        id: 'q_g12_chem_m1_23', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'In the Arrhenius equation k = A * e^(-Ea / RT), the pre-exponential factor A is related to:',
        options: ['Collision frequency and steric orientation factor', 'Enthalpy change', 'Universal gas constant', 'Reaction order'],
        correctAnswer: 0, explanation: 'A is the frequency factor representing the frequency of collisions with proper spatial orientation.', points: 1
    },
    {
        id: 'q_g12_chem_m1_24', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the pOH of a solution with [OH-] = 1.0 * 10^(-5) M?',
        options: ['5', '9', '14', '7'],
        correctAnswer: 0, explanation: 'pOH = -log[OH-] = -log(1.0 * 10^(-5)) = 5.', points: 1
    },
    {
        id: 'q_g12_chem_m1_25', examId: 'exam_97', grade: 'Grade12', subject: 'Chemistry', semester: 'Semester1', examType: 'Mid1',
        question: 'For a zero-order reaction A -> Products, the rate of reaction is:',
        options: ['Constant and independent of reactant concentration', 'Directly proportional to [A]', 'Proportional to [A]^2', 'Exponentially declining'],
        correctAnswer: 0, explanation: 'Rate = k[A]^0 = k (a constant rate that does not change as reactant concentration decreases).', points: 1
    },

    // ==========================================
    // GRADE 12 BIOLOGY MID 1 (exam_96) - target 25 total
    // ==========================================
    {
        id: 'q_g12_bio_m1_07', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Mendel\'s Law of Independent Assortment states that:',
        options: [
            'Alleles of different unlinked genes segregate independently during gamete formation',
            'Dominant alleles mask recessive alleles',
            'Homologous chromosomes never separate',
            'Genes on the same chromosome always assort together'
        ],
        correctAnswer: 0, explanation: 'Alleles of genes on separate non-homologous chromosomes distribute independently into haploid gametes during meiosis I.', points: 1
    },
    {
        id: 'q_g12_bio_m1_08', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'In a dihybrid cross between two heterozygous individuals (AaBb x AaBb), what is the classic Mendelian phenotypic ratio?',
        options: ['9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1', '15 : 1'],
        correctAnswer: 0, explanation: 'Two independently assorting genes produce 9 double dominant : 3 dominant/recessive : 3 recessive/dominant : 1 double recessive.', points: 1
    },
    {
        id: 'q_g12_bio_m1_09', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the phenotypic outcome of incomplete dominance in snapdragon flower color when crossing red (RR) with white (rr)?',
        options: ['100% Pink flowers (Rr)', '100% Red flowers', '50% Red and 50% White', '100% White flowers'],
        correctAnswer: 0, explanation: 'Incomplete dominance produces an intermediate blended heterozygous phenotype (pink).', points: 1
    },
    {
        id: 'q_g12_bio_m1_10', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which genetic disorder is caused by trisomy of chromosome 21?',
        options: ['Down syndrome', 'Turner syndrome', 'Klinefelter syndrome', 'Edwards syndrome'],
        correctAnswer: 0, explanation: 'Down syndrome results from nondisjunction creating an extra copy of chromosome 21 (47, XX or XY, +21).', points: 1
    },
    {
        id: 'q_g12_bio_m1_11', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which DNA sequence marks the binding site for RNA polymerase to initiate gene transcription?',
        options: ['Promoter region', 'Terminator region', 'Operator', 'Intron'],
        correctAnswer: 0, explanation: 'The promoter contains specific consensus motifs (like the TATA box) where RNA polymerase and transcription factors bind.', points: 1
    },
    {
        id: 'q_g12_bio_m1_12', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'During mRNA processing in eukaryotes, which non-coding sequences are excised from pre-mRNA transcripts?',
        options: ['Introns', 'Exons', 'Codons', 'Promoters'],
        correctAnswer: 0, explanation: 'Spliceosomes excise non-coding introns and ligate together expressed coding exons.', points: 1
    },
    {
        id: 'q_g12_bio_m1_13', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'The universal genetic start codon that codes for methionine in mRNA translation is:',
        options: ['AUG', 'UAA', 'UAG', 'UGA'],
        correctAnswer: 0, explanation: 'AUG serves as the universal start codon in translation initiating ribosomal assembly.', points: 1
    },
    {
        id: 'q_g12_bio_m1_14', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is a stop (termination) codon that halts peptide synthesis?',
        options: ['UAA, UAG, and UGA', 'AUG, GUG, and UUG', 'AAA, UUU, and CCC', 'CAG and GAC'],
        correctAnswer: 0, explanation: 'UAA, UAG, and UGA are the three stop codons recognized by release factors rather than tRNAs.', points: 1
    },
    {
        id: 'q_g12_bio_m1_15', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Hemophilia and Duchenne muscular dystrophy are classic examples of:',
        options: ['X-linked recessive disorders', 'Autosomal dominant disorders', 'Y-linked holandric disorders', 'Mitochondrial disorders'],
        correctAnswer: 0, explanation: 'X-linked recessive conditions disproportionately affect males because they possess only one X chromosome.', points: 1
    },
    {
        id: 'q_g12_bio_m1_16', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'The genetic code is described as "degenerate" (redundant) because:',
        options: [
            'Multiple different codons can code for the exact same amino acid',
            'One codon can specify multiple different amino acids',
            'It deteriorates over time',
            'It contains no punctuation'
        ],
        correctAnswer: 0, explanation: 'With 61 sense codons and only 20 amino acids, most amino acids are encoded by 2 to 6 synonymous codons.', points: 1
    },
    {
        id: 'q_g12_bio_m1_17', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'In DNA replication, Okazaki fragments are synthesized discontinuously on the:',
        options: ['Lagging strand (in 5\' to 3\' direction)', 'Leading strand', 'Template strand', 'RNA primer strand'],
        correctAnswer: 0, explanation: 'Because DNA polymerase only synthesizes in the 5\' to 3\' direction, the lagging strand is built in short Okazaki segments.', points: 1
    },
    {
        id: 'q_g12_bio_m1_18', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which enzyme seals nicks in the phosphodiester backbone by joining Okazaki fragments during DNA replication?',
        options: ['DNA Ligase', 'DNA Helicase', 'Topoisomerase', 'Primase'],
        correctAnswer: 0, explanation: 'DNA ligase catalyzes phosphodiester bond formation between adjacent 3\'-hydroxyl and 5\'-phosphate ends.', points: 1
    },
    {
        id: 'q_g12_bio_m1_19', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'A point mutation that replaces a single nucleotide resulting in a premature STOP codon is called a:',
        options: ['Nonsense mutation', 'Missense mutation', 'Silent mutation', 'Frameshift mutation'],
        correctAnswer: 0, explanation: 'A nonsense mutation converts a sense codon into a termination codon, truncating the resulting protein.', points: 1
    },
    {
        id: 'q_g12_bio_m1_20', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What is a Test Cross used for in genetics?',
        options: [
            'Crossing an organism of dominant phenotype with a homozygous recessive individual to determine its genotype',
            'Crossing two homozygous dominant individuals',
            'Testing for sterility',
            'Crossing two different species'
        ],
        correctAnswer: 0, explanation: 'A test cross reveals whether an individual displaying the dominant phenotype is homozygous (AA) or heterozygous (Aa).', points: 1
    },
    {
        id: 'q_g12_bio_m1_21', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'The Hardy-Weinberg equilibrium equation for allele frequencies in an idealized non-evolving population is:',
        options: ['p^2 + 2pq + q^2 = 1', 'p + q = 2', 'p^2 * q^2 = 1', 'p - q = 0'],
        correctAnswer: 0, explanation: 'p^2 (homozygous dominant) + 2pq (heterozygous) + q^2 (homozygous recessive) = 1.', points: 1
    },
    {
        id: 'q_g12_bio_m1_22', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which type of RNA forms the structural core and catalytic peptidyl transferase center of ribosomes?',
        options: ['rRNA (ribosomal RNA)', 'mRNA (messenger RNA)', 'tRNA (transfer RNA)', 'siRNA'],
        correctAnswer: 0, explanation: 'rRNA acts as a ribozyme, catalyzing peptide bond synthesis between amino acids.', points: 1
    },
    {
        id: 'q_g12_bio_m1_23', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Recombinant DNA technology commonly uses which bacterial enzymes to cut DNA at specific palindromic recognition sequences?',
        options: ['Restriction endonucleases', 'DNA polymerases', 'Reverse transcriptases', 'Amylases'],
        correctAnswer: 0, explanation: 'Restriction enzymes (molecular scissors) cleave double-stranded DNA at exact recognition sites.', points: 1
    },
    {
        id: 'q_g12_bio_m1_24', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Polymerase Chain Reaction (PCR) is a molecular biology laboratory technique used to:',
        options: [
            'Amplify millions of copies of a specific targeted DNA sequence in vitro',
            'Synthesize proteins directly',
            'Sequester carbohydrates',
            'Stain cellular cytoplasm'
        ],
        correctAnswer: 0, explanation: 'PCR cycles denaturation, annealing, and extension to exponentially amplify DNA fragments.', points: 1
    },
    {
        id: 'q_g12_bio_m1_25', examId: 'exam_96', grade: 'Grade12', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following karyotypes represents Turner syndrome in females?',
        options: ['45, X0 (monosomy X)', '47, XXY', '47, XYY', '46, XY'],
        correctAnswer: 0, explanation: 'Turner syndrome is characterized by the presence of a single X chromosome without a second sex chromosome (monosomy X).', points: 1
    },

    // ==========================================
    // GRADE 12 APTITUDE MID 1 (exam_95) - target 25 total
    // ==========================================
    {
        id: 'q_g12_apt_m1_07', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'Find the missing number in the series: 3, 7, 15, 31, 63, ?',
        options: ['127', '125', '120', '129'],
        correctAnswer: 0, explanation: 'Each term is generated by (previous * 2) + 1: (63 * 2) + 1 = 126 + 1 = 127.', points: 1
    },
    {
        id: 'q_g12_apt_m1_08', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'EPIDEMIOLOGIST is to DISEASE as SEISMOLOGIST is to:',
        options: ['EARTHQUAKES', 'VOLCANOES', 'WEATHER', 'FOSSILS'],
        correctAnswer: 0, explanation: 'An epidemiologist studies disease patterns, just as a seismologist investigates earthquakes.', points: 1
    },
    {
        id: 'q_g12_apt_m1_09', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'If "STUDENT" is coded in a cipher as "TUVEFOU", how is "SCHOOL" coded in the same system?',
        options: ['TDIPPM', 'RDGNNK', 'TDKPPM', 'TEJPPM'],
        correctAnswer: 0, explanation: 'Each letter is shifted forward by 1 position: S->T, C->D, H->I, O->P, O->P, L->M => TDIPPM.', points: 1
    },
    {
        id: 'q_g12_apt_m1_10', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'Kidist is older than Nahom. Nahom is older than Soliyana. Who is the youngest among them?',
        options: ['Soliyana', 'Nahom', 'Kidist', 'Cannot be determined'],
        correctAnswer: 0, explanation: 'Order of age: Kidist > Nahom > Soliyana. Therefore, Soliyana is the youngest.', points: 1
    },
    {
        id: 'q_g12_apt_m1_11', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'A train 120 meters long travels at 60 km/h. How many seconds does it take to pass a stationary telegraph pole?',
        options: ['7.2 seconds', '5.0 seconds', '10 seconds', '12 seconds'],
        correctAnswer: 0, explanation: 'Speed = 60 * (5/18) = 50/3 m/s. Time = Distance / Speed = 120 / (50/3) = 360 / 50 = 7.2 seconds.', points: 1
    },
    {
        id: 'q_g12_apt_m1_12', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'Which word does NOT belong with the others?',
        options: ['Rectangle', 'Triangle', 'Hexagon', 'Cylinder'],
        correctAnswer: 3, explanation: 'Triangle, rectangle, and hexagon are two-dimensional planar polygons, whereas cylinder is a three-dimensional solid.', points: 1
    },
    {
        id: 'q_g12_apt_m1_13', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'The average of 5 numbers is 20. If one number is removed, the average becomes 18. What was the removed number?',
        options: ['28', '24', '30', '26'],
        correctAnswer: 0, explanation: 'Sum of 5 numbers = 5 * 20 = 100. Sum of remaining 4 numbers = 4 * 18 = 72. Removed number = 100 - 72 = 28.', points: 1
    },
    {
        id: 'q_g12_apt_m1_14', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'CLARIFY is to CONFUSE as EXPAND is to:',
        options: ['CONDENSE', 'ENLARGE', 'EXTEND', 'DISPERSE'],
        correctAnswer: 0, explanation: 'Clarify is an antonym of confuse, just as expand is the antonym of condense.', points: 1
    },
    {
        id: 'q_g12_apt_m1_15', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'A clock shows 3:15. What is the angle between the hour hand and minute hand?',
        options: ['7.5 degrees', '0 degrees', '15 degrees', '22.5 degrees'],
        correctAnswer: 0, explanation: 'At 3:15, minute hand is at 90°. Hour hand moves 0.5° per minute => 30° * 3 + 15 * 0.5° = 90° + 7.5° = 97.5°. Angle = 97.5° - 90° = 7.5°.', points: 1
    },
    {
        id: 'q_g12_apt_m1_16', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'If all rectangles are quadrilaterals, and all squares are rectangles, which conclusion is valid?',
        options: ['All squares are quadrilaterals', 'All quadrilaterals are squares', 'No squares are quadrilaterals', 'Some rectangles are not quadrilaterals'],
        correctAnswer: 0, explanation: 'Transitive property of categorical logic: Squares subset of Rectangles subset of Quadrilaterals.', points: 1
    },
    {
        id: 'q_g12_apt_m1_17', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'Complete the pattern: 1, 4, 9, 16, 25, 36, ?',
        options: ['49', '48', '50', '64'],
        correctAnswer: 0, explanation: 'These are consecutive perfect squares: 1^2, 2^2, 3^2, 4^2, 5^2, 6^2, 7^2 = 49.', points: 1
    },
    {
        id: 'q_g12_apt_m1_18', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'In a bag of 30 marbles, 12 are red, 10 are blue, and 8 are green. What is the probability of randomly drawing a green marble?',
        options: ['4/15', '1/3', '2/5', '1/4'],
        correctAnswer: 0, explanation: 'P(Green) = 8 / 30 = 4 / 15.', points: 1
    },
    {
        id: 'q_g12_apt_m1_19', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'ARCHITECT is to BLUEPRINT as COMPOSER is to:',
        options: ['SCORE (SHEET MUSIC)', 'INSTRUMENT', 'ORCHESTRA', 'CONCERT'],
        correctAnswer: 0, explanation: 'An architect designs blueprints, while a composer writes musical scores.', points: 1
    },
    {
        id: 'q_g12_apt_m1_20', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'If x + y = 14 and x - y = 4, what is the value of x * y?',
        options: ['45', '48', '50', '52'],
        correctAnswer: 0, explanation: 'Adding equations: 2x = 18 => x = 9. Then y = 14 - 9 = 5. Product x * y = 9 * 5 = 45.', points: 1
    },
    {
        id: 'q_g12_apt_m1_21', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'Find the odd one out: 27, 64, 125, 144, 216',
        options: ['144', '27', '64', '125'],
        correctAnswer: 0, explanation: '27 (3^3), 64 (4^3), 125 (5^3), and 216 (6^3) are perfect cubes; 144 is 12^2 (not a cube of an integer).', points: 1
    },
    {
        id: 'q_g12_apt_m1_22', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'Pointing to a photograph, a man said: "His father is the only son of my father." Who is in the photograph?',
        options: ['His son', 'His brother', 'His father', 'Himself'],
        correctAnswer: 0, explanation: '"The only son of my father" refers to the speaker himself. Thus "His father is me", meaning the photo is of his son.', points: 1
    },
    {
        id: 'q_g12_apt_m1_23', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'Two pipes A and B can fill a tank in 6 hours and 3 hours respectively. How long will it take both pipes working together?',
        options: ['2 hours', '4.5 hours', '1.5 hours', '2.5 hours'],
        correctAnswer: 0, explanation: 'Combined rate = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 tank per hour. Total time = 1 / (1/2) = 2 hours.', points: 1
    },
    {
        id: 'q_g12_apt_m1_24', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'Which number replaces the question mark: 5 : 25 :: 8 : ?',
        options: ['64', '56', '72', '80'],
        correctAnswer: 0, explanation: 'The relationship is n : n^2. Therefore 8^2 = 64.', points: 1
    },
    {
        id: 'q_g12_apt_m1_25', examId: 'exam_95', grade: 'Grade12', subject: 'Aptitude', semester: 'Semester1', examType: 'Mid1',
        question: 'If a polygon has 8 sides, how many interior diagonals does it have?',
        options: ['20', '16', '24', '28'],
        correctAnswer: 0, explanation: 'Number of diagonals = n(n - 3) / 2 = 8(8 - 3) / 2 = 8(5) / 2 = 40 / 2 = 20.', points: 1
    },

    // ==========================================
    // GRADE 12 ENGLISH MID 1 (exam_98) - target 25 total
    // ==========================================
    {
        id: 'q_g12_eng_m1_05', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct sentence featuring a fronted participle clause:',
        options: [
            'Having completed the examination, the students submitted their answer booklets.',
            'Having completed the examination, the teacher collected the answer booklets.',
            'Having completed the examination, it was time for lunch.',
            'Having completed the examination, the bell rang.'
        ],
        correctAnswer: 0, explanation: 'The subject following the comma ("the students") logically performs the action ("having completed the examination").', points: 1
    },
    {
        id: 'q_g12_eng_m1_06', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the sentence with correct subjunctive inversion:',
        options: [
            'Should you need any further past papers, do not hesitate to ask.',
            'Should you needed any further past papers, do not hesitate to ask.',
            'Should you will need any further past papers, do not hesitate to ask.',
            'Should you needs any further past papers, do not hesitate to ask.'
        ],
        correctAnswer: 0, explanation: '"Should you need..." is the formal conditional inversion of "If you should need...".', points: 1
    },
    {
        id: 'q_g12_eng_m1_07', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Select the synonym for "ephemeral":',
        options: ['Fleeting and short-lived', 'Permanent', 'Eternal', 'Indestructible'],
        correctAnswer: 0, explanation: '"Ephemeral" describes something lasting for a very brief period of time.', points: 1
    },
    {
        id: 'q_g12_eng_m1_08', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Which transition expresses concession in formal discourse?',
        options: ['Notwithstanding', 'Furthermore', 'Consequently', 'Namely'],
        correctAnswer: 0, explanation: '"Notwithstanding" means in spite of or despite, marking a concession.', points: 1
    },
    {
        id: 'q_g12_eng_m1_09', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Complete with the correct idiom: "After months of rigorous preparation, the students passed the matriculation exam with ______."',
        options: ['flying colors', 'a grain of salt', 'the skin of their teeth', 'an open book'],
        correctAnswer: 0, explanation: 'To pass with "flying colors" means to succeed with exceptional distinction.', points: 1
    },
    {
        id: 'q_g12_eng_m1_10', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the passive form of: "The Ministry of Education will inaugurate the new national curriculum next month."',
        options: [
            'The new national curriculum will be inaugurated next month by the Ministry of Education.',
            'The new national curriculum is inaugurated next month.',
            'The new national curriculum will have been inaugurated next month.',
            'The new national curriculum was inaugurated next month.'
        ],
        correctAnswer: 0, explanation: 'Future simple active "will inaugurate" converts to passive "will be inaugurated".', points: 1
    },
    {
        id: 'q_g12_eng_m1_11', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the rhetorical device: "It was the best of times, it was the worst of times."',
        options: ['Antithesis', 'Onomatopoeia', 'Alliteration', 'Hyperbole'],
        correctAnswer: 0, explanation: 'Antithesis sets contrasting concepts in balanced parallel grammatical phrasing for poetic emphasis.', points: 1
    },
    {
        id: 'q_g12_eng_m1_12', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct spelling:',
        options: ['Accommodate', 'Acommodate', 'Accomodate', 'Acomodate'],
        correctAnswer: 0, explanation: '"Accommodate" is spelled with double "c" and double "m".', points: 1
    },
    {
        id: 'q_g12_eng_m1_13', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Complete: "Hardly ______ the examination hall when the power went out."',
        options: ['had we entered', 'we had entered', 'did we enter', 'we entered'],
        correctAnswer: 0, explanation: '"Hardly... when" triggers negative subject-auxiliary inversion in the past perfect: "had we entered".', points: 1
    },
    {
        id: 'q_g12_eng_m1_14', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'What does the Latin legal term "bona fide" mean?',
        options: ['In good faith / genuine', 'Without cause', 'In secret', 'By force'],
        correctAnswer: 0, explanation: '"Bona fide" translates from Latin as "in good faith", meaning genuine or authentic.', points: 1
    },
    {
        id: 'q_g12_eng_m1_15', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the sentence with correct pronoun case:',
        options: [
            'Between you and me, the test was exceptionally fair.',
            'Between you and I, the test was exceptionally fair.',
            'Between he and I, the test was fair.',
            'Between they and we, the test was fair.'
        ],
        correctAnswer: 0, explanation: 'Prepositions (like "between") govern objective case pronouns ("me", not "I").', points: 1
    },
    {
        id: 'q_g12_eng_m1_16', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Select the word that denotes an excessively harsh or severe legal measure:',
        options: ['Draconian', 'Lenient', 'Beneficent', 'Diplomatic'],
        correctAnswer: 0, explanation: '"Draconian" originates from Draco, the ancient Athenian lawgiver known for extraordinarily severe codes.', points: 1
    },
    {
        id: 'q_g12_eng_m1_17', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the sentence containing a gerund phrase serving as subject:',
        options: [
            'Practicing past examination papers enhances analytical speed.',
            'The students were practicing past papers.',
            'Having practiced past papers, she excelled.',
            'To practice is commendable.'
        ],
        correctAnswer: 0, explanation: '"Practicing past examination papers" is a gerund phrase (-ing functioning as a noun) acting as the sentence subject.', points: 1
    },
    {
        id: 'q_g12_eng_m1_18', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct word: "The researcher drew an astute ______ from the statistical data."',
        options: ['inference', 'implication', 'allusion', 'illusion'],
        correctAnswer: 0, explanation: 'The reader/researcher draws an "inference" (deduction), whereas the data or author makes an "implication".', points: 1
    },
    {
        id: 'q_g12_eng_m1_19', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the type of conditional: "If the temperature had dropped below freezing, the water pipes would have burst."',
        options: ['Third conditional', 'Second conditional', 'First conditional', 'Zero conditional'],
        correctAnswer: 0, explanation: 'If + past perfect (had dropped) paired with would have + past participle (would have burst) is a third conditional.', points: 1
    },
    {
        id: 'q_g12_eng_m1_20', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following words is a noun?',
        options: ['Tenacity', 'Tenacious', 'Tenaciously', 'Tenaciousness-free'],
        correctAnswer: 0, explanation: 'The suffix "-ity" forms abstract nouns denoting a quality or state (tenacity = persistent determination).', points: 1
    },
    {
        id: 'q_g12_eng_m1_21', examId: 'exam_98', grade: 'Grade12', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Complete: "The principal insisted that the delegates ______ seated prior to the national anthem."',
        options: ['be', 'are', 'were', 'have been'],
        correctAnswer: 0, explanation: 'Mandative subjunctive requires the base form "be" after verbs of insisting or commanding.', points: 1
    },

    // ==========================================
    // GRADE 12 IT MID 1 (exam_99) - target 20 total
    // ==========================================
    {
        id: 'q_g12_it_m1_04', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which cryptographic mechanism provides non-repudiation, message integrity, and sender authentication?',
        options: ['Digital signature', 'Symmetric DES encryption', 'Caesar cipher', 'Base64 encoding'],
        correctAnswer: 0, explanation: 'A digital signature uses the sender\'s private key to sign a cryptographic hash, proving authorship and data integrity.', points: 1
    },
    {
        id: 'q_g12_it_m1_05', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'In software engineering, what is the primary drawback of the traditional Waterfall development model?',
        options: [
            'Inflexibility in accommodating changes once requirements are locked',
            'Excessive communication with end users',
            'Lack of documentation',
            'Unplanned daily sprint meetings'
        ],
        correctAnswer: 0, explanation: 'Waterfall flows sequentially; returning to earlier phases after design or coding begins is difficult and costly.', points: 1
    },
    {
        id: 'q_g12_it_m1_06', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which database ACID property guarantees that all transactions are committed permanently even in the event of power outage?',
        options: ['Durability', 'Atomicity', 'Consistency', 'Isolation'],
        correctAnswer: 0, explanation: 'Durability ensures that once a database transaction commits, its state is written to non-volatile storage and survives crashes.', points: 1
    },
    {
        id: 'q_g12_it_m1_07', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (BST) with N nodes?',
        options: ['O(log N)', 'O(N)', 'O(1)', 'O(N^2)'],
        correctAnswer: 0, explanation: 'Each comparison halves the remaining search space, yielding logarithmic time O(log N).', points: 1
    },
    {
        id: 'q_g12_it_m1_08', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which type of software testing verifies that individually developed units and modules operate together harmoniously?',
        options: ['Integration testing', 'Unit testing', 'Regression testing', 'Stress testing'],
        correctAnswer: 0, explanation: 'Integration testing evaluates communication interfaces and data exchange between combined modules.', points: 1
    },
    {
        id: 'q_g12_it_m1_09', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which protocol secures web browser sessions by encrypting data packets via TLS at the transport layer?',
        options: ['HTTPS', 'FTP', 'Telnet', 'SNMP'],
        correctAnswer: 0, explanation: 'HTTPS encrypts communications using Transport Layer Security (TLS/SSL).', points: 1
    },
    {
        id: 'q_g12_it_m1_10', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is a Distributed Denial of Service (DDoS) attack?',
        options: [
            'An attack overwhelming a target server with flood traffic originating from multiple compromised devices (botnet)',
            'An attack performed by a single modem',
            'A database query optimization technique',
            'An optical cable malfunction'
        ],
        correctAnswer: 0, explanation: 'DDoS employs botnet armies of thousands of infected computers to saturate bandwidth and crash servers.', points: 1
    },
    {
        id: 'q_g12_it_m1_11', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'In object-oriented programming, the principle where a subclass can provide a specialized implementation of a method defined in its superclass is:',
        options: ['Polymorphism (Method Overriding)', 'Encapsulation', 'Abstraction', 'Compilation'],
        correctAnswer: 0, explanation: 'Polymorphism allows objects of different subtypes to respond dynamically to common interface calls.', points: 1
    },
    {
        id: 'q_g12_it_m1_12', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which symmetric key encryption standard is widely used globally by governments with key lengths of 128, 192, or 256 bits?',
        options: ['AES (Advanced Encryption Standard)', 'DES', 'ROT13', 'MD5'],
        correctAnswer: 0, explanation: 'AES is the official NIST-established standard for symmetric block cipher encryption.', points: 1
    },
    {
        id: 'q_g12_it_m1_13', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is a zero-day vulnerability in cybersecurity?',
        options: [
            'A software security flaw that is unknown to the vendor and has no available patch',
            'A flaw discovered on the first day of each month',
            'A virus that takes zero days to write',
            'A password with zero characters'
        ],
        correctAnswer: 0, explanation: 'Zero-day refers to security holes actively exploited before developers have created a security fix.', points: 1
    },
    {
        id: 'q_g12_it_m1_14', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'In network routing, which metric does the RIP (Routing Information Protocol) algorithm use to select paths?',
        options: ['Hop count', 'Bandwidth', 'Link delay', 'Reliability'],
        correctAnswer: 0, explanation: 'RIP is a distance-vector protocol that measures path cost strictly by the number of router hops (max 15 hops).', points: 1
    },
    {
        id: 'q_g12_it_m1_15', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which normal form eliminates transitive functional dependencies where a non-key attribute depends on another non-key attribute?',
        options: ['Third Normal Form (3NF)', 'First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Unnormalized Form'],
        correctAnswer: 0, explanation: '3NF requires that a table is in 2NF and contains no transitive dependencies (every non-key depends only on the primary key).', points: 1
    },
    {
        id: 'q_g12_it_m1_16', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which device operates at Layer 3 of the OSI model to inspect IP addresses and interconnect different subnets?',
        options: ['Router', 'Repeater', 'Hub', 'Bridge'],
        correctAnswer: 0, explanation: 'Routers operate at the Network Layer (Layer 3) making routing decisions based on logical IP destinations.', points: 1
    },
    {
        id: 'q_g12_it_m1_17', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is SQL Injection (SQLi)?',
        options: [
            'A web vulnerability where malicious SQL commands are inserted into input fields to manipulate backend databases',
            'A technique to speed up database queries',
            'An automated backup tool',
            'A hardware failure in database servers'
        ],
        correctAnswer: 0, explanation: 'SQLi occurs when unfiltered user input is concatenated directly into SQL queries, bypassing authentication.', points: 1
    },
    {
        id: 'q_g12_it_m1_18', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which data structure follows the First-In, First-Out (FIFO) processing order?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correctAnswer: 0, explanation: 'Queues process elements in FIFO order (the first element added is the first one removed), unlike LIFO Stacks.', points: 1
    },
    {
        id: 'q_g12_it_m1_19', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the role of an Operating System Kernel?',
        options: [
            'It is the core program that directly manages CPU scheduling, memory allocation, and hardware device drivers',
            'It is the desktop wallpaper software',
            'It is the internet browser engine',
            'It is the peripheral power cable'
        ],
        correctAnswer: 0, explanation: 'The kernel is the low-level foundation of the OS managing memory, processes, system calls, and I/O hardware.', points: 1
    },
    {
        id: 'q_g12_it_m1_20', examId: 'exam_99', grade: 'Grade12', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which cloud deployment model is provisioned for exclusive use by a single organization comprising multiple consumer business units?',
        options: ['Private cloud', 'Public cloud', 'Community cloud', 'Hybrid cloud'],
        correctAnswer: 0, explanation: 'A private cloud is operated solely for one dedicated entity, offering strict privacy, compliance, and governance control.', points: 1
    },

    // ==========================================
    // GRADE 12 AGRICULTURE MID 1 (exam_93) - target 20 total
    // ==========================================
    {
        id: 'q_g12_agri_m1_04', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which soil order is prevalent in humid tropical and subtropical regions characterized by deep red horizons rich in iron and aluminum oxides?',
        options: ['Oxisols / Ferralsols', 'Aridisols', 'Gelisols', 'Histosols'],
        correctAnswer: 0, explanation: 'Oxisols (Ferralsols) are intensely weathered, highly leached tropical soils rich in sesquioxides (giving red coloration).', points: 1
    },
    {
        id: 'q_g12_agri_m1_05', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'In animal husbandry, what is the term for the feed ration that supplies only the necessary nutrients to keep an animal alive and healthy without gaining or losing weight?',
        options: ['Maintenance ration', 'Production ration', 'Lactation ration', 'Fattening ration'],
        correctAnswer: 0, explanation: 'A maintenance ration satisfies basal metabolic requirements without supporting extra growth, lactation, or heavy work.', points: 1
    },
    {
        id: 'q_g12_agri_m1_06', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which disease affecting Ethiopian teff, wheat, and barley is caused by fungal rust pathogens of the genus Puccinia?',
        options: ['Stem and stripe rust', 'Bacterial blight', 'Mosaic virus', 'Downy mildew'],
        correctAnswer: 0, explanation: 'Puccinia graminis causes stem rust in cereal grains, generating reddish-brown pustules on stems and leaves.', points: 1
    },
    {
        id: 'q_g12_agri_m1_07', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the primary objective of watershed management in agricultural highlands?',
        options: [
            'Conserving soil, harvesting surface rainwater, and rehabilitating degraded catchments',
            'Constructing concrete highways',
            'Draining all groundwater into oceans',
            'Applying synthetic herbicides across hilltops'
        ],
        correctAnswer: 0, explanation: 'Watershed development manages land and hydrological resources to control erosion, boost crop yields, and replenish aquifers.', points: 1
    },
    {
        id: 'q_g12_agri_m1_08', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which ruminant stomach compartment is called the "true stomach" where gastric juices and hydrochloric acid digest feed chemically?',
        options: ['Abomasum', 'Rumen', 'Reticulum', 'Omasum'],
        correctAnswer: 0, explanation: 'The abomasum is the glandular stomach compartment secreting pepsin and HCl, functioning similarly to monogastric stomachs.', points: 1
    },
    {
        id: 'q_g12_agri_m1_09', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'What is hydroponics in modern commercial agriculture?',
        options: [
            'Cultivating plants in nutrient-rich water solutions without soil',
            'Growing crops submerged underwater in lakes',
            'Watering crops with salty seawater',
            'Planting trees on dry desert dunes'
        ],
        correctAnswer: 0, explanation: 'Hydroponics is soilless cultivation where roots receive balanced mineral nutrient ions directly via aqueous solution.', points: 1
    },
    {
        id: 'q_g12_agri_m1_10', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which grafting method joins a scion twig onto an established rootstock stem?',
        options: ['Whip and tongue grafting', 'Budding only', 'Layering', 'Stem cutting'],
        correctAnswer: 0, explanation: 'Grafting unifies the scion (shoot with desirable fruit traits) with rootstock (providing disease-resistant root systems).', points: 1
    },
    {
        id: 'q_g12_agri_m1_11', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'What causes soil salinization in poorly drained irrigated arid agricultural lands?',
        options: [
            'Evaporation of shallow mineral-laden groundwater leaving dissolved salts on the soil surface',
            'Heavy tropical rainfall leaching minerals',
            'Excessive earthworm activity',
            'Adding organic compost'
        ],
        correctAnswer: 0, explanation: 'In arid zones with high evaporation, capillary rise brings saline groundwater upwards, depositing salt crusts.', points: 1
    },
    {
        id: 'q_g12_agri_m1_12', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which method of silage preservation maintains fermented forage quality for livestock during dry seasons?',
        options: [
            'Anaerobic fermentation by lactic acid bacteria in sealed silos or pits',
            'Drying hay in direct sunlight',
            'Freezing in commercial refrigerators',
            'Boiling green forage in large vats'
        ],
        correctAnswer: 0, explanation: 'Excluding oxygen promotes lactic acid fermentation, dropping pH to ~4.0 and preserving moist forage for months.', points: 1
    },
    {
        id: 'q_g12_agri_m1_13', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which insect vector transmits African Animal Trypanosomiasis (Nagana) affecting livestock in southwest Ethiopia?',
        options: ['Tsetse fly (Glossina species)', 'Mosquito (Anopheles)', 'Tick', 'Housefly'],
        correctAnswer: 0, explanation: 'Tsetse flies transmit the parasitic protozoan Trypanosoma, limiting cattle production in sub-humid western valleys.', points: 1
    },
    {
        id: 'q_g12_agri_m1_14', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'In farm financial management, what does the Benefit-Cost Ratio (BCR) indicate for an investment project?',
        options: [
            'The ratio of discounted total benefits to discounted total costs (viable when BCR > 1)',
            'Gross profit before taxes',
            'Loan interest rate only',
            'Depreciation value of tractors'
        ],
        correctAnswer: 0, explanation: 'BCR compares present value of project cash inflows to outflows; a ratio > 1.0 indicates financial viability.', points: 1
    },
    {
        id: 'q_g12_agri_m1_15', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the function of the Broad Bed and Furrow (BBF) technology developed for Ethiopian Vertisols?',
        options: [
            'To drain excess surface rainwater while retaining subsoil moisture for early planting',
            'To harvest wind energy',
            'To eradicate aphids',
            'To spray liquid fertilizer aerially'
        ],
        correctAnswer: 0, explanation: 'BBF implements create raised beds with adjacent furrows, preventing waterlogging in heavy cracking clay soils.', points: 1
    },
    {
        id: 'q_g12_agri_m1_16', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which post-harvest loss prevention technology hermetically seals cereal grains against weevils and mould without chemical insecticides?',
        options: ['PICS (Purdue Improved Crop Storage) triple-layer bags', 'Woven jute sacks', 'Open wooden cribs', 'Concrete floors'],
        correctAnswer: 0, explanation: 'Triple-layer hermetic bags deplete oxygen and build carbon dioxide, suffocating insect pests and fungal spores safely.', points: 1
    },
    {
        id: 'q_g12_agri_m1_17', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'The agricultural process of raising queen bees and honey bee colonies for honey and beeswax is termed:',
        options: ['Apiculture', 'Sericulture', 'Pisciculture', 'Aquaculture'],
        correctAnswer: 0, explanation: 'Apiculture (beekeeping) is a vital Ethiopian agricultural export sector (notably white honey from Tigray).', points: 1
    },
    {
        id: 'q_g12_agri_m1_18', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is an example of a perennial beverage cash crop indigenous to the southwestern forests of Ethiopia?',
        options: ['Coffea arabica', 'Camellia sinensis (Tea)', 'Theobroma cacao', 'Sorghum bicolor'],
        correctAnswer: 0, explanation: 'Coffea arabica originated in the primary montane rainforests of Kaffa and southwestern Ethiopia.', points: 1
    },
    {
        id: 'q_g12_agri_m1_19', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'In sustainable agriculture, what is the term for planting two or more crop species simultaneously in close proximity on the same field?',
        options: ['Intercropping (polyculture)', 'Monocropping', 'Shifting cultivation', 'Continuous bare fallowing'],
        correctAnswer: 0, explanation: 'Intercropping optimizes spatial solar radiation and root uptake while providing insurance against single-crop failure.', points: 1
    },
    {
        id: 'q_g12_agri_m1_20', examId: 'exam_93', grade: 'Grade12', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the role of mycorrhizal fungi in plant-soil symbioses?',
        options: [
            'They extend fungal hyphae through soil to vastly increase plant root phosphorus and water uptake',
            'They kill crop roots',
            'They produce synthetic nitrogen gas',
            'They block sunlight from weed seeds'
        ],
        correctAnswer: 0, explanation: 'Mycorrhizae establish mutualistic associations with root systems, channeling phosphorus and micronutrients in exchange for carbohydrates.', points: 1
    }
];

let added = 0;
newG12Questions.forEach(q => {
    if (!db.questions.some(existing => existing.id === q.id)) {
        db.questions.push(q);
        added++;
    }
});

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully added ${added} Grade 12 Mid 1 questions! Total questions now: ${db.questions.length}`);
