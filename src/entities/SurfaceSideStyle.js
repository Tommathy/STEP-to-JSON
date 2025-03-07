import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_surface_side_style.html
 * | Attribute     | Type                                      | Defined By        |
 * |---------------|-------------------------------------------|-------------------|
 * | name          | label (STRING)                            | surface_side_style|
 * | styles        | SET OF surface_style_element_select (SELECT) | surface_side_style|
 */

class SurfaceSideStyle extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getStyles() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { SurfaceSideStyle };
