import {create, data} from '../../index.js';

describe('data()', () => {
    it('returns null for non-existent data attributes', () => {
        const element = create('<div/>');

        assert.isNull(data(element, 'test'));
    });

    it('reads string data attributes', () => {
        const element = create('<div data-test="string"/>');

        assert.equal(data(element, 'test'), 'string');
    });

    it('reads bool true data attributes', () => {
        const element = create('<div data-test="true"/>');

        assert(data(element, 'test'));
    });

    it('reads bool false data attributes', () => {
        const element = create('<div data-test="false"/>');

        assert.isFalse(data(element, 'test'));
    });

    it('reads null data attributes', () => {
        const element = create('<div data-test="null"/>');

        assert.isNull(data(element, 'test'));
    });

    it('reads integer data attributes', () => {
        const element = create('<div data-test="1"/>');

        assert.equal(data(element, 'test'), 1);
    });

    it('reads float data attributes', () => {
        const element = create('<div data-test="1.2"/>');

        assert.equal(data(element, 'test'), 1.2);
    });

    it('reads JSON object data attributes', () => {
        const element = create('<div/>');

        element.setAttribute('data-test', JSON.stringify({foo: 'bar'}));

        assert.deepEqual(data(element, 'test'), {foo: 'bar'});
    });

    it('reads JSON array data attributes', () => {
        const element = create('<div/>');

        element.setAttribute('data-test', JSON.stringify(['foo']));

        assert.deepEqual(data(element, 'test'), ['foo']);
    });

    it('ignores invalid JSON data attributes', () => {
        const element = create('<div/>');

        element.setAttribute('data-test', '{"foo": bar}');

        assert.equal(data(element, 'test'), '{"foo": bar}');
    });

    it('works for non-elements', () => {
        assert.isNull(data(undefined, 'test'));
        assert.isNull(data('string', 'test'));
        assert.isNull(data(true, 'test'));
        assert.isNull(data(null, 'test'));
        assert.isNull(data(1, 'test'));
        assert.isNull(data(1.2, 'test'));
        assert.isNull(data({foo: 'bar'}, 'test'));
        assert.isNull(data(['bar'], 'test'));
    });
});
