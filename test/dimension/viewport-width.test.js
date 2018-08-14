import {viewportWidth} from '../..';

describe('viewportWidth()', () => {
    it('returns viewport width', () => {
        const width = viewportWidth();

        assert.isNumber(width);
    });

    it('returns viewport width with scrollbar', () => {
        const widthNoScrollbars = viewportWidth();

        const element = document.createElement('div');

        element.style.display = 'block';
        element.style.width = '9999px';
        element.style.width = '9999px';

        document.body.appendChild(element);

        const width = viewportWidth();

        assert.equal(widthNoScrollbars, width);

        document.body.removeChild(element);
    });
});
