import {inViewport} from '../..';
import createFixture from '../fixture';

describe('inViewport()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('returns true for element in viewport', () => {
        const element = fixture.append('<div></div>');

        assert(inViewport(element));
    });

    it('returns false for element not in viewport', () => {
        const element = fixture.append('<div></div>');

        element.style.position = 'absolute';
        element.style.top = '-9999px';
        element.style.left = '-9999px';

        assert.isFalse(inViewport(element));
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
