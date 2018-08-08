import matches from '../../src/query/matches';

describe('matches()', () => {
    const fixtures = document.createElement('div');
    fixtures.id = 'fixtures';

    document.body.appendChild(fixtures);

    beforeEach(function() {
        fixtures.innerHTML = '<div id="foo" class="bar"></div>';
    });

    afterEach(function() {
        fixtures.innerHTML = '';
    });

    after(function() {
        document.body.removeChild(fixtures);
    });

    it('matches against a CSS selector', () => {
        const div = document.getElementById('foo');

        assert(matches(div, 'div'));
        assert(matches(div, '#foo'));
        assert(matches(div, 'body .bar'));

        assert(!matches(div, 'p'));
        assert(!matches(div, '#bar'));
    });

    it('works for non-elements', () => {
        assert.isFalse(matches(null, '#foo'));
    });

    it('works for empty selectors', () => {
        const div = document.getElementById('foo');

        assert.isFalse(matches(div, ''));
    });
});
