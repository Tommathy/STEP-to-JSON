import { dirname, join } from 'path';
import { statSync, writeFileSync, createReadStream } from 'fs';

import { StepToJsonParser } from '../src/parser.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = [
    {
        stdFilePath: join(__dirname, '../test/data', '400115.STEP'),
        jsonFilePath: join(__dirname, '../test/data', '400115.json')
    }
];

for (const file of files) {
    const stdFilePath = file.stdFilePath;
    const jsonFilePath = file.jsonFilePath;

    const stepFile = createReadStream(stdFilePath, { encoding: 'utf8' });
    const stats = statSync(stdFilePath);
    console.log(`File path: ${stdFilePath}`);
    console.log(`File size: ${Math.floor(stats.size / 1024 / 1024)} MB`);

    console.time('preprocessor');
    const parser = new StepToJsonParser(stepFile);
    console.timeEnd('preprocessor');

    console.time('parse');
    const parsedData = await parser.parse();
    console.timeEnd('parse');

    writeFileSync(jsonFilePath, JSON.stringify(parsedData, null, 2));
}
