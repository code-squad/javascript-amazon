import { $getById, $addListener } from "./util.js";

/*

Template functions

*/

const searchBar = (_, ...args) =>
  `<form class="${args[0]}" action="#none" method="get"><input class="${args[1]}" type="text" name="term" autocomplete="none" /><button class="${args[2]}">🔍</button></form>`;
const autoCompeleArea = (_, ...args) =>
  `<ul class="${args[0]}" style="display: none;"><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li></ul>`;

/*

SearchUI

*/

const SearchUI = function(container) {
  this.render(container);
  this.setElements(container);
  this.bindEventListeners();
};

SearchUI.prototype = {
  render: function(container) {
    const CLASSNAME_FORM = "search__form";
    const CLASSNAME_INPUT = "search__input";
    const CLASSNAME_BTN = "search__btn";
    const CLASSNAME_AUTO_BOX = "search__auto-box";
    const CLASSNAME_AUTO_ITEM = "search__auto-item";
    container.innerHTML += searchBar`${CLASSNAME_FORM} ${CLASSNAME_INPUT} ${CLASSNAME_BTN}}`;
    container.innerHTML += autoCompeleArea`${CLASSNAME_AUTO_BOX} ${CLASSNAME_AUTO_ITEM}`;
  },
  setElements: function(container) {
    this.searchElement = container;
    this.formElement = this.searchElement.querySelector(".search__form");
    this.inputElement = this.searchElement.querySelector(".search__input");
    this.autoCompleteElement = this.searchElement.querySelector(".search__auto-box");
    this.formUI = new FormUI();
    this.autoCompleteUI = new AutoCompleteUI();
  },
  bindEventListeners: function() {
    this.formElement.addEventListener("submit", this.formUI.onSubmitHandler.bind(this));
    this.formElement.addEventListener("input", this.formUI.onInputHandler.bind(this));
    this.searchElement.addEventListener("keydown", this.autoCompleteUI.onKeydownHandler.bind(this));
  }
};

/*

FormUI

*/

const FormUI = function() {};

FormUI.prototype = {
  onSubmitHandler: function(e) {
    e.preventDefault();
    this.autoCompleteUI.hide.call(this);
  },
  onInputHandler: function(e) {
    const inputValue = e.target.value;
    if (!inputValue) {
      this.autoCompleteUI.hide.call(this);
      return;
    }
    const that = this;
    const URL = `http://localhost:8080/amazon/search?term=${inputValue}`;
    fetch(URL)
      .then(res => res.json())
      .then(function(data) {
        that.autoCompleteUI.updateSuggestions.call(that, data);
      });
  }
};

/*

AutoCompleteUI

*/

const AutoCompleteUI = function() {};

AutoCompleteUI.prototype = {
  updateSuggestions: function(data) {
    const listItems = this.autoCompleteElement.children;
    [...listItems].forEach((item, i) => (item.textContent = data[i]));
    this.autoCompleteUI.show.call(this);
  },
  show: function() {
    const { autoCompleteElement: list } = this;
    list.firstElementChild.classList.add("selected");
    list.style.display = "inherit";
  },
  onKeydownHandler: function(e) {
    const { autoCompleteElement: list, inputElement } = this;
    if (list.style.display === "none") return;
    const firstItem = list.firstElementChild;
    const lastItem = list.lastElementChild;
    const SELECTED = "selected";
    let selectedItem = list.querySelector(".selected") || firstItem;
    selectedItem.classList.remove(SELECTED);
    switch (e.keyCode) {
      case 38:
        if (selectedItem === firstItem) {
          lastItem.classList.add(SELECTED);
          selectedItem = lastItem;
        } else {
          selectedItem.previousElementSibling.classList.add(SELECTED);
          selectedItem = selectedItem.previousElementSibling;
        }
        break;
      case 40:
        if (selectedItem === lastItem) {
          firstItem.classList.add(SELECTED);
          selectedItem = firstItem;
        } else {
          selectedItem.nextElementSibling.classList.add(SELECTED);
          selectedItem = selectedItem.nextElementSibling;
        }
        break;
      case 13:
        inputElement.value = selectedItem.textContent;
        break;
      default:
        return;
    }
  },
  hide: function() {
    const { autoCompleteElement: list } = this;
    [...list.children].forEach(item => item.classList.remove("selected"));
    list.firstElementChild.classList.add("selected");
    list.style.display = "none";
  }
};

$addListener(document, "DOMContentLoaded", () => {
  new SearchUI($getById("search"));
});
