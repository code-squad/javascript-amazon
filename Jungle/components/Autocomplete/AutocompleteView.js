import SearchView from "./SearchView.js";

export default class AutocompleteView {
  constructor({ autocompleteElement, categories, options }) {
    const searchView = new SearchView({ categories, options });

    autocompleteElement.innerHTML = searchView.getTemplate();
    searchView.attachEvent();
  }

  /**
   * 필요한 뷰 : 검색 입력(SearchView), 최근 검색어(RecentView), 자동 완성 목록(AutolistView)
   * 최근 검색어와 자동 완성 목록은 공통 뷰(SearchInfoView)를 가지게 된다.
   * 1. 최근 검색어와 자동 완성 목록은 공통 뷰로 옵션에 의해 만들어진다.
   * 2. 혹은 상속을 받아서 사용한다.
   */
}
