import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_colour_rgb.html
 * | Attribute | Type           | Defined By           |
 * | --------- | -------------- | -------------------- |
 * | name      | label (STRING) | colour_specification |
 * | red       | REAL           | colour_rgb           |
 * | green     | REAL           | colour_rgb           |
 * | blue      | REAL           | colour_rgb           |
 */

class ColourRGB extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getRed() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getGreen() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getBlue() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { ColourRGB };
