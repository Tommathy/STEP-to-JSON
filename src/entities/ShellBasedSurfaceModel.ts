import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_shell_based_surface_model.html
 * | Attribute     | Type                                | Defined By                   |
 * |---------------|-------------------------------------|------------------------------|
 * | name          | label (STRING)                      | representation_item          |
 * | sbsm_boundary | SET OF shell (SELECT)               | shell_based_surface_model    |
 */

class ShellBasedSurfaceModel extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getSbsmBoundary() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { ShellBasedSurfaceModel };
