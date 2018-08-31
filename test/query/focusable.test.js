import {focusable} from '../..';
import {focusFixture} from '../fixture';

function elementIds(elements) {
    return elements.map(el => {
        return `#${el.id}`;
    });
}

function assertIsFocusable(elements, id, msg) {
    assert.include(
        elementIds(elements),
        id,
        msg + ' - ID ' + id + ' is focusable'
    );
}

function assertIsNotFocusable(elements, id, msg) {
    assert.notInclude(
        elementIds(elements),
        id,
        msg + ' - ID ' + id + ' is not focusable'
    );
}

describe('focusable()', () => {
    let fixture;

    beforeEach(() => {
        fixture = focusFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('finds visible, enabled elements', () => {
        const elements = focusable();

        assertIsNotFocusable(elements, '#formNoTabindex', 'form');
        assertIsFocusable(elements, '#formTabindex', 'form with tabindex');
        assertIsFocusable(elements, '#enabledFieldset-input', 'input in enabled fieldset');
        assertIsNotFocusable(elements, '#disabledFieldset-input', 'input in disabled fieldset');
        assertIsFocusable(elements, '#visibleAncestor-inputTypeNone', 'input, no type');
        assertIsFocusable(elements, '#visibleAncestor-inputTypeText', 'input, type text');
        assertIsFocusable(elements, '#visibleAncestor-inputTypeCheckbox', 'input, type checkbox');
        assertIsFocusable(elements, '#visibleAncestor-inputTypeRadio', 'input, type radio');
        assertIsFocusable(elements, '#visibleAncestor-inputTypeButton', 'input, type button');
        assertIsNotFocusable(elements, '#visibleAncestor-inputTypeHidden', 'input, type hidden');
        assertIsFocusable(elements, '#visibleAncestor-button', 'button');
        assertIsFocusable(elements, '#visibleAncestor-select', 'select');
        assertIsFocusable(elements, '#visibleAncestor-textarea', 'textarea');
        assertIsFocusable(elements, '#visibleAncestor-object', 'object');
        assertIsFocusable(elements, '#visibleAncestor-anchorWithHref', 'anchor with href');
        assertIsNotFocusable(elements, '#visibleAncestor-anchorWithoutHref', 'anchor without href');
        assertIsNotFocusable(elements, '#visibleAncestor-span', 'span');
        assertIsNotFocusable(elements, '#visibleAncestor-div', 'div');
        assertIsFocusable(elements, '#visibleAncestor-spanWithTabindex', 'span with tabindex');
        assertIsFocusable(elements, '#visibleAncestor-divWithNegativeTabindex', 'div with tabindex');
        assertIsFocusable(elements, '#nestedVisibilityInheritWithVisibleAncestor', 'span, visibility: inherit inside visibility: visible parent');
        assertIsFocusable(elements, '#nestedVisibilityInheritWithVisibleAncestor-input', 'input, visibility: inherit inside visibility: visible parent');
    });

    it('does not find disabled elements', () => {
        const elements = focusable();

        assertIsNotFocusable(elements, '#disabledElement-inputTypeNone', 'input, no type');
        assertIsNotFocusable(elements, '#disabledElement-inputTypeText', 'input, type text');
        assertIsNotFocusable(elements, '#disabledElement-inputTypeCheckbox', 'input, type checkbox');
        assertIsNotFocusable(elements, '#disabledElement-inputTypeRadio', 'input, type radio');
        assertIsNotFocusable(elements, '#disabledElement-inputTypeButton', 'input, type button');
        assertIsNotFocusable(elements, '#disabledElement-inputTypeHidden', 'input, type hidden');
        assertIsNotFocusable(elements, '#disabledElement-button', 'button');
        assertIsNotFocusable(elements, '#disabledElement-select', 'select');
        assertIsNotFocusable(elements, '#disabledElement-textarea', 'textarea');
    });

    it('does not find elements with hidden styles', () => {
        const elements = focusable();

        assertIsNotFocusable(elements, '#displayNoneAncestor-input', 'input, display: none parent');
        assertIsNotFocusable(elements, '#displayNoneAncestor-span', 'span with tabindex, display: none parent');

        assertIsNotFocusable(elements, '#visibilityHiddenAncestor-input', 'input, visibility: hidden parent');
        assertIsNotFocusable(elements, '#visibilityHiddenAncestor-span', 'span with tabindex, visibility: hidden parent');

        assertIsFocusable(elements, '#nestedVisibilityOverrideAncestor-input', 'input, visibility: visible parent but visibility: hidden grandparent');
        assertIsFocusable(elements, '#nestedVisibilityOverrideAncestor-span', 'span with tabindex, visibility: visible parent but visibility: hidden grandparent ');

        assertIsNotFocusable(elements, '#nestedVisibilityInheritWithHiddenAncestor', 'span, visibility: inherit inside visibility: hidden parent');
        assertIsNotFocusable(elements, '#nestedVisibilityInheritWithHiddenAncestor-input', 'input, visibility: inherit inside visibility: hidden parent');

        assertIsNotFocusable(elements, '#displayNone-input', 'input, display: none');
        assertIsNotFocusable(elements, '#visibilityHidden-input', 'input, visibility: hidden');

        assertIsNotFocusable(elements, '#displayNone-span', 'span with tabindex, display: none');
        assertIsNotFocusable(elements, '#visibilityHidden-span', 'span with tabindex, visibility: hidden');
    });

    it('finds natively focusable with various tabindex', () => {
        const elements = focusable();

        assertIsFocusable(elements, '#inputTabindex0', 'input, tabindex 0');
        assertIsFocusable(elements, '#inputTabindex10', 'input, tabindex 10');
        assertIsFocusable(elements, '#inputTabindex-1', 'input, tabindex -1');
        assertIsFocusable(elements, '#inputTabindex-50', 'input, tabindex -50');
    });

    it('finds not natively focusable with various tabindex', () => {
        const elements = focusable();

        assertIsFocusable(elements, '#spanTabindex0', 'span, tabindex 0');
        assertIsFocusable(elements, '#spanTabindex10', 'span, tabindex 10');
        assertIsFocusable(elements, '#spanTabindex-1', 'span, tabindex -1');
        assertIsFocusable(elements, '#spanTabindex-50', 'span, tabindex -50');
    });

    it('finds area elements', () => {
        const elements = focusable();

        assertIsFocusable(elements, '#areaCoordsHref', 'coords and href');
        assertIsFocusable(elements, '#areaNoCoordsHref', 'href but no coords');
        assertIsNotFocusable(elements, '#areaCoordsNoHref', 'coords but no href');
        assertIsNotFocusable(elements, '#areaNoImg', 'not associated with an image');
        assertIsNotFocusable(elements, '#areaNoMap', 'not associated with a map');
    });

    it('finds dimensionless parent with overflow', () => {
        const elements = focusable();

        assertIsFocusable(elements, '#dimensionlessParent', 'input');
    });

    it('orders elements by tabindex', () => {
        const elements = focusable(document.getElementById('tabIndexOrder'));

        assert.deepEqual(elementIds(elements), [
            '#tabIndexOrder-spanTabindex0',
            '#tabIndexOrder-buttonNoTabindex',
            '#tabIndexOrder-divTabindex0',
            '#tabIndexOrder-inputTabindex-1',
            '#tabIndexOrder-inputTabindex1',
            '#tabIndexOrder-inputTabindex2',
            '#tabIndexOrder-inputTabindex3'
        ]);
    });
});
