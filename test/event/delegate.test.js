import { delegate, dispatch } from '../../index';

describe('delegate()', () => {
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

    it('delegates the handling of events to an ancestor element', done => {
        const el = document.getElementById('item-1');
        const el2 = document.getElementById('item-2');

        delegate(el, 'click', '#item-2', () => done());

        dispatch(el2, 'click', {
            bubbles: true
        });
    });

    it('does not invoke listener if selector does not match', () => {
        const el = document.getElementById('item-1');
        const el2 = document.getElementById('item-2');

        let called = 0;
        const spy = () => {
            called++
        };

        delegate(el, 'click', '#item-3', spy);

        dispatch(el2, 'click', {
            bubbles: true
        });

        assert.equal(called, 0);
    });

    it('binds the listener to the delegate target', () => {
        const el = document.getElementById('item-1');
        const el2 = document.getElementById('item-2');

        let thisValue;
        const spy = function() {
            thisValue = this;
        };

        delegate(el, 'click', '#item-1', spy);

        dispatch(el2, 'click', {
            bubbles: true
        });

        assert.equal(thisValue, el);
    });

    it('returns a off method', () => {
        const el = document.getElementById('item-1');
        const el2 = document.getElementById('item-2');

        let called = 0;
        const spy = () => {
            called++
        };

        const off = delegate(el, 'click', '#item-2', spy);

        dispatch(el2, 'click', {
            bubbles: true
        });

        off();

        dispatch(el2, 'click', {
            bubbles: true
        });

        assert.equal(called, 1);
    });

    it('invokes a listener only once', () => {
        const el = document.getElementById('item-1');
        const el2 = document.getElementById('item-2');
        const el3 = document.getElementById('item-3');

        let called = 0;
        const spy = () => {
            called++
        };

        delegate(el, 'click', '#item-2', spy, {once: true});

        // Dispatch event on non-matching child element
        dispatch(el3, 'click', {
            bubbles: true
        });

        dispatch(el2, 'click', {
            bubbles: true
        });
        dispatch(el2, 'click', {
            bubbles: true
        });

        assert.equal(called, 1);
    });

    it('works for non-event-targets', () => {
        assert.isFunction(delegate(undefined, 'click', '#foo', () => {}));
        assert.isFunction(delegate('string', 'click', '#foo', () => {}));
        assert.isFunction(delegate(true, 'click', '#foo', () => {}));
        assert.isFunction(delegate(null, 'click', '#foo', () => {}));
        assert.isFunction(delegate(1, 'click', '#foo', () => {}));
        assert.isFunction(delegate(1.2, 'click', '#foo', () => {}));
        assert.isFunction(delegate({foo: 'bar'}, 'click', '#foo', () => {}));
        assert.isFunction(delegate(['bar'], 'click', '#foo', () => {}));
    });
});
