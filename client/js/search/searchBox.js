function SearchBox() {
  this.init();
}

SearchBox.prototype = {
  init() {
    this.searchClickEvent();
  },

  searchClickEvent() {
    const searchContent = document.querySelector(".search-content");

    window.addEventListener("click", () => {
      searchContent.className = "search-content";
    });

    searchContent.addEventListener("click", event => {
      searchContent.className += " nav-active";
      event.stopPropagation();
    });
  }
};

export { SearchBox };
