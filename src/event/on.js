import optionsSupport from './options-support';
import optionsArgument from './options-argument';
import off from './off';

export default function on(target, type, listener, options = {}) {
    if (!target || typeof target.addEventListener !== 'function') {
        return () => {};
    }

    const evtOptions = optionsArgument(options);

    let callback = listener;

    const remove = () => {
        off(target, type, callback, evtOptions);
    };

    if (options.once && !optionsSupport().once) {
        callback = event => {
            remove();
            listener.call(target, event);
        };
    }

    target.addEventListener(type, callback, evtOptions);

    return remove;
}
