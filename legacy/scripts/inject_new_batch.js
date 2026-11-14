const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Import newly created sets
const { grade12BioQuestions } = require('./inject_grade12_bio');
const { grade12AgriQuestions } = require('./inject_grade12_agri');
const { grade12ItQuestions } = require('./inject_grade12_it');
const { grade12AptitudeQuestions } = require('./inject_grade12_aptitude');
const { grade12MathQuestions } = require('./inject_grade12_math');
const { grade12EngQuestions } = require('./inject_grade12_eng');

const { grade11PhysQuestions, grade11MathQuestions } = require('./inject_grade11_math_phys');
const { grade11AgriQuestions, grade11ItQuestions } = require('./inject_grade11_agri_it');

const { grade10EngAdditions, grade10ItQuestions, grade10CitizenshipQuestions } = require('./inject_grade10_additions');

const allNewQuestions = [
  ...grade12BioQuestions,
  ...grade12AgriQuestions,
  ...grade12ItQuestions,
  ...grade12AptitudeQuestions,
  ...grade12MathQuestions,
  ...grade12EngQuestions,
  ...grade11PhysQuestions,
  ...grade11MathQuestions,
  ...grade11AgriQuestions,
  ...grade11ItQuestions,
  ...grade10EngAdditions,
  ...grade10ItQuestions,
  ...grade10CitizenshipQuestions
];

console.log('--- PRE-INJECTION STATUS ---');
console.log('Total questions currently in db.json:', db.questions.length);
console.log('New questions to inject:', allNewQuestions.length);

// Generate sequential IDs
let currentMax = 0;
db.questions.forEach(q => {
  const num = parseInt(q.id.replace('q_', ''), 10);
  if (!isNaN(num) && num > currentMax) currentMax = num;
});

const newFormatted = allNewQuestions.map((q, idx) => {
  return {
    id: `q_${currentMax + idx + 1}`,
    ...q
  };
});

// Append new questions
db.questions.push(...newFormatted);

// Write back to db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log('\n--- POST-INJECTION STATUS ---');
console.log('Successfully saved to data/db.json!');
console.log('Total questions now in db.json:', db.questions.length);

// Summary by grade and subject
const summary = {};
db.questions.forEach(q => {
  const key = `${q.grade} - ${q.subject}`;
  summary[key] = (summary[key] || 0) + 1;
});

console.log('\n--- QUESTIONS PER SUBJECT ---');
console.table(summary);
