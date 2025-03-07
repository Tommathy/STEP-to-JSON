import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_conical_surface.html
 * | Attribute   | Type                             | Defined By            |
 * |-------------|----------------------------------|-----------------------|
 * | name        | label (STRING)                   | representation_item   |
 * | position    | axis2_placement_3d (ENTITY)      | elementary_surface    |
 * | radius      | length_measure (REAL)            | conical_surface       |
 * | semi_angle  | plane_angle_measure (REAL)       | conical_surface       |
 */

class ConicalSurface extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getPosition() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getSemiAngle() {
        return this.getAttributes().getContains()[2].getValue();
    }
}


export { ConicalSurface };
