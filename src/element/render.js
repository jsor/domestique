import selectAll from '../query/select-all.js';
import fragmentContainer from '../util/fragment-container.js';

export default function render(html) {
    const container = fragmentContainer(html);

    // eslint-disable-next-line unicorn/no-array-reduce
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
