import { dirname, join } from 'path';

import { StepToJsonParser } from './parser.ts';
import { assert, describe, it } from 'vitest';
import { fileURLToPath } from 'url';
import { createReadStream, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stepFilePath = join(__dirname, '../test', 'data', 'Workbench.stp');
const stepFile = createReadStream(stepFilePath, { encoding: 'utf8' });
const parser = new StepToJsonParser(stepFile);

describe('Testing parser', () => {
    describe('Testing function to parse', () => {
        it('Parsed STEP-file should match expected result', async () => {
            const actualResult = await parser.parse();

            const fileContent = readFileSync(
                join(__dirname, '../test', 'data', 'Workbench.json'),
            );
            const expectedResult = JSON.parse(fileContent.toString());
            assert.deepEqual(
                actualResult,
                expectedResult,
                "Parsed structure doesn't match the expected structure",
            );
        });
    });
});
