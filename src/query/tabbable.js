import {compare, selector, tabbableFilter} from '../util/focus';
import selectAll from './select-all';

export default function tabbable(element) {
    return selectAll(arguments.length > 0 ? element : document, selector)
        .filter(element => tabbableFilter(element))
        .sort(compare);
}
