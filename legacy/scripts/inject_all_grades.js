const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Import question sets
const g10ChemMod = require('./inject_grade10_chem');
const g10BioMod = require('./inject_grade10_bio');
const g10PhysMod = require('./inject_grade10_phys');
const g11ChemMod = require('./inject_grade11_chem');
const g11BioMod = require('./inject_grade11_bio');
const g11EngMod = require('./inject_grade11_eng');
const g12ChemMod = require('./inject_grade12_chem');
const g12PhysMod = require('./inject_grade12_phys');

const extractArray = (mod) => {
  if (Array.isArray(mod)) return mod;
  if (typeof mod === 'object' && mod !== null) {
    const keys = Object.keys(mod);
    if (keys.length > 0 && Array.isArray(mod[keys[0]])) {
      return mod[keys[0]];
    }
  }
  return [];
};

const g10Chem = extractArray(g10ChemMod);
const g10Bio = extractArray(g10BioMod);
const g10Phys = extractArray(g10PhysMod);
const g11Chem = extractArray(g11ChemMod);
const g11Bio = extractArray(g11BioMod);
const g11Eng = extractArray(g11EngMod);
const g12Chem = extractArray(g12ChemMod);
const g12Phys = extractArray(g12PhysMod);

console.log('Existing questions in db:', db.questions.length);

const allNew = [
  ...g10Chem,
  ...g10Bio,
  ...g10Phys,
  ...g11Chem,
  ...g11Bio,
  ...g11Eng,
  ...g12Chem,
  ...g12Phys
];

console.log('Total new authentic questions to inject:', allNew.length);

// Assign clean sequential IDs
let currentMaxId = 0;
db.questions.forEach(q => {
  const num = parseInt(q.id.replace('q_', ''), 10);
  if (!isNaN(num) && num > currentMaxId) currentMaxId = num;
});

console.log('Starting from id q_' + (currentMaxId + 1));

const formattedQuestions = allNew.map((q, idx) => {
  const newId = `q_${currentMaxId + idx + 1}`;
  return {
    id: newId,
    ...q
  };
});

// Remove any existing questions for these exact examIds to avoid duplicates if re-run
const targetExamIds = new Set(allNew.map(q => q.examId));
db.questions = db.questions.filter(q => !targetExamIds.has(q.examId));

// Append new questions
db.questions.push(...formattedQuestions);

// Write updated db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log('Successfully written db.json!');
console.log('New total questions count:', db.questions.length);

// Summary by grade
const countByGrade = {};
const countByGradeSubject = {};

db.questions.forEach(q => {
  countByGrade[q.grade] = (countByGrade[q.grade] || 0) + 1;
  const key = `${q.grade} - ${q.subject}`;
  countByGradeSubject[key] = (countByGradeSubject[key] || 0) + 1;
});

console.log('\n--- QUESTIONS SUMMARY BY GRADE ---');
console.table(countByGrade);

console.log('\n--- QUESTIONS SUMMARY BY GRADE & SUBJECT ---');
console.table(countByGradeSubject);
