import {isTabbable} from '../../index.js';
import {focusFixture} from '../fixture.js';

function assertIsTabbable(id, message) {
    const element = document.querySelector(id);

    assert.instanceOf(element, HTMLElement);

    assert(
        isTabbable(element),
        message + ' - ID ' + id + ' is tabbable'
    );
}

function assertIsNotTabbable(id, message) {
    const element = document.querySelector(id);

    assert.instanceOf(element, HTMLElement);

    assert.isFalse(
        isTabbable(element),
        message + ' - ID ' + id + ' is not tabbable'
    );
}

describe('isTabbable()', () => {
    let fixture;

    beforeEach(() => {
        fixture = focusFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('visible, enabled elements', () => {
        assertIsNotTabbable('#formNoTabindex', 'form');
        assertIsTabbable('#formTabindex', 'form with tabindex');
        assertIsTabbable('#enabledFieldset-input', 'input in enabled fieldset');
        assertIsNotTabbable('#disabledFieldset-input', 'input in disabled fieldset');
        assertIsTabbable('#visibleAncestor-inputTypeNone', 'input, no type');
        assertIsTabbable('#visibleAncestor-inputTypeText', 'input, type text');
        assertIsTabbable('#visibleAncestor-inputTypeCheckbox', 'input, type checkbox');
        assertIsTabbable('#visibleAncestor-inputTypeRadio', 'input, type radio');
        assertIsTabbable('#visibleAncestor-inputTypeButton', 'input, type button');
        assertIsNotTabbable('#visibleAncestor-inputTypeHidden', 'input, type hidden');
        assertIsTabbable('#visibleAncestor-button', 'button');
        assertIsTabbable('#visibleAncestor-select', 'select');
        assertIsTabbable('#visibleAncestor-textarea', 'textarea');
        assertIsTabbable('#visibleAncestor-object', 'object');
        assertIsTabbable('#visibleAncestor-anchorWithHref', 'anchor with href');
        assertIsNotTabbable('#visibleAncestor-anchorWithoutHref', 'anchor without href');
        assertIsNotTabbable('#visibleAncestor-span', 'span');
        assertIsNotTabbable('#visibleAncestor-div', 'div');
        assertIsTabbable('#visibleAncestor-spanWithTabindex', 'span with tabindex');
        assertIsNotTabbable('#visibleAncestor-divWithNegativeTabindex', 'div with tabindex');
    });

    it('does not find disabled elements', () => {
        assertIsNotTabbable('#disabledElement-inputTypeNone', 'input, no type');
        assertIsNotTabbable('#disabledElement-inputTypeText', 'input, type text');
        assertIsNotTabbable('#disabledElement-inputTypeCheckbox', 'input, type checkbox');
        assertIsNotTabbable('#disabledElement-inputTypeRadio', 'input, type radio');
        assertIsNotTabbable('#disabledElement-inputTypeButton', 'input, type button');
        assertIsNotTabbable('#disabledElement-inputTypeHidden', 'input, type hidden');
        assertIsNotTabbable('#disabledElement-button', 'button');
        assertIsNotTabbable('#disabledElement-select', 'select');
        assertIsNotTabbable('#disabledElement-textarea', 'textarea');
    });

    it('does not find elements with hidden styles', () => {
        assertIsNotTabbable('#displayNoneAncestor-input', 'input, display: none parent');
        assertIsNotTabbable('#displayNoneAncestor-span', 'span with tabindex, display: none parent');

        assertIsNotTabbable('#visibilityHiddenAncestor-input', 'input, visibility: hidden parent');
        assertIsNotTabbable('#visibilityHiddenAncestor-span', 'span with tabindex, visibility: hidden parent');

        assertIsTabbable('#nestedVisibilityOverrideAncestor-input', 'input, visibility: visible parent but visibility: hidden grandparent');
        assertIsTabbable('#nestedVisibilityOverrideAncestor-span', 'span with tabindex, visibility: visible parent but visibility: hidden grandparent ');

        assertIsNotTabbable('#displayNone-input', 'input, display: none');
        assertIsNotTabbable('#visibilityHidden-input', 'input, visibility: hidden');

        assertIsNotTabbable('#displayNone-span', 'span with tabindex, display: none');
        assertIsNotTabbable('#visibilityHidden-span', 'span with tabindex, visibility: hidden');
    });

    it('natively tabbable with various tabindex', () => {
        assertIsTabbable('#inputTabindex0', 'input, tabindex 0');
        assertIsTabbable('#inputTabindex10', 'input, tabindex 10');
        assertIsNotTabbable('#inputTabindex-1', 'input, tabindex -1');
        assertIsNotTabbable('#inputTabindex-50', 'input, tabindex -50');
    });

    it('not natively tabbable with various tabindex', () => {
        assertIsTabbable('#spanTabindex0', 'span, tabindex 0');
        assertIsTabbable('#spanTabindex10', 'span, tabindex 10');
        assertIsNotTabbable('#spanTabindex-1', 'span, tabindex -1');
        assertIsNotTabbable('#spanTabindex-50', 'span, tabindex -50');
    });

    it('area elements', () => {
        assertIsTabbable('#areaCoordsHref', 'coords and href');
        assertIsTabbable('#areaNoCoordsHref', 'href but no coords');
        assertIsNotTabbable('#areaCoordsNoHref', 'coords but no href');
        assertIsNotTabbable('#areaNoImg', 'not associated with an image');
        assertIsNotTabbable('#areaNoMap', 'not associated with a map');
    });

    it('dimensionless parent with overflow', () => {
        assertIsTabbable('#dimensionlessParent', 'input');
    });
});
