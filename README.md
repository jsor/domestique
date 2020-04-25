Domestique
==========

A modular DOM helper library.

[![Build Status](https://travis-ci.org/jsor/domestique.svg?branch=master)](https://travis-ci.org/jsor/domestique)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=MncwbGZsVkc2M2xmeC9TNll6dUtVQ2g5ZjYvSERxdEtSZzNoZTFVc3g4cz0tLURiWVhRZXRZQ2RNS3BteTdzS2FURHc9PQ==--5101c2094cba0afbd62fb06961cb133afeaed8d9)](https://www.browserstack.com/automate/public-build/MncwbGZsVkc2M2xmeC9TNll6dUtVQ2g5ZjYvSERxdEtSZzNoZTFVc3g4cz0tLURiWVhRZXRZQ2RNS3BteTdzS2FURHc9PQ==--5101c2094cba0afbd62fb06961cb133afeaed8d9)

Installation
------------

```bash
npm install domestique
```

> **Note:** This library is written as ES2015 code and published as such to
  [npm](https://www.npmjs.com/package/domestique).
  Read the [Compatibility](#compatibility) section for more information.

Usage
-----

```javascript
import {
     // Dimension
    inViewport,
    scrollbarSize,
    viewportHeight,
    viewportWidth,

    // Element
    activeElement,
    create,
    addClass,
    removeClass,
    hasClass,
    data,
    focus,
    isFocusable,
    isTabbable,
    parents,
    render,

    // Event
    delegate,
    dispatch,
    on,
    onTransitionEnd,
    off,
    ready,

    // Query
    closest,
    find,
    focusable,
    matches,
    select,
    selectAll,
    tabbable
} from 'domestique';
```

API
---

* [Dimension](#dimension)
  * [inViewport()](#inviewport)
  * [scrollbarSize()](#scrollbarsize)
  * [viewportHeight()](#viewportheight)
  * [viewportWidth()](#viewportwidth)
* [Element](#element)
  * [activeElement()](#activeelement)
  * [create()](#create)
  * [addClass()](#addclass)
  * [removeClass()](#removeclass)
  * [hasClass()](#hasclass)
  * [data()](#data)
  * [focus()](#focus)
  * [isFocusable()](#isfocusable)
  * [isTabbable()](#istabbable)
  * [parents()](#parents)
  * [render()](#render)
* [Event](#event)
  * [delegate()](#delegate)
  * [dispatch()](#dispatch)
  * [on()](#on)
  * [onTransitionEnd()](#ontransitionend)
  * [off()](#off)
  * [ready()](#ready)
* [Query](#query)
  * [closest()](#closest)
  * [find()](#find)
  * [focusable()](#focusable)
  * [matches()](#matches)
  * [select()](#select)
  * [selectAll()](#selectall)
  * [tabbable()](#tabbable)

### Dimension

### inViewport()

```
inViewport(element: Element): bool
```

Returns `true` if any part of an element is in the viewport.

#### Example

```javascript
const inVp = inViewport(element);
```

### scrollbarSize()

```
scrollbarSize(): number
```

Returns the size of the scrollbar in pixels.

#### Example

```javascript
const size = scrollbarSize();
```

### viewportHeight()

```
viewportHeight(): number
```

Returns the viewport height.

> **Note:** The height represent the CSS viewport height
  ([@media (height)](https://www.w3.org/TR/mediaqueries-4/#height)) including the
  size of a rendered scroll bar (if any).

#### Example

```javascript
const vpHeight = viewportHeight();
```

### viewportWidth()

```
viewportWidth(): number
```

Returns the viewport width.

> **Note:** The width represent the CSS viewport width
  ([@media (width)](https://www.w3.org/TR/mediaqueries-4/#width)) including the
  size of a rendered scroll bar (if any).

#### Example

```javascript
const vpWidth = viewportWidth();
```

### Element

#### activeElement()

```
activeElement(): Element
```

Returns the element that currently has focus.

##### Example

```javascript
const element = activeElement();
```

#### create()

```
create(html: string): Element
```

Creates a DOM element from a HTML string. If it's already a DOM node, the node
is returned as is.

##### Example

```javascript
const element = create('<div/>');
```

#### addClass()

```
addClass(element: Element, className: string): void
```

Adds a class (or multiple classes separated by space) to an element.

##### Example

```javascript
addClass(element, 'my-class');
addClass(element, 'my-class my-other-class');
```

#### removeClass()

```
removeClass(element: Element, className: string): void
```

Removes a class (or multiple classes separated by space) from an element.

##### Example

```javascript
removeClass(element, 'my-class');
removeClass(element, 'my-class my-other-class');
```

#### hasClass()

```
hasClass(element: Element, className: string): bool
```

Checks whether an element has a class (or multiple classes separated by space).

##### Example

```javascript
const hasClass = hasClass(element, 'my-class');
const hasAllClasses = hasClass(element, 'my-class my-other-class');
```

#### data()

```
data(element: Element, name: string): bool
```

Reads and parses data from an data-* attribute.

##### Example

```html
<div
   data-string="string"
   data-true="true"
   data-false="false"
   data-null="null"
   data-integer="1"
   data-float="1.2"
   data-json-object="{&quot;foo&quot;: &quot;bar&quot;}"
   data-json-array="[&quot;foo&quot;]"
></div>
```

```javascript
const stringValue = data(element, 'string');
const trueValue = data(element, 'true');
const falseValue = data(element, 'false');
const nullValue = data(element, 'null');
const integerValue = data(element, 'integer');
const floatValue = data(element, 'float');
const jsonObjectValue = data(element, 'json-object');
const jsonArrayValue = data(element, 'json-array');
```

#### focus()

```
focus(element: Element[, options: object]): void
```

Shifts focus to an element.

##### Example

```javascript
focus(element);
```

Browsers scroll the focused element into view. `focus()` provides an option
`restoreScrollPosition` to restore scroll positions of all scroll containers of
the focused element to the state before the element got focus.

##### Example

```javascript
focus(element, {
    restoreScrollPosition: true
});
```

#### isFocusable()

```
isFocusable(element: Element): bool
```

Checks whether an element is focusable.

Unlike [`isTabbable()`](#istabbable), the function also returns `true` for
elements which are not focusable by the keyboard, but only by script 
(`element.focus()`) and possibly the mouse (or pointer). Usually, those are
elements with a negative `tabindex` attribute value, like `-1`.

##### Example

```javascript
const isFocusableElement = isFocusable(element);
```

#### isTabbable()

```
isTabbable(element: Element): bool
```

Checks whether an element is tabbable.

Unlike [`isFocusable()`](#isfocusable), the function returns `true` **only** for
elements which are focusable by the keyboard (by pressing the <kbd>TAB</kbd> and
<kbd>SHIFT</kbd>+<kbd>TAB</kbd> keys). Elements that are only focusable by
script (`element.focus()`) and possibly the mouse (or pointer) are excluded.

##### Example

```javascript
const isFocusableElement = isFocusable(element);
```

#### parents()

```
parents(element: Element): Array
```

Returns an array of the element's parent elements.

##### Example

```javascript
const parentElements = parents(element);
```

#### render()

```
render(html: string): object
```

Creates and returns DOM element references from a HTML string.

Elements must have a `ref` attribute with the reference name. The value of this
attribute will get mapped to the property name of the returned object.

##### Example

```javascript
const {list, 'list-items': listItems} = render(`
<ul ref="list">
    <li ref="list-items[]"></l>
    <li ref="list-items[]"></l>
</ul>
`);
```

> **Note:** The `ref` attributes will be removed from the returned elements.

### Event

#### delegate()

```
delegate(target: EventTarget, type: string, selector: string, listener: EventListener[, options: object]): function
```

Registers a `listener` for the event `type` on `target` with `options` that
processes events from descendant elements of `target` matching the specified
`selector`.

The function returns another function which can be used to unregister the event listener.

##### Example

```javascript
const listener = function (e, target) {
    target.classList.add('my-target-clicked');

    console.log('My Button clicked');
};
const options = {
    passive: true
};

const remove = delegate(
    document, // Listen on document
    'click',
    '.my-button',
    listener,
    options
);

remove(); // Remove event listener
```

#### dispatch()

```
dispatch(target: EventTarget, type: string[, eventInit: CustomEventInit]): bool
```

Dispatches a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) 
`type` at the specified `target` optionally using the `eventInit` options.

The function returns `false` if the event is cancelable and at least one of the
event handlers which handled this event called `Event.preventDefault()`.
Otherwise it returns `true`.

##### Example

```javascript
const clickNotCancelled = dispatch(document, 'click');

const myEventNotCancelled = dispatch(
    document.querySelector('.my-button'),
    'my:event',
    {
        bubbles: true,
        cancelable: true,
        detail: {
            foo: 'bar'
        }
    }
);
```

#### on()

```
on(target: EventTarget, type: string, listener: EventListener[, options: object]): function
```

Registers a `listener` for the event `type` on `target` with `options`.

`options` is **always** an object that specifies characteristics about the event
listener, see https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener.

If one of the options isn't supported by the browser, the behavior is as 
follows:

* `capture`: Always supported.
* `once`: Will be polyfilled.
* `passive`: Will be ignored.

The function returns another function which can be used to unregister the event listener.

##### Example

```javascript
const target = document.querySelector('.my-button');
const listener = function () {
    console.log('My Button clicked');
};
const options = {
    once: true
};

const remove = on(
    target, 
    'click',
    listener,
    options
);

remove(); // Remove event listener
```

#### onTransitionEnd()

```
onTransitionEnd(target: EventTarget, listener: EventListener): function
```

Registers a one-time `listener` for the `transitionend` event on `target`.

The function returns another function which can be used to unregister the event listener.

##### Example

```javascript
const target = document.querySelector('.my-element');
const listener = function (target) {
    target.classList.add('transition-ended');

    console.log('Transition ended');
};

const remove = onTransitionEnd(
    target,
    listener
);

remove(); // Remove event listener
```

#### off()

```
off(target: EventTarget, type: string, listener: EventListener[, options: object]): void
```

Removes a listener previously registered via `on()`.

##### Example

```javascript
off(
    target, 
    'click',
    listener,
    options
);
```

#### ready()

```
ready(listener: function): void
```

Registers a listener to be called once the DOM is ready.

Unlike `DOMContentLoaded`, this also works when called after the DOM was loaded.

##### Example

```javascript
ready(function () {
    console.log('DOM is ready!');
});
```

### Query

#### closest()

```
closest(element: Element, selector: string): Element
```

Returns the closest ancestor of the `element` (or the `element` itself) which
matches the specified `selector`. 

If there isn't such an ancestor, it returns `null`.

##### Example

```javascript
const closestParagraph = closest(element, 'p');
```

#### find()

*Deprecated in favor of [selectAll()](#selectall). To be removed in 2.0.*

```
find(selector: string[, element: Element]): array
```

Returns an `array` of elements matching the specified `selector` which are
descendants of the `document` or the `element` specified as optional second 
argument.

##### Example

```javascript
const paragraphs = find('p');

const spansInsideFirstParagraph = find('span', paragraphs[0]);
```

#### focusable()

```
focusable([element: Element]): array
```

Returns an `array` of focusable elements in the DOM which are
descendants of the `document` or the `element` specified as optional first
argument.

Unlike [`tabbable()`](#tabbable), the array also includes elements which are not
focusable by the keyboard, but only by script (`element.focus()`) and possibly
the mouse (or pointer). Usually, those are elements with a negative `tabindex`
attribute value, like `-1`.

> **Note:** The elements in the array are ordered according to the 
  [sequential focus navigation order](https://html.spec.whatwg.org/multipage/interaction.html#sequential-focus-navigation)
  which may be different from the DOM order.

##### Example

```javascript
const focusableElements = focusable();
```

#### matches()

```
matches(element: Element, selector: string): boolean
```

Returns `true` if the `element` would be selected by the specified `selector`, 
`false` otherwise.

##### Example

```javascript
const isParagraph = matches(element, 'p');
```

#### select()

```
select(context: Element, selector: string): Element
```

Returns the descendant of `context` (`document` or `Element`) which matches the 
specified `selector`. If no element could be found, `null` is returned.

##### Example

```javascript
const paragraph = select(document, 'p');

const spanInsideParagraph = select(paragraph, 'span');
```

#### selectAll()

```
select(context: Element, selector: string): array
```

Returns an `array` of all descendants of `context` (`document` or `Element`)
which match the specified `selector`.

##### Example

```javascript
const allParagraphs = selectAll(document, 'p');

const allSpansInsideFirstParagraph = selectAll(paragraph[0], 'span');
```

#### tabbable()

```
tabbable([element: Element]): array
```

Returns an `array` of keyboard focusable ("tabbable") elements in the DOM which
are descendants of the `document` or the `element` specified as optional first
argument.

Unlike [`focusable()`](#focusable), the array **only** includes elements which
are focusable by the keyboard (by pressing the <kbd>TAB</kbd> and
<kbd>SHIFT</kbd>+<kbd>TAB</kbd> keys). Elements that are only focusable by
script (`element.focus()`) and possibly the mouse (or pointer) are excluded.

> **Note:** The elements in the array are ordered according to the 
  [sequential focus navigation order](https://html.spec.whatwg.org/multipage/interaction.html#sequential-focus-navigation)
  which may be different from the DOM order.

##### Example

```javascript
const tabbableElements = tabbable();
```

Compatibility
-------------

This library is written as ES2015 code and published as such to
[npm](https://www.npmjs.com/package/domestique).
It is compatible with
[modern browsers](http://browserl.ist/?q=Chrome+%3E%3D+60%2C+Edge+%3E%3D+15%2C+Firefox+%3E%3D+54%2C+iOS+%3E%3D+10.3%2C+Safari+%3E%3D+10.1)
which natively support `<script type="module">`.

If support for older browsers is required, code from `domestique` must be
transpiled, eg. by using [Babel](https://github.com/babel/babel).

Most bundlers (like [Webpack](https://github.com/babel/babel-loader#usage) and
[Rollup](https://github.com/rollup/rollup-plugin-babel#usage)) recommend
to not transpile anything from the `node_modules/` directory. It must be
ensured, that code from `domestique` is **not** excluded from transpilation.

If you're using Webpack and Babel, that could look like:

```javascript
{
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!domestique)/,
                loader: 'babel-loader'
            }
        ]
    }
}
```

After transpilation, `domestique` supports the
[most common browsers including IE 10](http://browserl.ist/?q=defaults%2C+IE+10)
without polyfills.

Thank You
---------

* [BrowserStack](https://www.browserstack.com/) for providing free VMs for automated testing.
* [GitHub](https://github.com/) for providing free Git repository hosting.
* [npm](https://www.npmjs.com/) for providing the package manager for JavaScript.
* [TravisCI](https://travis-ci.org/) for providing a free build server.

License
-------

Copyright (c) 2018-2020 Jan Sorgalla.
Released under the [MIT](LICENSE) license.
