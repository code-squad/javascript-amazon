export function taek$(target) {
    return document.querySelector(target);
}

export function taek$$(target) {
    return document.querySelectorAll(target);
}

export function classAdd(target, className) {
    target.classList.add(className);
}

export function classRemove(target, className) {
    target.classList.remove(className);
}