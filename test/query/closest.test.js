import {closest} from '../..';
import createFixture from '../fixture';

describe('closest()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
        fixture.append(
            '<div id="div">' +
            '  <p id="p">' +
            '    <em id="em"><em id="em2"></em></em>' +
            '  </p>' +
            '</div>'
        );
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('calls closest() if present on element', () => {
        let called = 0;
        const fake = {
            closest() {
                called++;
            }
        };

        closest(fake, 'p');

        assert.equal(called, 1);
    });

    it('finds a matching parent from a CSS selector', () => {
        const div = document.getElementById('div');
        const p = document.getElementById('p');
        const em = document.getElementById('em');

        p.closest = undefined;
        em.closest = undefined;

        assert(typeof p.closest !== 'function');
        assert(typeof em.closest !== 'function');

        assert.equal(closest(em, 'p'), p);
        assert.equal(closest(em, '#div'), div);
        assert.equal(closest(p, 'html > body'), document.body);

        assert(!closest(em, '#nomatch'));
    });

    it('does match the element itself', () => {
        const em = document.getElementById('em');
        const em2 = document.getElementById('em2');

        em.closest = undefined;
        em2.closest = undefined;

        assert(typeof em.closest !== 'function');
        assert(typeof em2.closest !== 'function');

        assert.equal(closest(em2, 'em'), em2);
    });

    it('does not match detached elements', () => {
        const em = document.getElementById('em');

        em.closest = undefined;

        assert(typeof em.closest !== 'function');

        em.parentNode.removeChild(em);

        assert.instanceOf(em, Element);

        assert.equal(closest(em, 'p'), null);
    });

    it('works for non-elements', () => {
        assert.isNull(closest(undefined, '#foo'));
        assert.isNull(closest('string', '#foo'));
        assert.isNull(closest(true, '#foo'));
        assert.isNull(closest(null, '#foo'));
        assert.isNull(closest(1, '#foo'));
        assert.isNull(closest(1.2, '#foo'));
        assert.isNull(closest({foo: 'bar'}, '#foo'));
        assert.isNull(closest(['bar'], '#foo'));
    });

    it('throws syntax error for invalid selector', () => {
        const div = document.getElementById('div');

        assert.throws(() => {
            closest(div, '');
        });
    });
});
