class Consumer {
    constructor(id, { canContain, hasValue } = { canContain: true, hasValue: true }) {
        /**
         * _id is an internal identifier for this consumer to reference from
         * @type {String}
         * @private
         */
        this._id = id;

        /**
         * _match contains the string that has been matched
         * @type {String}
         * @private
         */
        this._match = '';

        /**
         * value contains the current data of the consumer
         * @type {any}
         * @public
         */
        this.value = null;
        this.hasValue = hasValue;

        /**
         * contains is an array that holds child consumers
         * @type {[Consumer]}
         * @public
         */
        this.contains = [];
        this.canContainValidator = typeof canContain == 'boolean' ? () => canContain : canContain;
    }

    /**
     * Get unique Id from consumer class
     * @returns {String}
     */
    getId() {
        return this._id;
    }

    /**
     * Variable that controls if this consumer can hold a variable
     * @returns {boolean}
     */
    hasValue() {
        return this.hasValue;
    }

    /**
     * update internal value variable
     * @param {any} newValue
     */
    setValue(newValue) {
        if (!this.hasValue) throw new Error(`${this.getId()} can not hold a value`);
        this.value = newValue;
    }

    /**
     * Return the value if value has been set after finish
     * @returns {any}
     */
    getValue() {
        if (!this.hasValue) return null;
        return this.value;
    }

    /**
     * Calls the validator of Consumer to check if consumer can be added to contains variable
     * @param {consumer} data
     * @returns
     */
    canContain(consumer) {
        return this.canContainValidator(consumer?.getId());
    }

    /**
     * Add consumer to the contains list, should be checked before adding data blindly
     * @param {Consumer} consumer
     */
    addConsumer(consumer) {
        if (!this.canContain(consumer))
            throw new Error(`${this.getId()} can not contain any childs consumer`);

        this.contains.push(consumer);
    }

    /**
     * returns a copy of the current contains array
     * @returns {[Consumer]} array that holds a copy of the contains array
     */
    getContains() {
        return [...this.contains];
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
        super(GroupConsumer.getId(), { canContain: true, hasValue: false });
    }

    finish() {
        // nothing to finish here
        return;
    }

    static getId() {
        return AttributeParser.consumerType.GROUP;
    }

    static consume(parser) {
        if (parser.current() == '(') {
            parser.pushDataToStack(new GroupConsumer());
            return;
        }

        if (parser.current() == ')') {
            parser.removeDataFromStack(GroupConsumer.getId());
            return;
        }

        return;
    }
}

class ReferenceConsumer extends Consumer {
    constructor() {
        super(ReferenceConsumer.getId(), { canContain: false, hasValue: true });
    }

    finish() {
        this.setValue(this.getMatch().slice(1));
        return;
    }

    static getId() {
        return AttributeParser.consumerType.REFERENCE;
    }

    static consume(parser) {
        let currentConsumer = parser.getCurrentData();

        if (currentConsumer?.getId() != ReferenceConsumer.getId() && parser.current() == '#') {
            currentConsumer = parser.pushDataToStack(new ReferenceConsumer());
        }

        if (currentConsumer?.getId() != ReferenceConsumer.getId()) return;

        currentConsumer.addMatch(parser.current());

        if (parser.peek() == ',' || parser.peek() == ')' || parser.peek() == '(')
            parser.removeDataFromStack(ReferenceConsumer.getId());

        return;
    }
}

class TypeConsumer extends Consumer {
    constructor() {
        super(TypeConsumer.getId(), {
            canContain: (containId) => containId == GroupConsumer.getId(),
            hasValue: true
        });
    }

    finish() {
        // nothing to finish here
        return;
    }

    static getId() {
        return AttributeParser.consumerType.TYPE;
    }

    static consume(parser) {
        let currentConsumer = parser.getCurrentData();

        if (!parser.current().match(/[A-Z_]/)) return;

        if (
            currentConsumer?.getId() != TypeConsumer.getId() &&
            (parser.previous() == ',' || parser.previous() == '(')
        ) {
            currentConsumer = parser.pushDataToStack(new TypeConsumer());
        }

        if (currentConsumer?.getId() != TypeConsumer.getId()) return;

        currentConsumer.addMatch(parser.current());

        if (parser.peek() == ',' || parser.peek() == ')' || parser.peek() == '(') {
            parser.removeDataFromStack(TypeConsumer.getId());
        }

        return;
    }
}

