import support from './options-support';

export default function optionsArgument(options = {}) {
    const {once, passive, capture} = support();

    if (!once && !passive && !capture) {
        return Boolean(options.capture);
    }

    if (!once) {
        delete options.once;
    }

    if (!passive) {
        delete options.passive;
    }

    if (!capture) {
        delete options.capture;
    }

    return options;
}
