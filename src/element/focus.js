export default function focus(element) {
    try {
        element.focus();
    } catch (e) {
        // Ignore errors, eg. from SVG elements in Firefox, IE and Edge
    }
}
