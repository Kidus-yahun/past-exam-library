// scripts/remove_telegram.js
const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, '..', 'script.js');
let code = fs.readFileSync(scriptPath, 'utf8');

// Replace telegramBtn definition and usages in header
code = code.replace(/const telegramBtn = `[\s\S]*?`;\s*/, 'const telegramBtn = "";\n');
code = code.replace(/\$\{telegramBtn\}\s*/g, '');

fs.writeFileSync(scriptPath, code, 'utf8');
console.log('Removed telegram button from header!');
