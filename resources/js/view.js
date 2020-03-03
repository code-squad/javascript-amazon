import { _$, _$$ } from "./util.js";

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
  this.LI_INIT_VAL = -1;
  this.listIndex = this.LI_INIT_VAL;
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

SearchView.prototype.clearList = function clearList() {
  this.removeClass();
  this.listIndex = this.LI_INIT_VAL;
  this.searchList.innerHTML = `<ul></ul>`;
};

SearchView.prototype.templateList = function templateList(wordsFromModel) {
  let newHTML = "";
  wordsFromModel.forEach(eachWord => {
    newHTML += `<li><span>${eachWord.restSpell}<b>${eachWord.boldSpell}</b></span></li>`;
  });
  this.searchList.innerHTML = `<ul>${newHTML}</ul>`;
};

SearchView.prototype.highlightList = function highlightList(listElem) {
  const currentIndex = this.listIndex;
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

export default SearchView;
