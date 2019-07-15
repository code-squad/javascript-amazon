//utils
import MyFetch from "../../../Grenutil/MyFetch/index.js";
import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";

export default class AutoListView extends MyEventEmitter {
  /**
   * TODO list
   * 1. SearchView에 입력이 있을 때 입력값에 맞는 목록 생성해서 보여줌
   * 2. 보여줄 최대 갯수 옵션으로 받음
   * 3. 목록을 위아래로 움직일 수 있음. (키보드 이벤트)
   * 4. 선택된 값을 전달 가능해야함
   */
  constructor({ maxLen, dataUrl }) {
    super();

    this.maxLen = maxLen;

    MyFetch(dataUrl)
      .then(data => data.map(item => item.title))
      .then(data => (this.autoData = data));

    this.on("typing", inputVal => {
      console.log(this.getFilteredData(inputVal));
    });
  }

  compareByIndex(a, b) {
    return (a.index > b.index) ? true : (a.index === b.index && a.word > b.word) ? true : false;
  }

  getFilteredData(text) {
    let filteredData = [...this.autoData];

    filteredData = filteredData
      .filter(data => data.includes(text))
      .map(data => ({
        word: data,
        index: data.indexOf(text)
      })).sort(this.compareByIndex)
      .map(data => data.word);

    return filteredData;
  }

  getListTemplate() {
    const listTemplate = `
      <ul>
        <li><span>1</span></li>
        <li><span>2</span></li>
        <li><span>3</span></li>
        <li><span>4</span></li>
        <li><span>자동 완성</span></li>
      </ul>
    `;

    return listTemplate;
  }

  cacheDom() {
    this.autoList = document.querySelector(".search-auto-list");
  }

  getTemplate() {
    const template = `
      <div class="search-auto-list">
        ${this.getListTemplate()}
      </div>
    `;

    return template;
  }
}
