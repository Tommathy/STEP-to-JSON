import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_mechanical_design_geometric_presentation_representation.html
 * | Attribute         | Type                                                          | Defined By                                                    |
 * |-------------------|---------------------------------------------------------------|---------------------------------------------------------------|
 * | name              | label (STRING)                                               | representation                                                |
 * | items             | SET OF mechanical_design_geometric_presentation_representation_items (SELECT) | mechanical_design_geometric_presentation_representation (Redcl from representation) |
 * | context_of_items  | representation_context (ENTITY)                              | representation                                                |
 */

class MechanicalDesignGeometricPresentationRepresentation extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getItems() {
        return this.getAttributes().getContains()[1].getContains();
    }

    getContextOfItems() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { MechanicalDesignGeometricPresentationRepresentation };
