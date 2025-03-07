import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_vector.html
 * | Attribute   | Type                           | Defined By         |
 * |-------------|--------------------------------|--------------------|
 * | name        | label (STRING)                 | representation_item |
 * | orientation | direction (ENTITY)             | vector             |
 * | magnitude   | length_measure (REAL)          | vector             |
 */

class Vector extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getOrientation() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getMagnitude() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { Vector };
