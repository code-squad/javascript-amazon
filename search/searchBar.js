import { _$, _$e, _$c, __$ } from "/util.js";

export function SearchBar({ searchField, searchInput, option }) {
  this.keyDownCount = 0;
  this.searchField = _$(searchField);
  this.searchInput = _$(searchInput);
  this.option = option;
  this.autoCompleteBox = _$(this.option.autoCompleteBox);
  this.darkBackground = _$(this.option.darkBackground);
  this.delayTime = this.option.delayTime || 300;
}

SearchBar.prototype = {
  onSearchBarEvent(autoCompleteFunc) {
    if (autoCompleteFunc) this.onAutoCompleteEvent(autoCompleteFunc);
    if (this.option.inputFocus) this.onInputFocusEvent();
  },

  onAutoCompleteEvent(autoCompleteFunc) {
    this.autoCompleteFunc = autoCompleteFunc;

    __$(this.searchInput).on("input", () =>
      _$e.debounce(this.delayTime, this, this.initSearchInput)
    );

    __$(this.searchField).on("keydown", event => this.onKeydownHandler(event));

    __$(this.searchInput).on("blur", this.hideAutoCompleteBox.bind(this));
  },

  onInputFocusEvent() {
    __$(this.searchInput).on("focus", () =>
      _$c(this.searchField).add(this.option.inputFocus)
    );

    __$(this.searchInput).on("blur", () =>
      _$c(this.searchField).remove(this.option.inputFocus)
    );
  },

  initSearchInput() {
    this.searchWord = this.searchInput.value;
    if (!this.searchWord) return this.hideAutoCompleteBox();
    this.keyDownCount = 0;
    this.autoCompleteFunc();
  },

  onKeydownHandler({currentTarget, key, target}) {
    const searchChildren = [...currentTarget.children];
    const autoCompleteBoxIndex = searchChildren.indexOf(this.autoCompleteBox);
    const autoCompleteList = searchChildren[autoCompleteBoxIndex].children;
    const autoCompleteLength = autoCompleteList.length;

    switch (key) {
      case "Enter":
        event.preventDefault();
        this.pressEnter(autoCompleteList, target);
        break;

      case "ArrowUp":
        event.preventDefault();
        this.pressArrowUp(autoCompleteList, autoCompleteLength);
        break;

      case "ArrowDown":
        event.preventDefault();
        this.pressArrowDown(autoCompleteList, autoCompleteLength);
        break;
    }
  },

  pressEnter(autoCompleteList, searchInput) {
    const offScreen = this.keyDownCount <= 0;
    if (offScreen) return this.hideAutoCompleteBox();

    const currentSelectedWord = autoCompleteList[this.keyDownCount - 1];
    this.selecteSearchWord(searchInput, currentSelectedWord);
  },

  pressArrowUp(autoCompleteList, autoCompleteLength) {
    this.keyDownCount--;
    const outOfRange = this.keyDownCount < 0;
    if (outOfRange) this.keyDownCount = autoCompleteLength;

    this.controlSelectedWord(autoCompleteList);
  },

  pressArrowDown(autoCompleteList, autoCompleteLength) {
    this.keyDownCount++;
    const outOfRange = this.keyDownCount > autoCompleteLength;
    if (outOfRange) this.keyDownCount = 0;

    this.controlSelectedWord(autoCompleteList);
  },

  controlSelectedWord(autoCompleteList) {
    const offScreen = this.keyDownCount <= 0;
    if (offScreen) return this.removeSelectedWord();

    const currentSelectedWord = autoCompleteList[this.keyDownCount - 1];
    this.paintSelectedWord(currentSelectedWord);
  },

  selecteSearchWord(searchInput, selectedWord) {
    searchInput.value = selectedWord.textContent;
    this.hideAutoCompleteBox();
  },

  hideAutoCompleteBox() {
    if (this.darkBackground) __$(this.darkBackground).hide();
    __$(this.autoCompleteBox).hide();
  },

  showAutoCompleteBox() {
    if (this.darkBackground) __$(this.darkBackground).show();
    __$(this.autoCompleteBox).show();
  },

  paintSelectedWord(selectedWord) {
    this.removeSelectedWord();
    _$c(selectedWord).add(this.option.selectedWord);
  },

  removeSelectedWord() {
    const selectedWord = _$("." + this.option.selectedWord);

    if (selectedWord) _$c(selectedWord).remove(this.option.selectedWord);
  }
};
