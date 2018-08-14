import {viewportHeight} from '../..';

describe('viewportHeight()', () => {
    it('returns viewport height', () => {
        const height = viewportHeight();

        assert.isNumber(height);
    });

    it('returns viewport height with scrollbar', () => {
        const heightNoScrollbars = viewportHeight();

        const element = document.createElement('div');

        element.style.display = 'block';
        element.style.height = '9999px';
        element.style.width = '9999px';

        document.body.appendChild(element);

        const height = viewportHeight();

        assert.equal(heightNoScrollbars, height);

        document.body.removeChild(element);
    });
});
