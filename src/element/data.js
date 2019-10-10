/*
 * Ported from jQuery's data()
 * https://github.com/jquery/jquery/blob/c9aae3565edc840961ecbeee77fb0cb367c46702/src/data.js
 */

const regExpBrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
const regExpMultiDash = /[A-Z]/g;

export default function data(element, key) {
    if (!element || typeof element.getAttribute !== 'function') {
        return null;
    }

    const name = 'data-' + key.replace(regExpMultiDash, '-$&').toLowerCase();
    const data = element.getAttribute(name);

    if (typeof data !== 'string') {
        return data;
    }

    if (data === 'true') {
        return true;
    }

    if (data === 'false') {
        return false;
    }

    if (data === 'null') {
        return null;
    }

    if (data === String(Number(data))) {
        return Number(data);
    }

    if (regExpBrace.test(data)) {
        try {
            return JSON.parse(data);
        } catch (_) {
            return data;
        }
    }

    return data;
}
