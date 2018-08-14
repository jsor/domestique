export default function parents(element) {
    const list = [];

    while (
        element &&
        element.parentNode &&
        element.parentNode.nodeType === 1
    ) {
        element = element.parentNode;
        list.push(element);
    }

    return list;
}
