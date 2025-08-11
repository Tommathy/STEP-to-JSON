type ConsumerTypeId =
    (typeof AttributeParser.consumerType)[keyof typeof AttributeParser.consumerType];

// Values that an attribute can resolve to when calling getValue()
export type AttributeValue = string | number | boolean | null | '$' | '*';

export class Consumer<
    TValue extends AttributeValue | Consumer<any>[] | undefined =
        | AttributeValue
        | Consumer<any>[],
> {
    private _id: string;
    private _match: string;
    public _contains: Consumer<any>[]; // only non-empty for groups
    protected _value: TValue | undefined;

    constructor(id: string) {
        this._id = id;
        this._match = '';
        this._contains = [];
        this._value = undefined as TValue | undefined;
    }

    getContains(): Consumer<any>[] {
        return this._contains;
    }

    getValue(): TValue | undefined {
        return this._value;
    }

    setValue(newValue: TValue): void {
        this._value = newValue;
    }

    addMatch(char: string | undefined): void {
        if (char) this._match += char;
    }

    getMatch(): string {
        return this._match;
    }

    getId(): string {
        return this._id;
    }

    static getId(): ConsumerTypeId {
        throw new Error(`Static getId function not implemented"`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static consume(_parser: AttributeParser): boolean | void {
        throw new Error(`consume function not implemented"`);
    }

    finish(): void {
        throw new Error('Finish not implemented');
    }
}

class GroupConsumer extends Consumer<Consumer<any>[]> {
    constructor() {
        super(GroupConsumer.getId());
    }

    static getId(): ConsumerTypeId {
        return AttributeParser.consumerType.GROUP;
    }

    static consume(parser: AttributeParser): boolean {
        if (parser.current() == '(') {
            parser.pushToStack(new GroupConsumer());
            parser.next(); // Dispose: (
            return true;
        }

        if (parser.current() == ')') {
            const groupConsumer = parser.removeDataFromStack();
            const currentConsumer = parser.currentStackEntry();
            if (currentConsumer && groupConsumer) {
                currentConsumer.getContains().push(groupConsumer);
            }
            parser.next(); // Dispose: )
            return true;
        }

        return false;
    }
}

class UnsetConsumer extends Consumer<'$'> {
    constructor() {
        super(UnsetConsumer.getId());
    }

    finish(): void {
        // value is still null, because this argument is unset
        this.setValue('$');
        return;
    }

    static getId(): ConsumerTypeId {
        return AttributeParser.consumerType.UNSET;
    }

    static consume(parser: AttributeParser): boolean {
        if (parser.current() == '$') {
            const consumer = new UnsetConsumer();
            consumer.addMatch(parser.next()); // Consume: $
            consumer.finish();
            const current = parser.currentStackEntry();
            if (current) current.getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class SubtypeConsumer extends Consumer<'*'> {
    constructor() {
        super(UnsetConsumer.getId());
    }

    finish(): void {
        // value is still null, because this argument inherts its data from "somewhere else". its weird
        this.setValue('*');
        return;
    }

    static getId(): ConsumerTypeId {
        return AttributeParser.consumerType.SUBTYPE;
    }

    static consume(parser: AttributeParser): boolean | void {
        if (parser.current() == '*') {
            const consumer = new UnsetConsumer();
            consumer.addMatch(parser.next()); // Consume: *
            consumer.finish();
            const current = parser.currentStackEntry();
            if (current) current.getContains().push(consumer);
            return true;
        }

        return;
    }
}

class StringConsumer extends Consumer<string> {
    constructor() {
        super(StringConsumer.getId());
    }

    finish(): void {
        this.setValue(this.getMatch());
    }

    static getId(): ConsumerTypeId {
        return AttributeParser.consumerType.STRING;
    }

    static consume(parser: AttributeParser): boolean {
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
            const current = parser.currentStackEntry();
            if (current) current.getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class NumberConsumer extends Consumer<number> {
    constructor() {
        super(NumberConsumer.getId());
    }

    finish(): void {
        const match = this.getMatch();
        const parsed = parseFloat(match);
        this.setValue(parsed);
    }

    static getId(): ConsumerTypeId {
        return AttributeParser.consumerType.NUMBER;
    }

    static consume(parser: AttributeParser): boolean {
        if (/[+\-0-9.]/.test(parser.current() ?? '')) {
            const consumer = new NumberConsumer();

            while (/[-+0-9.E]/.test(parser.current() ?? '')) {
                consumer.addMatch(parser.next()); // Consume: char
            }

            consumer.finish();
            const current = parser.currentStackEntry();
            if (current) current.getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class EnumConsumer extends Consumer<boolean | null | string> {
    constructor() {
        super(EnumConsumer.getId());
    }

    finish(): void {
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

    static getId(): ConsumerTypeId {
        return AttributeParser.consumerType.ENUM;
    }

    static consume(parser: AttributeParser): boolean {
        if (parser.current() == '.') {
            const consumer = new EnumConsumer();
            const startingIndex = parser._currentIndex;
            parser.next(); // Dispose: .
            while (/[a-zA-Z0-9_]/.test(parser.current() ?? '')) {
                consumer.addMatch(parser.next()); // Consume: char
            }

            if (parser.next() != '.') {
                // Check if we end with a .
                parser._currentIndex = startingIndex;
                return false;
            }

            consumer.finish();
            const current = parser.currentStackEntry();
            if (current) current.getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class CommentConsumer extends Consumer<undefined> {
    constructor() {
        super(UnsetConsumer.getId());
    }

    static getId(): ConsumerTypeId {
        return AttributeParser.consumerType.COMMENT;
    }

    static consume(parser: AttributeParser): boolean {
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

class ReferenceConsumer extends Consumer<string> {
    constructor() {
        super(ReferenceConsumer.getId());
    }

    finish(): void {
        this.setValue(this.getMatch());
        return;
    }

    static getId(): ConsumerTypeId {
        return AttributeParser.consumerType.REFERENCE;
    }

    static consume(parser: AttributeParser): boolean {
        if (parser.current() == '#') {
            const consumer = new ReferenceConsumer();
            parser.next(); // Consume: #

            while (/[0-9]/.test(parser.current() ?? '')) {
                consumer.addMatch(parser.next()); // Consume: digit
            }

            consumer.finish();
            const current = parser.currentStackEntry();
            if (current) current.getContains().push(consumer);
            return true;
        }

        return false;
    }
}

class AttributeParser {
    public _currentIndex: number;
    private _content: string[];
    private _stack: Consumer<any>[];
    private _result: GroupConsumer | null;

    constructor(content: string) {
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
        COMMENT: 'comment',
    } as const;

    current(): string | undefined {
        return this._content[this._currentIndex];
    }

    peek(amount = 1): string | undefined {
        return this._content[this._currentIndex + amount];
    }

    next(): string | undefined {
        const currentChar = this._content[this._currentIndex];
        this._currentIndex += 1;
        return currentChar;
    }

    pushToStack(consumer: Consumer<any>): boolean | null {
        if (this._stack.length == 0) {
            if (consumer?.getId() == GroupConsumer.getId()) {
                this._stack.push(consumer);
                this._result = consumer as GroupConsumer;

                return true;
            }

            return null;
        }

        this._stack.push(consumer);

        return true;
    }

    currentStackEntry(): Consumer<any> | null {
        if (this._stack.length == 0) return null;
        return this._stack[this._stack.length - 1] ?? null;
    }

    removeDataFromStack(): Consumer<any> | null {
        const currentConsumer = this.currentStackEntry();
        if (
            this._stack.length == 0 ||
            currentConsumer?.getId() != GroupConsumer.getId()
        )
            return null;

        return this._stack.pop() ?? null;
    }

    parse(): GroupConsumer {
        if (!GroupConsumer.consume(this))
            throw new Error('No group consumer found');

        while (this.current()) {
            if (GroupConsumer.consume(this)) continue;
            if (StringConsumer.consume(this)) continue;
            if (EnumConsumer.consume(this)) continue;
            if (ReferenceConsumer.consume(this)) continue;
            if (NumberConsumer.consume(this)) continue;
            if (UnsetConsumer.consume(this)) continue;
            if (SubtypeConsumer.consume(this)) continue;
            if (CommentConsumer.consume(this)) continue;

            if (!/[,\s\n\r]/.test(this.current() ?? '')) {
                // eslint-disable-next-line no-console
                console.log(this._content.join(''));
                // eslint-disable-next-line no-console
                console.log(`${'~'.repeat(this._currentIndex)}^`);
                throw new Error(
                    `Failed to parse: ${this.current()} at index ${this._currentIndex}`,
                );
            }

            this.next(); // Dispose: ,
        }

        if (!this._result) throw new Error('No parse result');
        return this._result;
    }
}

export { AttributeParser };
