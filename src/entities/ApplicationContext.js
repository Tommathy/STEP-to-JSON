import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_application_context.html
 * | Attribute    | Type            | Defined By          |
 * |--------------|-----------------|---------------------|
 * | application  | label (STRING)  | application_context |
 */

class ApplicationContext extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getApplication() {
        return this.getAttributes().getContains()[0].getValue();
    }
}

export { ApplicationContext };
