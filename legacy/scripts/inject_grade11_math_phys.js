// Grade 11 Physics & Mathematics Final Examinations (exam_68, exam_67)
// Authentic curriculum questions strictly aligned with Ethiopian Grade 11 Syllabus:
// Physics: Vectors, 2D Kinematics, Dynamics & Newton's Laws, Work, Energy & Power, Rotational Motion
// Mathematics: Relations & Functions, Rational Expressions, Coordinate Geometry, Trigonometric Functions

const grade11PhysQuestions = [
  // --- Grade 11 Physics (exam_68) ---
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following is a pure scalar physical quantity?",
    options: ["Displacement", "Linear momentum", "Kinetic energy", "Gravitational force"],
    correctAnswer: 2, // Kinetic energy
    explanation: "Kinetic energy (½mv²) possesses magnitude only and has no directional orientation in space, making it a scalar.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "Two vectors A and B have magnitudes of 6 units and 8 units respectively. If they are perpendicular (at 90°), what is the magnitude of their resultant vector R = A + B?",
    options: ["10 units", "14 units", "2 units", "48 units"],
    correctAnswer: 0, // 10 units
    explanation: "|R| = √(A² + B²) = √(6² + 8²) = √(36 + 64) = √100 = 10 units.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "A projectile is launched from ground level with initial velocity v0 at an angle θ above the horizontal. At the peak of its trajectory, which of the following is TRUE?",
    options: [
      "Both vertical and horizontal velocity components are zero",
      "Vertical velocity vy is zero, while horizontal velocity vx = v0 cos(θ)",
      "Acceleration is zero",
      "Vertical velocity vy = v0 sin(θ)"
    ],
    correctAnswer: 1,
    explanation: "At the maximum height, vertical velocity momentarily reaches zero (vy = 0), while horizontal velocity remains constant at vx = v0 cos(θ).",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "A 5 kg block rests on a horizontal frictionless surface. A horizontal force of 20 N is applied to it. What is the acceleration of the block?",
    options: ["2 m/s²", "4 m/s²", "10 m/s²", "100 m/s²"],
    correctAnswer: 1, // 4 m/s²
    explanation: "Newton's second law: F = ma => a = F / m = 20 N / 5 kg = 4 m/s².",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "What work is done by a constant force of 15 N pushing an object through a displacement of 4 meters in the direction of the force?",
    options: ["30 Joules", "60 Joules", "3.75 Joules", "19 Joules"],
    correctAnswer: 1, // 60 Joules
    explanation: "Work W = F * d * cos(0°) = 15 N * 4 m * 1 = 60 J.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "According to the work-energy theorem, the net work done by all forces acting on a particle equals the change in its:",
    options: ["Kinetic energy", "Potential energy", "Total momentum", "Rest mass"],
    correctAnswer: 0,
    explanation: "W_net = ΔK = ½m(v_f² - v_i²). Net work directly equals the change in kinetic energy.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "A uniform circular motion at constant speed v in a circle of radius r has a centripetal acceleration directed toward:",
    options: [
      "The center of the circular path",
      "Tangent to the circle in the direction of motion",
      "Radially outward from the circle",
      "Opposite to the velocity vector"
    ],
    correctAnswer: 0,
    explanation: "Centripetal acceleration ac = v²/r is directed radially inward toward the instantaneous center of curvature.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "In an isolated system where only conservative forces do work, the total mechanical energy (E = K + U) is:",
    options: ["Constantly increasing", "Conserved and remains constant", "Zero at all times", "Equal to net friction"],
    correctAnswer: 1,
    explanation: "The law of conservation of mechanical energy states that ΔE = ΔK + ΔU = 0 in the absence of non-conservative forces.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "The rotational analog of linear mass (inertia) in rotational dynamics is:",
    options: ["Torque", "Moment of inertia (rotational inertia)", "Angular velocity", "Centrifugal force"],
    correctAnswer: 1,
    explanation: "Moment of inertia (I = ∑mr²) measures resistance to changes in rotational speed, analogous to mass m in linear motion.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "A torque τ = 40 N·m acts on a rigid body with moment of inertia I = 8 kg·m². What is the angular acceleration α?",
    options: ["5 rad/s²", "0.2 rad/s²", "320 rad/s²", "48 rad/s²"],
    correctAnswer: 0, // 5 rad/s²
    explanation: "τ = I * α => α = τ / I = 40 N·m / 8 kg·m² = 5 rad/s².",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "An elastic collision between two isolated bodies is characterized by the conservation of:",
    options: [
      "Both total linear momentum and total kinetic energy",
      "Linear momentum only, while kinetic energy is transformed into heat",
      "Kinetic energy only, but not linear momentum",
      "Mechanical potential energy only"
    ],
    correctAnswer: 0,
    explanation: "In an ideal elastic collision, both total linear momentum and total mechanical kinetic energy are conserved.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "Newton's Universal Law of Gravitation states that the gravitational attractive force between two point masses m1 and m2 separated by distance r is proportional to:",
    options: ["r²", "1 / r²", "1 / r", "r"],
    correctAnswer: 1, // 1 / r²
    explanation: "F_g = G * (m1 * m2) / r², exhibiting an inverse-square relationship with distance.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "What power is expended when a machine lifts a 200 kg mass vertically through a height of 10 meters in 5 seconds? (Take g = 9.8 m/s²)",
    options: ["1960 W", "3920 W", "980 W", "490 W"],
    correctAnswer: 1, // 3920 W
    explanation: "Work W = mgh = 200 × 9.8 × 10 = 19,600 J. Power P = W / t = 19,600 / 5 = 3920 W.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "When a skater pulls in her arms while spinning, her spin rate increases. This phenomenon is a direct consequence of:",
    options: [
      "Conservation of angular momentum",
      "Conservation of linear kinetic energy",
      "External gravitational torque",
      "Increase in moment of inertia"
    ],
    correctAnswer: 0,
    explanation: "Pulling arms inward reduces moment of inertia I; since L = I * ω remains constant with zero external torque, angular velocity ω increases.",
    points: 1
  },
  {
    examId: "exam_68",
    grade: "Grade11",
    subject: "Physics",
    semester: "Semester1",
    examType: "Final",
    question: "A spring with spring constant k = 200 N/m is compressed by 0.1 m from its equilibrium length. What elastic potential energy is stored in the spring?",
    options: ["1 Joule", "2 Joules", "10 Joules", "20 Joules"],
    correctAnswer: 0, // 1 Joule
    explanation: "U_s = ½ * k * x² = 0.5 * 200 * (0.1)² = 100 * 0.01 = 1 J.",
    points: 1
  }
];

