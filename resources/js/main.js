import { _$, _$$ } from "./util.js";

window.addEventListener("DOMContentLoaded", () => {
  const SearchView = function SearchView(option) {
    this.searchBar = option.searchBar || ".search";
    this.searchList = option.searchList || ".search-list";
    this.searchInput = option.searchInput || ".search-input";
    this.line = option.line || ".line";
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
        const regex = new RegExp(`^(${str})(?:\W*)(.*)?$`);
        fn(this.pickWord(regex, data.list));
      });
  };

  SearchModel.prototype.pickWord = function pickWord(regex, wordArray) {
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
    const inputClass = _$(this.searchView.searchInput);
    const activeClassName = "active";

    this.addTimerEventListener("input", inputClass, activeClassName);

    inputClass.addEventListener("focusout", () => {
      this.searchView.removeClass(activeClassName);
    });
  };

  SearchController.prototype.addTimerEventListener = function addTimerEventListener(eventName, inputClass, activeClassName) {
    let timeout = null;
    const DELAY_TIME = 300;
    inputClass.addEventListener(eventName, evt => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentText = evt.target.value;
        this.inputCallback(currentText, activeClassName);
      }, DELAY_TIME);
    });
  };

  SearchController.prototype.inputCallback = function inputCallback(currentText, activeClassName) {
    if (!currentText) {
      this.searchView.removeClass(activeClassName);
    } else {
      this.searchModel.getList(currentText, this.showList.bind(this));
      this.searchView.addClass(activeClassName);
    }
  };

  SearchController.prototype.showList = function showList(wordsFromModel) {
    this.searchView.templateList(wordsFromModel);
  };

  const searchView = new SearchView({
    searchBar: ".search",
    searchInput: ".search-input",
    searchList: ".search-list",
    line: ".line",
  });

  const searchModel = new SearchModel("../data/localData.json");
  const searchController = new SearchController(searchView, searchModel);
  searchController.initialize();
});
