export default {
  createSearcheableList(recentSearch) {
    return `
      <li class="search__searcheable-list--item">${recentSearch}</li>
    `
  },

  createBoldLetter(letter) {
    return `<b style='background-color:#FCFF56;'>${letter}</b>`
  }
}