import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_product_context.html
 * | Attribute          | Type                         | Defined By                  |
 * |--------------------|------------------------------|-----------------------------|
 * | name               | label (STRING)               | application_context_element |
 * | frame_of_reference | application_context (ENTITY) | application_context_element |
 * | discipline_type    | label (STRING)               | product_context             |
 */

class ProductContext extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getFrameOfReference() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getDisciplineType() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { ProductContext };
