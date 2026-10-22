/* Regenerates api/data/quizzes.json (server-side answer key) from js/data.js.
   Run after editing quiz questions:  node tools/build-quizzes.cjs */
const fs = require('fs'), path = require('path');
global.window = {};
require(path.join(__dirname, '../js/data.js'));
const out = {};
for (const c of window.TAA.courses) {
  out[c.id] = { title: c.title, ceus: c.ceus, ceuTypes: c.ceuTypes, questions: c.quiz.map(q => ({ answer: q.answer, explain: q.explain })) };
}
fs.mkdirSync(path.join(__dirname, '../api/data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../api/data/quizzes.json'), JSON.stringify(out, null, 1));
console.log('quizzes.json written for', Object.keys(out).length, 'courses');
