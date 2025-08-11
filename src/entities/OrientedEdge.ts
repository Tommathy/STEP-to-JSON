import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_oriented_edge.html
 * | Attribute     | Type                            | Defined By                           |
 * |---------------|---------------------------------|--------------------------------------|
 * | name          | label (STRING)                  | representation_item                 |
 * | edge_start*   | vertex (ENTITY)                 | oriented_edge (Redcl from edge)     |
 * | edge_end*     | vertex (ENTITY)                 | oriented_edge (Redcl from edge)     |
 * | edge_element  | edge (ENTITY)                   | oriented_edge                       |
 * | orientation   | BOOLEAN                         | oriented_edge                       |
 */

class OrientedEdge extends BaseEntity {
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

    getEdgeElement() {
        return this.getAttributes().getContains()[3].getValue();
    }

    getOrientation() {
        return this.getAttributes().getContains()[4].getValue();
    }
}

export { OrientedEdge };
