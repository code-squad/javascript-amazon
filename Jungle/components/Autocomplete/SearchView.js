export default class SearchView {
  constructor({ categories }) {
    //카테고리 입력받아 seach-category에 사용하기
    this.categories = categories;
  }

  /**
   * TODO list
   * 1. 검색어를 입력하면 자동 완성 결과 보여주기 (300ms 지연)
   * 2. 검색어를 지워도 일치하는 자동완성 결과 보여주기 -> 즉 검색창 value에 변화가 있을 때.
   * 3. 자동 완성 목록은 키보드 위 아래 버튼으로 이동 가능
   * 4. 검색 된 내용 중 자동 완성과 일치되는 부분을 하이라이팅 해주기.
   * 5. 자동완성 결과를 키보드 방향키로 이동시에 선택부분의 배경색은 변경된다.
   *    선택된 상태에서 엔터키를 입력하면 해당검색어가 위쪽 검색input창에 추가된다.
   *    동시에 검색결과창은 사라진다.
   * 6. 포커스가 오면 최근 검색어 5개 바로 띄우기
   * 7. 검색 버튼을 눌러도 검색되진 않고 자동완성 결과창 지우기
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

  getTemplate() {
    const template = `
    <form action="#" class="form-search">
    <div class="search-wrapper">
      <div class="search-category">
        <div class="icon-down-arrow"></div>
        <select name="" id="">
          ${this.getCategoryTagsTemplate(this.categories)}
        </select>
      </div>
      <div class="search-input">
        <input type="search" name="" id="">
        <div class="search-info">
          <!-- 최근검색어/자동완성 -->
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
}
