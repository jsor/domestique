import {activeElement} from '../..';
import createFixture from '../fixture';

describe('activeElement()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('returns the active element', () => {
        const element = fixture.append('<button></button>');

        element.focus();

        assert.equal(activeElement(), element);
    });

    it('always returns active element', () => {
        document.activeElement.blur();

        assert.equal(activeElement(), document.body);
    });
});
