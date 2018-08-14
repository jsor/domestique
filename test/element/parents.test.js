import {parents} from '../..';

describe('parents()', () => {
    it('returns array fo parent elements', () => {
        const fixtures = document.createElement('div');
        fixtures.id = 'fixtures';

        document.body.appendChild(fixtures);

        fixtures.innerHTML = '<p id="p"><em id="em"><sup id="sup"></sup><em></p>';

        const p = document.getElementById('p');
        const em = document.getElementById('em');
        const sup = document.getElementById('sup');

        assert.deepEqual(parents(sup), [
            em,
            p,
            fixtures,
            document.body,
            document.documentElement
        ]);

        document.body.removeChild(fixtures);
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
