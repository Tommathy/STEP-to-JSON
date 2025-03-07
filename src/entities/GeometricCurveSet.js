import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_geometric_curve_set.html
 * | Attribute     | Type                                 | Defined By          |
 * |---------------|--------------------------------------|---------------------|
 * | name          | label (STRING)                       | representation_item |
 * | elements      | SET OF geometric_set_select (SELECT) | geometric_set       |
 */

class GeometricCurveSet extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getElements() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { GeometricCurveSet };
