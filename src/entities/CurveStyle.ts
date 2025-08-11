import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_curve_style.html
 * | Attribute     | Type                                                    | Defined By    |
 * |---------------|---------------------------------------------------------|---------------|
 * | name          | label (STRING)                                          | curve_style   |
 * | curve_font    | curve_font_or_scaled_curve_font_select (SELECT)        | curve_style   |
 * | curve_width   | size_select (SELECT)                                   | curve_style   |
 * | curve_colour  | colour (ENTITY)                                        | curve_style   |
 */
class CurveStyle extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getCurveFont() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getCurveWidth() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getCurveColour() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { CurveStyle };
