import { describe, it, assert } from 'vitest';
import { ProductDefinition } from './ProductDefinition.js';
import { Product } from './Product.js';
import { NextAssemblyUsageOccurrence } from './NextAssemblyUsageOccurrence.js';

describe('Entity getters', () => {
    it('ProductDefinition getters', () => {
        const e = new ProductDefinition("('ID1','desc',#100,#200)");
        assert.equal(e.getId(), 'ID1');
        assert.equal(e.getDescription(), 'desc');
        assert.equal(e.getFormation(), '100');
        assert.equal(e.getFrameOfReference(), '200');
    });

    it('Product getters with set of refs', () => {
        const e = new Product("('PID','Name','desc',(#1,#2,#3))");
        assert.equal(e.getId(), 'PID');
        assert.equal(e.getName(), 'Name');
        assert.equal(e.getDescription(), 'desc');
        const fr = e.getFrameOfReference();
        assert.deepEqual(
            fr.map((c) => c.getValue()),
            ['1', '2', '3'],
        );
    });

    it('NextAssemblyUsageOccurrence getters', () => {
        const e = new NextAssemblyUsageOccurrence("('RID','nm','dsc',#10,#20,'ref')");
        assert.equal(e.getId(), 'RID');
        assert.equal(e.getName(), 'nm');
        assert.equal(e.getDescription(), 'dsc');
        assert.equal(e.getRelatingProductDefinition(), '10');
        assert.equal(e.getRelatedProductDefinition(), '20');
        assert.equal(e.getReferenceDesignator(), 'ref');
    });
});
