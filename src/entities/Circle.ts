import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_circle.html
 * One of the most used definition has such a poor attribute nameing...
 * | Attribute   | Type                            | Defined By          |
 * |-------------|---------------------------------|---------------------|
 * | name        | label (STRING)                  | representation_item |
 * | position    | axis2_placement (SELECT)        | conic               |
 * | radius      | positive_length_measure (REAL)  | circle              |
 */

class Circle extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
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

export { Circle };
