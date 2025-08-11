import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_direction.html
 * | Attribute        | Type                    | Defined By          |
 * |------------------|-------------------------|---------------------|
 * | name             | label (STRING)          | representation_item |
 * | direction_ratios | LIST OF REAL            | direction           |
 */

class Direction extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getDirectionRations() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { Direction };
