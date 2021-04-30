import viewportHeight from './viewport-height.js';
import viewportWidth from './viewport-width.js';

export default function inViewport(element) {
    if (!element || typeof element.getBoundingClientRect !== 'function') {
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
