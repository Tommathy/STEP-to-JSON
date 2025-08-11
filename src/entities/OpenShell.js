import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_open_shell.html
 * | Attribute   | Type                            | Defined By          |
 * |-------------|---------------------------------|---------------------|
 * | name        | label (STRING)                  | representation_item |
 * | cfs_faces   | SET OF face (ENTITY)            | connected_face_set  |
 */

class OpenShell extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getFaces() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { OpenShell };
