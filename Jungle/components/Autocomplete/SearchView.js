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

    this.options = this.mergeOptions(options);
  }

  mergeOptions(options) {
    return { ...this.defaultOptions, ...options };
  }

  /**
   * TODO list
   * //1. 검색어를 입력하면 자동완성결과가 노출된다.
   * 2. 자동완성결과는 바로 추가되지 않고, 300ms지연 후에 화면에 추가된다.
   * //3. 입력창의 내용을 백스페이스로 삭제해도 일치하는 자동완성결과가 노출된다.
   * //4. 자동완성 결과는 키보드 위/아래키로 이동할수 있다.
   * //5. 노출된 데이터 중 검색어와 일치하는 단어는 색깔이 하이라이트 되여 보여진다.
   * //6. 자동완성 결과를 키보드 방향키로 이동시에 선택부분의 배경색은 변경된다. 선택된 상태에서 엔터키를 입력하면 해당검색어가 위쪽 검색input창에 추가된다.  동시에 검색결과창은 사라진다.
   * 7. 검색창에 포커스가 가면, 최근 검색한 결과가 최대 5개까지 노출된다. (시간 역순으로 최근 검색한 내용이 위에 나옴)
   * 8. 실제 검색버튼을 눌러도 검색이 이뤄지진 않으며, 자동완성 결과 창은 닫힌다.
   */

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
    const template = this.autoListView.getTemplate(searchText);

    this.searchInfoList.innerHTML = template;
    this.setSearchInfoOn(template === null ? false : true);
  }

  inputChangeHandler(target) {
    if (target.value === "") {
      this.setSearchInfoOn(false);
      this.renderRecentListView();
      return;
    }

    this.renderAutoListView(target.value);
  }

  submitHandler() {
    console.log("submit");
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
    if(target.value !== "") return;

    this.renderRecentListView();
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
