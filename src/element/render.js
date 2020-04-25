import selectAll from '../query/select-all';
import fragmentContainer from '../util/fragment-container';

export default function render(html) {
    const container = fragmentContainer(html);

    const result = selectAll(container, '[ref]').reduce(
        (result, element) => {
            const [, refName, isArray] = element
                .getAttribute('ref')
                .trim()
                .match(/(.*?)(\[])?$/);

            element.removeAttribute('ref');

            if (!isArray) {
                result[refName] = element;

                return result;
            }

            result[refName] = Array.isArray(result[refName]) ? result[refName] : [];
            result[refName].push(element);

            return result;
        },
        {}
    );

    // Detach all elements from the container
    [].slice.call(container.childNodes).forEach(childNode => {
        container.removeChild(childNode);
    });

    return result;
}
