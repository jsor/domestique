import inViewport from "../../src/dimension/in-viewport";

describe('inViewport()', () => {
    it('returns true for element in viewport', () => {
        const element = document.createElement('div');

        document.body.appendChild(element);

        assert(inViewport(element));

        document.body.removeChild(element);
    });

    it('returns false for element not in viewport', () => {
        const element = document.createElement('div');

        element.style.position = 'absolute';
        element.style.top = '-9999px';
        element.style.left = '-9999px';

        document.body.appendChild(element);

        assert.isFalse(inViewport(element));

        document.body.removeChild(element);
    });

    it('works for non-elements', () => {
        assert.isFalse(inViewport(null));
    });
});
