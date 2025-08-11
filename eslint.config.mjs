import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    js.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
            },
            globals: {
                ...globals.es2021,
                ...globals.node,
            },
        },
        plugins: {
            import: importPlugin,
        },
        rules: {
            indent: ['error', 4, { SwitchCase: 1 }],
            'max-len': ['error', { code: 150, tabWidth: 4, ignoreComments: true }],
            'no-plusplus': 'off',
            'import/prefer-default-export': 'off',
            'object-shorthand': 'off',
        },
    },
    {
        files: ['test/**/*.{js,mjs,cjs}', 'src/**/*.{test,spec}.mjs'],
        languageOptions: {
            globals: {
                ...globals.vitest,
                ...globals.mocha,
            },
        },
    },
];
