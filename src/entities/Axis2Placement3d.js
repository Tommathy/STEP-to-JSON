import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_axis2_placement_3d.html
 * | Attribute     | Type                           | Defined By            |
 * |---------------|--------------------------------|-----------------------|
 * | name          | label (STRING)                 | representation_item   |
 * | location      | cartesian_point (ENTITY)       | placement             |
 * | axis          | direction (ENTITY)             | axis2_placement_3d    |
 * | ref_direction | direction (ENTITY)             | axis2_placement_3d    |
 */

class Axis2Placement3d extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getLocation() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getAxis() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getRefDirection() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { Axis2Placement3d };
