import {dispatch, on} from '../../index.js';
import createFixture from '../fixture.js';

describe('on()', () => {
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

    it('adds a listener', done => {
        const element = document.querySelector('#item-2');

        on(element, 'click', () => done());

        dispatch(element, 'click');
    });

    it('removes the listener when remove() is called', () => {
        const element = document.querySelector('#item-2');
        const remove = on(element, 'click', () => {
            throw new Error('event fired');
        });

        remove();

        dispatch(element, 'click');
    });

    it('invokes a listener only once', () => {
        const element = document.querySelector('#item-2');
        let called = 0;

        on(element, 'click', () => {
            called++;
        }, {once: true});

        dispatch(element, 'click');
        dispatch(element, 'click');

        assert.equal(called, 1);
    });

    it('works for non-event-targets', () => {
        assert.isFunction(on(undefined, 'click', () => {}));
        assert.isFunction(on('string', 'click', () => {}));
        assert.isFunction(on(true, 'click', () => {}));
        assert.isFunction(on(null, 'click', () => {}));
        assert.isFunction(on(1, 'click', () => {}));
        assert.isFunction(on(1.2, 'click', () => {}));
        assert.isFunction(on({foo: 'bar'}, 'click', () => {}));
        assert.isFunction(on(['bar'], 'click', () => {}));
    });
});
