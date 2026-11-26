import json
import os

pdf_path = 'exams/Grade10/Semester1/Mid1/Mathematics.pdf'
pdf_size = os.path.getsize(pdf_path)

db_path = 'data/db.json'
with open(db_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

# 1. Update exam_22 metadata
exam_found = False
for e in db.get('exams', []):
    if e.get('id') == 'exam_22':
        e['fileSize'] = pdf_size
        e['title'] = 'Grade 10 Mathematics Semester 1 Mid 1 (Test 1)'
        e['year'] = '2018 E.C. (2024)'
        e['pages'] = 2
        exam_found = True
        print(f"Updated exam_22 metadata, new fileSize: {pdf_size} bytes")
        break

if not exam_found:
    print("Warning: exam_22 not found in exams array!")

# 2. 10 authentic questions transcribed from the real school paper
authentic_questions = [
  {
    "id": "q_g10_math_m1_01",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "Which one of the following is not true?",
    "options": [
      "The product of two polynomial function is always a polynomial",
      "The difference of two polynomial function is always a polynomial",
      "The sum of two polynomial function is always a polynomial",
      "The quotient of two polynomial function is always a polynomial"
    ],
    "correctAnswer": 3,
    "explanation": "Polynomials are closed under addition, subtraction, and multiplication. The quotient of two polynomials is generally a rational function, which is not a polynomial unless the denominator divides the numerator evenly (e.g. x / x^2 = 1/x is not a polynomial). Therefore, statement D is not true.",
    "points": 2
  },
  {
    "id": "q_g10_math_m1_02",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "Which of the following is true about f(x) = 6x^2 - x - 1?",
    "options": [
      "The function f(x) = 6x^2 - x - 1 has no x-intercepts",
      "f has y-intercept of (0, 1)",
      "The graph of f is an upward parabola",
      "The vertex of is (12, -24)"
    ],
    "correctAnswer": 2,
    "explanation": "For a quadratic function f(x) = ax^2 + bx + c, when the leading coefficient a > 0, the graph is an upward parabola. Here a = 6 > 0, so the graph of f is an upward parabola. Furthermore, its discriminant Δ = (-1)^2 - 4(6)(-1) = 25 > 0, meaning it has two distinct real x-intercepts.",
    "points": 2
  },
  {
    "id": "q_g10_math_m1_03",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "When the function f(x) = 2x^3 + 4x^2 - 5x + 2 is divided by x + 1, the remainder is ----",
    "options": [
      "5",
      "9",
      "12",
      "16"
    ],
    "correctAnswer": 1,
    "explanation": "By the Remainder Theorem, dividing f(x) by (x - c) yields remainder R = f(c). With c = -1: f(-1) = 2(-1)^3 + 4(-1)^2 - 5(-1) + 2 = -2 + 4 + 5 + 2 = 9.",
    "points": 2
  },
  {
    "id": "q_g10_math_m1_04",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "When kx^2 - 5x + 6 is divided by (x - 1), the remainder is 4 what is the value of k?",
    "options": [
      "3",
      "5",
      "8",
      "11"
    ],
    "correctAnswer": 0,
    "explanation": "By the Remainder Theorem, dividing by (x - 1) gives remainder f(1) = k(1)^2 - 5(1) + 6 = k + 1. Since the given remainder is 4, k + 1 = 4 => k = 3.",
    "points": 2
  },
  {
    "id": "q_g10_math_m1_05",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "If (x + 2) and (x - 2) are the factors of the polynomial 3x^3 + mx^2 - Nx + 20 then find the value of M",
    "options": [
      "-5",
      "12",
      "4",
      "3"
    ],
    "correctAnswer": 0,
    "explanation": "Let P(x) = 3x^3 + mx^2 - Nx + 20. Since (x - 2) is a factor: P(2) = 3(8) + 4m - 2N + 20 = 4m - 2N + 44 = 0 => 2m - N = -22. Since (x + 2) is a factor: P(-2) = 3(-8) + 4m + 2N + 20 = 4m + 2N - 4 = 0 => 2m + N = 2. Adding the two equations: 4m = -20 => m = -5.",
    "points": 2
  },
  {
    "id": "q_g10_math_m1_06",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "In the above question number 5 what is the value of N",
    "options": [
      "3",
      "12",
      "16",
      "24"
    ],
    "correctAnswer": 1,
    "explanation": "From 2m + N = 2 and m = -5: 2(-5) + N = 2 => -10 + N = 2 => N = 12.",
    "points": 2
  },
  {
    "id": "q_g10_math_m1_07",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "The polynomial x^3 + Ax^2 + Bx - 12 is divisible by x + 3 and gives remainder (-6) when divided by x + 1 what is the value of A?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": 1,
    "explanation": "Let P(x) = x^3 + Ax^2 + Bx - 12. Divisible by (x + 3) implies P(-3) = 0: (-27) + 9A - 3B - 12 = 0 => 9A - 3B = 39 => 3A - B = 13. Remainder -6 when divided by (x + 1) implies P(-1) = -6: (-1) + A - B - 12 = -6 => A - B - 13 = -6 => A - B = 7. Subtracting (A - B = 7) from (3A - B = 13) yields 2A = 6 => A = 3.",
    "points": 2
  },
  {
    "id": "q_g10_math_m1_08",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "What is the value of B in the above question?",
    "options": [
      "3",
      "4",
      "-4",
      "5"
    ],
    "correctAnswer": 2,
    "explanation": "From A - B = 7 and A = 3: 3 - B = 7 => B = 3 - 7 = -4.",
    "points": 2
  },
  {
    "id": "q_g10_math_m1_09",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "If 2x + 1 is the factor of 2x^2 + 7x + 3 then what is the other factor",
    "options": [
      "x + 2",
      "x - 2",
      "x - 3",
      "x + 3"
    ],
    "correctAnswer": 3,
    "explanation": "Factoring 2x^2 + 7x + 3: 2x^2 + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3). Since (2x + 1) is already a factor, the other factor is (x + 3).",
    "points": 2
  },
  {
    "id": "q_g10_math_m1_10",
    "examId": "exam_22",
    "grade": "Grade10",
    "subject": "Mathematics",
    "semester": "Semester1",
    "examType": "Mid1",
    "question": "What is the minimum values of f(x) = 2x^2 + 7x + 3",
    "options": [
      "(-7/4, -25/8)",
      "(-7, -25/4)",
      "(-1.75)",
      "-3.125"
    ],
    "correctAnswer": 3,
    "explanation": "For the quadratic function f(x) = 2x^2 + 7x + 3, the vertex x-coordinate is x = -b/(2a) = -7/(2*2) = -7/4 = -1.75. The minimum value of f(x) is its y-value at the vertex: f(-7/4) = 2(-7/4)^2 + 7(-7/4) + 3 = 49/8 - 98/8 + 24/8 = -25/8 = -3.125 (Option D). Option A gives the coordinates of the vertex (-7/4, -25/8).",
    "points": 2
  }
]

# 3. Filter out existing questions for exam_22 and add the authentic ones
existing_questions = db.get('questions', [])
filtered_questions = [q for q in existing_questions if q.get('examId') != 'exam_22']
print(f"Removed {len(existing_questions) - len(filtered_questions)} old synthetic questions.")

filtered_questions.extend(authentic_questions)
db['questions'] = filtered_questions

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

print(f"Successfully wrote {len(authentic_questions)} authentic questions for exam_22 into {db_path}!")
