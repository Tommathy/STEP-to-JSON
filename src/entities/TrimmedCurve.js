import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_trimmed_curve.html
 * | Attribute             | Type                                | Defined By       |
 * |-----------------------|-------------------------------------|------------------|
 * | name                  | label (STRING)                      | representation_item |
 * | basis_curve           | curve (ENTITY)                      | trimmed_curve    |
 * | trim_1                | SET OF trimming_select (SELECT)     | trimmed_curve    |
 * | trim_2                | SET OF trimming_select (SELECT)     | trimmed_curve    |
 * | sense_agreement       | BOOLEAN                             | trimmed_curve    |
 * | master_representation | trimming_preference (ENUM)          | trimmed_curve    |
 */

class TrimmedCurve extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getBasisCurve() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getTrim1() {
        return this.getAttributes().getContains()[2].getContains();
    }

    getTrim2() {
        return this.getAttributes().getContains()[3].getContains();
    }

    getSenseAgreement() {
        return this.getAttributes().getContains()[4].getValue();
    }

    getMasterRepresentation() {
        return this.getAttributes().getContains()[5].getValue();
    }
}

export { TrimmedCurve };
