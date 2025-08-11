import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_surface_style_usage.html
 * | Attribute     | Type                               | Defined By          |
 * |---------------|------------------------------------|---------------------|
 * | side          | surface_side (ENUM)                | surface_style_usage |
 * | style         | surface_side_style_select (SELECT)| surface_style_usage |
 */

class SurfaceStyleUsage extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getSide() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getStyle() {
        return this.getAttributes().getContains()[1].getValue();
    }
}

export { SurfaceStyleUsage };
