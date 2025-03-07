import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_presentation_layer_assignment.html
 * | Attribute         | Type                                      | Defined By                  |
 * |-------------------|-------------------------------------------|-----------------------------|
 * | name              | label (STRING)                            | presentation_layer_assignment |
 * | description       | text (STRING)                             | presentation_layer_assignment |
 * | assigned_items    | SET OF layered_item (SELECT)              | presentation_layer_assignment |
 */

class PresentationLayerAssignment extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getDescription() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getAssignedItems() {
        return this.getAttributes().getContains()[2].getContains();
    }
}

export { PresentationLayerAssignment };
