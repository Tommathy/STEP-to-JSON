import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_line.html
 * One of the most used definition has such a poor attribute nameing...
 * | Attribute   | Type                            | Defined By          |
 * |-------------|---------------------------------|---------------------|
 * | name        | label (STRING)                  | representation_item |
 * | pnt         | cartesian_point (ENTITY)        | line                |
 * | dir         | vector (ENTITY)                 | line                |
 */

class Line extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getPosition() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getDirection() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { Line };
