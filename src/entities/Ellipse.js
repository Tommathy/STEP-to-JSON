import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_ellipse.html
 * | Attribute   | Type                            | Defined By            |
 * |-------------|---------------------------------|-----------------------|
 * | name        | label (STRING)                  | representation_item   |
 * | position    | axis2_placement (SELECT)        | conic                 |
 * | semi_axis_1 | positive_length_measure (REAL)  | ellipse                |
 * | semi_axis_2 | positive_length_measure (REAL)  | ellipse                |
 */

class Ellipse extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getPosition() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getSemiAxis1() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getSemiAxis2() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { Ellipse };
