class Consumer {
    constructor(id) {
        /**
         * _id is an internal identifier for this consumer to reference from
         * @type {String}
         * @private
         */
        this._id = id;

        /**
         * _match getContains() the string that has been matched
         * @type {String}
         * @private
         */
        this._match = '';

        /**
         * getContains() is an array that holds child consumers
         * @type {[Consumer]}
         * @public
         */
        this._contains = [];
    }

    /**
     * Return the value if value has been set after finish
     * @returns {any}
     */
    getContains() {
        return this._contains;
    }

    /**
     * Return the value if value has been set after finish
     * @returns {any}
     */
    getValue() {
        return this._value;
    }

    /**
     * update internal value variable
     * @param {any} newValue
     */
    setValue(newValue) {
        this._value = newValue;
    }

    /**
     * Add character to the current match
     * @param {String} char character that should be added to the match
     */
    addMatch(char) {
        this._match += char;
    }

    /**
     * Get current matched data
     * @returns {String}
     */
    getMatch() {
        return this._match;
    }

    /**
     * Get unique Id from consumer class
     * @returns {String}
     */
    getId() {
        return this._id;
    }

    /**
     * Get unique Id from consumer class
     * @returns {String}
     */
    static getId() {
        throw new Error(`Static getId function not implemented"`);
    }

    /**
     * This function is beeing called, when a new char should be parsed from the parser
     * @param {AttributeParser} parser parser that holds the content that should be parsed
     */
    // eslint-disable-next-line no-unused-vars
    static consume(parser) {
        throw new Error(`consume function not implemented"`);
    }

    /**
     * Does some cleanup, called when finished consuming chars
     * @returns void
     */
    finish() {
        throw new Error('Finish not implemented');
    }
}

class GroupConsumer extends Consumer {
    constructor() {
        super(GroupConsumer.getId());
    }

    static getId() {
        return AttributeParser.consumerType.GROUP;
    }

    static consume(parser) {
        if (parser.current() == '(') {
            parser.pushToStack(new GroupConsumer());
            parser.next(); // Dispose: (
            return true;
        }

        if (parser.current() == ')') {
            const groupConsumer = parser.removeDataFromStack();
            const currentConsumer = parser.currentStackEntry();
            if (currentConsumer) {
                currentConsumer.getContains().push(groupConsumer);
            }
            parser.next(); // Dispose: )
            return true;
        }

        return false;
    }
}

class UnsetConsumer extends Consumer {
    constructor() {
        super(UnsetConsumer.getId());
    }

    finish() {
        // value is still null, because this argument is unset
        this.setValue('$');
        return;
    }

    static getId() {
        return AttributeParser.consumerType.UNSET;
    }

