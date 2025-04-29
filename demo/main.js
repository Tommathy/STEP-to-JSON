import { dirname, join } from 'path';
import { readFileSync, statSync, writeFileSync } from 'fs';

import { StepToJsonParser } from '../src/parser.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = [
    { // 35 MB
        stdFilePath: join(__dirname, '/raspberry_pi_5.stp'),
        jsonFilePath: join(__dirname, './raspberry_pi_5.json'),
    },
    { // 322 MB
        stdFilePath: join(__dirname, '/38339-2.stp'),
        jsonFilePath: join(__dirname, './38339-2.json'),
    },
    { // 67 MB
        stdFilePath: join(__dirname, '/38401.stp'),
        jsonFilePath: join(__dirname, './38401.json'),
    },
    { // 67 MB
        stdFilePath: join(__dirname, '/38401-LC.stp'),
        jsonFilePath: join(__dirname, './38401-LC.json'),
    },
    { // 110 MB
        stdFilePath: join(__dirname, '/38547.stp'),
        jsonFilePath: join(__dirname, './38547.json'),
    }
]

files.forEach(file => {
    const stdFilePath = file.stdFilePath;
    const jsonFilePath = file.jsonFilePath;

    const stepFile = readFileSync(stdFilePath, { encoding: 'utf8' });
    const stats = statSync(stdFilePath);
    console.log(`File path: ${stdFilePath}`);
    console.log(`File size: ${Math.floor(stats.size / 1024 / 1024)} MB`);

    console.time('preprocessor');
    const parser = new StepToJsonParser(stepFile);
    console.timeEnd('preprocessor');

    console.time('parse');
    const parsedData = parser.parse();
    console.timeEnd('parse');

    writeFileSync(jsonFilePath, JSON.stringify(parsedData, null, 2));
});
