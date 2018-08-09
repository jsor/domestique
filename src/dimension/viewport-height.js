export default function viewportHeight() {
    const a = document.documentElement.clientHeight;
    const b = window.innerHeight;

    return a < b ? b : a;
}
