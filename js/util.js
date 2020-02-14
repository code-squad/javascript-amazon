export function $(target) {
    return document.querySelector(target);
}

export function $$(target) {
    return document.querySelectorAll(target);
}

export function _$(tag) {
    return document.createElement(tag);
}