import on from '../../src/event/on';
import dispatch from '../../src/event/dispatch';

describe('on()', () => {
    const fixtures = document.createElement('div');
    fixtures.id = 'fixtures';

    document.body.appendChild(fixtures);

    beforeEach(() => {
        fixtures.innerHTML =
            '<div id="item-1">' +
            '  <div id="item-2">' +
            '    <span>hello<span>' +
            '  </div>' +
            '  <div id="item-3"></div>' +
            '</div>';
    });

    afterEach(() => {
        fixtures.innerHTML = '';
    });

    after(() => {
        document.body.removeChild(fixtures);
    });

    it('adds a listener', done => {
        const el = document.getElementById('item-2');

        on(el, 'click', () => done());

        dispatch(el, 'click');
    });

    it('removes the listener when remove() is called', () => {
        const el = document.getElementById('item-2');
        const remove = on(el, 'click', () => {
            throw new Error('event fired')
        });

        remove();

        dispatch(el, 'click');
    });

    it('invokes a listener only once', () => {
        const el = document.getElementById('item-2');
        let called = 0;

        on(el, 'click', () => {
            called++;
        }, {once: true});

        dispatch(el, 'click');
        dispatch(el, 'click');

        assert.equal(called, 1);
    });
});
