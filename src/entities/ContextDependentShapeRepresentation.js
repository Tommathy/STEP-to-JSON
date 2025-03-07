import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_context_dependent_shape_representation.html
 * | Attribute                    | Type                                        | Defined By                             |
 * |------------------------------|---------------------------------------------|----------------------------------------|
 * | representation_relation      | shape_representation_relationship (ENTITY)  | context_dependent_shape_representation |
 * | represented_product_relation | product_definition_shape (ENTITY)           | context_dependent_shape_representation |
 */
class ContextDependentShapeRepresentation extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getRepresentationRelation() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getRepresentedProductRelation() {
        return this.getAttributes().getContains()[1].getValue();
    }
}

export { ContextDependentShapeRepresentation };
