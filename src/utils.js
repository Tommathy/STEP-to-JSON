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

export { fixSpecialChars };
