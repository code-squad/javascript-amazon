export default {
  styleElement(elem, attr, style) {
    elem.setAttribute('style', `${attr}:${style};`)
  },

  appendElLastly(elem, literalTemplate) {
    console.log(elem)
    elem.insertAdjacentHTML('beforeend', literalTemplate)
  }
}