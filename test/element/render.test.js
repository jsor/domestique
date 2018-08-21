import {render} from '../..';

describe('render()', () => {
    it('creates references from a string', () => {
        const {article, section} = render('<article ref="article"><section ref="section"><p>foo</p><p>bar</p></section></article>');

        assert.instanceOf(article, Element);
        assert.isNull(article.parentElement);
        assert.equal(article.outerHTML, '<article><section><p>foo</p><p>bar</p></section></article>');

        assert.instanceOf(section, Element);
        assert.isNull(section.parentElement.parentElement);
        assert.equal(section.parentElement, article);
    });

    it('creates references from a string (single tag)', () => {
        const {node} = render('<span ref="node"></span>');

        assert.instanceOf(node, Element);
        assert.equal(node.tagName.toLowerCase(), 'span');
    });

    it('creates references from a string (self-closing tag)', () => {
        const {node} = render('<span ref="node"/>');

        assert.instanceOf(node, Element);
        assert.equal(node.tagName.toLowerCase(), 'span');
    });

    it('creates references for multiple root element', () => {
        const {node1, node2} = render('<p ref="node1"></p><span ref="node2"/>');

        assert.equal(node1.tagName.toLowerCase(), 'p');
        assert.equal(node2.tagName.toLowerCase(), 'span');
    });

    it('creates array references', () => {
        const {'list-items': listItems} = render('<ul><li ref="list-items[]"></li><li ref="list-items[]"></li></ul>');

        assert.instanceOf(listItems, Array);
        assert.equal(listItems.length, 2);
        assert.equal(listItems[0].tagName.toLowerCase(), 'li');
        assert.equal(listItems[1].tagName.toLowerCase(), 'li');

        assert.equal(listItems[0].nextElementSibling, listItems[1]);

        assert.equal(listItems[0].parentElement.tagName.toLowerCase(), 'ul');
        assert.equal(listItems[1].parentElement.tagName.toLowerCase(), 'ul');

        assert.isNull(listItems[0].parentElement.parentElement);
        assert.isNull(listItems[1].parentElement.parentElement);
    });

    // Special nodes which require specific parents
    // See: https://github.com/jquery/jquery/blob/c9aae3565edc840961ecbeee77fb0cb367c46702/src/manipulation/wrapMap.js

    it('renders a <legend/> node from a string', () => {
        const {node} = render('<legend ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'legend');
        assert.isNull(node.parentNode);
    });

    it('renders a <option/> node from a string', () => {
        const {node} = render('<option ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'option');
        assert.isNull(node.parentNode);
    });

    it('renders a <optgroup/> node from a string', () => {
        const {node} = render('<optgroup ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'optgroup');
        assert.isNull(node.parentNode);
    });

    it('renders a <thead/> node from a string', () => {
        const {node} = render('<thead ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'thead');
        assert.isNull(node.parentNode);
    });

    it('renders a <tbody/> node from a string', () => {
        const {node} = render('<tbody ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'tbody');
        assert.isNull(node.parentNode);
    });

    it('renders a <tfoot/> node from a string', () => {
        const {node} = render('<tfoot ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'tfoot');
        assert.isNull(node.parentNode);
    });

    it('renders a <colgroup/> node from a string', () => {
        const {node} = render('<colgroup ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'colgroup');
        assert.isNull(node.parentNode);
    });

    it('renders a <col/> node from a string', () => {
        const {node} = render('<col ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'col');
        assert.isNull(node.parentNode);
    });

    it('renders a <caption/> node from a string', () => {
        const {node} = render('<caption ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'caption');
        assert.isNull(node.parentNode);
    });

    it('renders a <tr/> node from a string', () => {
        const {node} = render('<tr ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'tr');
        assert.isNull(node.parentNode);
    });

    it('renders a <th/> node from a string', () => {
        const {node} = render('<th ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'th');
        assert.isNull(node.parentNode);
    });

    it('renders a <td/> node from a string', () => {
        const {node} = render('<td ref="node"/>');

        assert.equal(node.tagName.toLowerCase(), 'td');
        assert.isNull(node.parentNode);
    });
});
