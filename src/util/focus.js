import closest from '../query/closest.js';
import parents from '../element/parents.js';
import selectAll from '../query/select-all.js';

/*
 * Large parts ported from jQuery UI
 * https://github.com/jquery/jquery-ui/blob/74f8a0ac952f6f45f773312292baef1c26d81300/ui/focusable.js
 */

// @TODO: Support inert attribute
export const selector = [
    'a[href]',
    // @TODO: Validity is not fully checked
    // https://github.com/jquery/jquery-ui/blob/74f8a0ac952f6f45f773312292baef1c26d81300/ui/focusable.js#L32-L40
    'area[href]',
    'input',
    'select',
    'textarea',
    'button',
    'iframe',
    'object',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]',
    '[tabindex]'
].join(',');

const inputNodeNameRegexp = /^(input|select|textarea|button|object)$/;

export function focusableFilter(element) {
    const nodeName = element.nodeName.toLowerCase();

    if (nodeName === 'area') {
        return isValidArea(element);
    }

    if (element.disabled) {
        return false;
    }

    if (inputNodeNameRegexp.test(nodeName)) {
        const fieldset = closest(element, 'fieldset');

        if (fieldset && fieldset.disabled) {
            return false;
        }
    }

    return visible(element);
}

export function tabbableFilter(element) {
    const index = tabIndex(element);

    return (
        focusableFilter(element) &&
        index >= 0
    );
}

export function compare(a, b) {
    const aIndex = tabIndex(a, true);
    const bIndex = tabIndex(b, true);

    if (aIndex === bIndex) {
        // 2 === Node.DOCUMENT_POSITION_PRECEDING
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    }

    return aIndex - bIndex;
}

function isValidArea(element) {
    const map = element.parentNode;
    const mapName = map.name;

    if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
        return false;
    }

    const images = selectAll(document, `img[usemap="#${mapName}"]`);

    return images.length > 0 && visible(images[0]);
}

function visible(element) {
    const style = getComputedStyle(element);

    return (
        // Calling getComputedStyle() reflects `visibility: hidden` of ancestors
        style.visibility !== 'hidden' &&
        style.visibility !== 'collapse' &&
        style.display !== 'none' &&
        parents(element).every(parent => {
            return getComputedStyle(parent).display !== 'none';
        })
    );
}

function tabIndex(element, positiveOnly = false) {
    const index = parseInt(element.getAttribute('tabindex'), 10);

    return isNaN(index) ? 0 : (positiveOnly && index < 0 ? 0 : index);
}
