import {matches} from '../../index.js';
import createFixture from '../fixture.js';

describe('matches()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
        fixture.append(
            '<div id="foo" class="bar"></div>'
        );
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('matches against a CSS selector', () => {
        const div = document.querySelector('#foo');

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
        const div = document.querySelector('#foo');

        assert.throws(() => {
            matches(div, '');
        });
    });
});
