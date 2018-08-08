import optionsSupport from './options-support';
import optionsArgument from './options-argument';
import off from './off';

export default function on(target, type, listener, options = {capture: false}) {
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
