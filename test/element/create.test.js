import {create} from '../../index.js';

describe('create()', () => {
    it('creates a node from a string', () => {
        const html = '<article><section><p>foo</p><p>bar</p></section></article>';

        const node = create(html);

        assert.equal(node.outerHTML, html);
    });

    it('creates a node from a string (single tag)', () => {
        const node = create('<span></span>');

        assert.equal(node.tagName.toLowerCase(), 'span');
    });

    it('creates a node from a string (self-closing tag)', () => {
        const node = create('<span/>');

        assert.equal(node.tagName.toLowerCase(), 'span');
    });

    it('creates a comment node from a string', () => {
        const node = create('<!--comment-->');

        assert.equal(node.nodeType, 8);
        assert.equal(node.textContent, 'comment');
    });

    it('returns text node for text string', () => {
        const node = create('text');

        assert.equal(node.nodeType, 3);
        assert.equal(node.textContent, 'text');
    });

    it('returns text node for empty string', () => {
        const node = create('');

        assert.equal(node.nodeType, 3);
        assert.equal(node.textContent, '');
    });

    it('returns last element for multiple root element', () => {
        const node = create('<p></p><span/>');

        assert.equal(node.tagName.toLowerCase(), 'span');
    });

    it('returns detached element', () => {
        const node = create('<span></span>');

        assert.isNull(node.parentNode);
    });

    // Special nodes which require specific parents
    // See: https://github.com/jquery/jquery/blob/c9aae3565edc840961ecbeee77fb0cb367c46702/src/manipulation/wrapMap.js

    it('creates a <legend/> node from a string', () => {
        const node = create('<legend/>');

        assert.equal(node.tagName.toLowerCase(), 'legend');
        assert.isNull(node.parentNode);
    });

    it('creates a <option/> node from a string', () => {
        const node = create('<option/>');

        assert.equal(node.tagName.toLowerCase(), 'option');
        assert.isNull(node.parentNode);
    });

    it('creates a <optgroup/> node from a string', () => {
        const node = create('<optgroup/>');

        assert.equal(node.tagName.toLowerCase(), 'optgroup');
        assert.isNull(node.parentNode);
    });

    it('creates a <thead/> node from a string', () => {
        const node = create('<thead/>');

        assert.equal(node.tagName.toLowerCase(), 'thead');
        assert.isNull(node.parentNode);
    });

    it('creates a <tbody/> node from a string', () => {
        const node = create('<tbody/>');

        assert.equal(node.tagName.toLowerCase(), 'tbody');
        assert.isNull(node.parentNode);
    });

    it('creates a <tfoot/> node from a string', () => {
        const node = create('<tfoot/>');

        assert.equal(node.tagName.toLowerCase(), 'tfoot');
        assert.isNull(node.parentNode);
    });

    it('creates a <colgroup/> node from a string', () => {
        const node = create('<colgroup/>');

        assert.equal(node.tagName.toLowerCase(), 'colgroup');
        assert.isNull(node.parentNode);
    });

    it('creates a <col/> node from a string', () => {
        const node = create('<col/>');

        assert.equal(node.tagName.toLowerCase(), 'col');
        assert.isNull(node.parentNode);
    });

    it('creates a <caption/> node from a string', () => {
        const node = create('<caption/>');

        assert.equal(node.tagName.toLowerCase(), 'caption');
        assert.isNull(node.parentNode);
    });

    it('creates a <tr/> node from a string', () => {
        const node = create('<tr/>');

        assert.equal(node.tagName.toLowerCase(), 'tr');
        assert.isNull(node.parentNode);
    });

    it('creates a <th/> node from a string', () => {
        const node = create('<th/>');

        assert.equal(node.tagName.toLowerCase(), 'th');
        assert.isNull(node.parentNode);
    });

    it('creates a <td/> node from a string', () => {
        const node = create('<td/>');

        assert.equal(node.tagName.toLowerCase(), 'td');
        assert.isNull(node.parentNode);
    });

    it('returns element as is if already a node', () => {
        const element = document.createElement('div');
        const node = create(element);

        assert.equal(node, element);
    });
});
