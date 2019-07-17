//components
import AutoListView from "./AutoListView.js";
import RecentListView from "./RecentListView.js";

const dataUrl = "https://jsonplaceholder.typicode.com/photos";

export default class SearchView {
  constructor({ categories, options }) {
    //카테고리 입력받아 seach-category에 사용하기
    this.categories = categories;

    this.autoListView = new AutoListView({
      maxLen: 8,
      dataUrl,
      title: "자동 완성"
    });

    this.recentListView = new RecentListView({
      maxLen: 5,
      title: "최근 검색어"
    });

    this.defaultOptions = {
      debouncingDelay: 500
    };

    this.autoListTimeout = null;

    this.options = this.mergeOptions(options);
  }

  mergeOptions(options) {
    return { ...this.defaultOptions, ...options };
  }

  getCategoryTagsTemplate(categories) {
    return `
      ${categories.reduce(
        (html, category, idx) =>
          `
          ${html}
          <option value="" ${idx === 0 ? `selected` : ``}>${category}</option>
          `,
        ``
      )}
    `;
  }

  cacheDom() {
    this.searchWrapper = document.querySelector(".search-wrapper");
    this.searchInput = this.searchWrapper.querySelector("input[type=search]");
    this.searchSubmit = this.searchWrapper.querySelector(".search-submit");
    this.searchForm = document.querySelector(".search-form");

    this.searchInfoList = this.searchWrapper.querySelector(".search-info-list");
  }

  getTemplate() {
    const template = `
    <form action="#" class="search-form">
    <div class="search-wrapper">
      <div class="search-category">
        <div class="icon-down-arrow"></div>
        <select name="" id="">
          ${this.getCategoryTagsTemplate(this.categories)}
        </select>
      </div>
      <div class="search-input">
        <input type="search" name="" id="">
        <div class="search-info-list">
        </div>
      </div>
      <div class="search-submit">
        <div class="icon-magnifying-glass">&#9906;</div>
        <input type="submit" value="">
      </div>
    </div>
  </form>
    `;

    return template;
  }

  setSearchInfoOn(on) {
    this.searchInfoList.style.display = on ? "block" : "none";
  }

  renderRecentListView() {
    const template = this.recentListView.getTemplate();

    this.searchInfoList.innerHTML = template;
    this.setSearchInfoOn(template === null ? false : true);
  }

  renderAutoListView(searchText) {
    if(this.autoListTimeout) clearTimeout(this.autoListTimeout);
    const template = this.autoListView.getTemplate(searchText);

    this.autoListTimeout = setTimeout(() => {
      this.searchInfoList.innerHTML = template;
      this.setSearchInfoOn(template === null ? false : true);
    }, this.options.debouncingDelay);
  }

  inputChangeHandler(target) {
    if (target.value === "") {
      if(this.autoListTimeout) clearTimeout(this.autoListTimeout);
      this.setSearchInfoOn(false);
      this.renderRecentListView();
      return;
    }

    this.renderAutoListView(target.value);
  }

  arrowUpHandler(lists) {
    this.autoListView.selectedIndex -= 1;
    lists.forEach(list => list.classList.remove("activated"));

    if (this.autoListView.selectedIndex < 0) {
      this.autoListView.selectedIndex = this.autoListView.itemLen;
    } else {
      lists[this.autoListView.selectedIndex].classList.add("activated");
    }
  }

  arrowDownHandler(lists) {
    this.autoListView.selectedIndex += 1;
    lists.forEach(list => list.classList.remove("activated"));

    if (this.autoListView.selectedIndex >= this.autoListView.itemLen) {
      this.autoListView.selectedIndex = -1;
    } else {
      lists[this.autoListView.selectedIndex].classList.add("activated");
    }
  }

  enterHandler(target) {
    const activatedEl = this.searchInfoList.querySelector(".activated");
    target.value = activatedEl === null ? target.value : activatedEl.innerText;

    this.setSearchInfoOn(false);

    this.recentListView.addRecentSearchText({ text: target.value });
  }

  keyDownHandler(evt) {
    const { key, target } = evt;

    if (!(key === "ArrowDown" || key === "ArrowUp" || key === "Enter")) return;
    const lists = this.searchInfoList.querySelectorAll("li");

    if (key === "ArrowUp") {
      this.arrowUpHandler(lists);
      evt.preventDefault();
    } else if (key === "ArrowDown") {
      this.arrowDownHandler(lists);
    } else {
      this.enterHandler(target);
    }
  }

  focusOnHandler(target) {
    if(target.value !== "") {
      this.renderAutoListView(target.value);
    } else {
      this.renderRecentListView();
    }
  }

  focusOutHandler() {
    this.setSearchInfoOn(false);
  }

  attachEvent() {
    this.cacheDom();

    this.searchInput.addEventListener("input", ({ target }) =>
      this.inputChangeHandler(target)
    );
    this.searchForm.addEventListener("submit", _ => this.submitHandler());
    this.searchForm.addEventListener("keydown", evt =>
      this.keyDownHandler(evt)
    );

    this.searchInput.addEventListener("focus", ({ target }) => this.focusOnHandler(target));
    this.searchInput.addEventListener("focusout", () => this.focusOutHandler());
  }
}
