import AutoListView from "./AutoListView.js";
import RecentListView from "./RecentListView.js";

import templates from "../../templates.js";
import debounce from "../../../Grenutil/debounce.js";

export default class SearchView {
  constructor({ categories, options }) {
    this.categories = categories;

    this.autoListView = new AutoListView({
      maxLen: 8,
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

    this.currentSelectIndex = -1;
    this.infoItemLen = 0;
    this.cursorInListFlag = false;
  }

  mergeOptions(options) {
    return { ...this.defaultOptions, ...options };
  }

  cacheDom() {
    this.searchWrapper = document.querySelector(".search-wrapper");
    this.searchInput = this.searchWrapper.querySelector("input[type=search]");
    this.searchSubmit = this.searchWrapper.querySelector(".search-submit");
    this.searchForm = document.querySelector(".search-form");

    this.searchInfoList = this.searchWrapper.querySelector(".search-info-list");
  }

  getTemplate() {
    const template = templates.getSearchTemplate({
      categories: this.categories
    });

    return template;
  }

  setSearchInfoOn(on) {
    this.searchInfoList.style.display = on ? "block" : "none";
    this.currentSelectIndex = -1;
  }

  renderRecentListView() {
    const template = this.recentListView.getTemplate();

    this.searchInfoList.innerHTML = template;
    this.setSearchInfoOn(template === null ? false : true);
  }

  async renderAutoListView(text) {
    if (this.searchInput !== document.activeElement) return;
    const template = await this.autoListView.getTemplate(text);

    this.searchInfoList.innerHTML = template;
    this.setSearchInfoOn(template === null ? false : true);
    this.currentSelectIndex = -1;
  }

  inputChangeHandler(value) {
    this.currentSelectIndex = -1;

    if (value === "") {
      this.setSearchInfoOn(false);
      this.renderRecentListView();
    } else {
      this.renderAutoListView(value);
    }
  }

  arrowUpHandler(lists) {
    this.currentSelectIndex -= 1;
    this.infoItemLen = lists.length - 1;

    lists.forEach(list => list.classList.remove("activated"));

    if (this.currentSelectIndex < 0) this.currentSelectIndex = this.infoItemLen;
    else lists[this.currentSelectIndex].classList.add("activated");
  }

  arrowDownHandler(lists) {
    this.currentSelectIndex += 1;
    this.infoItemLen = lists.length - 1;

    lists.forEach(list => list.classList.remove("activated"));

    if (this.currentSelectIndex >= this.infoItemLen)
      this.currentSelectIndex = -1;
    else lists[this.currentSelectIndex].classList.add("activated");
  }

  enterHandler(target, key) {
    const { value } = target;

    if (!(key === "Enter") || value === "") return;
    if (
      this.currentSelectIndex >= 0 &&
      this.currentSelectIndex < this.infoItemLen
    ) {
      const activatedEl = this.searchInfoList.querySelectorAll("li")[
        this.currentSelectIndex
      ];
      target.value = activatedEl === null ? value : activatedEl.innerText;
      this.setSearchInfoOn(false);
    } else {
      this.recentListView.addRecentSearchText({ text: value });
    }
  }

  keyDownHandler(evt) {
    const { key } = evt;

    if (!(key === "ArrowDown" || key === "ArrowUp")) return;
    const lists = this.searchInfoList.querySelectorAll("li");

    if (key === "ArrowUp") {
      this.arrowUpHandler(lists);
      evt.preventDefault();
    } else if (key === "ArrowDown") {
      this.arrowDownHandler(lists);
    }
  }

  focusOnHandler(value) {
    if (value === "") this.renderRecentListView();
    else this.renderAutoListView(value);
  }

  focusOutHandler() {
    if (this.cursorInListFlag === true) return;
    this.setSearchInfoOn(false);
  }

  mouseOverHandler(target) {
    if (
      !target.dataset.idx ||
      !target.firstElementChild.classList.contains("info-text")
    )
      return;

    const lists = this.searchInfoList.querySelectorAll("li");
    lists.forEach(list => {
      list.classList.remove("activated");
    });

    target.classList.add("activated");
    this.currentSelectIndex = Number(target.dataset.idx);
    this.cursorInListFlag = true;
  }

  mouseOutHandler(target) {
    if (!target.dataset.idx) return;
    this.cursorInListFlag = false;
  }

  infoClickHandler(target) {
    if (!target.firstElementChild.classList.contains("info-text")) return;

    this.searchInput.value = target.firstElementChild.innerText;
    this.searchInput.focus();
  }

  attachEvent() {
    this.cacheDom();

    const debouncedInputChangeHandler = debounce(
      (...args) => this.inputChangeHandler(...args),
      this.options.debouncingDelay
    );

    this.searchInput.addEventListener("input", ({ target: { value } }) =>
      debouncedInputChangeHandler(value)
    );
    this.searchForm.addEventListener("submit", evt => evt.preventDefault());
    this.searchForm.addEventListener("keydown", evt =>
      this.keyDownHandler(evt)
    );

    this.searchForm.addEventListener("keypress", ({ target, key }) =>
      this.enterHandler(target, key)
    );

    this.searchInput.addEventListener("focus", ({ target: { value } }) =>
      this.focusOnHandler(value)
    );
    this.searchInput.addEventListener("focusout", () => this.focusOutHandler());

    this.searchInfoList.addEventListener("mouseover", ({ target }) =>
      this.mouseOverHandler(target)
    );

    this.searchInfoList.addEventListener("mouseout", ({ target }) =>
      this.mouseOutHandler(target)
    );

    this.searchInfoList.addEventListener("click", ({ target }) =>
      this.infoClickHandler(target)
    );
  }
}
