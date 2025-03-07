import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_cylindrical_surface.html
 * | Attribute   | Type                             | Defined By            |
 * |-------------|----------------------------------|-----------------------|
 * | name        | label (STRING)                   | representation_item   |
 * | position    | axis2_placement_3d (ENTITY)      | elementary_surface    |
 * | radius      | positive_length_measure (REAL)   | cylindrical_surface   |
 */

class CylindricalSurface extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getPosition() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getRadius() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { CylindricalSurface };
