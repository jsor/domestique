export default function dispatch(target, type, eventInit = {}) {
    eventInit.bubbles = eventInit.bubbles || false;
    eventInit.cancelable = eventInit.cancelable || false;
    eventInit.composed = eventInit.composed || false;
    eventInit.detail = eventInit.detail || null;

    let event;

    try {
        event = new CustomEvent(type, eventInit);
    } catch (err) {
        event = document.createEvent('Event');
        event.initCustomEvent(
            type,
            eventInit.bubbles,
            eventInit.cancelable,
            eventInit.detail
        );
    }

    return target.dispatchEvent(event);
}
