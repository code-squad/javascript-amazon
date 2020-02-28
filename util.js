export const _$ = (selector, all) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}
