import { v4 as uuidv4 } from 'uuid';
/**
 * Fixes German umlauts
 * @param {string} stringToFix The string that will be fixed
 */
const fixSpecialChars = (stringToFix) => {
    let fixedString = stringToFix;

    if (stringToFix.includes('\\X\\')) {
        fixedString = stringToFix
            .replace('\\X\\C4', 'Ae')
            .replace('\\X\\E4', 'ae')
            .replace('\\X\\D6', 'Oe')
            .replace('\\X\\F6', 'oe')
            .replace('\\X\\DC', 'Ue')
            .replace('\\X\\FC', 'ue');
    }
    return fixedString;
};

/**
 * An exemplary visitor function that creates a UUID
 */
const uuidVisitor = () => {
    const id = uuidv4();
    const result = {
        key: 'uuid',
        value: id
    };
    return result;
};

export { uuidVisitor, fixSpecialChars };
