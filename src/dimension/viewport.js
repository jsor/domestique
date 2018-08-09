import viewportWidth from './viewport-width';
import viewportHeight from './viewport-height';

export default function viewport() {
    return {
        width: viewportWidth(),
        height: viewportHeight()
    };
}
