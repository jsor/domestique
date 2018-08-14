import {dispatch} from '../..';

describe('dispatch()', () => {
    it('dispatches an event on the passed DOM element', done => {
        const element = document.createElement('div');

        document.body.appendChild(element);

        const cb = event => {
            assert.isFalse(event.bubbles);
            assert.isFalse(event.cancelable);
            assert.isNull(event.detail);

            done();
        };

        element.addEventListener('click', cb);

        dispatch(element, 'click');

        element.removeEventListener('click', cb);

        document.body.removeChild(element);
    });

    it('supports specifying event attributes via an optional object', done => {
        const element = document.createElement('div');

        document.body.appendChild(element);

        const detail = {foo: 'bar'};
        const cb = event => {
            assert(event.bubbles);
            assert(event.cancelable);
            assert.equal(event.detail, detail);

            done();
        };

        element.addEventListener('click', cb);

        dispatch(element, 'click', {
            bubbles: true,
            cancelable: true,
            detail
        });

        element.removeEventListener('click', cb);

        document.body.removeChild(element);
    });

    it('returns the value of element.dispatchEvent', () => {
        const element = document.createElement('div');

        document.body.appendChild(element);

        const cb = event => {
            event.preventDefault();
        };

        assert(dispatch(element, 'click', {cancelable: true}));

        element.addEventListener('click', cb);

        assert.isFalse(dispatch(element, 'click', {cancelable: true}));

        element.removeEventListener('click', cb);

        document.body.removeChild(element);
    });

    it('works for non-event-targets', () => {
        assert(dispatch(undefined, 'click'));
        assert(dispatch('string', 'click'));
        assert(dispatch(true, 'click'));
        assert(dispatch(null, 'click'));
        assert(dispatch(1, 'click'));
        assert(dispatch(1.2, 'click'));
        assert(dispatch({foo: 'bar'}, 'click'));
        assert(dispatch(['bar'], 'click'));
    });
});
