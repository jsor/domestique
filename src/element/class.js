export function addClass(element, classNames) {
    classNames.split(' ').forEach(className => {
        element.classList.add(className);
    });
}

export function removeClass(element, classNames) {
    classNames.split(' ').forEach(className => {
        element.classList.remove(className);
    });
}

export function hasClass(element, classNames) {
    return classNames.split(' ').every(className => {
        return element.classList.contains(className);
    });
}
