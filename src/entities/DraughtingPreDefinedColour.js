import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_draughting_pre_defined_colour.html
 * | Attribute   | Type            | Defined By        |
 * |-------------|-----------------|-------------------|
 * | name        | label (STRING)  | pre_defined_item  |
 */

class DraughtingPreDefinedColour extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }
}

export { DraughtingPreDefinedColour };
