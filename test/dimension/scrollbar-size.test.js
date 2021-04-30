import {scrollbarSize} from '../../index.js';

describe('scrollbarSize()', () => {
    it('returns a size', () => {
        assert.isNumber(scrollbarSize());
    });

    it('always returns a size', () => {
        assert.isNumber(scrollbarSize());
        assert.isNumber(scrollbarSize());
        assert.isNumber(scrollbarSize());
    });
});
