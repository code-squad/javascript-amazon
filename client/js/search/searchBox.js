import { setVisibility } from "../lib/util.js";

function SearchBox() {
  this.searchContent = document.querySelector(".search-content");
  this.autoComplete = document.querySelector(".auto-complete");
  this.autoList = document.querySelectorAll(".auto-complete > ul > li");
  this.currentIndex = -1;
  this.init();
}

SearchBox.prototype = {
  init() {
    this.searchClickEventListener();
    this.searchKeydownEventListener();
  },

  searchClickEventListener() {
    window.addEventListener("click", () => {
      this.searchContent.className = "search-content";
    });

    this.searchContent.addEventListener("click", event => {
      this.searchContent.className += " nav-active";
      event.stopPropagation();
    });
  },

  inputEventListener(searchKeyword) {
    window.addEventListener("click", () => {
      setVisibility(this.autoComplete, false);
    });

    if (searchKeyword) {
      setVisibility(this.autoComplete, true);
      this.autoList.forEach(value => {
        value.innerHTML = `
        <span style="font-weight: bold;">
          ${searchKeyword}
        </span>`;
      });
    } else {
      setVisibility(this.autoComplete, false);
    }
  },

  searchKeydownEventListener() {
    this.searchContent.addEventListener("keydown", event => {
      this.keydownEvent(event.key);
    });
  },

  keydownEvent(key) {
    const MAX_INDEX = 9;
    const MIN_INDEX = 0;
    const CONTENT_SIZE = 10;

    switch (key) {
      case "ArrowDown":
        this.arrowEvent(MAX_INDEX, MAX_INDEX - CONTENT_SIZE);
        break;
      case "ArrowUp":
        this.arrowEvent(MIN_INDEX, MIN_INDEX + CONTENT_SIZE);
        break;
      case "Enter":
        event.preventDefault();
        this.enterEvent();
        break;
    }
  },

  arrowEvent(limitIndex, initIndex) {
    if (this.currentIndex >= 0) this.autoList[this.currentIndex].style.backgroundColor = "#fff";
    if (this.currentIndex >= limitIndex) this.currentIndex = initIndex;
    this.autoList[++this.currentIndex].style.backgroundColor = "#eee";
  },

  enterEvent() {
    const searchTerm = document.querySelector(".search-term");

    let selectText = [];
    this.autoList[this.currentIndex].textContent.split("\n").forEach(el => {
      selectText.push(el.replace(/^\s*/, ""));
    });
    searchTerm.value = selectText.join("");
    setVisibility(this.autoComplete, false);
  }
};

export { SearchBox };
