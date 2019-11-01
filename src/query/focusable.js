import {compare, focusableFilter, selector} from '../util/focus';
import selectAll from './select-all';

export default function focusable(element) {
    return selectAll(arguments.length > 0 ? element : document, selector)
        .filter(focusableFilter)
        .sort(compare);
}
