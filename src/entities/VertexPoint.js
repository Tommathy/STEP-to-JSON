import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_vertex_point.html
 * | Attribute      | Type                         | Defined By          |
 * |----------------|------------------------------|---------------------|
 * | name           | label (STRING)               | representation_item |
 * | vertex_geometry| point (ENTITY)               | vertex_point        |
 */

class VertexPoint extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getVertexGeometry() {
        return this.getAttributes().getContains()[1].getValue();
    }
}

export { VertexPoint };
