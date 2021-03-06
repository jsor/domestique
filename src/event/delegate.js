import closest from '../query/closest.js';
import on from './on.js';

export default function delegate(
    target,
    type,
    selector,
    listener,
    options = {}
) {
    // Handle {once: true} which must only remove the listener when called
    // on the matching delegation target
    const once = options.once === true;

    delete options.once;

    const remove = on(target, type, event => {
        const delegateTarget = closest(event.target, selector);

        if (!delegateTarget) {
            return;
        }

        if (once) {
            remove();
        }

        listener.call(delegateTarget, event, delegateTarget);
    }, options);

    return remove;
}
