module.exports = {
  qs(selector) {
    return document.querySelector(selector);
  },
  addClass(el, className) {
    el.classList.add(className);
  },
  removeClass(el, className) {
    el.classList.remove(className);
  }
}
