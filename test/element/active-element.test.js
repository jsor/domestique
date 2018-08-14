import {activeElement} from '../..';

describe('activeElement()', () => {
    it('returns the active element', () => {
        const element = document.createElement('button');

        document.body.appendChild(element);

        element.focus();

        assert.equal(activeElement(), element);

        document.body.removeChild(element);
    });

    it('always returns active element', () => {
        document.activeElement.blur();

        assert.equal(activeElement(), document.body);
    });
});
