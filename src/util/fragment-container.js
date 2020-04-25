/*
 * Ported from jQuery's html()
 * https://github.com/jquery/jquery/blob/6153eb0fd401cda90bf2007335cd4338093d38f0/src/manipulation/buildFragment.js
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

const regexpTag = /<([a-z][^/\0> \t\r\n\f]*)/i;

export default function fragmentContainer(html) {
    const match = regexpTag.exec(html);

    const tag = match ? match[0].replace(/</g, '').replace(/>/g, '') : '_';
    const map = wrapMap[tag] || wrapMap._;

    const fragment = document.createDocumentFragment();
    let container = fragment.appendChild(document.createElement('div'));

    container.innerHTML = map[1] + html + map[2];

    let j = map[0];

    while (j--) {
        container = container.lastChild;
    }

    return container;
}
