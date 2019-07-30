export default {
  appendAtLast(parent, literalTemplate) {
    parent.insertAdjacentHTML('beforeend', literalTemplate)
  },

  qrSelectorByClass(className, parent) {
    const elem = parent || document
    return elem.querySelector(`.${className}`);
  },
}