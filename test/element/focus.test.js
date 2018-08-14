import {focus} from '../..';
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

        focus(element);

        assert.equal(document.activeElement, element);
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
});
