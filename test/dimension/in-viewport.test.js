import { inViewport } from "../../index";

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
        assert.isFalse(inViewport(undefined));
        assert.isFalse(inViewport('string'));
        assert.isFalse(inViewport(true));
        assert.isFalse(inViewport(null));
        assert.isFalse(inViewport(1));
        assert.isFalse(inViewport(1.2));
        assert.isFalse(inViewport({foo: 'bar'}));
        assert.isFalse(inViewport(['bar']));
    });
});
