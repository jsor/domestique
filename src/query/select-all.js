export default function selectAll(context, selector) {
    if (!context || typeof context.querySelectorAll !== 'function') {
        return [];
    }

    return [].slice.call(context.querySelectorAll(selector));
}
