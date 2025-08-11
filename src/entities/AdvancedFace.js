import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_advanced_face.html
 * | Attribute        | Type                         | Defined By          |
 * |------------------|------------------------------|---------------------|
 * | name             | label (STRING)               | representation_item |
 * | bounds           | SET OF face_bound (ENTITY)   | face                |
 * | face_geometry    | surface (ENTITY)             | face_surface        |
 * | same_sense       | BOOLEAN                      | face_surface        |
 */

class AdvancedFace extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getBounds() {
        return this.getAttributes().getContains()[1].getContains();
    }

    getFaceGeometry() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getSameSense() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { AdvancedFace };
