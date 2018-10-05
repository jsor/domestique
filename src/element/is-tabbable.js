import matches from '../query/matches';
import {selector, tabbableFilter} from '../util/focus';

export default function isTabbable(element) {
    return matches(element, selector) && tabbableFilter(element);
}
