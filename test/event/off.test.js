import {dispatch, off, on} from '../..';

describe('off()', () => {
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

    it('removes a listener', () => {
        const el = document.getElementById('item-2');

        const listener = () => {
            throw new Error('event fired');
        };

        on(el, 'click', listener);
        off(el, 'click', listener);

        dispatch(el, 'click');
    });

    it('works for non-event-targets', () => {
        assert.isFunction(off(undefined, 'click', () => {
        }));
        assert.isFunction(off('string', 'click', () => {
        }));
        assert.isFunction(off(true, 'click', () => {
        }));
        assert.isFunction(off(null, 'click', () => {
        }));
        assert.isFunction(off(1, 'click', () => {
        }));
        assert.isFunction(off(1.2, 'click', () => {
        }));
        assert.isFunction(off({foo: 'bar'}, 'click', () => {
        }));
        assert.isFunction(off(['bar'], 'click', () => {
        }));
    });
});
