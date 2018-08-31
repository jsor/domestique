import {compare, focusableFilter, selector} from '../util/focus';
import find from './find';

export default function focusable(element) {
    return find(selector, arguments.length > 0 ? element : document)
        .filter(focusableFilter)
        .sort(compare);
}
