import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_item_defined_transformation.html
 * | Attribute         | Type                        | Defined By               |
 * |-------------------|-----------------------------|--------------------------|
 * | name              | label (STRING)              | item_defined_transformation |
 * | description       | text (STRING)               | item_defined_transformation |
 * | transform_item_1  | representation_item (ENTITY)| item_defined_transformation |
 * | transform_item_2  | representation_item (ENTITY)| item_defined_transformation |
 */

class ItemDefinedTransformation extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getDescription() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getTransformItem1() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getTransformItem2() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { ItemDefinedTransformation };
