import { focus } from '../../index';

describe('focus()', () => {
    it('focuses element', () => {
        const element = document.createElement('button');

        document.body.appendChild(element);

        focus(element);

        assert.equal(document.activeElement, element);

        document.body.removeChild(element);
    });

    it('works for non-elements', () => {
        focus(undefined);
        focus('string');
        focus(true);
        focus(null);
        focus(1);
        focus(1.2);
        focus({foo: 'bar'});
        focus(['bar']);
    });
});
