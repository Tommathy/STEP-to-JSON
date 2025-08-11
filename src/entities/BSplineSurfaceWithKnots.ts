import { BaseEntity } from './BaseEntity.js';

/* https://downloads.steptools.com/docs/stp_aim/html/t_b_spline_surface_with_knots.html
 * | Attribute               | Type                                                       | Defined By                    |
 * |-------------------------|------------------------------------------------------------|-------------------------------|
 * | name                    | label (STRING)                                             | representation_item           |
 * | u_degree                | INTEGER                                                    | b_spline_surface              |
 * | v_degree                | INTEGER                                                    | b_spline_surface              |
 * | control_points_list     | LIST OF LIST OF cartesian_point (ENTITY)                   | b_spline_surface              |
 * | surface_form            | b_spline_surface_form (ENUM)                               | b_spline_surface              |
 * | u_closed                | LOGICAL                                                    | b_spline_surface              |
 * | v_closed                | LOGICAL                                                    | b_spline_surface              |
 * | self_intersect          | LOGICAL                                                    | b_spline_surface              |
 * | u_multiplicities        | LIST OF INTEGER                                            | b_spline_surface_with_knots   |
 * | v_multiplicities        | LIST OF INTEGER                                            | b_spline_surface_with_knots   |
 * | u_knots                 | LIST OF parameter_value (REAL)                             | b_spline_surface_with_knots   |
 * | v_knots                 | LIST OF parameter_value (REAL)                             | b_spline_surface_with_knots   |
 * | knot_spec               | knot_type (ENUM)                                           | b_spline_surface_with_knots   |
 */

class BSplineSurfaceWithKnots extends BaseEntity {
    constructor(attributesString) {
        super(attributesString);
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getUDegree() {
        return this.getAttributes().getContains()[1].getValue();
    }

    getVDegree() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getControlPointsList() {
        return this.getAttributes().getContains()[3].getContains();
    }

    getSurfaceForm() {
        return this.getAttributes().getContains()[4].getValue();
    }

    getUClosed() {
        return this.getAttributes().getContains()[5].getValue();
    }

    getVClosed() {
        return this.getAttributes().getContains()[6].getValue();
    }

    getSelfIntersect() {
        return this.getAttributes().getContains()[7].getValue();
    }

    getUMultiplicities() {
        return this.getAttributes().getContains()[8].getContains();
    }

    getVMultiplicities() {
        return this.getAttributes().getContains()[9].getContains();
    }

    getUKnots() {
        return this.getAttributes().getContains()[10].getContains();
    }

    getVKnots() {
        return this.getAttributes().getContains()[11].getContains();
    }

    getKnotSpec() {
        return this.getAttributes().getContains()[12].getValue();
    }
}

export { BSplineSurfaceWithKnots };
