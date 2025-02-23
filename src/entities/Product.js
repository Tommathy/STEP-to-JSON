import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_product.html
 * | Attribute          | Type                            | Defined By |
 * | ------------------ | ------------------------------- | ---------- |
 * | id                 | identifier (STRING)             | product    |
 * | name               | label (STRING)                  | product    |
 * | description        | text (STRING)                   | product    |
 * | frame_of_reference | SET OF product_context (ENTITY) | product    |
 */

class Product extends BaseEntity {
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

    getFrameOfReference() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { Product };
