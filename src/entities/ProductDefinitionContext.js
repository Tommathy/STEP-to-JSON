import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_product_definition_context.html
 * | Attribute          | Type                         | Defined By                  |
 * |--------------------|------------------------------|-----------------------------|
 * | name               | label (STRING)               | application_context_element |
 * | frame_of_reference | application_context (ENTITY) | application_context_element |
 * | life_cycle_stage   | label (STRING)               | product_definition_context  |
 */

class ProductDefinitionContext extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getId() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getDescription() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getProduct() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { ProductDefinitionContext };
