import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_surface_of_linear_extrusion.html
 * | Attribute        | Type                | Defined By                |
 * |------------------|---------------------|---------------------------|
 * | name             | label (STRING)      | representation_item       |
 * | swept_curve      | curve (ENTITY)      | swept_surface             |
 * | extrusion_axis   | vector (ENTITY)     | surface_of_linear_extrusion|
 */

class SurfaceOfLinearExtrusion extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getSweptCurve() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getExtrusionAxis() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { SurfaceOfLinearExtrusion };
