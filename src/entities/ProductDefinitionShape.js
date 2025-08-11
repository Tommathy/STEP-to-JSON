import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_product_definition.html
 * | Attribute   | Type                              | Defined By            |
 * |-------------|-----------------------------------|-----------------------|
 * | name        | label (STRING)                    | property_definition   |
 * | description | text (STRING)                     | property_definition   |
 * | definition  | characterized_definition (SELECT) | property_definition   |
 */

class ProductDefinitionShape extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getDescription() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getDefinition() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { ProductDefinitionShape };
