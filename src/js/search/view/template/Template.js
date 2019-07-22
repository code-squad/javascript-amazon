export default {
  createAutoViewContainer(className) {
    return `<div class="${className}"></div>`
  },

  createAutoView(className) {
    return `<ul class="${className}"></ul>`
  },

  createAutoViewItem(text, originalText, className) {
    return `
      <li class="${className} data-name="${originalText}">${text}</li>
    `
  },

  createBoldLetter(letter) {
    return `<b>${letter}</b>`
  },
}