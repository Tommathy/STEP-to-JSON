import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_uncertainty_measure_with_unit.html
 * | Attribute       | Type                         | Defined By                     |
 * |-----------------|------------------------------|--------------------------------|
 * | value_component | measure_value (SELECT)       | measure_with_unit              |
 * | unit_component  | unit (SELECT)                | measure_with_unit              |
 * | name            | label (STRING)               | uncertainty_measure_with_unit  |
 * | description     | text (STRING)                | uncertainty_measure_with_unit  |
 */

class UncertaintyMeasureWithUnit extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getValueComponent() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getUnitComponent() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getName() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getDescription() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { UncertaintyMeasureWithUnit };
