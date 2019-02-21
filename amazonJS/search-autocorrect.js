import { qs } from "./util.js";

class Search_autocorrect {
  constructor(elObj, formObj, optionObj) {
    Object.assign(this, { elObj, formObj, optionObj });
    this.init();
  }

  init() {
    this.formObj = qs(this.formObj.formId);
    this.formUrl = this.formObj.action;
    this.searchWindow = qs(this.elObj.searchWindow);
    this.autocorrectWindow = qs(this.elObj.autocorrectWindow);
    this.toBeCloakedEl = qs(this.elObj.toBeCloakedElement);
    this.toBeCloakedEl.style.transition = `opacity ${
      this.optionObj.cloakingTransitionTime
    }`;

    this.searchWindow.addEventListener("keyup", this.getSearchData.bind(this));
    this.autocorrectWindow.addEventListener("click", this.goAddress.bind(this));
    // 이벤트리스너 등록 등 여러가지
  }

  getSearchData(e) {
    if (this.isUpDownArrowOrEnter(e.key)) return this.moveListUpDown(e);
    this.autocorrectLists = this.autocorrectWindow.getElementsByClassName(this.elObj.autocorrectLists);
    const inputValue = this.searchWindow.value;
    if (inputValue === "") {
      this.revealBody();
      this.autocorrectWindow.innerHTML = null;
      return;
    }
    fetch(this.formUrl + "amazon/ac/" + inputValue).then(res => {
      res.json().then(jsonData => {
        this.addList(jsonData);
        this.cloakBody();
      });
    });
    // Ajax를 통해서 데이터를 가져온다. 하지만 연속된키보드
    // 입력에 모두 request하지 않고, 1.0 초동안 입력내용이 없을때 서버로 요청한다.
  }
  isUpDownArrowOrEnter(eventKey) {
    const determinKey = ['ArrowUp', 'ArrowDown', 'Enter'];
    const ret = determinKey.some(v => v === eventKey);
    return ret
  }
  addList(jsonData) {
    let nowData = "";
    if (jsonData.suggestions === undefined) return;
    jsonData.suggestions.forEach(suggestion => {
      nowData += `<li
      data-value="${suggestion.value}"
      data-reftag="${suggestion.refTag}"
      data-prefix="${jsonData.prefix}"
      class="head-search-autocorrect-list">
      <span class='bold'>${jsonData.prefix}</span><span>${this.highlightData(
        jsonData.prefix.length,
        suggestion.value
      )}</span></li>`;
    });
    this.autocorrectWindow.innerHTML = nowData;
    // 검색어를 입력하면 자동완성결과가 노출된다.
    // 입력창의 내용을 백스페이스로 삭제해도 일치하는 자동완성결과가 노출된다.
    // -입력이후 1초 뒤에 ajax데이터를 가져오는 방식으로 구현해보기.
  }

  cloakBody() {
    this.toBeCloakedEl.classList.add("cloaking");
  }
  revealBody() {
    this.toBeCloakedEl.classList.remove("cloaking");
  }

  highlightData(highlightLength, sugValue) {
    return sugValue.slice(highlightLength);
    // 노출된 데이터 중 검색어와 일치하는 단어는 색깔이 하이라이트 되여 보여진다.
    // -검색어와 일치하는 단어 => ajax데이터의 json데이터의 .prefix
  }

  addUrl(e) {
    const parentTargetData = e.target.parentNode.dataset;
    const targetData = e.target.dataset;
    if (e.target.tagName === "SPAN") {
      return this.makeUrl(parentTargetData);
    }
    return this.makeUrl(targetData);
  }
  makeUrl(target) {
    const keywords = this.makeKeywords(target.value);
    const refTag = target.reftag;
    const prefix = target.prefix;
    return (
      this.formUrl +
      `amazon-search?ref=${refTag}&field-keywords=${keywords}&prefix=${prefix}`
    );
  }
  goAddress(e) {
    this.formObj.action = this.addUrl(e);
    this.formObj.submit();
    // 자동완성 결과는 고유한 URL구조를 가진다.
    // 클릭이 될때 url을 만들고 이동하도록 구현
  }
  makeKeywords(data) {
    const urlData = data
      .split("")
      .map(letter => {
        if (letter === " ") return "+";
        return letter;
      })
      .join("");
    return urlData;
  }

  moveListUpDown(e) {
    if(e.key === 'ArrowUp') {
      console.log('hi!')
    } else if(e.key === 'ArrowDown') {

    } else {
      this.formObj.action = this.addUrl(e);
      this.formObj.submit();
    }
  }
  changeListBackgourndColor() {
    // 자동완성 결과를 키보드 방향키로 이동시에 선택부분의 배경색은 변경된다.
  }
  addInputValue() {
    // 선택된 상태에서 엔터키를 입력하면 해당검색어가 위쪽 검색input창에 추가된다.  동시에 검색결과창은 사라진다.
  }

  submitFormData() {
    // 실제 검색버튼을 눌러도 검색이 이뤄지진 않으며, 자동완성 결과 창은 닫힌다.
  }
}

export { Search_autocorrect };
