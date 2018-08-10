import { find } from '../../index';

describe('find()', () => {
    const fixtures = document.createElement('div');
    fixtures.id = 'fixtures';

    document.body.appendChild(fixtures);

    beforeEach(function() {
        fixtures.innerHTML = '<span id="foo" class="bar"><span id="nested" class="baz"></span></span>';
    });

    afterEach(function() {
        fixtures.innerHTML = '';
    });

    after(function() {
        document.body.removeChild(fixtures);
    });

    it('queries against a CSS selector', () => {
        const span = document.getElementById('foo');

        assert.equal(find('span', span).length, 1);

        assert.equal(find('#foo').length, 1);

        assert.equal(find('#nested', span).length, 1);

        assert.equal(find('body .bar').length, 1);

        assert.equal(find('p', span).length, 0);

        assert.equal(find('#bar', span).length, 0);
    });

    it('works for non-elements', () => {
        assert.equal(find('#foo', null).length, 0);
    });

    it('works for empty selectors', () => {
        const span = document.getElementById('foo');

        assert.equal(find('', span).length, 0);
    });
});
