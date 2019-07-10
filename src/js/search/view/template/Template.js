export default {
  createListContainer() {
    return `
        <ul class="search__searcheable-list">
        
        </ul>
    `
  },

  createSearcheableList(recentSearch) {
    return `
      <li class="search__searcheable-list--item">${recentSearch}</li>
    `
  }
}