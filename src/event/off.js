import optionsArgument from './options-argument';

export default function off(target, type, listener, options = {capture: false}) {
    target.removeEventListener(type, listener, optionsArgument(options));
}
