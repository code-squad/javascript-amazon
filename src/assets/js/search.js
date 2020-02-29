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
      `<form class="${args[0]}" method="get"><input class="${args[1]}" type="text" name="term" /><button class="${args[2]}">🔍</button></form>`;
    const autoCompeleArea = (_, ...args) =>
      `<ul class="${args[0]}" action="#none" style="display: none;"><li cass="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li><li class="${args[1]}"></li></ul>`;

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
    this.formElement.addEventListener("submit", this.formUI.onSubmitHandler);
    this.inputElement.addEventListener(
      "input",
      this.formUI.onInputHandler.bind(this)
    );
  }
};

const FormUI = function() {};

FormUI.prototype = {
  onSubmitHandler: function(e) {
    e.preventDefault();
    // this.autoCompeleUI.hide();
  },
  onInputHandler: function() {
    const inputValue = this.inputElement.value;
    const URL = `http://localhost:8080/amazon/search?term=${inputValue}`;
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        this.autoCompleteUI.updateSuggestions(data);
      });
  },
  onKeydownHandler: function() {},
  updateInput: function(value) {}
};

const AutoCompleteUI = function() {};

AutoCompleteUI.prototype = {
  updateSuggestions: function(data) {
    console.log(data);
    // this.show();
  },
  show: function() {
    this.autoCompleteElement.classList.remove("hide");
  },
  onKeydownHandler: function() {},
  onSelectedHandler: function() {},
  highlightSuggestion: function() {},
  hide: function() {
    this.autoCompleteElement.classList.add("hide");
  }
};

$addListener(document, "DOMContentLoaded", () => {
  new SearchUI($getById("search"));
});
