function SearchBox() {
  this.init();
}

SearchBox.prototype = {
  init() {
    this.searchClickEvent();
    this.searchKeboardEvent();
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
  },

  searchKeboardEvent() {
    const searchContent = document.querySelector(".search-content");
    const searchTerm = document.querySelector(".search-term");
    const autoComplete = document.querySelector(".auto-complete");
    const autoList = document.querySelectorAll(".auto-complete > ul > li");
    let index = -1;

    searchContent.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowDown":
          if (index >= 0) autoList[index].style.backgroundColor = "#fff";
          if (index >= 9) index = -1;
          autoList[++index].style.backgroundColor = "#eee";
          break;
        case "ArrowUp":
          if (index >= 0) autoList[index].style.backgroundColor = "#fff";
          if (index <= 0) index = 10;
          autoList[--index].style.backgroundColor = "#eee";
          break;
        case "Enter":
          event.preventDefault();
          let selectText = [];
          autoList[index].textContent.split("\n").forEach(el => {
            selectText.push(el.replace(/^\s*/, ""));
          });
          searchTerm.value = selectText.join("");
          autoComplete.style.visibility = "hidden";
          break;
      }
    });
  }
};

export { SearchBox };
