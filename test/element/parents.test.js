import {parents} from '../../index.js';
import createFixture from '../fixture.js';

describe('parents()', () => {
    let fixture;

    beforeEach(() => {
        fixture = createFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('returns array fo parent elements', () => {
        fixture.append('<p id="p"><em id="em"><sup id="sup"></sup><em></p>');

        const p = document.querySelector('#p');
        const em = document.querySelector('#em');
        const sup = document.querySelector('#sup');

        assert.deepEqual(parents(sup), [
            em,
            p,
            fixture.root,
            document.body,
            document.documentElement
        ]);
    });

    it('returns an empty array if no parents exist', () => {
        assert.deepEqual(parents(document.documentElement), []);
        assert.deepEqual(parents(document.createElement('div')), []);
    });

    it('works for non-elements', () => {
        parents(undefined, []);
        parents('string', []);
        parents(true, []);
        parents(null, []);
        parents(1, []);
        parents(1.2, []);
        parents({foo: 'bar'}, []);
        parents(['bar'], []);
    });
});
