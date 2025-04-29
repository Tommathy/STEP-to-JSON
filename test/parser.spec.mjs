import { dirname, join } from 'path'

import { StepToJsonParser } from '../src/parser.js'
import { assert } from 'chai'
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stepFile = readFileSync(join(__dirname, '/Workbench.stp'), { encoding: 'utf8' });
const parser = new StepToJsonParser(stepFile);

describe('Testing parser', () => {
    describe('Testing function to parse', () => {
        it('Parsed STEP-file should match expected result', () => {
            const actualResult = parser.parse();

            const fileContent = readFileSync(join(__dirname, 'Workbench.json'));
            const expectedResult = JSON.parse(fileContent);
            assert.deepEqual(
                actualResult,
                expectedResult,
                "Parsed structure doesn't match the expected structure"
            );
        });
    });
});
