import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_product_definition.html
 * | Attribute          | Type                         | Defined By                  |
 * | ------------------ | ---------------------------- | --------------------------- |
 * | id                 | identifier                   | (STRING) product_definition |
 * | description        | text                         | (STRING) product_definition |
 * | formation          | product_definition_formation | (ENTITY) product_definition |
 * | frame_of_reference | product_definition_context   | (ENTITY) product_definition |
 */

class ProductDefinition extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getId() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getDescription() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getFormation() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getFrameOfReference() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { ProductDefinition };
