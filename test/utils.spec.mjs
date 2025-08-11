import { assert, describe, it } from 'vitest'
import { fixSpecialChars } from '../src/utils.js'

describe('Testing util functions', () => {
    describe('Testing function to fix special chars', () => {
        it('Umlauts should be fixed', () => {
            const stepRenderedTextWithUmlauts =
                '\\X\\C4 - \\X\\E4 - \\X\\D6 - \\X\\F6 - \\X\\DC - \\X\\FC';
            const textWithCorrectUmlauts = 'Ae - ae - Oe - oe - Ue - ue';

            assert.equal(
                fixSpecialChars(stepRenderedTextWithUmlauts),
                textWithCorrectUmlauts,
                'Function should fix German umlauts'
            );
        });
    });
});
