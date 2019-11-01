/**
 * @deprecated Deprecated in favor of selectAll(). To be removed in 2.0.
 */
export default function find(selector, element) {
    // Check here for explicitly passed element argument.
    // find('selector', undefined) must return an empty array instead of using
    // document as context.
    const context = arguments.length > 1 ? element : document;

    if (!context || typeof context.querySelectorAll !== 'function') {
        return [];
    }

    return [].slice.call(context.querySelectorAll(selector));
}
