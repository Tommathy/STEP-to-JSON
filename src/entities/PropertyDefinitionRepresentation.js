import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_property_definition_representation.html
 * | Attribute            | Type                                      | Defined By                        |
 * |----------------------|-------------------------------------------|-----------------------------------|
 * | definition           | represented_definition (SELECT)          | property_definition_representation |
 * | used_representation   | representation (ENTITY)                   | property_definition_representation |
 */
class PropertyDefinitionRepresentation extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getDefinition() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getUsedRepresentation() {
        return this.getAttributes().getContains()[1].getValue();
    }
}

export { PropertyDefinitionRepresentation };
