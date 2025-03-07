import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_face_bound.html
 * | Attribute   | Type                     | Defined By      |
 * |-------------|--------------------------|-----------------|
 * | name        | label (STRING)           | representation_item |
 * | bound       | loop (ENTITY)            | face_bound      |
 * | orientation | BOOLEAN                  | face_bound      |
 */

class FaceBound extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getPosition() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getOrientation() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { FaceBound };
