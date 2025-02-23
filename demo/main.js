import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { StepToJsonParser } from '../src/parser.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Constants
// const stdFilePath = join(__dirname, '/raspberry_pi_5.stp');
// const jsonFilePath = join(__dirname, "./raspberry_pi_5.json")

// const stdFilePath = join(__dirname, '/38401.step');
// const jsonFilePath = join(__dirname, "./38401.json")

const stdFilePath = join(__dirname, '/38547.step');
const jsonFilePath = join(__dirname, './38547.json');

const stepFile = readFileSync(stdFilePath, { encoding: 'utf8' });

console.time('preprocessor');
const parser = new StepToJsonParser(stepFile);
console.timeEnd('preprocessor');

console.time('parse');
const parsedData = parser.parse();
console.timeEnd('parse');

writeFileSync(jsonFilePath, JSON.stringify(parsedData, null, 2));
