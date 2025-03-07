import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_product_definition_formation.html
 * | Attribute   | Type                    | Defined By                   |
 * |-------------|-------------------------|------------------------------|
 * | id          | identifier (STRING)     | product_definition_formation |
 * | description | text (STRING)           | product_definition_formation |
 * | of_product  | product (ENTITY)        | product_definition_formation |
 */

class ProductDefinitionFormation extends BaseEntity {
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

export { ProductDefinitionFormation };
