import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_seam_curve.html
 * | Attribute              | Type                                             | Defined By          |
 * |------------------------|--------------------------------------------------|---------------------|
 * | name                   | label (STRING)                                   | representation_item |
 * | curve_3d               | curve (ENTITY)                                   | surface_curve       |
 * | associated_geometry    | LIST OF pcurve_or_surface (SELECT)               | surface_curve       |
 * | master_representation  | preferred_surface_curve_representation (ENUM)    | surface_curve       |
 */
class SeamCurve extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getCurve3d() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getAssociatedGeometry() {
        return this.getAttributes().getContains()[2].getContains();
    }

    getMasterRepresentation() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { SeamCurve };
