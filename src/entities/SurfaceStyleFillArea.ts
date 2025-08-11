import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_surface_style_fill_area.html
 * | Attribute     | Type                     | Defined By              |
 * |---------------|--------------------------|-------------------------|
 * | fill_area     | fill_area_style (ENTITY)  | surface_style_fill_area |
 */

class SurfaceStyleFillArea extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getFillArea() {
        return this.getAttributes().getContains()[0].getValue();
    }
}

export { SurfaceStyleFillArea };
