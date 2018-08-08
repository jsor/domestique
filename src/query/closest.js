import matches from './matches';

export default function closest(element, selector) {
    if (!element || !selector) {
        return null;
    }

    if (typeof element.closest === 'function') {
        return element.closest(selector);
    }

    do {
        if (matches(element, selector)) {
            return element;
        }

        element = element.parentElement || element.parentNode;
    } while (element && element.nodeType === 1);

    return null;
}
