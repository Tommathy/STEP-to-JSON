import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_colour_rgb.html
 * | Attribute     | Type                                          | Defined By             |
 * |---------------|-----------------------------------------------|------------------------|
 * | name          | label (STRING)                                | representation_item    |
 * | styles        | SET OF presentation_style_assignment (ENTITY) | styled_item            |
 * | item          | styled_item_target (SELECT)                   | styled_item            |
 */

class StyledItem extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getStyles() {
        return this.getAttributes().getContains()[1].getContains();
    }

    getItem() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { StyledItem };
