/*
 * Ported from jQuery's html()
 * https://github.com/jquery/jquery/blob/c9aae3565edc840961ecbeee77fb0cb367c46702/src/manipulation/buildFragment.js
 */

const wrapMap = {
    thead: [1, '<table>', '</table>'],
    col: [2, '<table><colgroup>', '</colgroup></table>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],

    _: [0, '', '']
};

wrapMap.tbody = wrapMap.thead;
wrapMap.tfoot = wrapMap.thead;
wrapMap.colgroup = wrapMap.thead;
wrapMap.caption = wrapMap.thead;

wrapMap.th = wrapMap.td;

export default function create(html) {
    if (html.nodeType) {
        return html;
    }

    let element = document.createElement('div');

    const match = /<([a-z][^/\0>\u0020\t\r\n\f]*)/i.exec(html);

    const tag = match ? match[0].replace(/</g, '').replace(/>/g, '') : '_';
    const map = wrapMap[tag] || wrapMap._;

    element.innerHTML = map[1] + html + map[2];

    let j = map[0] + 1;

    while (j--) {
        element = element.lastChild;
    }

    return element;
}
