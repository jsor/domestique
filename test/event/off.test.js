import on from '../../src/event/on';
import off from '../../src/event/off';
import dispatch from '../../src/event/dispatch';

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
            throw new Error('event fired')
        };

        on(el, 'click', listener);
        off(el, 'click', listener);

        dispatch(el, 'click');
    });
});
