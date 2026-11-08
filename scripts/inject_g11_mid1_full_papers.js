// scripts/inject_g11_mid1_full_papers.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const newG11Questions = [
    // ==========================================
    // GRADE 11 MATHEMATICS MID 1 (exam_68) - target 25 total
    // ==========================================
    {
        id: 'q_g11_math_m1_11', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the vertical asymptote of the rational function f(x) = (x + 3) / (2x - 8)?',
        options: ['x = 4', 'x = -4', 'x = 1/2', 'x = -3'],
        correctAnswer: 0, explanation: 'Vertical asymptotes occur where the denominator is zero (and numerator != 0): 2x - 8 = 0 => 2x = 8 => x = 4.', points: 1
    },
    {
        id: 'q_g11_math_m1_12', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following functions has an oblique (slant) asymptote?',
        options: ['f(x) = (x^2 - 1) / (x + 2)', 'f(x) = (x - 1) / (x^2 + 2)', 'f(x) = (3x^2 + 1) / (x^2 - 4)', 'f(x) = 1 / x'],
        correctAnswer: 0, explanation: 'An oblique asymptote occurs when the degree of the numerator is strictly one greater than the degree of the denominator (2 = 1 + 1).', points: 1
    },
    {
        id: 'q_g11_math_m1_13', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the y-intercept of the rational function f(x) = (x^2 - 4x + 6) / (x - 2)?',
        options: ['(0, -3)', '(0, 3)', '(0, -2)', '(0, 6)'],
        correctAnswer: 0, explanation: 'The y-intercept is found by setting x = 0: f(0) = (0 - 0 + 6) / (0 - 2) = 6 / (-2) = -3.', points: 1
    },
    {
        id: 'q_g11_math_m1_14', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the solution set of the rational inequality (x - 2) / (x + 3) <= 0?',
        options: ['(-3, 2]', '[-3, 2]', '(-infinity, -3) U [2, infinity)', '(-3, 2)'],
        correctAnswer: 0, explanation: 'Critical numbers are x = 2 and x = -3. Testing intervals shows negative values for -3 < x <= 2. Note x = -3 is excluded because denominator cannot be 0.', points: 1
    },
    {
        id: 'q_g11_math_m1_15', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Find the radius of the circle given by x^2 + y^2 - 6x + 8y = 0:',
        options: ['5', '10', '25', '7'],
        correctAnswer: 0, explanation: 'Completing squares: (x - 3)^2 - 9 + (y + 4)^2 - 16 = 0 => (x - 3)^2 + (y + 4)^2 = 25. Thus r = sqrt(25) = 5.', points: 1
    },
    {
        id: 'q_g11_math_m1_16', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the equation of the line passing through (2, 3) with slope m = -4?',
        options: ['4x + y - 11 = 0', '4x - y + 5 = 0', '4x + y + 11 = 0', 'x + 4y - 14 = 0'],
        correctAnswer: 0, explanation: 'y - y1 = m(x - x1) => y - 3 = -4(x - 2) => y - 3 = -4x + 8 => 4x + y - 11 = 0.', points: 1
    },
    {
        id: 'q_g11_math_m1_17', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Two lines L1: 3x - 2y = 5 and L2: 6x - 4y = 12 are:',
        options: ['Perpendicular', 'Parallel and distinct', 'Coincident', 'Intersecting at one point'],
        correctAnswer: 1, explanation: 'Both lines have slope m = 3/2, but different y-intercepts (-5/2 vs -3), so they are parallel and distinct.', points: 1
    },
    {
        id: 'q_g11_math_m1_18', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the midpoint of the line segment joining A(-3, 7) and B(5, -1)?',
        options: ['(1, 3)', '(2, 6)', '(1, 4)', '(-1, 3)'],
        correctAnswer: 0, explanation: 'M = ((x1 + x2)/2, (y1 + y2)/2) = ((-3 + 5)/2, (7 + (-1))/2) = (2/2, 6/2) = (1, 3).', points: 1
    },
    {
        id: 'q_g11_math_m1_19', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the range of the rational function f(x) = (2x - 1) / (x + 3)?',
        options: ['{y in R | y != 2}', '{y in R | y != -3}', '{y in R | y != 1/2}', 'All real numbers R'],
        correctAnswer: 0, explanation: 'The horizontal asymptote is y = 2/1 = 2. Since the graph never crosses y = 2, the range is R \\ {2}.', points: 1
    },
    {
        id: 'q_g11_math_m1_20', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'If f(x) = 1 / x, what is the average rate of change of f(x) on the interval [1, 4]?',
        options: ['-1/4', '-3/4', '1/4', '-1/12'],
        correctAnswer: 0, explanation: 'Average rate of change = [f(4) - f(1)] / (4 - 1) = (1/4 - 1) / 3 = (-3/4) / 3 = -1/4.', points: 1
    },
    {
        id: 'q_g11_math_m1_21', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Solve the equation: 2 / x + 3 / (x + 1) = 0',
        options: ['x = -2/5', 'x = 2/5', 'x = -5/2', 'x = -1'],
        correctAnswer: 0, explanation: '2(x + 1) + 3x = 0 => 2x + 2 + 3x = 0 => 5x = -2 => x = -2/5.', points: 1
    },
    {
        id: 'q_g11_math_m1_22', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is an equation of a circle tangent to the x-axis with center (3, 4)?',
        options: ['(x - 3)^2 + (y - 4)^2 = 16', '(x - 3)^2 + (y - 4)^2 = 9', '(x - 3)^2 + (y - 4)^2 = 25', '(x + 3)^2 + (y + 4)^2 = 16'],
        correctAnswer: 0, explanation: 'A circle tangent to the x-axis has radius equal to the absolute value of the y-coordinate of its center: r = |4| = 4, so r^2 = 16.', points: 1
    },
    {
        id: 'q_g11_math_m1_23', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'If the rational expression (3x + 11) / (x^2 + 5x + 6) is decomposed into A/(x + 2) + B/(x + 3), find the value of B:',
        options: ['-2', '5', '3', '-1'],
        correctAnswer: 0, explanation: '3x + 11 = A(x + 3) + B(x + 2). Setting x = -3 gives 3(-3) + 11 = B(-3 + 2) => 2 = -B => B = -2.', points: 1
    },
    {
        id: 'q_g11_math_m1_24', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'The distance from point P(2, 1) to the line 3x + 4y - 5 = 0 is:',
        options: ['1 unit', '2 units', '5 units', '0.5 units'],
        correctAnswer: 0, explanation: 'd = |Ax0 + By0 + C| / sqrt(A^2 + B^2) = |3(2) + 4(1) - 5| / sqrt(3^2 + 4^2) = |6 + 4 - 5| / 5 = 5 / 5 = 1.', points: 1
    },
    {
        id: 'q_g11_math_m1_25', examId: 'exam_68', grade: 'Grade11', subject: 'Mathematics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the domain of the function f(x) = sqrt((x - 2) / (x + 5))?',
        options: ['(-infinity, -5) U [2, infinity)', '(-5, 2]', '[-5, 2]', '[2, infinity)'],
        correctAnswer: 0, explanation: 'The quotient must be non-negative and x != -5: (x - 2)/(x + 5) >= 0 gives x < -5 or x >= 2.', points: 1
    },

    // ==========================================
    // GRADE 11 PHYSICS MID 1 (exam_69) - target 25 total
    // ==========================================
    {
        id: 'q_g11_phys_m1_10', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'If vector A has magnitude 10 N directed east and vector B has magnitude 10 N directed north, what is the direction of A + B?',
        options: ['North-East (45°)', 'North-West (135°)', 'South-East (315°)', 'Due East (0°)'],
        correctAnswer: 0, explanation: 'tan(theta) = By / Bx = 10 / 10 = 1 => theta = 45° North of East (North-East).', points: 1
    },
    {
        id: 'q_g11_phys_m1_11', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the scalar (dot) product of two non-zero vectors if they are mutually perpendicular?',
        options: ['Zero', '1', 'Product of their magnitudes', 'Negative infinity'],
        correctAnswer: 0, explanation: 'A · B = |A||B|cos(90°) = |A||B| * 0 = 0.', points: 1
    },
    {
        id: 'q_g11_phys_m1_12', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'A projectile is launched from ground level with speed u at angle theta. What is its total time of flight T? (g is acceleration due to gravity)',
        options: ['(2u * sin theta) / g', '(u * sin theta) / g', '(u^2 * sin 2theta) / g', '(u * cos theta) / g'],
        correctAnswer: 0, explanation: 'Vertical motion vy = uy - gt => at landing y = 0 gives T = (2 * u * sin(theta)) / g.', points: 1
    },
    {
        id: 'q_g11_phys_m1_13', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'At the apex (highest point) of projectile trajectory, the acceleration of the object is:',
        options: ['g downwards', 'Zero', 'g upwards', 'Horizontal only'],
        correctAnswer: 0, explanation: 'Gravity acts downward continuously with acceleration g regardless of position or momentary vertical velocity.', points: 1
    },
    {
        id: 'q_g11_phys_m1_14', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'An object rotates with angular speed omega = 10 rad/s in a circle of radius r = 0.2 m. What is its linear tangential speed v?',
        options: ['2 m/s', '50 m/s', '0.02 m/s', '5 m/s'],
        correctAnswer: 0, explanation: 'v = omega * r = 10 rad/s * 0.2 m = 2 m/s.', points: 1
    },
    {
        id: 'q_g11_phys_m1_15', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What banking angle theta of a frictionless curve of radius r prevents sideways skidding at speed v?',
        options: ['tan(theta) = v^2 / (r*g)', 'sin(theta) = v / (r*g)', 'tan(theta) = r*g / v^2', 'cos(theta) = v^2 / r'],
        correctAnswer: 0, explanation: 'Balancing the horizontal component of the normal force with centripetal force: N sin(theta) = m*v^2/r and N cos(theta) = mg => tan(theta) = v^2 / (r*g).', points: 1
    },
    {
        id: 'q_g11_phys_m1_16', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The work-energy theorem states that the net work done on an object equals:',
        options: ['Change in kinetic energy (Delta KE)', 'Total potential energy', 'Total momentum', 'Rate of change of power'],
        correctAnswer: 0, explanation: 'W_net = Delta KE = (1/2)m*vf^2 - (1/2)m*vi^2.', points: 1
    },
    {
        id: 'q_g11_phys_m1_17', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'A 1000 W electric motor operates for 20 seconds. How much electrical energy does it consume?',
        options: ['20,000 J', '50 J', '2,000 J', '200 J'],
        correctAnswer: 0, explanation: 'Energy E = Power * time = 1000 W * 20 s = 20,000 Joules (20 kJ).', points: 1
    },
    {
        id: 'q_g11_phys_m1_18', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'Linear momentum of an isolated system is conserved when:',
        options: ['The net external force acting on the system is zero', 'Internal forces are zero', 'Kinetic energy is conserved', 'All collisions are elastic'],
        correctAnswer: 0, explanation: 'By Newton\'s Second Law, dp/dt = F_ext. If net external force F_ext = 0, total momentum p remains strictly constant.', points: 1
    },
    {
        id: 'q_g11_phys_m1_19', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'A 3 kg ball moving at 4 m/s collides and sticks to a stationary 1 kg ball (inelastic collision). What is their combined final velocity?',
        options: ['3 m/s', '4 m/s', '2 m/s', '1 m/s'],
        correctAnswer: 0, explanation: 'm1*v1 + m2*v2 = (m1 + m2)*vf => (3)(4) + (1)(0) = (3 + 1)*vf => 12 = 4*vf => vf = 3 m/s.', points: 1
    },
    {
        id: 'q_g11_phys_m1_20', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the SI unit of power?',
        options: ['Watt (J/s)', 'Joule (N*m)', 'Newton (kg*m/s^2)', 'Pascal (N/m^2)'],
        correctAnswer: 0, explanation: 'Power is the rate of energy transfer or work per unit time, measured in Watts (1 W = 1 J/s).', points: 1
    },
    {
        id: 'q_g11_phys_m1_21', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'An ideal spring with spring constant k = 200 N/m is compressed by x = 0.1 m. What is the stored elastic potential energy?',
        options: ['1.0 J', '2.0 J', '10 J', '20 J'],
        correctAnswer: 0, explanation: 'PE_elastic = (1/2)k*x^2 = (1/2)(200)(0.1)^2 = 100 * 0.01 = 1.0 Joule.', points: 1
    },
    {
        id: 'q_g11_phys_m1_22', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is a non-conservative force?',
        options: ['Kinetic friction force', 'Gravitational force', 'Electrostatic force', 'Ideal spring force'],
        correctAnswer: 0, explanation: 'Friction dissipates mechanical energy as non-recoverable thermal energy; work done depends on the actual path taken.', points: 1
    },
    {
        id: 'q_g11_phys_m1_23', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'The unit vector in the direction of vector V = 6i - 8j is:',
        options: ['0.6i - 0.8j', '6i - 8j', '0.8i - 0.6j', '10i - 10j'],
        correctAnswer: 0, explanation: '|V| = sqrt(6^2 + (-8)^2) = sqrt(36 + 64) = 10. Unit vector u = V / |V| = (6/10)i - (8/10)j = 0.6i - 0.8j.', points: 1
    },
    {
        id: 'q_g11_phys_m1_24', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'A body moving in a circle at constant speed has:',
        options: ['Constant velocity', 'Constant speed but varying velocity', 'Zero acceleration', 'Zero net force'],
        correctAnswer: 1, explanation: 'Velocity is a vector. Since the direction changes continuously along the circle, velocity varies, generating centripetal acceleration.', points: 1
    },
    {
        id: 'q_g11_phys_m1_25', examId: 'exam_69', grade: 'Grade11', subject: 'Physics', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the impulse delivered by a 50 N force acting on an object for 0.4 seconds?',
        options: ['20 N*s', '125 N*s', '50.4 N*s', '200 N*s'],
        correctAnswer: 0, explanation: 'Impulse J = Force * Delta t = 50 N * 0.4 s = 20 N*s.', points: 1
    },

    // ==========================================
    // GRADE 11 BIOLOGY MID 1 (exam_65) - target 25 total
    // ==========================================
    {
        id: 'q_g11_bio_m1_08', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is an example of a structural polysaccharide in plants?',
        options: ['Cellulose', 'Glycogen', 'Starch', 'Sucrose'],
        correctAnswer: 0, explanation: 'Cellulose consists of unbranched beta-1,4-glycosidic linked glucose units forming the rigid plant cell wall.', points: 1
    },
    {
        id: 'q_g11_bio_m1_09', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Triglycerides are formed through ester condensation reactions between one glycerol molecule and:',
        options: ['Three fatty acid chains', 'Two amino acids', 'Three monosaccharides', 'One phosphate group'],
        correctAnswer: 0, explanation: 'A triglyceride lipid molecule is composed of a glycerol backbone esterified to three fatty acid hydrocarbon chains.', points: 1
    },
    {
        id: 'q_g11_bio_m1_10', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the primary structure of a protein?',
        options: [
            'The linear sequence of amino acids linked by peptide bonds',
            'Alpha-helix and beta-pleated sheet folding',
            'Three-dimensional globular subunit arrangement',
            'Interaction of multiple polypeptide chains'
        ],
        correctAnswer: 0, explanation: 'Primary structure is strictly the linear order of amino acids dictated by mRNA codons.', points: 1
    },
    {
        id: 'q_g11_bio_m1_11', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'How do temperatures far above an enzyme\'s thermal optimum cause loss of catalytic function?',
        options: [
            'By breaking hydrogen and ionic bonds, denaturing tertiary protein structure',
            'By hydrolyzing peptide bonds into free amino acids',
            'By lowering substrate concentration',
            'By converting the active site into RNA'
        ],
        correctAnswer: 0, explanation: 'Excessive heat increases kinetic vibrations that disrupt delicate hydrogen bonds and hydrophobic interactions holding tertiary structure.', points: 1
    },
    {
        id: 'q_g11_bio_m1_12', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'In non-competitive enzyme inhibition, the inhibitor binds to:',
        options: ['An allosteric site other than the active site', 'The substrate molecule directly', 'The active site competitively', 'The enzyme product'],
        correctAnswer: 0, explanation: 'Non-competitive inhibitors attach to an allosteric regulatory site, altering the 3D conformation of the active site.', points: 1
    },
    {
        id: 'q_g11_bio_m1_13', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the Michaelis constant (Km) of an enzyme-catalyzed reaction?',
        options: [
            'The substrate concentration at which the reaction velocity is half of Vmax',
            'The maximum reaction rate achievable',
            'The optimum temperature in Celsius',
            'The turnover number kcat'
        ],
        correctAnswer: 0, explanation: 'Km represents substrate affinity: it is defined as [S] at which reaction speed is exactly 1/2 Vmax.', points: 1
    },
    {
        id: 'q_g11_bio_m1_14', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which inorganic ion acts as an essential cofactor for salivary amylase?',
        options: ['Chloride ion (Cl-)', 'Iron ion (Fe2+)', 'Magnesium ion (Mg2+)', 'Copper ion (Cu2+)'],
        correctAnswer: 0, explanation: 'Chloride ions (Cl-) activate human salivary amylase to digest starch into maltose.', points: 1
    },
    {
        id: 'q_g11_bio_m1_15', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is a purine nitrogenous base found in both DNA and RNA?',
        options: ['Adenine', 'Cytosine', 'Uracil', 'Thymine'],
        correctAnswer: 0, explanation: 'Adenine and Guanine are double-ring purines; Cytosine, Thymine, and Uracil are single-ring pyrimidines.', points: 1
    },
    {
        id: 'q_g11_bio_m1_16', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Phospholipids are described as amphipathic molecules because they contain:',
        options: [
            'A hydrophilic phosphate head and two hydrophobic fatty acid tails',
            'Two hydrophilic heads and no fatty acids',
            'Only non-polar steroid rings',
            'Four glycerol backbones'
        ],
        correctAnswer: 0, explanation: 'Amphipathic molecules possess both polar (water-loving) and non-polar (water-repelling) domains, forming the membrane bilayer.', points: 1
    },
    {
        id: 'q_g11_bio_m1_17', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which level of protein organization features the association of multiple folded polypeptide subunits into a single multi-protein complex (e.g. hemoglobin)?',
        options: ['Quaternary structure', 'Tertiary structure', 'Secondary structure', 'Primary sequence'],
        correctAnswer: 0, explanation: 'Quaternary structure involves non-covalent aggregation of two or more polypeptide chains (like the 4 subunits of hemoglobin).', points: 1
    },
    {
        id: 'q_g11_bio_m1_18', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'During feedback inhibition in metabolic pathways, the end product typically inhibits:',
        options: [
            'The first committed enzyme of the metabolic pathway',
            'The final enzyme in the pathway',
            'All enzymes equally',
            'The DNA promoter region'
        ],
        correctAnswer: 0, explanation: 'End-product allosteric inhibition targets the initial regulatory pacemaker enzyme, preventing wasteful accumulation of intermediates.', points: 1
    },
    {
        id: 'q_g11_bio_m1_19', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which test identifies reducing sugars like glucose and maltose by forming an orange-red cuprous oxide precipitate upon heating?',
        options: ['Benedict\'s test', 'Iodine test', 'Biuret test', 'Emulsion test'],
        correctAnswer: 0, explanation: 'Benedict\'s alkaline copper reagent is reduced by free aldehyde/ketone groups of reducing sugars into a brick-red Cu2O precipitate.', points: 1
    },
    {
        id: 'q_g11_bio_m1_20', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What type of chemical reaction links monosaccharides into polysaccharides while eliminating water?',
        options: ['Condensation (dehydration synthesis)', 'Hydrolysis', 'Oxidation', 'Decarboxylation'],
        correctAnswer: 0, explanation: 'Condensation reactions join monomer units by creating glycosidic bonds and releasing a water molecule.', points: 1
    },
    {
        id: 'q_g11_bio_m1_21', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which cellular organelle packages proteins into membrane-bound transport vesicles for secretion?',
        options: ['Golgi apparatus', 'Lysosome', 'Smooth ER', 'Peroxisome'],
        correctAnswer: 0, explanation: 'The Golgi complex modifies, sorts, and packages polypeptides received from the rough ER into secretory vesicles.', points: 1
    },
    {
        id: 'q_g11_bio_m1_22', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'In aerobic cellular respiration, where does the Krebs (citric acid) cycle take place within the eukaryotic cell?',
        options: ['Mitochondrial matrix', 'Inner mitochondrial cristae membrane', 'Cytoplasm cytosol', 'Nuclear envelope'],
        correctAnswer: 0, explanation: 'The enzymes of the citric acid cycle reside solubly within the fluid mitochondrial matrix.', points: 1
    },
    {
        id: 'q_g11_bio_m1_23', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Which nucleic acid molecule transfers specific amino acids to ribosomes during mRNA translation?',
        options: ['tRNA (transfer RNA)', 'rRNA (ribosomal RNA)', 'mRNA (messenger RNA)', 'snRNA (small nuclear RNA)'],
        correctAnswer: 0, explanation: 'tRNA carries an anticodon on one end and the cognate amino acid on its 3\' CCA terminal.', points: 1
    },
    {
        id: 'q_g11_bio_m1_24', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the storage polysaccharide stored in human liver and skeletal muscle cells?',
        options: ['Glycogen', 'Cellulose', 'Amylose', 'Chitin'],
        correctAnswer: 0, explanation: 'Glycogen is a heavily branched polymer of alpha-D-glucose utilized for quick glucose mobilization in animals.', points: 1
    },
    {
        id: 'q_g11_bio_m1_25', examId: 'exam_65', grade: 'Grade11', subject: 'Biology', semester: 'Semester1', examType: 'Mid1',
        question: 'Prokaryotic bacterial ribosomes have a sedimentation coefficient of:',
        options: ['70S (composed of 50S and 30S subunits)', '80S (composed of 60S and 40S subunits)', '60S', '100S'],
        correctAnswer: 0, explanation: 'Bacterial ribosomes are 70S (50S large + 30S small subunits), distinct from eukaryotic 80S cytosolic ribosomes.', points: 1
    },

    // ==========================================
    // GRADE 11 ENGLISH MID 1 (exam_66) - target 25 total
    // ==========================================
    {
        id: 'q_g11_eng_m1_06', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct reported speech form: "I will submit the assignment tomorrow," Nahom told the teacher.',
        options: [
            'Nahom told the teacher that he would submit the assignment the following day.',
            'Nahom told the teacher that he will submit the assignment tomorrow.',
            'Nahom told the teacher that he submitted the assignment yesterday.',
            'Nahom told the teacher that he would submit the assignment tomorrow.'
        ],
        correctAnswer: 0, explanation: 'Direct speech "will" shifts back to "would", and temporal adverb "tomorrow" changes to "the following day" or "the next day".', points: 1
    },
    {
        id: 'q_g11_eng_m1_07', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the misplaced modifier in: "Walking briskly across the campus, the school bell rang loudly."',
        options: [
            'The sentence incorrectly implies that the school bell was walking briskly',
            'The adverb briskly is spelled incorrectly',
            'The verb rang should be in passive voice',
            'There is no grammatical error'
        ],
        correctAnswer: 0, explanation: 'This is a dangling participle: the participle clause "Walking briskly..." lacks a logical subject in the main clause (the bell cannot walk).', points: 1
    },
    {
        id: 'q_g11_eng_m1_08', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Complete with the appropriate modal verb: "The laboratory results ______ be ready by noon; the technician began testing early."',
        options: ['should', 'mustn\'t', 'needn\'t', 'cannot'],
        correctAnswer: 0, explanation: '"Should" expresses reasonable expectation or strong probability based on known circumstances.', points: 1
    },
    {
        id: 'q_g11_eng_m1_09', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Which word is the antonym of "meticulous"?',
        options: ['Careless', 'Diligent', 'Thorough', 'Precise'],
        correctAnswer: 0, explanation: '"Meticulous" means showing great attention to detail and careful precision; its opposite is careless or sloppy.', points: 1
    },
    {
        id: 'q_g11_eng_m1_10', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct phrasal verb: "The committee decided to ______ the meeting until next Tuesday due to rain."',
        options: ['put off', 'put on', 'put out', 'put up with'],
        correctAnswer: 0, explanation: '"Put off" is an idiom meaning to postpone or reschedule an event to a future time.', points: 1
    },
    {
        id: 'q_g11_eng_m1_11', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Which sentence demonstrates correct subject-verb agreement?',
        options: [
            'Each of the students has submitted their past exam revision.',
            'Each of the students have submitted their past exam revision.',
            'The list of items were long and confusing.',
            'Ten kilometers are a long distance to walk.'
        ],
        correctAnswer: 0, explanation: '"Each" is a singular distributive pronoun that takes the singular verb form "has".', points: 1
    },
    {
        id: 'q_g11_eng_m1_12', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Select the sentence with parallel grammatical structure:',
        options: [
            'She likes swimming, hiking, and reading historical novels.',
            'She likes swimming, to hike, and reading historical novels.',
            'She likes to swim, hiking, and historical novels.',
            'She likes swimming, hike, and to read.'
        ],
        correctAnswer: 0, explanation: 'All coordinate elements joined in a series must share identical grammatical form (three matching gerunds: swimming, hiking, reading).', points: 1
    },
    {
        id: 'q_g11_eng_m1_13', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the figure of speech in: "The morning sun gently kissed the highland valleys of Ethiopia."',
        options: ['Personification', 'Simile', 'Hyperbole', 'Oxymoron'],
        correctAnswer: 0, explanation: 'Attributing human actions ("kissed") to an inanimate celestial body (the sun) is personification.', points: 1
    },
    {
        id: 'q_g11_eng_m1_14', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Complete with the correct connector: "______ the severe drought, Ethiopian farmers managed to harvest resilient crops."',
        options: ['In spite of', 'Although', 'Even though', 'Because of'],
        correctAnswer: 0, explanation: '"In spite of" is followed by a noun phrase ("the severe drought"), whereas "although" requires a full dependent clause with subject and verb.', points: 1
    },
    {
        id: 'q_g11_eng_m1_15', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the correct passive voice: "Someone has stolen my laboratory notebook."',
        options: [
            'My laboratory notebook has been stolen.',
            'My laboratory notebook was stolen.',
            'My laboratory notebook had been stolen.',
            'My laboratory notebook is being stolen.'
        ],
        correctAnswer: 0, explanation: 'Present perfect active ("has stolen") converts to present perfect passive ("has been stolen").', points: 1
    },
    {
        id: 'q_g11_eng_m1_16', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Select the sentence with correct punctuation:',
        options: [
            'I wanted to study medicine; however, my passion for physics won.',
            'I wanted to study medicine, however; my passion for physics won.',
            'I wanted to study medicine however, my passion for physics won.',
            'I wanted to study medicine; however my passion for physics won'
        ],
        correctAnswer: 0, explanation: 'Conjunctive adverbs ("however") connecting two independent clauses take a preceding semicolon and a succeeding comma.', points: 1
    },
    {
        id: 'q_g11_eng_m1_17', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Which prefix added to the root "audible" gives its opposite meaning?',
        options: ['In-', 'Un-', 'Dis-', 'Mis-'],
        correctAnswer: 0, explanation: '"Inaudible" means incapable of being heard.', points: 1
    },
    {
        id: 'q_g11_eng_m1_18', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the tone of an academic argumentative research essay?',
        options: ['Objective and formal', 'Emotional and dramatic', 'Conversational and humorous', 'Sarcastic and colloquial'],
        correctAnswer: 0, explanation: 'Scholarly essays maintain an evidence-based, formal, and objective register without informal slang.', points: 1
    },
    {
        id: 'q_g11_eng_m1_19', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Choose the word that best completes: "The speaker\'s arguments were so ______ that the whole assembly concurred."',
        options: ['compelling', 'monotonous', 'vague', 'superficial'],
        correctAnswer: 0, explanation: '"Compelling" means powerfully convincing and irresistible.', points: 1
    },
    {
        id: 'q_g11_eng_m1_20', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Identify the sentence with an adverbial clause of purpose:',
        options: [
            'Kidist studied past papers so that she might excel in the national examination.',
            'Kidist studied past papers because they were challenging.',
            'Kidist studied past papers although she was tired.',
            'Kidist studied past papers where the library was quiet.'
        ],
        correctAnswer: 0, explanation: '"So that..." introduces an adverbial clause expressing intention and purpose.', points: 1
    },
    {
        id: 'q_g11_eng_m1_21', examId: 'exam_66', grade: 'Grade11', subject: 'English', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is a complex sentence?',
        options: [
            'When the bell rang, the students submitted their answer sheets.',
            'The bell rang and the students submitted their answer sheets.',
            'The bell rang; the students submitted their answer sheets.',
            'The students quickly submitted their answer sheets.'
        ],
        correctAnswer: 0, explanation: 'A complex sentence consists of one dependent clause ("When the bell rang") and one independent clause.', points: 1
    },

    // ==========================================
    // GRADE 11 IT MID 1 (exam_67) - target 20 total
    // ==========================================
    {
        id: 'q_g11_it_m1_05', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which network device operates at Layer 2 (Data Link Layer) and forwards frames based on MAC addresses?',
        options: ['Network Switch', 'Hub', 'Router', 'Repeater'],
        correctAnswer: 0, explanation: 'Switches inspect destination MAC addresses in Layer 2 frames to direct traffic specifically to target switch ports.', points: 1
    },
    {
        id: 'q_g11_it_m1_06', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which protocol is used to automatically assign IP addresses and network configurations to host devices on a local network?',
        options: ['DHCP', 'DNS', 'FTP', 'SMTP'],
        correctAnswer: 0, explanation: 'DHCP (Dynamic Host Configuration Protocol) leases IP addresses, subnet masks, and default gateways dynamically.', points: 1
    },
    {
        id: 'q_g11_it_m1_07', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which twisted-pair ethernet cable standard uses an RJ-45 connector and supports gigabit data rates up to 1000 Mbps?',
        options: ['Category 5e / 6 (Cat5e/Cat6)', 'Category 3 (Cat3)', 'Coaxial RG-59', 'Single-mode optical fiber'],
        correctAnswer: 0, explanation: 'Cat5e and Cat6 twisted copper cables with 8P8C (RJ-45) terminations support 1 Gbps Gigabit Ethernet.', points: 1
    },
    {
        id: 'q_g11_it_m1_08', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'In SQL database queries, which command is used to extract records from a table matching specific criteria?',
        options: ['SELECT ... WHERE', 'UPDATE ... SET', 'INSERT INTO ... VALUES', 'DROP TABLE'],
        correctAnswer: 0, explanation: 'The SELECT statement retrieves column data from tables, while the WHERE clause filters matching rows.', points: 1
    },
    {
        id: 'q_g11_it_m1_09', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is a Foreign Key in a relational database table?',
        options: [
            'A field in one table that uniquely identifies a row in another table (referential integrity)',
            'An encryption key stored outside the database',
            'A key that can only store foreign currency',
            'A primary key that allows duplicate values'
        ],
        correctAnswer: 0, explanation: 'A Foreign Key links child tables to parent primary keys, enforcing referential integrity.', points: 1
    },
    {
        id: 'q_g11_it_m1_10', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which network security appliance monitors and controls incoming and outgoing network traffic based on predetermined security rules?',
        options: ['Firewall', 'Modem', 'Network Interface Card (NIC)', 'Patch Panel'],
        correctAnswer: 0, explanation: 'A Firewall acts as a barrier inspecting network packets to block unauthorized access or malicious ports.', points: 1
    },
    {
        id: 'q_g11_it_m1_11', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is an unguided (wireless) transmission medium?',
        options: ['Radio waves', 'Fiber optic cable', 'Coaxial cable', 'Shielded Twisted Pair (STP)'],
        correctAnswer: 0, explanation: 'Radio waves, microwaves, and infrared propagate through air/free space without physical bounded conduits.', points: 1
    },
    {
        id: 'q_g11_it_m1_12', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the default port number used by secure HTTPS encrypted web communication?',
        options: ['443', '80', '21', '25'],
        correctAnswer: 0, explanation: 'Standard HTTP uses port 80, whereas SSL/TLS encrypted HTTPS uses port 443.', points: 1
    },
    {
        id: 'q_g11_it_m1_13', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'A Denial of Service (DoS) cyberattack primarily aims to:',
        options: [
            'Exhaust system resources and render a service unavailable to legitimate users',
            'Steal hard drive passwords without notice',
            'Physically destroy server motherboards',
            'Format local user partitions'
        ],
        correctAnswer: 0, explanation: 'DoS attacks flood servers with bogus traffic so authentic requests cannot be serviced.', points: 1
    },
    {
        id: 'q_g11_it_m1_14', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which transmission mode allows data transmission in both directions simultaneously (e.g. telephone conversation)?',
        options: ['Full-Duplex', 'Half-Duplex', 'Simplex', 'Multiplex'],
        correctAnswer: 0, explanation: 'Full-duplex enables two-way concurrent transmission, unlike half-duplex (walkie-talkie) or simplex (radio broadcast).', points: 1
    },
    {
        id: 'q_g11_it_m1_15', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'In database normalization, a table is in First Normal Form (1NF) if:',
        options: [
            'Every column contains atomic (indivisible) values and rows are unique',
            'All non-key attributes depend on a foreign key',
            'Transitive dependencies are eliminated',
            'No indexes exist on the table'
        ],
        correctAnswer: 0, explanation: '1NF requires eliminating repeating groups and ensuring every field holds a single atomic value.', points: 1
    },
    {
        id: 'q_g11_it_m1_16', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'What does the acronym URL stand for?',
        options: [
            'Uniform Resource Locator',
            'Universal Routing Link',
            'Unified Registry Line',
            'Unique Remote Locator'
        ],
        correctAnswer: 0, explanation: 'URL stands for Uniform Resource Locator, specifying the global web address of an online resource.', points: 1
    },
    {
        id: 'q_g11_it_m1_17', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which malware replicates itself across computer networks without requiring human intervention or host file attachment?',
        options: ['Worm', 'Trojan Horse', 'Macro Virus', 'Spyware'],
        correctAnswer: 0, explanation: 'Worms are standalone malicious programs that exploit network vulnerabilities to self-propagate automatically.', points: 1
    },
    {
        id: 'q_g11_it_m1_18', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which network command is used to test reachability of a remote host and measure round-trip response time?',
        options: ['ping', 'ipconfig', 'tracert', 'nslookup'],
        correctAnswer: 0, explanation: 'ping sends ICMP Echo Request packets and listens for Echo Replies to verify network connectivity.', points: 1
    },
    {
        id: 'q_g11_it_m1_19', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'The MAC (Media Access Control) address is hardcoded on which hardware component?',
        options: ['Network Interface Card (NIC)', 'Hard disk drive controller', 'RAM module', 'Power supply unit'],
        correctAnswer: 0, explanation: 'A 48-bit physical MAC address is burned into the firmware of the Network Interface Card (NIC).', points: 1
    },
    {
        id: 'q_g11_it_m1_20', examId: 'exam_67', grade: 'Grade11', subject: 'IT', semester: 'Semester1', examType: 'Mid1',
        question: 'Which cloud computing model delivers computing hardware, servers, storage, and networking over the internet on-demand?',
        options: ['IaaS (Infrastructure as a Service)', 'SaaS (Software as a Service)', 'PaaS (Platform as a Service)', 'DaaS'],
        correctAnswer: 0, explanation: 'IaaS provides raw virtualized computing resources (virtual machines, block storage, networking) to administrators.', points: 1
    },

    // ==========================================
    // GRADE 11 WEB MID 1 (exam_70) - target 20 total
    // ==========================================
    {
        id: 'q_g11_web_m1_05', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which HTML attribute specifies alternate descriptive text for an image if the image cannot be displayed?',
        options: ['alt', 'title', 'src', 'caption'],
        correctAnswer: 0, explanation: 'The "alt" attribute provides accessible descriptive text for screen readers and displays when image loading fails.', points: 1
    },
    {
        id: 'q_g11_web_m1_06', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'In CSS box model, what is the area between the element content and its border?',
        options: ['Padding', 'Margin', 'Outline', 'Gutter'],
        correctAnswer: 0, explanation: 'The CSS box model consists of: Content -> Padding -> Border -> Margin.', points: 1
    },
    {
        id: 'q_g11_web_m1_07', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which CSS property is used to change the text color of an HTML element?',
        options: ['color', 'text-color', 'font-color', 'background-color'],
        correctAnswer: 0, explanation: 'The "color" property sets the foreground color of text and text decorations.', points: 1
    },
    {
        id: 'q_g11_web_m1_08', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which HTML element is used to define an unordered, bulleted list?',
        options: ['<ul>', '<ol>', '<li>', '<dl>'],
        correctAnswer: 0, explanation: '<ul> creates an unordered bulleted list, whereas <ol> creates an ordered numbered list.', points: 1
    },
    {
        id: 'q_g11_web_m1_09', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'How do you link an external CSS stylesheet "style.css" inside an HTML <head>?',
        options: [
            '<link rel="stylesheet" href="style.css">',
            '<style src="style.css">',
            '<stylesheet>style.css</stylesheet>',
            '<script href="style.css">'
        ],
        correctAnswer: 0, explanation: 'The <link> element with rel="stylesheet" and href="style.css" links external CSS documents.', points: 1
    },
    {
        id: 'q_g11_web_m1_10', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which HTTP status code indicates a successful client request with resource returned?',
        options: ['200 OK', '404 Not Found', '500 Internal Server Error', '301 Moved Permanently'],
        correctAnswer: 0, explanation: 'Status 200 OK signals that the HTTP transaction completed successfully.', points: 1
    },
    {
        id: 'q_g11_web_m1_11', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which CSS unit is relative to the font-size of the root <html> element?',
        options: ['rem', 'em', 'px', 'vh'],
        correctAnswer: 0, explanation: 'rem (root em) scales relative to the root html font-size, unlike em which is relative to parent elements.', points: 1
    },
    {
        id: 'q_g11_web_m1_12', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which HTML5 input type provides automatic validation for email address format?',
        options: ['<input type="email">', '<input type="text">', '<input type="mail">', '<input type="url">'],
        correctAnswer: 0, explanation: 'type="email" automatically verifies that user input conforms to standard user@domain.com formatting.', points: 1
    },
    {
        id: 'q_g11_web_m1_13', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the purpose of the CSS media query "@media (max-width: 768px)"?',
        options: [
            'To apply responsive layout styles tailored for mobile devices and tablets below 768px wide',
            'To limit server bandwidth usage',
            'To print black-and-white documents',
            'To disable JavaScript execution'
        ],
        correctAnswer: 0, explanation: 'Media queries apply conditional CSS based on device viewport width for responsive mobile-first design.', points: 1
    },
    {
        id: 'q_g11_web_m1_14', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'In client-side JavaScript, which method attaches an event listener to a button element?',
        options: ['element.addEventListener(\'click\', callback)', 'element.attachEvent(\'click\')', 'element.listen(\'click\')', 'element.onClick(callback)'],
        correctAnswer: 0, explanation: 'addEventListener is the standard W3C DOM method for binding event handlers to elements.', points: 1
    },
    {
        id: 'q_g11_web_m1_15', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'What does CSS stand for?',
        options: ['Cascading Style Sheets', 'Computer Styling System', 'Creative Style Software', 'Color and Style Structure'],
        correctAnswer: 0, explanation: 'CSS stands for Cascading Style Sheets, defining visual presentation of web documents.', points: 1
    },
    {
        id: 'q_g11_web_m1_16', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which HTML tag is used to create a hyperlink navigating to another web page?',
        options: ['<a href="...">', '<link href="...">', '<nav url="...">', '<hyperlink target="...">'],
        correctAnswer: 0, explanation: 'The <a> anchor tag with the "href" attribute creates navigable hyperlinks.', points: 1
    },
    {
        id: 'q_g11_web_m1_17', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'In CSS Grid layout, which property defines the columns of the grid container?',
        options: ['grid-template-columns', 'grid-columns', 'grid-row-template', 'columns-count'],
        correctAnswer: 0, explanation: 'grid-template-columns sets the sizing and number of columns in a CSS grid (e.g. repeat(3, 1fr)).', points: 1
    },
    {
        id: 'q_g11_web_m1_18', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which meta tag in HTML <head> ensures proper mobile viewport scaling and responsiveness?',
        options: [
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '<meta name="mobile" content="true">',
            '<meta name="screen" content="responsive">',
            '<meta name="scale" content="100%">'
        ],
        correctAnswer: 0, explanation: 'The viewport meta tag matches screen width in device-independent pixels and prevents mobile automatic zoom.', points: 1
    },
    {
        id: 'q_g11_web_m1_19', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'Which JavaScript method parses a serialized JSON string into an operable JavaScript object?',
        options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'JSON.decode()'],
        correctAnswer: 0, explanation: 'JSON.parse() deserializes a JSON string into a JavaScript object or array.', points: 1
    },
    {
        id: 'q_g11_web_m1_20', examId: 'exam_70', grade: 'Grade11', subject: 'WEB', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the purpose of the Document Object Model (DOM)?',
        options: [
            'It provides an object-oriented structural representation of the HTML document accessible to scripting languages like JavaScript',
            'It compiles HTML into binary machine code',
            'It encrypts web server files',
            'It handles DNS server lookups'
        ],
        correctAnswer: 0, explanation: 'The DOM is the tree-structured programming API that JavaScript uses to inspect, modify, and style web content dynamically.', points: 1
    },

    // ==========================================
    // GRADE 11 AGRICULTURE MID 1 (exam_63) - target 20 total
    // ==========================================
    {
        id: 'q_g11_agri_m1_04', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Soil texture is defined by the relative proportions of which three particle fractions?',
        options: ['Sand, silt, and clay', 'Gravel, humus, and water', 'Nitrogen, phosphorus, and potassium', 'Loam, limestone, and basalt'],
        correctAnswer: 0, explanation: 'Soil texture classification is strictly determined by the percentages of sand (2.0–0.05 mm), silt (0.05–0.002 mm), and clay (<0.002 mm).', points: 1
    },
    {
        id: 'q_g11_agri_m1_05', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which soil property measures the relative acidity or alkalinity of the soil solution?',
        options: ['Soil pH', 'Cation exchange capacity (CEC)', 'Soil bulk density', 'Soil porosity'],
        correctAnswer: 0, explanation: 'Soil pH indicates H+ ion concentration; most Ethiopian agricultural crops thrive in slightly acidic to neutral soils (pH 6.0–7.5).', points: 1
    },
    {
        id: 'q_g11_agri_m1_06', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which traditional organic amendment improves soil structure, aeration, and moisture retention while returning organic matter?',
        options: ['Compost and farmyard manure', 'Synthetic urea granules', 'Copper sulfate spray', 'Hydrated lime powder'],
        correctAnswer: 0, explanation: 'Compost adds decomposed organic carbon, enhancing beneficial microbial communities and aggregate stability.', points: 1
    },
    {
        id: 'q_g11_agri_m1_07', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which agricultural practice alternates different crop families on the same parcel of land across successive planting seasons?',
        options: ['Crop rotation', 'Monoculture', 'Slash and burn', 'Continuous cropping'],
        correctAnswer: 0, explanation: 'Crop rotation disrupts pest and disease cycles and balances nutrient uptake (e.g., rotating nitrogen-fixing legumes with cereals).', points: 1
    },
    {
        id: 'q_g11_agri_m1_08', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'In Ethiopia, the Vertisol (black clay soil) is characterized by which physical management challenge?',
        options: [
            'Severe swelling when wet and deep cracking when dry, causing poor drainage',
            'Extremely sandy texture that cannot hold water',
            'Complete absence of iron minerals',
            'Permanent frozen permafrost'
        ],
        correctAnswer: 0, explanation: 'Vertisols contain expanding montmorillonite clay that swells and waterlogs in rainy seasons and shrinks with deep cracks during dry spells.', points: 1
    },
    {
        id: 'q_g11_agri_m1_09', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the primary role of nitrogen (N) in crop nutrition?',
        options: [
            'Promotes vigorous vegetative leafy growth and chlorophyll synthesis',
            'Stimulates root nodulation exclusively',
            'Accelerates fruit ripening only',
            'Prevents soil salinity'
        ],
        correctAnswer: 0, explanation: 'Nitrogen is an essential constituent of amino acids, proteins, and chlorophyll necessary for vegetative foliage growth.', points: 1
    },
    {
        id: 'q_g11_agri_m1_10', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which soil amendment is commonly applied to neutralize strongly acidic soils and increase pH?',
        options: ['Agricultural limestone (Calcium carbonate, CaCO3)', 'Sulfur powder', 'Ammonium sulfate fertilizer', 'Phosphoric acid'],
        correctAnswer: 0, explanation: 'Liming with CaCO3 neutralizes excess hydrogen and aluminum ions, elevating acidic soil pH to productive levels.', points: 1
    },
    {
        id: 'q_g11_agri_m1_11', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'The agricultural practice of planting trees or woody shrubs alongside agricultural crops or livestock is known as:',
        options: ['Agroforestry', 'Monoculture', 'Silviculture exclusively', 'Deforestation'],
        correctAnswer: 0, explanation: 'Agroforestry combines agriculture and forestry to improve biodiversity, prevent erosion, and diversify farmer income.', points: 1
    },
    {
        id: 'q_g11_agri_m1_12', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which of the following is an indigenous Ethiopian cereal grain prized for high iron content and gluten-free flour?',
        options: ['Teff (Eragrostis tef)', 'Barley (Hordeum vulgare)', 'Wheat (Triticum aestivum)', 'Rye (Secale cereale)'],
        correctAnswer: 0, explanation: 'Teff is native to the Ethiopian highlands and is the primary grain used to bake traditional injera.', points: 1
    },
    {
        id: 'q_g11_agri_m1_13', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the main advantage of minimum (conservation) tillage over conventional deep plowing?',
        options: [
            'Reduces soil erosion and preserves soil structure and soil moisture',
            'Increases fuel consumption',
            'Completely eradicates all weed seeds instantly',
            'Increases soil compaction'
        ],
        correctAnswer: 0, explanation: 'Conservation tillage leaves crop residue on the surface, shielding the soil from rainfall impact and conserving moisture.', points: 1
    },
    {
        id: 'q_g11_agri_m1_14', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which soil organism is celebrated as a "natural soil aerator" by burrowing channels and cycling organic residues into fertile casts?',
        options: ['Earthworms', 'Termites exclusively', 'Nematodes', 'Aphids'],
        correctAnswer: 0, explanation: 'Earthworms decompose organic matter and create subterranean burrows that enhance root aeration and water infiltration.', points: 1
    },
    {
        id: 'q_g11_agri_m1_15', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'What is the term for the artificial application of controlled amounts of water to agricultural land to assist crop production during dry periods?',
        options: ['Irrigation', 'Infiltration', 'Transpiration', 'Percolation'],
        correctAnswer: 0, explanation: 'Irrigation supplies supplemental water to fulfill crop evapotranspiration requirements when rainfall is deficient.', points: 1
    },
    {
        id: 'q_g11_agri_m1_16', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Which deficiency symptom is typical of phosphorus deficiency in young crop leaves?',
        options: [
            'Purplish or reddish discoloration along leaves and stunted root growth',
            'Interveinal chlorosis only',
            'Leaf curling with necrotic spots',
            'Excessive lush vegetative growth'
        ],
        correctAnswer: 0, explanation: 'Phosphorus deficiency limits ATP and nucleotide production, causing anthocyanin buildup (purple pigmentation) and stunted root development.', points: 1
    },
    {
        id: 'q_g11_agri_m1_17', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'The layer of living plant material that protects the soil surface and is incorporated into the soil while still green to enrich fertility is called:',
        options: ['Green manure', 'Inorganic fertilizer', 'Topsoil cover', 'Slag'],
        correctAnswer: 0, explanation: 'Green manure crops (often clover or vetch) are plowed into the soil while green to decompose and liberate organic nitrogen.', points: 1
    },
    {
        id: 'q_g11_agri_m1_18', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'What is mulching in horticultural and crop production?',
        options: [
            'Covering the soil surface with organic or synthetic material to conserve moisture and suppress weeds',
            'Applying pesticide via aerial spray',
            'Flooding fields with saline water',
            'Burning crop stubble'
        ],
        correctAnswer: 0, explanation: 'Mulch reduces evaporative moisture loss, regulates soil temperature, and suppresses weed germination.', points: 1
    },
    {
        id: 'q_g11_agri_m1_19', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'Biological pest control involves using:',
        options: [
            'Natural predators, parasites, or pathogens to manage pest populations',
            'Broad-spectrum chemical organophosphates',
            'Flamethrowers on crop fields',
            'Electric fences exclusively'
        ],
        correctAnswer: 0, explanation: 'Biological control uses living organisms (such as ladybird beetles preying on aphids) to keep pests below economic threshold levels.', points: 1
    },
    {
        id: 'q_g11_agri_m1_20', examId: 'exam_63', grade: 'Grade11', subject: 'Agriculture', semester: 'Semester1', examType: 'Mid1',
        question: 'The water held in the soil pore spaces between field capacity and permanent wilting point that plants can absorb is termed:',
        options: ['Available soil water', 'Gravitational water', 'Hygroscopic water', 'Capillary runoff'],
        correctAnswer: 0, explanation: 'Available water capacity is the moisture retained between field capacity (-1/3 bar) and wilting point (-15 bar) accessible by plant roots.', points: 1
    }
];

let added = 0;
newG11Questions.forEach(q => {
    if (!db.questions.some(existing => existing.id === q.id)) {
        db.questions.push(q);
        added++;
    }
});

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully added ${added} Grade 11 Mid 1 questions! Total questions now: ${db.questions.length}`);
