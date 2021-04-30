import {activeElement} from '../../index.js';
import createFixture from '../fixture.js';

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

        assert.instanceOf(activeElement(), Element);
    });
});
