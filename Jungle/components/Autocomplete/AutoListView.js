export default class AutoListView {
  /**
   * TODO list
   * 1. SearchView에 입력이 있을 때 입력값에 맞는 목록 생성해서 보여줌
   * 2. 보여줄 최대 갯수 옵션으로 받음
   * 3. 목록을 위아래로 움직일 수 있음. (키보드 이벤트)
   * 4. 선택된 값을 전달 가능해야함
   */
  constructor({ maxLen }) {}

  getTemplate() {
    const template = `
        <div class="search-info">
          <!-- 최근검색어/자동완성 -->
        </div>
    `;

    return template;
  }
}
