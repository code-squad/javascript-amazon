const qS = (input) => {
    return document.querySelector(input);
}

const addClass = (target, className) => {
    target.classList.add(className);
}

const removeClass = (target, className) => {
    target.classList.remove(className); 
}

export default {qS, addClass, removeClass};