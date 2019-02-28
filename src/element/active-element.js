/*
 * Ported from jQuery UI's safeActiveElement()
 * https://github.com/jquery/jquery-ui/blob/74f8a0ac952f6f45f773312292baef1c26d81300/ui/safe-active-element.js
 */

export default function activeElement() {
    try {
        const {activeElement} = document;

        return activeElement && activeElement.nodeName ? activeElement : document.body;
    } catch (error) {
        return document.body;
    }
}
