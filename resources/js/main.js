import { _$, _$$ } from "./util.js";

window.addEventListener("DOMContentLoaded", () => {
  const SearchView = function SearchView(
    option = {
      searchBar: ".search",
      searchList: ".search-list",
      searchInput: ".search-input",
      searchBtn: ".search-btn",
      line: ".line",
      activeClassName: "active",
    },
  ) {
    this.searchBar = _$(option.searchBar);
    this.searchList = _$(option.searchList);
    this.searchInput = _$(option.searchInput);
    this.searchBtn = _$(option.searchBtn);
    this.line = _$(option.line);
    this.activeClassName = option.activeClassName;
    this.allElement = [this.searchBar, this.searchList, this.line];
  };

  SearchView.prototype.addClass = function addClass(targetElement = this.allElement, className = this.activeClassName) {
    if (Array.isArray(targetElement)) {
      targetElement.forEach(eachElem => {
        eachElem.classList.add(className);
      });
    } else targetElement.classList.add(className);
  };

  SearchView.prototype.removeClass = function removeClass(targetElement = this.allElement, className = this.activeClassName) {
    if (Array.isArray(targetElement)) {
      targetElement.forEach(eachElem => {
        eachElem.classList.remove(className);
      });
    } else targetElement.classList.remove(className);
  };

  SearchView.prototype.templateList = function templateList(wordsFromModel) {
    let newHTML = "";
    wordsFromModel.forEach(eachWord => {
      newHTML += `<li><span>${eachWord.restSpell}<b>${eachWord.boldSpell}</b></span></li>`;
    });
    this.searchList.innerHTML = `<ul>${newHTML}</ul>`;
  };

  SearchView.prototype.highlightList = function highlightList(listElem, currentIndex) {
    if (!listElem[currentIndex]) return;
    for (let index = 0; index < listElem.length; index += 1) {
      if (index === currentIndex) {
        this.addClass(listElem[index]);
        this.changeInputText(listElem[index].innerText);
      } else this.removeClass(listElem[index]);
    }
  };

  SearchView.prototype.changeInputText = function changeInputText(str) {
    const targetListText = str;
    this.searchInput.value = targetListText;
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
    const searchBarElem = this.searchView.searchBar;
    const searchBtnElem = this.searchView.searchBtn;
    const inputElem = this.searchView.searchInput;
    let index = -1;

    this.addTimerEventListener("input", inputElem);

    inputElem.addEventListener("focusout", () => {
      this.searchView.removeClass();
    });

    searchBtnElem.addEventListener("click", () => {
      this.searchView.removeClass();
    });

    searchBarElem.addEventListener("keydown", evt => {
      this.keyDownCallback(evt, index);
      index = this.keyDownCallback(evt, index).index;
    });
  };

  SearchController.prototype.keyDownCallback = function keyDownCallback(evt, index) {
    let listIndex = index;
    const [ARROW_UP, ARROW_DOWN, ENTER] = ["ArrowUp", "ArrowDown", "Enter"];
    const listArray = this.searchView.searchList.children[0].children;
    switch (evt.key) {
      case ARROW_UP:
        listIndex -= 1;
        if (listIndex < 0) listIndex = listArray.length - 1;
        this.searchView.highlightList(listArray, listIndex);
        break;
      case ARROW_DOWN:
        listIndex += 1;
        if (listIndex > listArray.length - 1) listIndex = 0;
        this.searchView.highlightList(listArray, listIndex);
        break;
      case ENTER:
        this.searchView.removeClass();
        break;
      default:
        break;
    }
    return { index: listIndex };
  };

  SearchController.prototype.addTimerEventListener = function addTimerEventListener(eventName, inputElem) {
    let timeout = null;
    const DELAY_TIME = 300;
    inputElem.addEventListener(eventName, evt => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.inputCallback(evt);
      }, DELAY_TIME);
    });
  };

  SearchController.prototype.inputCallback = function inputCallback(evt) {
    const currentText = evt.target.value;
    if (!currentText) this.searchView.removeClass();
    else this.searchModel.getList(currentText, this.showList.bind(this));
  };

  SearchController.prototype.showList = function showList(wordsFromModel) {
    this.searchView.templateList(wordsFromModel);
    if (wordsFromModel.length > 0) this.searchView.addClass();
    else this.searchView.removeClass();
  };

  const searchView = new SearchView();
  const searchModel = new SearchModel("../data/localData.json");
  const searchController = new SearchController(searchView, searchModel);
  searchController.initialize();
});
