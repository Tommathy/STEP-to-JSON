const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { StepToJsonParser } = require('../src/parser.js');

// Constants
const stdFilePath = join(__dirname, '/raspberry_pi_5.stp');
const jsonFilePath = join(__dirname, "./raspberry_pi_5.json")
const stepFile = readFileSync(stdFilePath);

const parser = new StepToJsonParser(stepFile);
const parsedData = parser.parse();

writeFileSync(jsonFilePath, JSON.stringify(parsedData, null, 1))
console.log(parsedData)
