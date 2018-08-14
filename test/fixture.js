import {create} from '..';

export default () => {
    function destroy(el) {
        el.parentNode.removeChild(el);
        document.body.focus();
    }

    const previous = document.getElementById('fixture');

    if (previous) {
        destroy(previous);
    }

    const root = document.createElement('div');

    root.id = 'fixture';

    document.body.appendChild(root);

    return {
        root,
        destroy: destroy.bind(undefined, root),
        append(html) {
            const element = create(html);

            root.appendChild(element);

            return element;
        }
    };
};
