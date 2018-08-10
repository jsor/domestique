import { create } from '../../index';

describe('create()', () => {
    it('creates a node from a string', () => {
        const html = '<article><section><p>foo</p><p>bar</p></section></article>';

        const node = create(html);

        assert.equal(node.outerHTML, html);
    });

    it('creates a node from a string (single tag)', () => {
        const html = '<div></div>';

        const node = create(html);

        assert.equal(node.tagName.toLowerCase(), 'div');
    });

    it('creates a node from a string (self-closing tag)', () => {
        const html = '<span/>';

        const node = create(html);

        assert.equal(node.tagName.toLowerCase(), 'span');
    });

    it('creates a comment node from a string', function() {
        const node = create('<!--comment-->');

        assert.equal(node.nodeType, 8);
        assert.equal(node.textContent, 'comment');
    });

    // Special nodes which require specific parents
    // See: https://github.com/jquery/jquery/blob/c9aae3565edc840961ecbeee77fb0cb367c46702/src/manipulation/wrapMap.js

    it('creates a <legend/> node from a string', function() {
        const node = create('<legend/>');

        assert.equal(node.tagName.toLowerCase(), 'legend');
    });

    it('creates a <option/> node from a string', function() {
        const node = create('<option/>');

        assert.equal(node.tagName.toLowerCase(), 'option');
    });

    it('creates a <optgroup/> node from a string', function() {
        const node = create('<optgroup/>');

        assert.equal(node.tagName.toLowerCase(), 'optgroup');
    });

    it('creates a <thead/> node from a string', function() {
        const node = create('<thead/>');

        assert.equal(node.tagName.toLowerCase(), 'thead');
    });

    it('creates a <tbody/> node from a string', function() {
        const node = create('<tbody/>');

        assert.equal(node.tagName.toLowerCase(), 'tbody');
    });

    it('creates a <tfoot/> node from a string', function() {
        const node = create('<tfoot/>');

        assert.equal(node.tagName.toLowerCase(), 'tfoot');
    });

    it('creates a <colgroup/> node from a string', function() {
        const node = create('<colgroup/>');

        assert.equal(node.tagName.toLowerCase(), 'colgroup');
    });

    it('creates a <col/> node from a string', function() {
        const node = create('<col/>');

        assert.equal(node.tagName.toLowerCase(), 'col');
    });

    it('creates a <caption/> node from a string', function() {
        const node = create('<caption/>');

        assert.equal(node.tagName.toLowerCase(), 'caption');
    });

    it('creates a <tr/> node from a string', function() {
        const node = create('<tr/>');

        assert.equal(node.tagName.toLowerCase(), 'tr');
    });

    it('creates a <th/> node from a string', function() {
        const node = create('<th/>');

        assert.equal(node.tagName.toLowerCase(), 'th');
    });

    it('creates a <td/> node from a string', function() {
        const node = create('<td/>');

        assert.equal(node.tagName.toLowerCase(), 'td');
    });
});
