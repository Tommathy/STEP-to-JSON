import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_axis2_placement_2d.html
 * | Attribute     | Type                        | Defined By             |
 * |---------------|----------------------------|------------------------|
 * | name          | label (STRING)             | representation_item    |
 * | location      | cartesian_point (ENTITY)   | placement              |
 * | ref_direction | direction (ENTITY)         | axis2_placement_2d     |
 */

class Axis2Placement2d extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getLocation() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getRefDirection() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { Axis2Placement2d };
