import {isFocusable} from '../..';
import {focusFixture} from '../fixture';

function assertIsFocusable(id, message) {
    const element = document.querySelector(id);

    assert.instanceOf(element, HTMLElement);

    assert(
        isFocusable(element),
        message + ' - ID ' + id + ' is focusable'
    );
}

function assertIsNotFocusable(id, message) {
    const element = document.querySelector(id);

    assert.instanceOf(element, HTMLElement);

    assert.isFalse(
        isFocusable(element),
        message + ' - ID ' + id + ' is not focusable'
    );
}

describe('isFocusable()', () => {
    let fixture;

    beforeEach(() => {
        fixture = focusFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('visible, enabled elements', () => {
        assertIsNotFocusable('#formNoTabindex', 'form');
        assertIsFocusable('#formTabindex', 'form with tabindex');
        assertIsFocusable('#enabledFieldset-input', 'input in enabled fieldset');
        assertIsNotFocusable('#disabledFieldset-input', 'input in disabled fieldset');
        assertIsFocusable('#visibleAncestor-inputTypeNone', 'input, no type');
        assertIsFocusable('#visibleAncestor-inputTypeText', 'input, type text');
        assertIsFocusable('#visibleAncestor-inputTypeCheckbox', 'input, type checkbox');
        assertIsFocusable('#visibleAncestor-inputTypeRadio', 'input, type radio');
        assertIsFocusable('#visibleAncestor-inputTypeButton', 'input, type button');
        assertIsNotFocusable('#visibleAncestor-inputTypeHidden', 'input, type hidden');
        assertIsFocusable('#visibleAncestor-button', 'button');
        assertIsFocusable('#visibleAncestor-select', 'select');
        assertIsFocusable('#visibleAncestor-textarea', 'textarea');
        assertIsFocusable('#visibleAncestor-object', 'object');
        assertIsFocusable('#visibleAncestor-anchorWithHref', 'anchor with href');
        assertIsNotFocusable('#visibleAncestor-anchorWithoutHref', 'anchor without href');
        assertIsNotFocusable('#visibleAncestor-span', 'span');
        assertIsNotFocusable('#visibleAncestor-div', 'div');
        assertIsFocusable('#visibleAncestor-spanWithTabindex', 'span with tabindex');
        assertIsFocusable('#visibleAncestor-divWithNegativeTabindex', 'div with tabindex');
        assertIsFocusable('#nestedVisibilityInheritWithVisibleAncestor', 'span, visibility: inherit inside visibility: visible parent');
        assertIsFocusable('#nestedVisibilityInheritWithVisibleAncestor-input', 'input, visibility: inherit inside visibility: visible parent');
    });

    it('does not find disabled elements', () => {
        assertIsNotFocusable('#disabledElement-inputTypeNone', 'input, no type');
        assertIsNotFocusable('#disabledElement-inputTypeText', 'input, type text');
        assertIsNotFocusable('#disabledElement-inputTypeCheckbox', 'input, type checkbox');
        assertIsNotFocusable('#disabledElement-inputTypeRadio', 'input, type radio');
        assertIsNotFocusable('#disabledElement-inputTypeButton', 'input, type button');
        assertIsNotFocusable('#disabledElement-inputTypeHidden', 'input, type hidden');
        assertIsNotFocusable('#disabledElement-button', 'button');
        assertIsNotFocusable('#disabledElement-select', 'select');
        assertIsNotFocusable('#disabledElement-textarea', 'textarea');
    });

    it('does not find elements with hidden styles', () => {
        assertIsNotFocusable('#displayNoneAncestor-input', 'input, display: none parent');
        assertIsNotFocusable('#displayNoneAncestor-span', 'span with tabindex, display: none parent');

        assertIsNotFocusable('#visibilityHiddenAncestor-input', 'input, visibility: hidden parent');
        assertIsNotFocusable('#visibilityHiddenAncestor-span', 'span with tabindex, visibility: hidden parent');

        assertIsFocusable('#nestedVisibilityOverrideAncestor-input', 'input, visibility: visible parent but visibility: hidden grandparent');
        assertIsFocusable('#nestedVisibilityOverrideAncestor-span', 'span with tabindex, visibility: visible parent but visibility: hidden grandparent ');

        assertIsNotFocusable('#nestedVisibilityInheritWithHiddenAncestor', 'span, visibility: inherit inside visibility: hidden parent');
        assertIsNotFocusable('#nestedVisibilityInheritWithHiddenAncestor-input', 'input, visibility: inherit inside visibility: hidden parent');

        assertIsNotFocusable('#displayNone-input', 'input, display: none');
        assertIsNotFocusable('#visibilityHidden-input', 'input, visibility: hidden');

        assertIsNotFocusable('#displayNone-span', 'span with tabindex, display: none');
        assertIsNotFocusable('#visibilityHidden-span', 'span with tabindex, visibility: hidden');
    });

    it('natively focusable with various tabindex', () => {
        assertIsFocusable('#inputTabindex0', 'input, tabindex 0');
        assertIsFocusable('#inputTabindex10', 'input, tabindex 10');
        assertIsFocusable('#inputTabindex-1', 'input, tabindex -1');
        assertIsFocusable('#inputTabindex-50', 'input, tabindex -50');
    });

    it('not natively focusable with various tabindex', () => {
        assertIsFocusable('#spanTabindex0', 'span, tabindex 0');
        assertIsFocusable('#spanTabindex10', 'span, tabindex 10');
        assertIsFocusable('#spanTabindex-1', 'span, tabindex -1');
        assertIsFocusable('#spanTabindex-50', 'span, tabindex -50');
    });

    it('area elements', () => {
        assertIsFocusable('#areaCoordsHref', 'coords and href');
        assertIsFocusable('#areaNoCoordsHref', 'href but no coords');
        assertIsNotFocusable('#areaCoordsNoHref', 'coords but no href');
        assertIsNotFocusable('#areaNoImg', 'not associated with an image');
        assertIsNotFocusable('#areaNoMap', 'not associated with a map');
    });

    it('dimensionless parent with overflow', () => {
        assertIsFocusable('#dimensionlessParent', 'input');
    });
});
