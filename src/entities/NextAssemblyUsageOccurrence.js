import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_product_definition.html
 * | Attribute                   | Type                                     | Defined By                      |
 * | --------------------------- | ---------------------------------------- | ------------------------------- |
 * | id                          | identifier (STRING)                      | product_definition_relationship |
 * | name                        | label (STRING)                           | product_definition_relationship |
 * | description                 | text (STRING)                            | product_definition_relationship |
 * | relating_product_definition | product_definition_or_reference (SELECT) | product_definition_relationship |
 * | related_product_definition  | product_definition_or_reference (SELECT) | product_definition_relationship |
 * | reference_designator        | identifier (STRING)                      | assembly_component_usage        |
 */

class NextAssemblyUsageOccurrence extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getId() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getName() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getDescription() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getRelatingProductDefinition() {
        return this.getAttributes().getContains()[3].getValue();
    }

    getRelatedProductDefinition() {
        return this.getAttributes().getContains()[4].getValue();
    }

    getReferenceDesignator() {
        return this.getAttributes().getContains()[5].getValue();
    }
}

export { NextAssemblyUsageOccurrence };
