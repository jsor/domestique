export default function find(selector, element = document) {
    if (
        !selector ||
        !element ||
        typeof element.querySelectorAll !== 'function'
    ) {
        return [];
    }

    return [].slice.call(element.querySelectorAll(selector));
}
