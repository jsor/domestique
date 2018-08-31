import {create} from '..';

export default function createFixture() {
    const root = document.createElement('div');

    root.id = 'domestique-fixture';

    document.body.appendChild(root);

    return {
        root,
        destroy() {
            document.body.removeChild(root);

            root.textContent = '';

            document.body.scrollTop = 0;
            document.body.scrollLeft = 0;

            document.body.focus();
        },
        append(html) {
            const element = create(html);

            root.appendChild(element);

            return element;
        }
    };
}

// Copied from https://github.com/jquery/jquery-ui/blob/74f8a0ac952f6f45f773312292baef1c26d81300/tests/unit/core/core.html
export function focusFixture() {
    const fixture = createFixture();

    fixture.append(`
<div>
    <img usemap="#mymap" width="32" height="32" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpJREFUeNrszUEBAAAEBDD073xK8NsKrJPUp6lnAoFAIBAIBAKB4MoKMADH8QM9yXkGBwAAAABJRU5ErkJggg==">
    <map name="mymap">
        <area shape="rect" coords="1,1,2,2" href="foo.html" id="areaCoordsHref" alt="">
        <area href="foo.html" id="areaNoCoordsHref" alt="">
        <area shape="rect" coords="1,1,2,2" id="areaCoordsNoHref" alt="">
    </map>
    <map name="mymap2">
        <area shape="rect" coords="1,1,2,2" href="foo.html" id="areaNoImg" alt="">
    </map>
    <area shape="rect" coords="1,1,2,2" href="foo.html" id="areaNoMap" alt="">
    
    <form id="formNoTabindex">
        <input>
    </form>
    
    <form id="formTabindex" tabindex="1">
        <input>
    </form>
    
    <form>
        <fieldset id="enabledFieldset">
            <input id="enabledFieldset-input">
        </fieldset>
        <fieldset id="disabledFieldset" disabled="disabled">
            <input id="disabledFieldset-input">
        </fieldset>
    </form>
    
    <div>
        <input id="visibleAncestor-inputTypeNone">
        <input type="text" id="visibleAncestor-inputTypeText">
        <input type="checkbox" id="visibleAncestor-inputTypeCheckbox">
        <input type="radio" id="visibleAncestor-inputTypeRadio">
        <input type="button" id="visibleAncestor-inputTypeButton" value="visibleAncestor-inputTypeButton">
        <input type="hidden" id="visibleAncestor-inputTypeHidden">
        <button id="visibleAncestor-button">x</button>
        <select id="visibleAncestor-select">
            <option>option</option>
        </select>
        <textarea id="visibleAncestor-textarea">x</textarea>
        <object id="visibleAncestor-object" codebase="about:blank">xxx</object>
        <a href="#" id="visibleAncestor-anchorWithHref">anchor</a>
        <a id="visibleAncestor-anchorWithoutHref">anchor</a>
        <span id="visibleAncestor-span">x</span>
        <div id="visibleAncestor-div">x</div>
        <span id="visibleAncestor-spanWithTabindex" tabindex="1">x</span>
        <div id="visibleAncestor-divWithNegativeTabindex" tabindex="-1">x</div>
    </div>
    
    <div>
        <input id="disabledElement-inputTypeNone" disabled="disabled">
        <input type="text" id="disabledElement-inputTypeText" disabled="disabled">
        <input type="checkbox" id="disabledElement-inputTypeCheckbox" disabled="disabled">
        <input type="radio" id="disabledElement-inputTypeRadio" disabled="disabled">
        <input type="button" id="disabledElement-inputTypeButton" disabled="disabled" value="disabledElement-inputTypeButton">
        <input type="hidden" id="disabledElement-inputTypeHidden" disabled="disabled">
        <button id="disabledElement-button" disabled="disabled"></button>
        <select id="disabledElement-select" disabled="disabled"></select>
        <textarea id="disabledElement-textarea" disabled="disabled"></textarea>
    </div>
    
    <div>
        <div id="displayNoneAncestor" style="display: none;">
            <input id="displayNoneAncestor-input">
            <span tabindex="1" id="displayNoneAncestor-span">.</span>
        </div>
    
        <div id="visibilityHiddenAncestor" style="visibility: hidden;">
            <input id="visibilityHiddenAncestor-input">
            <span tabindex="1" id="visibilityHiddenAncestor-span">.</span>
    
            <span id="nestedVisibilityOverrideAncestor" style="visibility: visible;">
                <input id="nestedVisibilityOverrideAncestor-input">
                <span tabindex="1" id="nestedVisibilityOverrideAncestor-span">.</span>
            </span>
    
            <span tabIndex="1" id="nestedVisibilityInheritWithHiddenAncestor" style="visibility: inherit;">.</span>
            <input id="nestedVisibilityInheritWithHiddenAncestor-input" style="visibility: inherit;">
        </div>
    
        <div id="visibilityVisibleAncestor" style="visibility: visible;">
            <span tabIndex="1" id="nestedVisibilityInheritWithVisibleAncestor" style="visibility: inherit;">.</span>
            <input id="nestedVisibilityInheritWithVisibleAncestor-input" style="visibility: inherit;">
        </div>
    
        <span tabindex="1" id="displayNone-span" style="display: none;">.</span>
        <span tabindex="1" id="visibilityHidden-span" style="visibility: hidden;">.</span>
    
        <input id="displayNone-input" style="display: none;">
        <input id="visibilityHidden-input" style="visibility: hidden;">
    </div>
    
    <div>
        <input id="inputTabindex0" tabindex="0">
        <input id="inputTabindex10" tabindex="10">
        <input id="inputTabindex-1" tabindex="-1">
        <input id="inputTabindex-50" tabindex="-50">
    
        <span id="spanTabindex0" tabindex="0">.</span>
        <span id="spanTabindex10" tabindex="10">.</span>
        <span id="spanTabindex-1" tabindex="-1">.</span>
        <span id="spanTabindex-50" tabindex="-50">.</span>
    </div>
    
    <div style="width: 0; height: 0;">
        <input id="dimensionlessParent">
        <input id="dimensionlessParent-dimensionless" style="height: 0; width: 0;">
    </div>
    
    <div id="tabIndexOrder">
        <span tabindex="0" id="tabIndexOrder-spanTabindex0"></span>
        <button id="tabIndexOrder-buttonNoTabindex"></button>
        <input tabindex="3" id="tabIndexOrder-inputTabindex3">
        <input tabindex="2" id="tabIndexOrder-inputTabindex2">
        <input tabindex="1" id="tabIndexOrder-inputTabindex1">
        <div tabindex="0" id="tabIndexOrder-divTabindex0"></div>
        <input tabindex="-1" id="tabIndexOrder-inputTabindex-1">
    </div>
</div>`);

    return fixture;
}
