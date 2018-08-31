import {compare, selector, tabbableFilter} from '../util/focus';
import find from './find';

export default function tabbable(element) {
    return find(selector, arguments.length > 0 ? element : document)
        .filter(tabbableFilter)
        .sort(compare);
}
