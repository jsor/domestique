import viewportHeight from './viewport-height';
import viewportWidth from './viewport-width';

export default function inViewport(element) {
    if (!element) {
        return false;
    }

    const rect = element.getBoundingClientRect();

    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= viewportHeight() &&
        rect.left <= viewportWidth()
    );
}
