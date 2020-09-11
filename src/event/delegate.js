import closest from '../query/closest';
import on from './on';
import optionsArgument from "./options-argument";

export default function delegate(
    target,
    type,
    selector,
    listener,
    options = {}
) {
    const evtOptions = optionsArgument(options);

    // Handle {once: true} which must only remove the listener when called
    // on the matching delegation target
    const once = evtOptions.once === true;

    delete evtOptions.once;

    const remove = on(target, type, event => {
        const delegateTarget = closest(event.target, selector);

        if (!delegateTarget) {
            return;
        }

        if (once) {
            remove();
        }

        listener.call(delegateTarget, event, delegateTarget);
    }, evtOptions);

    return remove;
}
