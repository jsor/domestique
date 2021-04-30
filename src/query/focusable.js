import {
    compare,
    focusableFilter,
    selector
} from '../util/focus.js';
import selectAll from './select-all.js';

export default function focusable(element) {
    return selectAll(arguments.length > 0 ? element : document, selector)
        .filter(element => focusableFilter(element))
        .sort(compare);
}
