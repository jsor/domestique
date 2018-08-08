import dispatch from '../../src/event/dispatch';

describe('dispatch()', () => {
    it('dispatches an event on the passed DOM element', done => {
        const cb = (event) => {
            assert.isFalse(event.bubbles);
            assert.isFalse(event.cancelable);
            assert.isFalse(event.composed);
            assert.isNull(event.detail);

            document.removeEventListener('click', cb);

            done();
        };

        document.addEventListener('click', cb);

        dispatch(document, 'click');
    });

    it('supports specifying event attributes via an optional object', done => {
        const detail = {foo: 'bar'};
        const cb = (event) => {
            assert(event.bubbles);
            assert(event.cancelable);
            assert.equal(event.detail, detail);

            document.removeEventListener('click', cb);

            done();
        };

        document.addEventListener('click', cb);

        dispatch(document, 'click', {bubbles: true, cancelable: true, detail: detail});
    });

    it('returns the value of element.dispatchEvent', () => {
        const cb = (event) => {
            event.preventDefault();
        };

        assert(dispatch(document, 'click', {cancelable: true}));

        document.addEventListener('click', cb);

        assert.isFalse(dispatch(document, 'click', {cancelable: true}));

        document.removeEventListener('click', cb);
    });
});
