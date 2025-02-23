import { AttributeParser } from "../AttributeParser.js"

class BaseEntity {
    constructor(attributes) {
        this._attributes = new AttributeParser(attributes);
        this._parsedAttributes = null;
    }

    getAttributes() {
        if (!this._parsedAttributes) this._parsedAttributes = this._attributes.parse();
        return this._parsedAttributes;
    }

    static resolveReference(/* parser, reference */) {
        return null;
    }
}

export { BaseEntity };
