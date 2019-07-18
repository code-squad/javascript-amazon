export default {
  createAutoViewContainer(className) {
    return `<div class="${className}"></div>`
  },

  createAutoView(className) {
    return `<ul class="${className}"></ul>`
  },

  createAutoViewItem(boldText, originalText) {
    return `
      <li class="search__auto-view--item" data-name="${originalText}">${boldText}</li>
    `
  },

  createBoldLetter(letter) {
    return `<b style='background-color:#FCFF56;'>${letter}</b>`
  },

}