const fs = require('fs');
const path = require('path');

const requiredFiles = [
    'package.json',
    'vite.config.js',
    '.env',
    'node_modules',
    'src',
    'src/components',
    'src/pages',
    'src/services',
    'src/hooks',
    'src/types'
];

console.log('Verificando estrutura do projeto...\n');

requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    const exists = fs.existsSync(fullPath);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
});
