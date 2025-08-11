import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_edge_loop.html
 * | Attribute   | Type                              | Defined By          |
 * |-------------|-----------------------------------|---------------------|
 * | name        | label (STRING)                    | representation_item |
 * | edge_list   | LIST OF oriented_edge (ENTITY)    | path                |
 */

class EdgeLoop extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getEdgeList() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { EdgeLoop };
