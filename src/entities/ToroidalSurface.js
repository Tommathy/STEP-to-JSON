import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_toroidal_surface.html
 * | Attribute     | Type                                | Defined By            |
 * |---------------|-------------------------------------|-----------------------|
 * | name          | label (STRING)                      | representation_item   |
 * | position      | axis2_placement_3d (ENTITY)         | elementary_surface    |
 * | major_radius  | positive_length_measure (REAL)      | toroidal_surface      |
 * | minor_radius  | positive_length_measure (REAL)      | toroidal_surface      |
 */

class ToroidalSurface extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getPosition() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getMajorRadius() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getMinorRadius() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { ToroidalSurface };
