# Developer Guidelines

Purpose: Help you get productive quickly in this STEP-to-JSON repository. Keep things small, simple, and tested.

Overview

- What it does: Parses STEP (ISO 10303-21/44) files into a JSON assembly tree. Usable in Node and browser builds.
- Entry points: src/parser.js exports StepToJsonParser (ESM). CLI for ad‑hoc conversion lives in cli/step-to-json.js. Demo in demo/.

Tech Stack

- Runtime: Node.js (ESM). Recommended: Node 18+ LTS.
- Bundling: Rollup (outputs CJS/ESM/UMD in dist/).
- Language: JavaScript (ES modules in src/; some CommonJS used in CLI/build tooling).
- Tests: Vitest. Specs in test/\*.mjs.
- Lint/Format: ESLint (Airbnb base), Prettier.

Repository Structure

- src/: Core parser and entity classes
    - parser.js: main public API (StepToJsonParser)
    - entities/: STEP entity models
    - utils.js, enums.js, AttributeParser.js
- cli/: CLI script (manual conversion from .stp to .json)
- demo/: Small runnable demo and sample STEP/JSON files
- dist/: Build artifacts (generated)
- test/: Unit/integration tests (.mjs)
- rollup.config.js: Build config

Install

- npm install

Common Tasks

- Run tests: npm test
- Lint: npm run lint
- Auto‑format: npm run fix
- Build bundles: npm run build
- Clean + build: npm run prebuild && npm run build (prebuild runs automatically)
- Run demo: npm run demo (executes demo/main.js)
- Use CLI locally: node cli/step-to-json.js -f path/to/file.stp

Using the Library (Node ESM)

- import { StepToJsonParser } from 'step-to-json';
- Or in this repo: import { StepToJsonParser } from './src/parser.js';
- const parser = new StepToJsonParser(stepFileContent)
- const result = parser.parse()

Testing Conventions

- Place tests in test/ with .mjs extension.
- Use describe/it and expect/assert from Vitest (import from 'vitest').
- Keep tests deterministic; include minimal fixtures (see test/Workbench.\*).

Code Style & Best Practices

- Prefer ES modules in src/ (export named symbols). Keep CommonJS only where necessary (CLI, rollup config).
- Small functions/classes. One STEP concept per module in src/entities/.
- No implicit I/O in core parsing code (pure, deterministic). Handle I/O (fs, progress, colors) only in CLI/demo.
- Input handling: accept raw STEP file content as string/Buffer; avoid reading files in src/.
- Error handling: throw informative Errors; avoid silent catches.
- Naming: Match STEP terminology; use UPPER_SNAKE_CASE for entity keys mapping, camelCase for JS values.
- Performance: Avoid quadratic scans; preprocess once, then reference by IDs (as in parser.preprocessFile()).

Adding/Modifying Features

- Update or add entity classes in src/entities/ and register in entities map in parser.js.
- Add unit tests in test/ covering new paths and edge cases.
- Run npm run lint && npm test before committing.

Troubleshooting

- ESM/CommonJS interop: src/ is ESM; CLI/build configs may use require(). Run CLI as shown above.
- If Vitest errors about modules, ensure Node 18+. Vitest supports ESM natively; keep tests as .mjs and import { describe, it, expect/assert } from 'vitest'.
- Clean build artifacts if bundling issues: npm run prebuild && npm run build.

Release/Publish (maintainers)

- CI/prepublish runs: lint, test, build (see prepublishOnly script).

Keep this file short. If in doubt, follow current code patterns in src/ and existing tests.
