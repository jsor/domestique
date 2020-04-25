import {dispatch, off, on} from '../..';
import createFixture from '../fixture';

describe('off()', () => {
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

    it('removes a listener', () => {
        const element = document.querySelector('#item-2');

        const listener = () => {
            throw new Error('event fired');
        };

        on(element, 'click', listener);
        off(element, 'click', listener);

        dispatch(element, 'click');
    });

    it('works for non-event-targets', () => {
        assert.isUndefined(off(undefined, 'click', () => {}));
        assert.isUndefined(off('string', 'click', () => {}));
        assert.isUndefined(off(true, 'click', () => {}));
        assert.isUndefined(off(null, 'click', () => {}));
        assert.isUndefined(off(1, 'click', () => {}));
        assert.isUndefined(off(1.2, 'click', () => {}));
        assert.isUndefined(off({foo: 'bar'}, 'click', () => {}));
        assert.isUndefined(off(['bar'], 'click', () => {}));
    });
});
