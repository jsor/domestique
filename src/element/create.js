import fragmentContainer from '../util/fragment-container.js';

export default function create(html) {
    if (html.nodeType) {
        return html;
    }

    const container = fragmentContainer(html);
    const element = container.lastChild;

    if (!element) {
        return document.createTextNode('');
    }

    // Detach element from container
    container.removeChild(element);

    return element;
}
