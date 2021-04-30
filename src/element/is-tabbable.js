import matches from '../query/matches.js';
import {selector, tabbableFilter} from '../util/focus.js';

export default function isTabbable(element) {
    return matches(element, selector) && tabbableFilter(element);
}
