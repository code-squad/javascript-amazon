export const $ = target => document.querySelector(target);
export const $$ = target => document.querySelectorAll(target);

Element.prototype.show = function () {
    this.style.display = "block";
    return this;
}

Element.prototype.hide = function () {
    this.style.display = "none";
    return this;
}

Element.prototype.html = function (innerHTML) {
    this.innerHTML = innerHTML;
    return this;
}

Element.prototype.setScrollTop = function (scrollUnit) {
    this.scrollTop = scrollUnit;
    return this;
}

Array.prototype.doesElementExist = function (target) {
    return this.indexOf(target) !== -1;
}