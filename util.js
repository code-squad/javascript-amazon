export function _$(selector, all, target = document) {
    return all ? target.querySelectorAll(selector) : target.querySelector(selector);
}

export function _$c(target) {
    return {
        add(className) {
            target.classList.add(className);
        },
        remove(className) {
            target.classList.remove(className);
        }
    }
}

export function __$(target) {
    return {
        on(event, func) {
            target.addEventListener(event, func);
        },
        show(className = 'on-block') {
            target.classList.add(className);
        },
        hide(className = 'on-block') {
            target.classList.remove(className);
        }
    }
}

export const _$e = {
    timer: null,

    debounce(delayTime, funcThis, func) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            func.call(funcThis);
        }, delayTime);
    }
}
