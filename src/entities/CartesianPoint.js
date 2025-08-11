import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_cartesian_point.html
 * | Attribute   | Type                              | Defined By          |
 * |-------------|-----------------------------------|---------------------|
 * | name        | label (STRING)                    | representation_item |
 * | coordinates | LIST OF length_measure (REAL)     | cartesian_point     |
 */

class CartesianPoint extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getCoordinates() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { CartesianPoint };
