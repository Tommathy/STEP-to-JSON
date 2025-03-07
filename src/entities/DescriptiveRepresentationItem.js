import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_descriptive_representation_item.html
 * | Attribute     | Type            | Defined By                      |
 * |---------------|-----------------|---------------------------------|
 * | name          | label (STRING)  | representation_item             |
 * | description   | text (STRING)   | descriptive_representation_item |
 */

class DescriptiveRepresentationItem extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getDescription() {
        return this.getAttributes().getContains()[1].getValue();
    }
}

export { DescriptiveRepresentationItem };
