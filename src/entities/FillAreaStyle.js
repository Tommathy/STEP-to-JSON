import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_fill_area_style.html
 * | Attribute     | Type                                | Defined By       |
 * |---------------|-------------------------------------|------------------|
 * | name          | label (STRING)                      | fill_area_style  |
 * | fill_styles   | SET OF fill_style_select (SELECT)   | fill_area_style  |
 */

class FillAreaStyle extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getFillStyles() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { FillAreaStyle };