class BooleanConsumer extends Consumer {
    constructor() {
        super(BooleanConsumer.getId(), { canContain: false, hasValue: true });
    }

    finish() {
        switch (this.getMatch().trim()) {
            case '.T.':
                this.setValue(true);
                break;
            case '.F.':
                this.setValue(false);
                break;
        }

        return;
    }

    static getId() {
        return AttributeParser.consumerType.BOOLEAN;
    }

    static consume(parser) {
        const currentConsumer = parser.getCurrentData();

        if (parser.current() == '.' && (parser.previous() == ',' || parser.previous() == '(')) {
            parser.pushDataToStack(new BooleanConsumer());
            return;
        }

        if (currentConsumer?.getId() != BooleanConsumer.getId()) return;

        if (parser.current() == 'T' || parser.current() == 'F')
            currentConsumer.addMatch(parser.current());

        if (parser.current() == '.' && (parser.peek() == ',' || parser.peek() == ')')) {
            parser.removeDataFromStack(BooleanConsumer.getId());
            return;
        }

        return;
    }
}

class StringConsumer extends Consumer {
    constructor() {
        super(StringConsumer.getId(), { canContain: false, hasValue: true });
    }

    finish() {
        this.setValue(this.getMatch());
    }

    static getId() {
        return AttributeParser.consumerType.STRING;
    }

    static consume(parser) {
        const currentConsumer = parser.getCurrentData();

        if (parser.current() == "'" && (parser.previous() == ',' || parser.previous() == '(')) {
            parser.pushDataToStack(new StringConsumer());
            return;
        }

        if (currentConsumer?.getId() != StringConsumer.getId()) return;

        if (parser.current() == "'" && (parser.peek(true) == ',' || parser.peek(true) == ')')) {
            parser.removeDataFromStack(StringConsumer.getId());
            return;
        }

        currentConsumer.addMatch(parser.current());
        return;
    }
}

class NumberConsumer extends Consumer {
    constructor() {
        super(StringConsumer.getId(), { canContain: false, hasValue: true });
    }

    finish() {
        this.setValue(this.getMatch());
    }

    static getId() {
        return AttributeParser.consumerType.NUMBER;
    }

    static consume(parser) {
        let currentConsumer = parser.getCurrentData();

        if (!parser.current().match(/[-+0-9E.]/)) return;

        if (parser.previous() == ',' || parser.previous() == '(') {
            currentConsumer = parser.pushDataToStack(new NumberConsumer());
        }
        // console.log(currentConsumer)
        if (currentConsumer.getId() != this.getId()) return;

        currentConsumer.addMatch(parser.current());

        if (parser.peek() == ',' || parser.peek() == ')') {
            parser.removeDataFromStack(StringConsumer.getId());
        }

        return;
    }
}

class UnsetConsumer extends Consumer {
    constructor() {
        super(UnsetConsumer.getId(), { canContain: false, hasValue: false });
    }

    finish() {
        // value is still null, because this argument is unset
        return;
    }

    static getId() {
        return AttributeParser.consumerType.UNSET;
    }

    static consume(parser) {
        if (
            (parser.peek() == ',' || parser.peek() == ')') &&
            (parser.previous() == ',' || parser.previous() == '(') &&
            parser.current() == '$'
        ) {
            parser.pushDataToStack(new UnsetConsumer());
            parser.getCurrentData().addMatch(parser.current());
            parser.removeDataFromStack(UnsetConsumer.getId());
            return;
        }

        return;
    }
}

class SubtypeConsumer extends Consumer {
    constructor() {
        super(SubtypeConsumer.getId(), { canContain: false, hasValue: false });
    }

    finish() {
        // value is still null, because this argument inherts its data from "somewhere else". its weird
        return;
    }

    static getId() {
        return AttributeParser.consumerType.SUBTYPE;
    }

    static consume(parser) {
        if (
            (parser.peek() == ',' || parser.peek() == ')') &&
            (parser.previous() == ',' || parser.previous() == '(') &&
            parser.current() == '*'
        ) {
            parser.pushDataToStack(new UnsetConsumer());
            parser.getCurrentData().addMatch(parser.current());
            parser.removeDataFromStack(SubtypeConsumer.getId());
            return;
        }

        return;
    }
}