    static consume(parser) {
        if (parser.current() == '$') {
            const consumer = new UnsetConsumer();
            consumer.addMatch(parser.next()); // Consume: $
            consumer.finish();
            parser.currentStackEntry().getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class SubtypeConsumer extends Consumer {
    constructor() {
        super(UnsetConsumer.getId());
    }

    finish() {
        // value is still null, because this argument inherts its data from "somewhere else". its weird
        this.setValue('*');
        return;
    }

    static getId() {
        return AttributeParser.consumerType.SUBTYPE;
    }

    static consume(parser) {
        if (parser.current() == '*') {
            const consumer = new UnsetConsumer();
            consumer.addMatch(parser.next()); // Consume: *
            consumer.finish();
            parser.currentStackEntry().getContains().push(consumer);
            return;
        }

        return;
    }
}

class StringConsumer extends Consumer {
    constructor() {
        super(StringConsumer.getId());
    }

    finish() {
        this.setValue(this.getMatch());
    }

    static getId() {
        return AttributeParser.consumerType.STRING;
    }

    static consume(parser) {
        if (parser.current() == "'") {
            parser.next(); // Dispose: '
            const consumer = new StringConsumer();
            while (parser.current() && parser.current() != "'") {
                if (parser.peek() == '\\') {
                    consumer.addMatch(parser.next()); // Consume: \
                    consumer.addMatch(parser.next()); // Consume escaped char
                    continue;
                }

                consumer.addMatch(parser.next()); // Consume: char
            }
            parser.next(); // Dispose: '

            consumer.finish();
            parser.currentStackEntry().getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class NumberConsumer extends Consumer {
    constructor() {
        super(NumberConsumer.getId());
    }

    finish() {
        this.setValue(Number.parseFloat(this.getMatch()));
    }

    static getId() {
        return AttributeParser.consumerType.NUMBER;
    }

    static consume(parser) {
        if (/[-0-9]/.test(parser.current())) {
            const consumer = new NumberConsumer();
            consumer.addMatch(parser.next()); // Consume first digit

            while (/[-+0-9.E]/.test(parser.current())) {
                consumer.addMatch(parser.next()); // Consume: char
            }

            consumer.finish();
            parser.currentStackEntry().getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class EnumConsumer extends Consumer {
    constructor() {
        super(EnumConsumer.getId());
    }

    finish() {
        switch (this.getMatch()) {
            case 'T':
                this.setValue(true);
                break;
            case 'F':
                this.setValue(false);
                break;
            case 'NULL':
                this.setValue(null);
                break;
            default:
                this.setValue(this.getMatch());
        }
    }

    static getId() {
        return AttributeParser.consumerType.ENUM;
    }

    static consume(parser) {
        if (parser.current() == '.') {
            const consumer = new EnumConsumer();
            const startingIndex = parser._currentIndex;
            parser.next(); // Dispose: .
            while (/[a-zA-Z0-9_]/.test(parser.current())) {
                consumer.addMatch(parser.next()); // Consume: char
            }

            if (parser.next() != '.') {
                // Check if we end with a .
                parser._currentIndex = startingIndex;
                return false;
            }

            consumer.finish();
            parser.currentStackEntry().getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class CommentConsumer extends Consumer {
    constructor() {
        super(UnsetConsumer.getId());
    }

    static getId() {
        return AttributeParser.consumerType.COMMENT;
    }

    static consume(parser) {
        if (parser.current() == '/' && parser.peek() == '*') {
            parser.next(); // Dispose: /
            parser.next(); // Dispose: *

            while (parser.current() != '*' && parser.peek() != '/') {
                parser.next(); // CONSUME ALL THE TOKENS!!!
            }

            parser.next(); // Dispose: *
            parser.next(); // Dispose: /
            return true;
        }
        return false;
    }
}

class ReferenceConsumer extends Consumer {
    constructor() {
        super(ReferenceConsumer.getId());
    }

    finish() {
        this.setValue(this.getMatch());
        return;
    }

    static getId() {
        return AttributeParser.consumerType.REFERENCE;
    }

    static consume(parser) {
        if (parser.current() == '#') {
            const consumer = new ReferenceConsumer();
            parser.next(); // Consume: #

            while (/[0-9]/.test(parser.current())) {
                consumer.addMatch(parser.next()); // Consume: digit
            }

            consumer.finish();
            parser.currentStackEntry().getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class AttributeParser {
    constructor(content) {
        this._currentIndex = 0;
        this._content = Array.from(content.replace(';', '').trim());
        this._stack = [];
        this._result = null;
    }

    static consumerType = {
        GROUP: 'group',
        REFERENCE: 'reference',
        ENUM: 'enum',
        STRING: 'string',
        NUMBER: 'number',
        TYPE: 'type',
        UNSET: 'unset',
        SUBTYPE: 'subtype',
        COMMENT: 'comment'
    };

    current() {
        return this._content[this._currentIndex];
    }

    peek(amount = 1) {
        return this._content[this._currentIndex + amount];
    }

    next() {
        const currentChar = this._content[this._currentIndex];
        this._currentIndex += 1;
        return currentChar;
    }

    pushToStack(consumer) {
        if (this._stack.length == 0) {
            if (consumer?.getId() == GroupConsumer.getId()) {
                this._stack.push(consumer);
                this._result = consumer;

                return true;
            }

            return null;
        }

        this._stack.push(consumer);

        return true;
    }

    currentStackEntry() {
        if (this._stack.length == 0) return null;
        return this._stack[this._stack.length - 1];
    }

    removeDataFromStack() {
        const currentConsumer = this.currentStackEntry();
        if (this._stack.length == 0 || currentConsumer?.getId() != GroupConsumer.getId())
            return null;

        return this._stack.pop();
    }

    parse() {
        if (!GroupConsumer.consume(this)) throw new Error('No group consumer found');

        while (this.current()) {
            if (GroupConsumer.consume(this)) continue;
            if (StringConsumer.consume(this)) continue;
            if (EnumConsumer.consume(this)) continue;
            if (ReferenceConsumer.consume(this)) continue;
            if (NumberConsumer.consume(this)) continue;
            if (UnsetConsumer.consume(this)) continue;
            if (SubtypeConsumer.consume(this)) continue;
            if (CommentConsumer.consume(this)) continue;

            if (!/[,\s\n\r]/.test(this.current())) {
                console.log(this._content.join(''));
                console.log(`${'~'.repeat(this._currentIndex)}^`);
                throw new Error(
                    `Failed to parse: ${this.current()} at index ${this._currentIndex}`
                );
            }

            this.next(); // Dispose: ,
        }

        return this._result;
    }
}

export { AttributeParser };
