import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_pcurve.html
 * | Attribute           | Type                                     | Defined By          |
 * |---------------------|------------------------------------------|---------------------|
 * | name                | label (STRING)                           | representation_item |
 * | basis_surface       | surface (ENTITY)                         | pcurve              |
 * | reference_to_curve  | definitional_representation (ENTITY)     | pcurve              |
 */

class Pcurve extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getBasisSurface() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getReferenceToCurve() {
        return this.getAttributes().getContains()[2].getValue();
    }
}

export { Pcurve };
