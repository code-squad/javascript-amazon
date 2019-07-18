export default {
  styleElement(elem, attr, style) {
    elem.setAttribute('style', `${attr}:${style};`)
  },

  appendElLastly(parent, literalTemplate) {
    parent.insertAdjacentHTML('beforeend', literalTemplate)
  },

  qrSelectorByClass(className, parent) {
    const elem = parent || document
    return elem.querySelector(`.${className}`);
  }
}