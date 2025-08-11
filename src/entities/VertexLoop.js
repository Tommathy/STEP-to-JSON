import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_vertex_loop.html
 * | Attribute     | Type                 | Defined By         |
 * |---------------|----------------------|--------------------|
 * | name          | label (STRING)       | representation_item|
 * | loop_vertex   | vertex (ENTITY)      | vertex_loop        |
 */
class VertexLoop extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getLoopVertex() {
        return this.getAttributes().getContains()[1].getValue();
    }
}

export { VertexLoop };
