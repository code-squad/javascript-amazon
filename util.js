export function _$(selector, all) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

export function _$on(target, event, func) {
    target.addEventListener(event, func)
}

export function _$d(delayTime, func) {
    let timer;

    if (!timer) {
        timer = setTimeout(() => {
            timer = null;
            func();
        }, delayTime)
    }
}

export function _$ca(target, className) {
    target.classList.add(className);
}

export function _$cr(target, className) {
    target.classList.remove(className);
}

