const { v4: uuidv4 } = require('uuid');

/**
 * Fixes German umlauts
 * @param {string} stringToFix The string that will be fixed
 */
exports.fixSpecialChars = (stringToFix) => {
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
exports.uuidVisitor = () => {
    const id = uuidv4();
    const result = {
        key: 'uuid',
        value: id
    };
    return result;
};
