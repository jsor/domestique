import {select} from '../../index.js';
import createFixture from '../fixture.js';

describe('select()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
        fixture.append(
            '<span id="foo" class="bar"><span id="nested" class="baz"></span></span>'
        );
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('queries against a CSS selector', () => {
        const span = document.querySelector('#foo');
        const nested = document.querySelector('#nested');

        assert.equal(select(span, 'span'), nested);

        assert.equal(select(document, '#foo'), span);

        assert.equal(select(span, '#nested'), nested);

        assert.equal(select(document, 'body .bar'), span);

        assert.isNull(select(span, 'p'));

        assert.isNull(select(span, '#bar'));
    });

    it('works for non-nodes', () => {
        assert.isNull(select(undefined, '#foo'));
        assert.isNull(select('string', '#foo'));
        assert.isNull(select(true, '#foo'));
        assert.isNull(select(null, '#foo'));
        assert.isNull(select(1, '#foo'));
        assert.isNull(select(1.2, '#foo'));
        assert.isNull(select({foo: 'bar'}, '#foo'));
        assert.isNull(select(['bar'], '#foo'));
    });

    it('throws syntax error for invalid selector', () => {
        assert.throws(() => {
            select(document, '');
        });
    });
});
