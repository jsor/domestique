import { addClass, removeClass , hasClass, create } from '../../index';

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

    it('works for non-elements', () => {
        addClass(undefined, 'class1');
        addClass('string', 'class1');
        addClass(true, 'class1');
        addClass(null, 'class1');
        addClass(1, 'class1');
        addClass(1.2, 'class1');
        addClass({foo: 'bar'}, 'class1');
        addClass(['bar'], 'class1');

        removeClass(undefined, 'class1');
        removeClass('string', 'class1');
        removeClass(true, 'class1');
        removeClass(null, 'class1');
        removeClass(1, 'class1');
        removeClass(1.2, 'class1');
        removeClass({foo: 'bar'}, 'class1');
        removeClass(['bar'], 'class1');

        hasClass(undefined, 'class1');
        hasClass('string', 'class1');
        hasClass(true, 'class1');
        hasClass(null, 'class1');
        hasClass(1, 'class1');
        hasClass(1.2, 'class1');
        hasClass({foo: 'bar'}, 'class1');
        hasClass(['bar'], 'class1');
    });
});
