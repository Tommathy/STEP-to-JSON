import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_presentation_style_assignment.html
 * | Attribute     | Type                                      | Defined By                    |
 * |---------------|-------------------------------------------|-------------------------------|
 * | styles        | SET OF presentation_style_select (SELECT) | presentation_style_assignment |
 */
class PresentationStyleAssignment extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getStyles() {
        return this.getAttributes().getContains()[0].getContains();
    }
}

export { PresentationStyleAssignment };
