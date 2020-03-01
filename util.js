export function _$(selector, all, target = document) {
    return all ? target.querySelectorAll(selector) : document.querySelector(selector);
}

export const _$c = {
    add(target, className) {
        target.classList.add(className);
    },
    remove(target, className) {
        target.classList.remove(className);
    }
}

export const _$e = {
    timer: null,

    on(target, event, func) {
        target.addEventListener(event, func);
    },

    debounce(delayTime, funcThis, func) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            func.call(funcThis);
        }, delayTime);
    }
}
