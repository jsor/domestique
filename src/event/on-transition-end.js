import on from './on.js';

export function parseTransition(element) {
    const fallback = ['', 0];

    if (!element || !element.nodeType) {
        return fallback;
    }

    function toArray(value) {
        return value.replace(' ', '').split(',');
    }

    function toMsArray(value) {
        return toArray(value).map(time => {
            const multiplier = time.indexOf('ms') === -1 ? 1000 : 1;

            return (parseFloat(time) || 0) * multiplier;
        });
    }

    const styles = getComputedStyle(element);

    const properties = toArray(styles.transitionProperty);
    const durations = toMsArray(styles.transitionDuration);
    const delays = toMsArray(styles.transitionDelay);

    const maxLength = Math.max(
        properties.length,
        durations.length,
        delays.length
    );

    const map = [];
    const ignoreProps = [];

    for (let i = 0; i < maxLength; i++) {
        const prop = properties[i] || 'all';

        if (prop !== 'all') {
            ignoreProps.push(prop);
        }

        map.push([
            prop,
            (durations[i] || durations[0]) + (delays[i] || delays[0])
        ]);
    }

    const longest = map
        // eslint-disable-next-line unicorn/no-array-reduce
        .reduce((previous, current) => {
            return current[1] >= previous[1] ? current : previous;
        }, fallback);

    longest.push(ignoreProps);

    return longest;
}

export default function onTransitionEnd(target, listener) {
    const [prop, timeout, ignoreProps] = parseTransition(target);

    const off = on(target, 'transitionend', event => {
        if (event.target !== target) {
            return;
        }

        if (prop !== 'all' && prop !== event.propertyName) {
            return;
        }

        if (prop === 'all' && ignoreProps.indexOf(event.propertyName) !== -1) {
            return;
        }

        done();
    }, {passive: true});

    const backupTimer = setTimeout(
        done,
        timeout + 100
    );

    function remove() {
        clearTimeout(backupTimer);
        off();
    }

    function done() {
        remove();
        listener.call(target, target);
    }

    return remove;
}
