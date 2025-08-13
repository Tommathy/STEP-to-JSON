import { dirname, join, parse } from 'path';
import { statSync, writeFileSync, createReadStream, existsSync } from 'fs';

import { StepToJsonParser } from '../src/parser.ts';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), '../test/data');
const jsonDir = join(__dirname, 'json');

const files = [
    {
        stdFilePath: join(__dirname, '01037894_Rev 1.stp'),
    },
];

for (const file of files) {
    const stdFilePath = file.stdFilePath;
    const jsonFilePath = join(jsonDir, parse(file.stdFilePath).name + '.json');

    const stepFile = createReadStream(stdFilePath, { encoding: 'utf8' });
    const stats = statSync(stdFilePath);
    console.log(`File path: ${stdFilePath}`);
    console.log(`File size: ${Math.floor(stats.size / 1024 / 1024)} MB`);

    const parser = new StepToJsonParser(stepFile);

    console.time('parse');
    const parsedData = await parser.parse();
    console.timeEnd('parse');

    if (!existsSync(jsonDir)) {
        mkdirSync(jsonDir);
    }

    writeFileSync(jsonFilePath, JSON.stringify(parsedData, null, 2));
}
