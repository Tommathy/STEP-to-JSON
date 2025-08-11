import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_shape_definition_representation.html
 * | Attribute           | Type                          | Defined By                                                                      |
 * |---------------------|-------------------------------|---------------------------------------------------------------------------------|
 * | definition          | property_definition (ENTITY)  | shape_definition_representation (Redcl from property_definition_representation) |
 * | used_representation | shape_representation (ENTITY) | shape_definition_representation (Redcl from property_definition_representation) |
 */

class ShapeDefinitionRepresentation extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getDefinition() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getRepresentation() {
        return this.getAttributes().getContains()[1].getValue();
    }
}

export { ShapeDefinitionRepresentation };
