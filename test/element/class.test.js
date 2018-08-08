import create from '../../src/element/create';
import {addClass, removeClass , hasClass} from '../../src/element/class';

describe('class()', () => {
    it('adds a class to an element', () => {
        const element = create('<div/>');

        addClass(element, 'class1');

        assert(element.classList.contains('class1'));
    });

    it('adds multiple classes to an element', () => {
        const element = create('<div/>');

        addClass(element, 'class1 class2');

        assert(element.classList.contains('class1'));
        assert(element.classList.contains('class2'));
    });

    it('removes a class from an element', () => {
        const element = create('<div class="class1"/>');

        removeClass(element, 'class1');

        assert.isFalse(element.classList.contains('class1'));
    });

    it('removes multiple classes from an element', () => {
        const element = create('<div class="class1 class2"/>');

        removeClass(element, 'class1 class2');

        assert.isFalse(element.classList.contains('class1'));
        assert.isFalse(element.classList.contains('class2'));
    });

    it('checks a class of an element', () => {
        const element = create('<div class="class1"/>');

        assert(hasClass(element, 'class1'));
        assert.isFalse(hasClass(element, 'class2'));
    });

    it('checks multiple classes of an element', () => {
        const element = create('<div class="class1 class2"/>');

        assert(hasClass(element, 'class1'));
        assert(hasClass(element, 'class1 class2'));
        assert.isFalse(hasClass(element, 'class1 class3'));
        assert.isFalse(hasClass(element, 'class1 class2 class3'));
    });
});
