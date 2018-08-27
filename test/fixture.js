import {create} from '..';

export default function fixture() {
    const root = document.createElement('div');

    root.id = 'domestique-fixture';

    document.body.appendChild(root);

    return {
        root,
        destroy() {
            document.body.removeChild(root);

            root.textContent = '';

            document.body.scrollTop = 0;
            document.body.scrollLeft = 0;

            document.body.focus();
        },
        append(html) {
            const element = create(html);

            root.appendChild(element);

            return element;
        }
    };
}
