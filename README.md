Domestique
==========

A modular DOM helper library.

[![Build Status](https://travis-ci.org/jsor/domestique.svg?branch=master)](https://travis-ci.org/jsor/domestique)

Installation
------------

```bash
npm install domestique
```

**Note**: This library is written as ES2015 code and published as such to 
[npm](https://www.npmjs.com/package/domestique).
That means, code from `domestique` must *not* be excluded from transpilation.

If you're using webpack and babel, that could look like:

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

Usage
-----

* [Element](#element)
  * [create()](#create)
  * [addClass()](#addclass)
  * [removeClass()](#removeclass)
  * [hasClass()](#hasclass)
  * [data()](#data)
* [Event](#event)
  * [ready()](#ready)
  * [on()](#on)
  * [off()](#off)
  * [delegate()](#delegate)
  * [dispatch()](#dispatch)
* [Query](#query)
  * [find()](#find)
  * [closest()](#closest)
  * [matches()](#matches)

```javascript
import {
    // Element
    create,
    addClass,
    removeClass,
    hasClass,
    data,
    
    // Event
    ready,
    on,
    off,
    delegate,
    dispatch,

    // Query
    find,
    closest,
    matches
} from 'domestique';
```

### Element

### create()

```
create(html: string): Element
```

Creates a DOM element from a HTML string.

#### Example

```javascript
const element = create('<div/>');
```

### addClass()

```
addClass(element: Element, className: string): void
```

Adds a class (or multiple classes separated by space) to an element.

#### Example

```javascript
addClass(element, 'my-class');
addClass(element, 'my-class my-other-class');
```

### removeClass()

```
removeClass(element: Element, className: string): void
```

Removes a class (or multiple classes separated by space) from an element.

#### Example

```javascript
removeClass(element, 'my-class');
removeClass(element, 'my-class my-other-class');
```

### hasClass()

```
hasClass(element: Element, className: string): bool
```

Checks whether an element has a class (or multiple classes separated by space).

#### Example

```javascript
const hasClass = hasClass(element, 'my-class');
const hasAllClasses = hasClass(element, 'my-class my-other-class');
```

### data()

```
data(element: Element, name: string): bool
```

Reads and parses data from an data-* attribute.

#### Example

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

### Event

### ready()

```
ready(listener: function): void
```

Registers a listener to be called once the DOM is ready.

Unlike `DOMContentLoaded`, this also works when called after the DOM was loaded.

#### Example

```javascript
ready(function () {
    console.log('DOM is ready!');
});
```

### on()

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

#### Example

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

### off()

```
off(target: EventTarget, type: string, listener: EventListener[, options: object]): void
```

Removes a listener previously registered via `on()`.

#### Example

```javascript
off(
    target, 
    'click',
    listener,
    options
);
```

### delegate()

```
delegate(target: EventTarget, type: string, selector: string, listener: EventListener[, options: object]): function
```

Registers a `listener` for the event `type` on `target` with `options` that
processes events from descendant elements of `target` matching the specified
`selector`.

The function returns another function which can be used to unregister the event listener.

#### Example

```javascript
const listener = function () {
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

### dispatch()

```
dispatch(target: EventTarget, type: string[, eventInit: CustomEventInit]): function
```

Dispatches a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) 
`type` at the specified `target` optionally using the `eventInit` options.

#### Example

```javascript
dispatch(document, 'click');

dispatch(
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

### Query

#### find()

```
find(selector: string[, element: Element]): array
```

Returns an `array` of elements matching the specified `selector` which are
descendants of the `document` or the `element` specified as optional second 
argument.

##### Example

```javascript
const paragraphs = find('p');

const spansInsideFirstParagraph = find('spans', paragraphs[0]);
```

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

License
-------

Copyright (c) 2018 Jan Sorgalla.
Released under the [MIT](LICENSE) license.
