import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_product_related_product_category.html
 * | Attribute   | Type                        | Defined By                        |
 * |-------------|-----------------------------|----------------------------------|
 * | name        | label (STRING)              | product_category                 |
 * | description | text (STRING)               | product_category                 |
 * | products    | SET OF product (ENTITY)     | product_related_product_category |
 */

class ProductRelatedProductCategory extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getDescription() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getProducts() {
        return this.getAttributes().getContains()[2].getContains();
    }
}

export { ProductRelatedProductCategory };
