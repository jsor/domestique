export default function matches(element, selector) {
    if (!element) {
        return false;
    }

    const nativeMatches = element.matches ||
        element.webkitMatchesSelector ||
        element.msMatchesSelector;

    if (typeof nativeMatches !== 'function') {
        return false;
    }

    return nativeMatches.call(element, selector);
}
