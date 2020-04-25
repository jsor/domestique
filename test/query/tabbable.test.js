import {tabbable} from '../..';
import {focusFixture} from '../fixture';

function elementIds(elements) {
    return elements.map(element => {
        return `#${element.id}`;
    });
}

function assertIsTabbable(elements, id, message) {
    assert.include(
        elementIds(elements),
        id,
        message + ' - ID ' + id + ' is tabbable'
    );
}

function assertIsNotTabbable(elements, id, message) {
    assert.notInclude(
        elementIds(elements),
        id,
        message + ' - ID ' + id + ' is not tabbable'
    );
}

describe('tabbable()', () => {
    let fixture;

    beforeEach(() => {
        fixture = focusFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('finds visible, enabled elements', () => {
        const elements = tabbable();

        assertIsNotTabbable(elements, '#formNoTabindex', 'form');
        assertIsTabbable(elements, '#formTabindex', 'form with tabindex');
        assertIsTabbable(elements, '#enabledFieldset-input', 'input in enabled fieldset');
        assertIsNotTabbable(elements, '#disabledFieldset-input', 'input in disabled fieldset');
        assertIsTabbable(elements, '#visibleAncestor-inputTypeNone', 'input, no type');
        assertIsTabbable(elements, '#visibleAncestor-inputTypeText', 'input, type text');
        assertIsTabbable(elements, '#visibleAncestor-inputTypeCheckbox', 'input, type checkbox');
        assertIsTabbable(elements, '#visibleAncestor-inputTypeRadio', 'input, type radio');
        assertIsTabbable(elements, '#visibleAncestor-inputTypeButton', 'input, type button');
        assertIsNotTabbable(elements, '#visibleAncestor-inputTypeHidden', 'input, type hidden');
        assertIsTabbable(elements, '#visibleAncestor-button', 'button');
        assertIsTabbable(elements, '#visibleAncestor-select', 'select');
        assertIsTabbable(elements, '#visibleAncestor-textarea', 'textarea');
        assertIsTabbable(elements, '#visibleAncestor-object', 'object');
        assertIsTabbable(elements, '#visibleAncestor-anchorWithHref', 'anchor with href');
        assertIsNotTabbable(elements, '#visibleAncestor-anchorWithoutHref', 'anchor without href');
        assertIsNotTabbable(elements, '#visibleAncestor-span', 'span');
        assertIsNotTabbable(elements, '#visibleAncestor-div', 'div');
        assertIsTabbable(elements, '#visibleAncestor-spanWithTabindex', 'span with tabindex');
        assertIsNotTabbable(elements, '#visibleAncestor-divWithNegativeTabindex', 'div with tabindex');
    });

    it('does not find disabled elements', () => {
        const elements = tabbable();

        assertIsNotTabbable(elements, '#disabledElement-inputTypeNone', 'input, no type');
        assertIsNotTabbable(elements, '#disabledElement-inputTypeText', 'input, type text');
        assertIsNotTabbable(elements, '#disabledElement-inputTypeCheckbox', 'input, type checkbox');
        assertIsNotTabbable(elements, '#disabledElement-inputTypeRadio', 'input, type radio');
        assertIsNotTabbable(elements, '#disabledElement-inputTypeButton', 'input, type button');
        assertIsNotTabbable(elements, '#disabledElement-inputTypeHidden', 'input, type hidden');
        assertIsNotTabbable(elements, '#disabledElement-button', 'button');
        assertIsNotTabbable(elements, '#disabledElement-select', 'select');
        assertIsNotTabbable(elements, '#disabledElement-textarea', 'textarea');
    });

    it('does not find elements with hidden styles', () => {
        const elements = tabbable();

        assertIsNotTabbable(elements, '#displayNoneAncestor-input', 'input, display: none parent');
        assertIsNotTabbable(elements, '#displayNoneAncestor-span', 'span with tabindex, display: none parent');

        assertIsNotTabbable(elements, '#visibilityHiddenAncestor-input', 'input, visibility: hidden parent');
        assertIsNotTabbable(elements, '#visibilityHiddenAncestor-span', 'span with tabindex, visibility: hidden parent');

        assertIsTabbable(elements, '#nestedVisibilityOverrideAncestor-input', 'input, visibility: visible parent but visibility: hidden grandparent');
        assertIsTabbable(elements, '#nestedVisibilityOverrideAncestor-span', 'span with tabindex, visibility: visible parent but visibility: hidden grandparent ');

        assertIsNotTabbable(elements, '#displayNone-input', 'input, display: none');
        assertIsNotTabbable(elements, '#visibilityHidden-input', 'input, visibility: hidden');

        assertIsNotTabbable(elements, '#displayNone-span', 'span with tabindex, display: none');
        assertIsNotTabbable(elements, '#visibilityHidden-span', 'span with tabindex, visibility: hidden');
    });

    it('finds natively tabbable with various tabindex', () => {
        const elements = tabbable();

        assertIsTabbable(elements, '#inputTabindex0', 'input, tabindex 0');
        assertIsTabbable(elements, '#inputTabindex10', 'input, tabindex 10');
        assertIsNotTabbable(elements, '#inputTabindex-1', 'input, tabindex -1');
        assertIsNotTabbable(elements, '#inputTabindex-50', 'input, tabindex -50');
    });

    it('finds not natively tabbable with various tabindex', () => {
        const elements = tabbable();

        assertIsTabbable(elements, '#spanTabindex0', 'span, tabindex 0');
        assertIsTabbable(elements, '#spanTabindex10', 'span, tabindex 10');
        assertIsNotTabbable(elements, '#spanTabindex-1', 'span, tabindex -1');
        assertIsNotTabbable(elements, '#spanTabindex-50', 'span, tabindex -50');
    });

    it('finds area elements', () => {
        const elements = tabbable();

        assertIsTabbable(elements, '#areaCoordsHref', 'coords and href');
        assertIsTabbable(elements, '#areaNoCoordsHref', 'href but no coords');
        assertIsNotTabbable(elements, '#areaCoordsNoHref', 'coords but no href');
        assertIsNotTabbable(elements, '#areaNoImg', 'not associated with an image');
        assertIsNotTabbable(elements, '#areaNoMap', 'not associated with a map');
    });

    it('finds dimensionless parent with overflow', () => {
        const elements = tabbable();

        assertIsTabbable(elements, '#dimensionlessParent', 'input');
    });

    it('orders elements by tabindex', () => {
        const elements = tabbable(document.querySelector('#tabIndexOrder'));

        assert.deepEqual(elementIds(elements), [
            '#tabIndexOrder-spanTabindex0',
            '#tabIndexOrder-buttonNoTabindex',
            '#tabIndexOrder-divTabindex0',
            '#tabIndexOrder-inputTabindex1',
            '#tabIndexOrder-inputTabindex2',
            '#tabIndexOrder-inputTabindex3'
        ]);
    });
});
