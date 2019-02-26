import { qs } from "./util.js";

class SearchAutocorrect {
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

    this.formSubmitPrevent(this.formObj);
    this.searchWindow.addEventListener('keydown', (e) => this.clearBounce(e));
    this.searchWindow.addEventListener("keyup", (e) => this.debouncing(e));
    this.autocorrectWindow.addEventListener("click", (e) => this.goAddress(e.target));
    this.searchBtn.addEventListener("click", (e) => this.submitFormData(e));
  }

  formSubmitPrevent(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    })
  }  
  debouncing(e) {
    if (this.isUpDownArrowOrEnter(e.key)) return this.getSearchData(e);
    this.debounce = setTimeout(() => this.getSearchData(e), 1000);
  }
  clearBounce() {
    clearTimeout(this.debounce);
  } 
  closeAutoCorrectWindow() {
    this.revealBody();
    this.autocorrectWindow.innerHTML = null;
  }

  getSearchData(e) {
    if (this.isUpDownArrowOrEnter(e.key)) return this.operateCertainKeyEvent(e);
    this.resetAutocorrectLists.call(this);
    const inputValue = this.searchWindow.value;
    if (inputValue === '') return this.closeAutoCorrectWindow();
    fetch(this.formUrl + "amazon/ac/" + inputValue).then(res => {
      res.json().then(jsonData => {
        this.addList(jsonData);
        this.cloakBody();
      });
    });
  }
  isUpDownArrowOrEnter(eventKey) {
    const determinKey = ["ArrowUp", "ArrowDown", "Enter"];
    const ret = determinKey.some(v => v === eventKey);
    return ret;
  }
  resetAutocorrectLists() {
    this.autocorrectLists = this.autocorrectWindow.getElementsByClassName(
      this.elObj.autocorrectListsClass
    );
    this.autocorrectListIndex = -1;
  }

  addList(jsonData) {
    if (jsonData.suggestions === undefined) return;
    let nowData = jsonData.suggestions.reduce((bef, cur) => {
      bef += `<li
      data-value="${cur.value}"
      data-reftag="${cur.refTag}"
      data-prefix="${jsonData.prefix}"
      class="head-search-autocorrect-list">
      <span class='bold'>${jsonData.prefix}</span><span>${this.cutData(
        jsonData.prefix.length,
        cur.value
      )}</span></li>`;
      return bef
    }, '')
    this.autocorrectWindow.innerHTML = nowData;
  }
  cutData(highlightLength, sugValue) {
    return sugValue.slice(highlightLength);
  }

  cloakBody() {
    this.toBeCloakedEl.classList.add(this.optionObj.cloakingBackgroundClass);
  }
  revealBody() {
    this.toBeCloakedEl.classList.remove(this.optionObj.cloakingBackgroundClass);
  }

  addUrl(eventTarget) {
    const parentTargetData = eventTarget.parentNode.dataset;
    const targetData = eventTarget.dataset;
    if (eventTarget.tagName === "SPAN") {
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
  goAddress(eventTarget) {
    this.formObj.action = this.addUrl(eventTarget);
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
      list[this.autocorrectListIndex + 1].classList.remove(this.optionObj.shadingAutocorrectClass)
      return;
    }
    list[this.autocorrectListIndex].classList.add(this.optionObj.shadingAutocorrectClass);
    list[this.autocorrectListIndex + 1].classList.remove(this.optionObj.shadingAutocorrectClass)
  }
  changeListBackgourndColorDown(list) {
    const biggestIndex = list.length - 2;
    const bLastData = this.autocorrectListIndex > biggestIndex;
    if (bLastData) return;
    this.autocorrectListIndex++;
    if (this.autocorrectListIndex === 0) {
      list[this.autocorrectListIndex].classList.add(this.optionObj.shadingAutocorrectClass);
      return;
    }
    list[this.autocorrectListIndex].classList.add(this.optionObj.shadingAutocorrectClass);
    list[this.autocorrectListIndex - 1].classList.remove(this.optionObj.shadingAutocorrectClass)
  }

  addInputValue() {
    this.searchWindow.value = this.autocorrectLists[
      this.autocorrectListIndex
    ].dataset.value;
    this.closeAutoCorrectWindow();
    return;
  }

  submitFormData(e) {
    if (e.x === 0) return;
    this.closeAutoCorrectWindow();
  }
}

export { SearchAutocorrect };
