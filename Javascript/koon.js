const qS = (input) => {
    return document.querySelector(input);
}

const addClass = (target, className) => {
    target.classList.add(className);
}

const removeClass = (target, className) => {
    target.classList.remove(className); 
}

const debounce = (func, delay) => {
    let timerId;
    return function() {
        if(timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => func.apply(this, [...arguments]), delay);
    }
}

export {
    qS,
    addClass,
    removeClass,
    debounce
}
