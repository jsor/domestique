import optionsArgument from './options-argument';

export default function off(target, type, listener, options = {}) {
    if (!target || typeof target.removeEventListener !== 'function') {
        return;
    }

    target.removeEventListener(type, listener, optionsArgument(options));
}
