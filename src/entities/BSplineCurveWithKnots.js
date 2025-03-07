import { BaseEntity } from './BaseEntity.js';

/* https://www.steptools.com/stds/stp_aim/html/t_b_spline_curve_with_knots.html
 * | Attribute            | Type                                      | Defined By                   |
 * |----------------------|-------------------------------------------|------------------------------|
 * | name                 | label (STRING)                            | representation_item          |
 * | degree               | INTEGER                                   | b_spline_curve               |
 * | control_points_list  | LIST OF cartesian_point (ENTITY)          | b_spline_curve               |
 * | curve_form           | b_spline_curve_form (ENUM)                | b_spline_curve               |
 * | closed_curve         | LOGICAL                                   | b_spline_curve               |
 * | self_intersect       | LOGICAL                                   | b_spline_curve               |
 * | knot_multiplicities  | LIST OF INTEGER                           | b_spline_curve_with_knots    |
 * | knots                | LIST OF parameter_value (REAL)            | b_spline_curve_with_knots    |
 * | knot_spec            | knot_type (ENUM)                          | b_spline_curve_with_knots    |
 */

class BSplineCurveWithKnots extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getDegree() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getControlPointsList() {
        return this.getAttributes().getContains()[2].getContains();
    }

    getCurveForm() {
        return this.getAttributes().getContains()[3].getValue();
    }

    getClosedCurve() {
        return this.getAttributes().getContains()[4].getValue();
    }

    getSelfIntersect() {
        return this.getAttributes().getContains()[5].getValue();
    }

    getKnotMultiplicities() {
        return this.getAttributes().getContains()[6].getContains();
    }

    getKnots() {
        return this.getAttributes().getContains()[7].getContains();
    }

    getKnotSpec() {
        return this.getAttributes().getContains()[8].getValue();
    }
}

export { BSplineCurveWithKnots };
