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
  },

  inputEvent(searchKeyword) {
    const autoComplete = document.querySelector(".auto-complete");
    const autoList = document.querySelectorAll(".auto-complete > ul > li");

    window.addEventListener("click", () => {
      autoComplete.style.visibility = "hidden";
    });

    if (searchKeyword) {
      autoComplete.style.visibility = "visible";
      autoList.forEach(value => {
        value.innerHTML = `
        <span style="font-weight: bold;">
          ${searchKeyword}
        </span>`;
      });
    } else {
      autoComplete.style.visibility = "hidden";
    }
  }
};

export { SearchBox };
