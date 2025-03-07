import { BaseEntity } from "./BaseEntity.js";

/* https://downloads.steptools.com/docs/stp_aim/html/t_over_riding_styled_item.html
 * | Attribute            | Type                                          | Defined By              |
 * |----------------------|-----------------------------------------------|-------------------------|
 * | name                 | label (STRING)                                | representation_item     |
 * | styles               | SET OF presentation_style_assignment (ENTITY) | styled_item             |
 * | item                 | styled_item_target (SELECT)                   | styled_item             |
 * | over_ridden_style    | styled_item (ENTITY)                          | over_riding_styled_item |
 */
class OverRidingStyledItem extends BaseEntity {
    constructor(attributesString) {
        super(attributesString)
    }

    getName() {
        return this.getAttributes().getContains()[0].getValue();
    }

    getStyles() {
        return this.getAttributes().getContains()[1].getContains();
    }

    getItem() {
        return this.getAttributes().getContains()[2].getValue();
    }

    getOverRiddenStyle() {
        return this.getAttributes().getContains()[3].getValue();
    }
}

export { OverRidingStyledItem };
