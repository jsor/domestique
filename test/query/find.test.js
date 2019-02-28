import {find} from '../..';
import createFixture from '../fixture';

describe('find()', () => {
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

        assert.equal(find('span', span).length, 1);

        assert.equal(find('#foo').length, 1);

        assert.equal(find('#nested', span).length, 1);

        assert.equal(find('body .bar').length, 1);

        assert.equal(find('p', span).length, 0);

        assert.equal(find('#bar', span).length, 0);
    });

    it('works for non-nodes', () => {
        assert.equal(find('#foo', undefined).length, 0);
        assert.equal(find('#foo', 'string').length, 0);
        assert.equal(find('#foo', true).length, 0);
        assert.equal(find('#foo', null).length, 0);
        assert.equal(find('#foo', 1).length, 0);
        assert.equal(find('#foo', 1.2).length, 0);
        assert.equal(find('#foo', {foo: 'bar'}).length, 0);
        assert.equal(find('#foo', ['bar']).length, 0);
    });

    it('throws syntax error for invalid selector', () => {
        assert.throws(() => {
            find('');
        });
    });
});
