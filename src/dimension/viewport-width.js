export default function viewportWidth() {
    const a = document.documentElement.clientWidth;
    const b = window.innerWidth;

    return a < b ? b : a;
}
