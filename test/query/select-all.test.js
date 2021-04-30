import {selectAll} from '../../index.js';
import createFixture from '../fixture.js';

describe('selectAll()', () => {
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

        assert.equal(selectAll(span, 'span').length, 1);
        assert.equal(selectAll(span, 'span')[0], nested);

        assert.equal(selectAll(document, '#foo').length, 1);
        assert.equal(selectAll(document, '#foo')[0], span);

        assert.equal(selectAll(span, '#nested').length, 1);
        assert.equal(selectAll(span, '#nested')[0], nested);

        assert.equal(selectAll(document, 'body .bar').length, 1);
        assert.equal(selectAll(document, 'body .bar')[0], span);

        assert.equal(selectAll(span, 'p').length, 0);

        assert.equal(selectAll(span, '#bar').length, 0);
    });

    it('works for non-nodes', () => {
        assert.equal(selectAll(undefined, '#foo').length, 0);
        assert.equal(selectAll('string', '#foo').length, 0);
        assert.equal(selectAll(true, '#foo').length, 0);
        assert.equal(selectAll(null, '#foo').length, 0);
        assert.equal(selectAll(1, '#foo').length, 0);
        assert.equal(selectAll(1.2, '#foo').length, 0);
        assert.equal(selectAll({foo: 'bar'}, '#foo').length, 0);
        assert.equal(selectAll(['bar'], '#foo').length, 0);
    });

    it('throws syntax error for invalid selector', () => {
        assert.throws(() => {
            selectAll(document, '');
        });
    });
});
