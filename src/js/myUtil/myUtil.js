export default {
  styleElement(elem, attr, style) {
    elem.setAttribute('style', `${attr}:${style};`)
  },

  appendElLastly(elem, literalTemplate) {
    elem.insertAdjacentHTML('beforeend', literalTemplate)
  }
}