import {compare, selector, tabbableFilter} from '../util/focus.js';
import selectAll from './select-all.js';

export default function tabbable(element) {
    return selectAll(arguments.length > 0 ? element : document, selector)
        .filter(element => tabbableFilter(element))
        .sort(compare);
}
