import {viewportWidth} from '../..';
import createFixture from '../fixture';

describe('viewportWidth()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('returns viewport width', () => {
        const width = viewportWidth();

        assert.isNumber(width);
    });

    it('returns viewport width with scrollbar', () => {
        const widthNoScrollbars = viewportWidth();

        fixture.append('<div style="display:block;width:9999px;height:9999px"></div>');

        const width = viewportWidth();

        assert.equal(widthNoScrollbars, width);
    });
});