class AttributeParser {
    constructor(content) {
        this._currentIndex = -1;
        this._lastIndex = -1;
        this.content = Array.from(content);
        this.consumerStack = [];
        this.output = null;
    }

    static consumerType = {
        GROUP: 'group',
        REFERENCE: 'reference',
        TYPE: 'type',
        UNSET: 'unset',
        SUBTYPE: 'subtype',
        BOOLEAN: 'boolean',
        STRING: 'string',
        NUMBER: 'number'
    };

    getCurrentData() {
        return this.consumerStack[this.consumerStack.length - 1];
    }

    getParentConsumerData() {
        return this.consumerStack[this.consumerStack.length - 2];
    }

    pushDataToStack(data) {
        // Active data is always on top
        this.consumerStack.push(data);

        // Just add data, if nothing exists here
        if (!this.output) {
            this.output = data;
            return data;
        }

        // Let's check if we are allowed to push data to its contains, otherways push to the end
        if (this.output.canContain(data)) this.output.addConsumer(data);
        else throw new Error('Could not parse arguments string');

        return data;
    }

    removeDataFromStack(consumerId) {
        let lastConsumer = this.getCurrentData();

        if (lastConsumer.getId() != consumerId)
            throw new Error(`${consumerId} tries to close ${lastConsumer.getId()} `);

        lastConsumer = this.consumerStack.pop();
        lastConsumer.finish();
    }

    _nextIndex(skip = false) {
        let charToSkip = 1
        if (skip) {
            // if (this.getCurrentData() && this.getCurrentData().getId() != StringConsumer.getId()) {
            // Skip empty space and return and new line between arguments

            while ([' ', '\n', '\r'].includes(this.content[this._currentIndex + charToSkip])) {
                charToSkip += 1
                if (!this.content[this._currentIndex + charToSkip]) break;
            }
        }
        return this._currentIndex + charToSkip;
    }

    current() {
        return this.content[this._currentIndex];
    }

    next(forceSkip) {
        let skip = this.getCurrentData()?.getId() != StringConsumer.getId()
        this._lastIndex = this._currentIndex
        this._currentIndex = this._nextIndex(forceSkip ?? skip);
        return this.content[this._currentIndex];
    }

    peek(forceSkip) {
        let skip = this.getCurrentData()?.getId() != StringConsumer.getId()
        return this.content[this._nextIndex(forceSkip ?? skip)];
    }

    previous() {
        return this.content[this._lastIndex];
    }

    parse() {
        while (this.peek()) {
            this.next();

            // TODO: Feel free to suggest a better aproach for this.
            // One possible solution could be d dynamically called consumer system
            // that checks if the consumer has consumed the current item
            if (
                this.getCurrentData() &&
                !(
                    GroupConsumer.getId() == this.getCurrentData().getId() ||
                    TypeConsumer.getId() == this.getCurrentData().getId()
                )
            ) {
                switch (this.getCurrentData().getId()) {
                    case StringConsumer.getId():
                        StringConsumer.consume(this);
                        continue;
                    case NumberConsumer.getId():
                        NumberConsumer.consume(this);
                        continue;
                    case ReferenceConsumer.getId():
                        ReferenceConsumer.consume(this);
                        continue;
                    case BooleanConsumer.getId():
                        BooleanConsumer.consume(this);
                        continue;
                    case UnsetConsumer.getId():
                        UnsetConsumer.consume(this);
                        continue;
                    case SubtypeConsumer.getId():
                        SubtypeConsumer.consume(this);
                        continue;
                    default:
                        break;
                }
            }

            // Skip comments between arguments
            if (this.current() == '/' && this.peek() == '*') {
                while (this.current() == '*' && this.peek() == '/') {
                    if (!this.current()) return this.output;
                    this.next();
                }
            }

            GroupConsumer.consume(this);
            StringConsumer.consume(this);
            NumberConsumer.consume(this);
            ReferenceConsumer.consume(this);
            TypeConsumer.consume(this);
            BooleanConsumer.consume(this);
            UnsetConsumer.consume(this);
            SubtypeConsumer.consume(this);
        }

        return this.output;
    }
}

exports.AttributeParser = AttributeParser;
