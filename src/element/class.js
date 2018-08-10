function check(element) {
    return element && element.classList;
}

export function addClass(element, classNames) {
    if (!check(element)) {
        return;
    }

    classNames.split(' ').forEach(className => {
        element.classList.add(className);
    });
}

export function removeClass(element, classNames) {
    if (!check(element)) {
        return;
    }

    classNames.split(' ').forEach(className => {
        element.classList.remove(className);
    });
}

export function hasClass(element, classNames) {
    if (!check(element)) {
        return;
    }

    return classNames.split(' ').every(className => {
        return element.classList.contains(className);
    });
}
