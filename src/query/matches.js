export default function matches(element, selector) {
    if (!element || !selector) {
        return false;
    }

    const nativeMatches = element.matches ||
        element.webkitMatchesSelector ||
        element.msMatchesSelector;

    return nativeMatches && nativeMatches.call(element, selector);
}
