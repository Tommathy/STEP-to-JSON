import { preferredSurfaceCurveRepresentation, siPrefix } from '../src/enums.js';

import { AttributeParser } from '../src/AttributeParser.js';
import { assert, describe, it } from 'vitest';

function checkAttributeType(attributesString, expectedResult) {
    it('Parse Attribute test', () => {
        const attributes = new AttributeParser(attributesString);
        const contains = attributes.parse().getContains()
        const actualResult = contains.map(el => el.getValue())
        assert.deepEqual(
            actualResult,
            expectedResult,
            "Parsed structure doesn't match the expected structure"
        );
    });
}
describe('Testing Attribute Parser', () => {
    describe('Enum Attribute', () => {
        checkAttributeType('(.T.)', [true]);
        checkAttributeType('(.F.)', [false]);
        checkAttributeType('(.NULL.)', [null]);
        checkAttributeType('(.PCURVE_S1.)', [preferredSurfaceCurveRepresentation.PCURVE_S1]);
        checkAttributeType('(.DECA.)', [siPrefix.DECA]);
    });

    describe('String Attribute', () => {
        checkAttributeType("('international standard')", ['international standard']);
    });

    describe('Reference Attribute', () => {
        checkAttributeType('(#12345678)', ["12345678"]);
    });

    describe('Number Attribute', () => {
        checkAttributeType('(-1.)', [-1]);
        checkAttributeType('(0.E+000)', [0]);
        checkAttributeType('(2.999)', [2.999]);
        checkAttributeType('(-1.478994094488)', [-1.478994094488]);
        checkAttributeType('(2.322536076163E-003)', [0.002322536076163]);
    });
    describe('Complex Attributes', () => {
        checkAttributeType("(-1., 'international standard')", [-1,'international standard']);
        checkAttributeType("(.T., '=>[0:1:1:2]', -1.4789940)", [true,'=>[0:1:1:2]',-1.4789940]);
        checkAttributeType("('2','=>[0:1:1:2]','',#18721,#19074,$)", ['2','=>[0:1:1:2]','', '18721', '19074', "$"]);
    });
});
