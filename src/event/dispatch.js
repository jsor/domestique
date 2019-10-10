export default function dispatch(target, type, eventInit = {}) {
    if (!target || typeof target.dispatchEvent !== 'function') {
        return true;
    }

    eventInit.bubbles = eventInit.bubbles || false;
    eventInit.cancelable = eventInit.cancelable || false;
    eventInit.composed = eventInit.composed || false;
    eventInit.detail = eventInit.detail || null;

    let event;

    try {
        event = new CustomEvent(type, eventInit);
    } catch (_) {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(
            type,
            eventInit.bubbles,
            eventInit.cancelable,
            eventInit.detail
        );
    }

    return target.dispatchEvent(event);
}
