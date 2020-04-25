import {delegate, dispatch} from '../..';
import createFixture from '../fixture';

describe('delegate()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
        fixture.append(
            '<div id="item-1">' +
            '  <div id="item-2">' +
            '    <span>hello<span>' +
            '  </div>' +
            '  <div id="item-3"></div>' +
            '</div>'
        );
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('delegates the handling of events to an ancestor element', done => {
        const element = document.querySelector('#item-1');
        const element2 = document.querySelector('#item-2');

        delegate(element, 'click', '#item-2', () => done());

        dispatch(element2, 'click', {
            bubbles: true
        });
    });

    it('does not invoke listener if selector does not match', () => {
        const element = document.querySelector('#item-1');
        const element2 = document.querySelector('#item-2');

        let called = 0;
        const spy = () => {
            called++;
        };

        delegate(element, 'click', '#item-3', spy);

        dispatch(element2, 'click', {
            bubbles: true
        });

        assert.equal(called, 0);
    });

    it('passes delegate target as second argument to the listener', () => {
        const element = document.querySelector('#item-1');
        const element2 = document.querySelector('#item-2');

        let target;
        const spy = function (_, t) {
            target = t;
        };

        delegate(element, 'click', '#item-1', spy);

        dispatch(element2, 'click', {
            bubbles: true
        });

        assert.equal(target, element);
    });

    it('binds the listener to the delegate target', () => {
        const element = document.querySelector('#item-1');
        const element2 = document.querySelector('#item-2');

        let thisValue;
        const spy = function () {
            thisValue = this;
        };

        delegate(element, 'click', '#item-1', spy);

        dispatch(element2, 'click', {
            bubbles: true
        });

        assert.equal(thisValue, element);
    });

    it('returns a off method', () => {
        const element = document.querySelector('#item-1');
        const element2 = document.querySelector('#item-2');

        let called = 0;
        const spy = () => {
            called++;
        };

        const off = delegate(element, 'click', '#item-2', spy);

        dispatch(element2, 'click', {
            bubbles: true
        });

        off();

        dispatch(element2, 'click', {
            bubbles: true
        });

        assert.equal(called, 1);
    });

    it('invokes a listener only once', () => {
        const element = document.querySelector('#item-1');
        const element2 = document.querySelector('#item-2');
        const element3 = document.querySelector('#item-3');

        let called = 0;
        const spy = () => {
            called++;
        };

        delegate(element, 'click', '#item-2', spy, {once: true});

        // Dispatch event on non-matching child element
        dispatch(element3, 'click', {
            bubbles: true
        });

        dispatch(element2, 'click', {
            bubbles: true
        });
        dispatch(element2, 'click', {
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
