import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_edge_curve.html
 * | Attribute     | Type                            | Defined By          |
 * |---------------|---------------------------------|---------------------|
 * | name          | label (STRING)                  | representation_item |
 * | edge_start    | vertex (ENTITY)                 | edge                |
 * | edge_end      | vertex (ENTITY)                 | edge                |
 * | edge_geometry | curve (ENTITY)                  | edge_curve          |
 * | same_sense    | BOOLEAN                         | edge_curve          |
 */

class EdgeCurve extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getEdgeStart() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getEdgeEnd() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getEdgeGeometry() {
        return this.getAttributes().getContains()[3].getValue();
    }

    getSameSense() {
        return this.getAttributes().getContains()[4].getValue();
    }
}

export { EdgeCurve };
