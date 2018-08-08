import scrollbarWidth from '../../src/dimension/scrollbar-width';

describe('scrollbarWidth()', () => {
    it('returns a width', () => {
        assert.isNumber(scrollbarWidth());
    });

    it('always returns a width', () => {
        assert.isNumber(scrollbarWidth());
        assert.isNumber(scrollbarWidth());
        assert.isNumber(scrollbarWidth());
    });
});
