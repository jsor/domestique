import { viewport } from "../../index";

describe('viewport()', () => {
    it('returns viewport dimensions', () => {
        const vp = viewport();

        assert.isNumber(vp.width);
        assert.isNumber(vp.height);
    });

    it('returns viewport dimensions with scrollbar', () => {
        const vpNoScrollbars = viewport();

        const element = document.createElement('div');

        element.style.display = 'block';
        element.style.height = '9999px';
        element.style.width = '9999px';

        document.body.appendChild(element);

        const vp = viewport();

        assert.equal(vpNoScrollbars.width, vp.width);
        assert.equal(vpNoScrollbars.height, vp.height);

        document.body.removeChild(element);
    });
});
