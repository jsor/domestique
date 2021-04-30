import matches from '../query/matches.js';
import {focusableFilter, selector} from '../util/focus.js';

export default function isFocusable(element) {
    return matches(element, selector) && focusableFilter(element);
}
