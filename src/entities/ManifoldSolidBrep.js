import { BaseEntity } from "./BaseEntity.js";

/* https://www.steptools.com/stds/stp_aim/html/t_manifold_solid_brep.html
 * | Attribute | Type                    | Defined By             |
 * |-----------|-------------------------|------------------------|
 * | name      | label (STRING)          | representation_item    |
 * | outer     | closed_shell (ENTITY)   | manifold_solid_brep    |
 */

class ManifoldSolidBrep extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getOuter() {
        return this.getAttributes().getContains()[1].getContains();
    }
}

export { ManifoldSolidBrep };
