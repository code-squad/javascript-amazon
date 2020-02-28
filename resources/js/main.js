import { _$, _$$ } from "./util.js";

window.addEventListener("DOMContentLoaded", () => {
  const SearchView = function SearchView(
    option = {
      searchBar: ".search",
      searchList: ".search-list",
      searchInput: ".search-input",
      line: ".line",
      activeClassName: "active",
    },
  ) {
    this.searchBar = option.searchBar;
    this.searchList = option.searchList;
    this.searchInput = option.searchInput;
    this.line = option.line;
    this.activeClassName = option.activeClassName;
    this.allElement = [this.searchBar, this.searchList, this.line];
  };

  SearchView.prototype.addClass = function addClass(statement, className = this.allElement) {
    if (Array.isArray(className)) {
      className.forEach(eachClass => {
        _$(eachClass).classList.add(statement);
      });
    } else _$(className).classList.add(statement);
  };

  SearchView.prototype.removeClass = function removeClass(statement, className = this.allElement) {
    if (Array.isArray(className)) {
      className.forEach(eachClass => {
        _$(eachClass).classList.remove(statement);
      });
    } else _$(className).classList.remove(statement);
  };

  SearchView.prototype.templateList = function templateList(wordsFromModel) {
    let newHTML = "";
    wordsFromModel.forEach(eachWord => {
      newHTML += `<li><span>${eachWord.restSpell}<b>${eachWord.boldSpell}</b></span></li>`;
    });
    _$(this.searchList).innerHTML = `<ul>${newHTML}</ul>`;
  };

  // Model

  const SearchModel = function SearchModel(src) {
    this.src = src;
  };

  SearchModel.prototype.getList = function getList(str, fn) {
    fetch(this.src)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const regex = new RegExp(`^(${str})(?:W*)(.*)?$`);
        const matchedWord = this.matchWord(regex, data.list);
        fn(matchedWord);
      });
  };

  SearchModel.prototype.matchWord = function matchWord(regex, wordArray) {
    const word = [];
    const MAX_SIZE = 10;
    wordArray.forEach(eachWord => {
      if (eachWord.match(regex)) {
        word.push({
          boldSpell: eachWord.match(regex)[2] || "",
          restSpell: eachWord.match(regex)[1] || "",
        });
      }
    });
    if (word.length >= MAX_SIZE) word.length = MAX_SIZE;
    return word;
  };

  // Controller

  const SearchController = function SearchController(searchView, searchModel) {
    this.searchView = searchView;
    this.searchModel = searchModel;
  };

  SearchController.prototype.initialize = function initialize() {
    const inputElem = _$(this.searchView.searchInput);
    const { activeClassName } = this.searchView;

    this.addTimerEventListener("input", inputElem, activeClassName);

    inputElem.addEventListener("focusout", () => {
      this.searchView.removeClass(activeClassName);
    });
  };

  SearchController.prototype.addTimerEventListener = function addTimerEventListener(eventName, inputElem, activeClassName) {
    let timeout = null;
    const DELAY_TIME = 300;
    inputElem.addEventListener(eventName, evt => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentText = evt.target.value;
        this.inputCallback(currentText, activeClassName);
      }, DELAY_TIME);
    });
  };

  SearchController.prototype.inputCallback = function inputCallback(currentText, activeClassName) {
    if (!currentText) this.searchView.removeClass(activeClassName);
    else this.searchModel.getList(currentText, this.showList.bind(this));
  };

  SearchController.prototype.showList = function showList(wordsFromModel) {
    const { activeClassName } = this.searchView;
    this.searchView.templateList(wordsFromModel);
    if (wordsFromModel.length > 0) this.searchView.addClass(activeClassName);
    else this.searchView.removeClass(activeClassName);
  };

  const searchView = new SearchView();
  const searchModel = new SearchModel("../data/localData.json");
  const searchController = new SearchController(searchView, searchModel);
  searchController.initialize();
});
