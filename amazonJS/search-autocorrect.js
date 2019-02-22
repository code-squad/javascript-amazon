import { qs } from "./util.js";

class Search_autocorrect {
  constructor(elObj, formObj, optionObj) {
    Object.assign(this, { elObj, formObj, optionObj });
    this.autocorrectListIndex = -1;
    this.init();
  }

  init() {
    this.formObj = qs(this.formObj.formId);
    this.formUrl = this.formObj.action;
    this.searchWindow = qs(this.elObj.searchWindow);
    this.autocorrectWindow = qs(this.elObj.autocorrectWindow);
    this.toBeCloakedEl = qs(this.elObj.toBeCloakedElement);
    this.searchBtn = qs(this.elObj.searchButtonElement);
    this.toBeCloakedEl.style.transition = `opacity ${
      this.optionObj.cloakingTransitionTime
    }`;

    this.searchWindow.addEventListener("keyup", this.getSearchData.bind(this));
    this.autocorrectWindow.addEventListener("click", this.goAddress.bind(this));
    this.searchBtn.addEventListener("click", this.submitFormData.bind(this));
  }

  closeAutoCorrectWindow() {
    this.revealBody();
    this.autocorrectWindow.innerHTML = null;
  }
  getSearchData(e) {
    if (this.isUpDownArrowOrEnter(e.key)) return this.operateCertainKeyEvent(e);
    this.resetAutocorrectLists.call(this);
    const inputValue = this.searchWindow.value;
    if (this.isInputBlank.call(this, inputValue)) return;
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
    const determinKey = ["ArrowUp", "ArrowDown", "Enter"];
    const ret = determinKey.some(v => v === eventKey);
    return ret;
  }
  resetAutocorrectLists() {
    this.autocorrectLists = this.autocorrectWindow.getElementsByClassName(
      this.elObj.autocorrectLists
    );
    this.autocorrectListIndex = -1;
  }
  isInputBlank(input) {
    if (input === "") {
      this.closeAutoCorrectWindow();
      return true;
    }
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
      <span class='bold'>${jsonData.prefix}</span><span>${this.cutData(
        jsonData.prefix.length,
        suggestion.value
      )}</span></li>`;
    });
    this.autocorrectWindow.innerHTML = nowData;
  }
  cutData(highlightLength, sugValue) {
    return sugValue.slice(highlightLength);
  }

  cloakBody() {
    this.toBeCloakedEl.classList.add("cloaking");
  }
  revealBody() {
    this.toBeCloakedEl.classList.remove("cloaking");
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
    const keywords = this.makeUrlKeywords(target.value);
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
  }
  makeUrlKeywords(data) {
    const urlData = data
      .split("")
      .map(letter => {
        if (letter === " ") return "+";
        return letter;
      })
      .join("");
    return urlData;
  }

  operateCertainKeyEvent(e) {
    if (e.key === "ArrowUp") {
      this.changeListBackgourndColorUp(this.autocorrectLists);
    } else if (e.key === "ArrowDown") {
      this.changeListBackgourndColorDown(this.autocorrectLists);
    } else {
      this.addInputValue();
    }
  }
  changeListBackgourndColorUp(list) {
    const bAlreadyFirst = this.autocorrectListIndex < 0;
    if (bAlreadyFirst) return;
    this.autocorrectListIndex--;
    const bFirstData = this.autocorrectListIndex === -1;
    if (bFirstData) {
      list[this.autocorrectListIndex + 1].style = "background-color:#fff;";
      return;
    }
    list[this.autocorrectListIndex].style = "background-color:#f8f8f8;";
    list[this.autocorrectListIndex + 1].style = "background-color:#fff;";
  }
  changeListBackgourndColorDown(list) {
    const biggestIndex = list.length - 2;
    const bLastData = this.autocorrectListIndex > biggestIndex;
    if (bLastData) return;
    this.autocorrectListIndex++;
    if (this.autocorrectListIndex === 0) {
      list[this.autocorrectListIndex].style = "background-color:#f8f8f8;";
      return;
    }
    list[this.autocorrectListIndex].style = "background-color:#f8f8f8;";
    list[this.autocorrectListIndex - 1].style = "background-color:#fff;";
  }

  addInputValue() {
    this.searchWindow.value = this.autocorrectLists[
      this.autocorrectListIndex
    ].dataset.value;
    this.closeAutoCorrectWindow();
    return;
    // 선택된 상태에서 엔터키를 입력하면 해당검색어가 위쪽 검색input창에 추가된다.  동시에 검색결과창은 사라진다.
  }

  submitFormData(e) {
    if (e.x === 0) return;
    this.closeAutoCorrectWindow();
  }
}

export { Search_autocorrect };
