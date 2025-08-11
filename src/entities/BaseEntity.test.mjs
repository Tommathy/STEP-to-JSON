import { describe, it, assert } from 'vitest';
import { BaseEntity } from './BaseEntity.js';

class Dummy extends BaseEntity {
    constructor(attrs) {
        super(attrs);
    }
}

describe('BaseEntity', () => {
    it('parses attributes lazily and caches result', () => {
        const e = new Dummy('(#123)');
        const a1 = e.getAttributes();
        const a2 = e.getAttributes();
        assert.strictEqual(a1, a2);
        // ensure parsed content is correct shape
        const vals = a1.getContains().map((c) => c.getValue());
        assert.deepEqual(vals, ['123']);
    });

    it('resolveReference default returns null', () => {
        assert.isNull(BaseEntity.resolveReference());
    });
});
