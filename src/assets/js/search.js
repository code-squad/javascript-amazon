import { $getById, $addListener } from "./util.js";

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
    const searchBar = (_, ...args) =>
      `<form class="${args[0]}" action="#none" method="get"><input class="${args[1]}" type="text" name="term" /><button class="${args[2]}">🔍</button></form>`;
    const autoCompeleArea = (_, ...args) =>
      `<ul class="${args[0]}" style="display: none;"><li cass="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li></ul>`;

    container.innerHTML += searchBar`${CLASSNAME_FORM} ${CLASSNAME_INPUT} ${CLASSNAME_BTN}}`;
    container.innerHTML += autoCompeleArea`${CLASSNAME_AUTO_BOX} ${CLASSNAME_AUTO_ITEM}`;
  },
  setElements: function(container) {
    this.container = container;
    this.formElement = this.container.querySelector(".search__form");
    this.inputElement = this.container.querySelector(".search__input");
    this.autoCompleteElement = this.container.querySelector(
      ".search__auto-box"
    );
    this.formUI = new FormUI();
    this.autoCompleteUI = new AutoCompleteUI();
  },
  bindEventListeners: function() {
    this.formElement.addEventListener(
      "submit",
      this.formUI.onSubmitHandler.bind(this)
    );
    this.formElement.addEventListener(
      "input",
      this.formUI.onInputHandler.bind(this)
    );
  }
};

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
  },
  onKeydownHandler: function() {},
  updateInput: function(value) {}
};

const AutoCompleteUI = function() {};

AutoCompleteUI.prototype = {
  updateSuggestions: function(data) {
    const listItems = this.autoCompleteElement.children;
    [...listItems].forEach((item, i) => (item.textContent = data[i]));
    this.autoCompleteUI.show.call(this);
  },
  show: function() {
    this.autoCompleteElement.style.display = "inherit";
  },
  onKeydownHandler: function() {},
  onSelectedHandler: function() {},
  highlightSuggestion: function() {},
  hide: function() {
    this.autoCompleteElement.style.display = "none";
  }
};

$addListener(document, "DOMContentLoaded", () => {
  new SearchUI($getById("search"));
});
