import inViewport from './src/dimension/in-viewport';
import scrollbarSize from './src/dimension/scrollbar-size';
import viewportHeight from './src/dimension/viewport-height';
import viewportWidth from './src/dimension/viewport-width';

import activeElement from './src/element/active-element';
import create from './src/element/create';
import {addClass, hasClass, removeClass} from './src/element/class';
import data from './src/element/data';

import delegate from './src/event/delegate';
import dispatch from './src/event/dispatch';
import off from './src/event/off';
import on from './src/event/on';
import ready from './src/event/ready';

import closest from './src/query/closest';
import find from './src/query/find';
import matches from './src/query/matches';

export {
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

    // Event
    delegate,
    dispatch,
    on,
    off,
    ready,

    // Query
    closest,
    find,
    matches
};
