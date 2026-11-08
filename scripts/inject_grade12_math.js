// Grade 12 Mathematics Final Examination (exam_91)
// Authentic curriculum questions strictly aligned with Ethiopian Grade 12 Mathematics Syllabus:
// Sequences and series, mathematical induction, limits & continuity, differential calculus & applications

const grade12MathQuestions = [
  // --- Section 1: True / False ---
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "An infinite geometric series with common ratio r converges to a finite sum if and only if |r| < 1.",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "For an infinite geometric series, the sum S = a / (1 - r) exists finitely if and only if the absolute value of r is strictly less than 1.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "If a function f(x) is continuous at x = c, then f(x) is necessarily differentiable at x = c.",
    options: ["True", "False"],
    correctAnswer: 1, // False
    explanation: "Differentiability implies continuity, but continuity does NOT imply differentiability (e.g., f(x) = |x| at x = 0 is continuous but not differentiable).",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "The limit lim (x -> 0) [sin(x) / x] is equal to 1.",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "By the squeeze theorem or L'Hôpital's Rule, lim (x -> 0) sin(x)/x = cos(0)/1 = 1.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "The derivative of the natural exponential function f(x) = e^(3x) is f'(x) = 3e^(3x).",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "Applying the chain rule: d/dx [e^(u)] = e^(u) * du/dx. For u = 3x, du/dx = 3, so f'(x) = 3e^(3x).",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "A sequence {a_n} is bounded if there exist real numbers m and M such that m ≤ a_n ≤ M for all positive integers n.",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "A sequence is bounded if it is bounded both from below (lower bound m) and above (upper bound M).",
    points: 1
  },

  // --- Section 2: Multiple Choice Questions ---
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the 10th term of an arithmetic progression whose first term is a1 = 5 and common difference d = 3?",
    options: ["29", "32", "35", "38"],
    correctAnswer: 1, // 32
    explanation: "a_n = a1 + (n - 1)d. a_10 = 5 + (10 - 1)×3 = 5 + 27 = 32.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the sum of the first 20 terms of the arithmetic series: 2 + 5 + 8 + 11 + ...?",
    options: ["590", "610", "630", "650"],
    correctAnswer: 1, // 610
    explanation: "S_n = (n / 2)[2a + (n - 1)d]. S_20 = (20 / 2)[2(2) + (19)(3)] = 10[4 + 57] = 10 × 61 = 610.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Find the sum of the infinite geometric series: 12 + 6 + 3 + 3/2 + ...",
    options: ["18", "24", "30", "36"],
    correctAnswer: 1, // 24
    explanation: "First term a = 12, common ratio r = 6/12 = 1/2. Sum S_inf = a / (1 - r) = 12 / (1 - 0.5) = 12 / 0.5 = 24.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Evaluate the limit: lim (x -> 3) [(x² - 9) / (x - 3)]",
    options: ["0", "3", "6", "Does not exist"],
    correctAnswer: 2, // 6
    explanation: "Factor the numerator: (x - 3)(x + 3) / (x - 3) = x + 3 for x ≠ 3. lim (x -> 3) (x + 3) = 3 + 3 = 6.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Evaluate the limit at infinity: lim (x -> ∞) [(4x³ + 2x - 5) / (2x³ - 7x² + 1)]",
    options: ["0", "2", "4", "∞"],
    correctAnswer: 1, // 2
    explanation: "Divide numerator and denominator by highest power x³: lim (4 + 2/x² - 5/x³) / (2 - 7/x + 1/x³) = 4 / 2 = 2.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the derivative of f(x) = 3x⁴ - 5x² + 7x - 9?",
    options: [
      "12x³ - 10x + 7",
      "12x³ - 5x + 7",
      "7x³ - 10x + 7",
      "12x⁴ - 10x² + 7"
    ],
    correctAnswer: 0,
    explanation: "Using the power rule: d/dx(3x⁴) = 12x³, d/dx(-5x²) = -10x, d/dx(7x) = 7, d/dx(-9) = 0.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Find the slope of the tangent line to the curve y = x³ - 2x + 4 at the point where x = 2.",
    options: ["8", "10", "12", "14"],
    correctAnswer: 1, // 10
    explanation: "dy/dx = 3x² - 2. At x = 2, slope m = 3(2)² - 2 = 3(4) - 2 = 12 - 2 = 10.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the equation of the tangent line to the parabola y = x² at the point (2, 4)?",
    options: [
      "y = 4x - 4",
      "y = 2x",
      "y = 4x + 4",
      "y = x + 2"
    ],
    correctAnswer: 0,
    explanation: "dy/dx = 2x. At x = 2, m = 4. Point-slope equation: y - 4 = 4(x - 2) => y = 4x - 8 + 4 = 4x - 4.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "If f(x) = (2x + 1) / (x - 3), what is f'(x)?",
    options: [
      "-7 / (x - 3)²",
      "7 / (x - 3)²",
      "-5 / (x - 3)²",
      "2 / (x - 3)²"
    ],
    correctAnswer: 0,
    explanation: "Quotient rule: [u'v - uv'] / v² = [2(x - 3) - (2x + 1)(1)] / (x - 3)² = (2x - 6 - 2x - 1) / (x - 3)² = -7 / (x - 3)².",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Find the derivative of g(x) = (3x² - 4)⁵ with respect to x.",
    options: [
      "30x(3x² - 4)⁴",
      "5(3x² - 4)⁴",
      "15x(3x² - 4)⁴",
      "30x²(3x² - 4)⁴"
    ],
    correctAnswer: 0,
    explanation: "Chain rule: g'(x) = 5(3x² - 4)⁴ × d/dx(3x² - 4) = 5(3x² - 4)⁴ × (6x) = 30x(3x² - 4)⁴.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "At what critical value of x does the quadratic function f(x) = 2x² - 8x + 5 attain its minimum value?",
    options: ["x = 1", "x = 2", "x = 4", "x = -2"],
    correctAnswer: 1, // x = 2
    explanation: "Set f'(x) = 0: 4x - 8 = 0 => 4x = 8 => x = 2. Since f''(x) = 4 > 0, it is a local minimum.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "If the position of a moving particle along a straight line is given by s(t) = 2t³ - 9t² + 12t (in meters), at what times t is the particle momentarily at rest?",
    options: [
      "t = 1 s and t = 2 s",
      "t = 0 s and t = 3 s",
      "t = 2 s and t = 3 s",
      "t = 1.5 s only"
    ],
    correctAnswer: 0,
    explanation: "Velocity v(t) = s'(t) = 6t² - 18t + 12. At rest: 6(t² - 3t + 2) = 0 => 6(t - 1)(t - 2) = 0 => t = 1 s or t = 2 s.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following functions has a vertical asymptote at x = 2?",
    options: [
      "f(x) = (x - 2) / (x² - 4)",
      "f(x) = 1 / (x - 2)",
      "f(x) = (x² - 4) / (x - 2)",
      "f(x) = sin(x - 2)"
    ],
    correctAnswer: 1,
    explanation: "For f(x) = 1/(x - 2), as x -> 2, the denominator approaches 0 while the numerator is nonzero, creating a vertical asymptote.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the common ratio r of a geometric sequence if the first term is a1 = 3 and the fourth term is a4 = 24?",
    options: ["2", "3", "4", "8"],
    correctAnswer: 0, // 2
    explanation: "a4 = a1 * r³ => 24 = 3 * r³ => r³ = 8 => r = 2.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the value of the limit: lim (x -> 0) [(e^(2x) - 1) / x]?",
    options: ["0", "1", "2", "e"],
    correctAnswer: 2, // 2
    explanation: "Indeterminate form 0/0: by L'Hôpital's Rule: lim (x -> 0) [2e^(2x) / 1] = 2(1) / 1 = 2.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "If y = ln(x² + 1), what is the first derivative dy/dx?",
    options: [
      "2x / (x² + 1)",
      "1 / (x² + 1)",
      "x / (x² + 1)",
      "2 / (x² + 1)"
    ],
    correctAnswer: 0,
    explanation: "d/dx [ln(u)] = (1/u) * u'. Here u = x² + 1, so u' = 2x, yielding dy/dx = 2x / (x² + 1).",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "In the principle of mathematical induction, what are the two essential steps required to prove a proposition P(n) for all integers n ≥ 1?",
    options: [
      "Base step (prove P(1)) and Inductive step (prove P(k) => P(k+1))",
      "Trial step and conclusion step",
      "Derivative step and integral step",
      "Contrapositive step and contradiction step"
    ],
    correctAnswer: 0,
    explanation: "Mathematical induction requires verifying the base case P(1) is true, then proving that if P(k) holds, P(k+1) must also hold.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "If f(x) = sin(2x), what is f''(x) (the second derivative)?",
    options: [
      "-4 sin(2x)",
      "4 cos(2x)",
      "-2 cos(2x)",
      "-4 cos(2x)"
    ],
    correctAnswer: 0,
    explanation: "f'(x) = 2 cos(2x). f''(x) = 2(-2 sin(2x)) = -4 sin(2x).",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "Find the sum: ∑ (k=1 to 50) of k [the sum of the first 50 positive integers].",
    options: ["1225", "1275", "1300", "2550"],
    correctAnswer: 1, // 1275
    explanation: "Formula: n(n + 1) / 2 = 50(51) / 2 = 25 × 51 = 1275.",
    points: 1
  },
  {
    examId: "exam_91",
    grade: "Grade12",
    subject: "Mathematics",
    semester: "Semester1",
    examType: "Final",
    question: "What is the normal line slope to the curve y = 3x² - 5 at the point (1, -2)?",
    options: ["6", "-6", "1/6", "-1/6"],
    correctAnswer: 3, // -1/6
    explanation: "dy/dx = 6x. At x = 1, tangent slope m = 6. Normal line slope is the negative reciprocal: -1/m = -1/6.",
    points: 1
  }
];

module.exports = { grade12MathQuestions };
