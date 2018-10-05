import matches from '../query/matches';
import {focusableFilter, selector} from '../util/focus';

export default function isFocusable(element) {
    return matches(element, selector) && focusableFilter(element);
}
