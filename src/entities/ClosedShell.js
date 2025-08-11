import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_closed_shell.html
 * | Attribute   | Type                         | Defined By            |
 * |-------------|------------------------------|-----------------------|
 * | name        | label (STRING)               | representation_item   |
 * | cfs_faces   | SET OF face (ENTITY)         | connected_face_set    |
 */
class ClosedShell extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getCfsFaces() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { ClosedShell };
