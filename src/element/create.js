import fragmentContainer from '../util/fragment-container';

export default function create(html) {
    if (html.nodeType) {
        return html;
    }

    const container = fragmentContainer(html);
    const element = container.lastChild;

    if (element) {
        // Detach element from container
        container.removeChild(element);
    }

    return element;
}
