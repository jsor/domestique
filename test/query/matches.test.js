import { matches } from '../../index';

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

    it('works for non-elements', () => {
        assert.isFalse(matches(undefined, '#foo'));
        assert.isFalse(matches('string', '#foo'));
        assert.isFalse(matches(true, '#foo'));
        assert.isFalse(matches(null, '#foo'));
        assert.isFalse(matches(1, '#foo'));
        assert.isFalse(matches(1.2, '#foo'));
        assert.isFalse(matches({foo: 'bar'}, '#foo'));
        assert.isFalse(matches(['bar'], '#foo'));
    });

    it('throws syntax error for invalid selector', () => {
        const div = document.getElementById('foo');

        assert.throws(() => {
            matches(div, '');
        });
    });
});
