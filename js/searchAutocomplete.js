import { throttle, debounce } from './setThrottleDebounce.js';
import { $, $All } from "./docSelector.js";

export default class AutoComplete {
  constructor(layer) {
    this.element = {
      input: layer.inputEl,
      navSearch: layer.navSearchEl,
      dimmed: layer.dimmedEl,
    }
    this.KEYCODE = {
      UPKEY: 38,
      DOWNKEY: 40,
      ENTERKEY: 13,
    }
    this.currentFocus = -1;
  }

  setDisplayOffDimmed() {
    this.element.dimmed.classList.remove("nav-dimmed-cover-on");
    this.element.dimmed.classList.add("nav-dimmed-cover-off");
  }

  setDisplayOnDimmed() {
    this.element.dimmed.classList.remove("nav-dimmed-cover-off");
    this.element.dimmed.classList.add("nav-dimmed-cover-on");
  }

  getMatchedClickItem(childDiv) {
    childDiv.addEventListener("click", (e) => {
      this.element.input.value = e.target.children[1].textContent;
      e.target.parentNode.remove(e.target.parentNode);
      this.setDisplayOffDimmed();
    });
  }

  eventKeydown() {
    this.element.input.addEventListener("keydown", (e) => {
      // Exception Handling
      if (!e) return e.preventDefault();

      let matchWordList = e.target.nextElementSibling.childNodes;
      if (!matchWordList) return false;

      if (this.KEYCODE.UPKEY === e.keyCode) {
        this.setUpKeyEvent(matchWordList);
      } else if (this.KEYCODE.DOWNKEY === e.keyCode) {
        this.setDownKeyEvent(matchWordList);
      } else if (this.KEYCODE.ENTERKEY === e.keyCode) {
        this.setEnterKeyEvent(e);
      }
    });
  }

  setEnterKeyEvent(event) {
    const autoCompleteList = event.target.parentNode.children[1];
    event.preventDefault();
    autoCompleteList.remove(autoCompleteList);
    this.setDisplayOffDimmed();
  }


  setUpKeyEvent(matchWordList) {
    this.currentFocus--;
    this.setMaxOrMinIndex(matchWordList);
    this.delDimmedTextOfUpKey(matchWordList);
    this.addTextDimmed(matchWordList);
    this.setInputWord(matchWordList);
  }

  setDownKeyEvent(matchWordList) {
    this.currentFocus++;
    this.setMaxOrMinIndex(matchWordList);
    this.delTextDimmedOfDownKey(matchWordList);
    this.addTextDimmed(matchWordList);
    this.setInputWord(matchWordList);
  }

  setInputWord(matchWordList) {
    this.element.input.value = matchWordList[this.currentFocus].innerText;
  }

  addTextDimmed(matchWordList) {
    matchWordList[this.currentFocus].classList.add("dimmed-active");
  }

  delTextDimmedOfDownKey(matchWordList) {
    if (this.currentFocus === 0) return matchWordList[matchWordList.length - 1].classList.remove("dimmed-active");
    matchWordList[this.currentFocus].previousElementSibling.classList.remove("dimmed-active");
  }

  delDimmedTextOfUpKey(matchWordList) {
    if (this.currentFocus === matchWordList.length - 1) return matchWordList[0].classList.remove("dimmed-active");
    matchWordList[this.currentFocus].nextElementSibling.classList.remove("dimmed-active");
  }

  setMaxOrMinIndex(matchWordList) {
    if (this.currentFocus >= matchWordList.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = matchWordList.length - 1;
  }

  removeAutofillListEl(inputNode) {
    let wordListVal = inputNode.target.nextElementSibling;
    if (wordListVal) wordListVal.remove(wordListVal);
    this.setDisplayOffDimmed();
  }

  closeUnmatchedList(inputWord) {
    let ul = $("#autoComplete-list");
    let allEl = ul.querySelectorAll("li");

    for (let val of allEl) {
      let searchWord = val.children[1].textContent;
      if (searchWord.indexOf(inputWord) > -1) {
        val.style.display = '';
      } else {
        val.style.display = 'none';
      }
    }
  }

  setMatchListEl(inputNode) {
    const haveList = $("#autoComplete-list");
    if (haveList) this.removeAutofillListEl(inputNode)

    const ul = document.createElement("ul");
    ul.setAttribute("id", "autoComplete-list");
    ul.setAttribute("class", "autocomplete-items");
    this.element.navSearch.appendChild(ul);
    return ul;
  }

  setInputEvent(inputNode) {
    let inputWord = inputNode.target.value;
    if (!inputNode || inputWord === "") return this.removeAutofillListEl(inputNode);

    let URL = `http://crong.codesquad.kr:8080/amazon/ac/${inputWord}`;

    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let matchVal = json.suggestions;
        if (!matchVal) return;

        const parentList = this.setMatchListEl(inputNode);
        this.setMatchingWord({ parentList, matchVal, inputWord });
        this.eventKeydown();
      })
      .catch(err => console.error(err));
  }

  setMatchingWord({ parentList, matchVal, inputWord }) {
    matchVal.forEach(element => {
      let matchWord = element.value;
      const firstWord = matchWord.substr(0, inputWord.length);
      const checkWord = inputWord.toLowerCase() === firstWord.toLowerCase();

      // TODO: 검색 창이 열렸을때 input의 값과 unmatch 된 건 Display None으로 설정하는 Method Refactoring 진행
      // this.closeUnmatchedList(inputWord);
      if (checkWord) {
        let childEl = this.createChildEl({ parentList, firstWord, inputWord, matchWord });
        this.getMatchedClickItem(childEl);
        this.setDisplayOnDimmed();
      }
    });
  }

  createChildEl({ parentList, firstWord, inputWord, matchWord }) {
    parentList.innerHTML += `
    <li>
    <span class="autocomplete-matched">${firstWord}</span>${matchWord.substr(inputWord.length)}
    <span style="display: none;">${matchWord}</span>
    </li>
    `.trim();
    return parentList;
  }

  init() {
    this.element.input.addEventListener("input", debounce((inputNode) => this.setInputEvent(inputNode), 1000));
  }
}