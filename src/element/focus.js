import scrollPositionRestorer from '../util/scroll-position-restorer';

export default function focus(element, {restoreScrollPosition} = {}) {
    let restorer;

    if (restoreScrollPosition) {
        restorer = scrollPositionRestorer(element);
    }

    try {
        element.focus();
    } catch (e) {
        // Ignore errors, eg. from SVG elements in Firefox, IE and Edge
    }

    if (restorer) {
        restorer();
    }
}