const grade11MathQuestions = [
  // --- Grade 11 Mathematics (exam_67) ---
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the domain of the real-valued rational function f(x) = (2x + 1) / (x² - 16)?",
    options: [
      "All real numbers except x = 4 and x = -4",
      "All real numbers except x = 16",
      "x > 4",
      "All real numbers"
    ],
    correctAnswer: 0,
    explanation: "The denominator x² - 16 = (x - 4)(x + 4) cannot be zero. Thus, domain is ℝ \\ {-4, 4}.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "If f(x) = 2x - 3 and g(x) = x² + 1, what is the composite value (g ∘ f)(2)?",
    options: ["2", "5", "10", "1"],
    correctAnswer: 0, // 2
    explanation: "f(2) = 2(2) - 3 = 1. Then g(f(2)) = g(1) = 1² + 1 = 2.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the inverse function f⁻¹(x) of the one-to-one function f(x) = 3x - 5?",
    options: [
      "f⁻¹(x) = (x + 5) / 3",
      "f⁻¹(x) = (x - 5) / 3",
      "f⁻¹(x) = 3x + 5",
      "f⁻¹(x) = (x + 3) / 5"
    ],
    correctAnswer: 0,
    explanation: "Set y = 3x - 5 => 3x = y + 5 => x = (y + 5)/3. Swap variables: f⁻¹(x) = (x + 5)/3.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Find the distance between the two points A(2, -3) and B(6, 0) in the Cartesian plane.",
    options: ["5 units", "7 units", "√7 units", "25 units"],
    correctAnswer: 0, // 5 units
    explanation: "d = √[(6 - 2)² + (0 - (-3))²] = √[4² + 3²] = √[16 + 9] = √25 = 5 units.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the center and radius of the circle defined by the equation (x - 3)² + (y + 2)² = 49?",
    options: [
      "Center (3, -2), Radius = 7",
      "Center (-3, 2), Radius = 7",
      "Center (3, -2), Radius = 49",
      "Center (-3, 2), Radius = 49"
    ],
    correctAnswer: 0,
    explanation: "Standard circle form is (x - h)² + (y - k)² = r². Here h = 3, k = -2, r² = 49 => r = 7.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "If sin(θ) = 3/5 and θ is in the first quadrant (0 < θ < π/2), what is the value of cos(θ)?",
    options: ["4/5", "3/4", "5/4", "1/5"],
    correctAnswer: 0, // 4/5
    explanation: "cos²(θ) = 1 - sin²(θ) = 1 - 9/25 = 16/25 => cos(θ) = 4/5 in Quadrant I.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the fundamental period of the trigonometric function f(x) = sin(4x)?",
    options: ["π / 2", "π", "2π", "4π"],
    correctAnswer: 0, // π / 2
    explanation: "The period of sin(bx) is 2π / |b|. For b = 4, Period = 2π / 4 = π / 2.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following lines is perpendicular to the line with equation y = 2x + 7?",
    options: [
      "y = -(1/2)x + 3",
      "y = 2x - 5",
      "y = (1/2)x + 1",
      "y = -2x + 7"
    ],
    correctAnswer: 0,
    explanation: "Two non-vertical lines are perpendicular if their slopes multiply to -1: m1 * m2 = -1 => 2 * (-1/2) = -1.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Solve the rational equation: (3 / x) + (2 / (x - 1)) = 0",
    options: ["x = 3/5", "x = 5/3", "x = -3/5", "x = 1/2"],
    correctAnswer: 0, // x = 3/5
    explanation: "3(x - 1) + 2x = 0 => 3x - 3 + 2x = 0 => 5x = 3 => x = 3/5.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Using trigonometric double-angle formulas, cos(2θ) is identically equal to:",
    options: [
      "cos²(θ) - sin²(θ)",
      "2 sin(θ) cos(θ)",
      "1 + 2 sin²(θ)",
      "cos²(θ) + sin²(θ)"
    ],
    correctAnswer: 0,
    explanation: "cos(2θ) = cos²(θ) - sin²(θ) = 2cos²(θ) - 1 = 1 - 2sin²(θ).",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the amplitude of the sinusoidal wave function y = -5 cos(3x - π)?",
    options: ["5", "-5", "3", "π"],
    correctAnswer: 0, // 5
    explanation: "Amplitude is defined as the absolute magnitude |A|: |-5| = 5.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "The vertices of a triangle are located at (0, 0), (4, 0), and (0, 6). What is the area of this triangle?",
    options: ["12 square units", "24 square units", "10 square units", "14 square units"],
    correctAnswer: 0, // 12
    explanation: "Area = ½ × base × height = ½ × 4 × 6 = 12 square units.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following functions is an ODD function satisfying f(-x) = -f(x)?",
    options: ["f(x) = x³", "f(x) = x² + 4", "f(x) = cos(x)", "f(x) = |x|"],
    correctAnswer: 0, // f(x) = x³
    explanation: "(-x)³ = -x³ = -f(x), which satisfies the definition of an odd function symmetric about the origin.",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What are the coordinates of the midpoint of the segment joining (-4, 8) and (2, -2)?",
    options: ["(-1, 3)", "(-2, 6)", "(3, -1)", "(-1, 5)"],
    correctAnswer: 0, // (-1, 3)
    explanation: "Midpoint = ((-4 + 2)/2, (8 + (-2))/2) = (-2/2, 6/2) = (-1, 3).",
    points: 1
  },
  {
    examId: "exam_67",
    grade: "Grade11",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Simplify the trigonometric expression: tan(x) * cos(x)",
    options: ["sin(x)", "sec(x)", "cot(x)", "1"],
    correctAnswer: 0, // sin(x)
    explanation: "tan(x) = sin(x)/cos(x). Multiplying by cos(x) gives [sin(x)/cos(x)] * cos(x) = sin(x).",
    points: 1
  }
];

module.exports = { grade11PhysQuestions, grade11MathQuestions };
