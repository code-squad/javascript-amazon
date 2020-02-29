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
    this.autoCompeleUI = new AutoCompleteUI();
  },
  bindEventListeners: function() {}
};

const FormUI = function() {};

FormUI.prototype = {
  onSubmitHandler: function() {},
  onChangeHandler: function() {},
  onKeydownHandler: function() {},
  updateInput: function() {}
};

const AutoCompleteUI = function() {};

AutoCompleteUI.prototype = {
  show: function() {},
  updateSuggestions: function() {},
  onKeydownHandler: function() {},
  onSelectedHandler: function() {},
  highlightSuggestion: function() {},
  hide: function() {}
};

$addListener(document, "DOMContentLoaded", () => {
  new SearchUI($getById("search"));
});
