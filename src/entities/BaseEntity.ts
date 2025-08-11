import { AttributeParser } from '../AttributeParser.js';

class BaseEntity {
    private _attributes: AttributeParser;
    private _parsedAttributes: any | null;
    constructor(attributes: string) {
        this._attributes = new AttributeParser(attributes);
        this._parsedAttributes = null;
    }

    getAttributes() {
        if (!this._parsedAttributes)
            this._parsedAttributes = this._attributes.parse();
        return this._parsedAttributes;
    }

    static resolveReference(/* parser, reference */) {
        return null;
    }
}

export { BaseEntity };
