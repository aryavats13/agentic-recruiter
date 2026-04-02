const { generateJSON } = require('./utils/geminiClient');

generateJSON('Return this exact JSON: {"test": "working"}')
  .then(r => console.log('✅ WORKS:', r))
  .catch(e => console.error('❌', e.message));
  