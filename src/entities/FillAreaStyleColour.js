import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_fill_area_style_colour.html
 * | name          | label (STRING)  | fill_area_style_colour   |
 * | fill_colour   | colour (ENTITY) | fill_area_style_colour   |
 */

class FillAreaStyleColour extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getFillColour() {
        return this.getAttributes().getContains()[1].getValue();
    }
}

export { FillAreaStyleColour };
