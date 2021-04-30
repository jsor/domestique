import optionsSupport from './options-support.js';
import optionsArgument from './options-argument.js';
import off from './off.js';

export default function on(target, type, listener, options = {}) {
    if (!target || typeof target.addEventListener !== 'function') {
        return () => {};
    }

    let callback = listener;

    const remove = () => {
        off(target, type, callback, options);
    };

    if (options.once && !optionsSupport().once) {
        callback = event => {
            remove();
            listener.call(target, event);
        };
    }

    target.addEventListener(type, callback, optionsArgument(options));

    return remove;
}
