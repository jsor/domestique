export default function select(context, selector) {
    if (!context || typeof context.querySelector !== 'function') {
        return null;
    }

    return context.querySelector(selector);
}
