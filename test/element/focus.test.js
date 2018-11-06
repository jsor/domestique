import {focus, inViewport} from '../..';
import createFixture from '../fixture';

describe('focus()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('focuses element', () => {
        const element = fixture.append('<button></button>');

        assert.notEqual(document.activeElement, element, 'Not activeElement before focus');

        focus(element);

        assert.equal(document.activeElement, element, 'Is activeElement after focus');
    });

    it('works for non-elements', () => {
        focus(undefined);
        focus('string');
        focus(true);
        focus(null);
        focus(1);
        focus(1.2);
        focus({foo: 'bar'});
        focus(['bar']);
    });

    describe('with option.restoreScrollPosition', () => {
        it('restores scroll position after focusing element', () => {
            const element = fixture.append('<button style="display:block;margin-top:9999px"></button>');

            assert.isFalse(inViewport(element), 'Not in viewport before focus');

            focus(element, {
                restoreScrollPosition: true
            });

            assert.isFalse(inViewport(element), 'Not in viewport after focus');
        });
    });
});
