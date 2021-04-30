import {viewportHeight} from '../../index.js';
import createFixture from '../fixture.js';

describe('viewportHeight()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('returns viewport height', () => {
        const height = viewportHeight();

        assert.isNumber(height);
    });

    it('returns viewport height with scrollbar', () => {
        const heightNoScrollbars = viewportHeight();

        fixture.append('<div style="display:block;width:9999px;height:9999px"></div>');

        const height = viewportHeight();

        assert.equal(heightNoScrollbars, height);
    });
});
