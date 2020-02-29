import { $getById, $addListener } from "./util.js";

const SearchUI = function(container) {
  this.render(container);
  this.setElements(container);
  this.bindEventListeners();
};

SearchUI.prototype = {
  render: function(container) {},
  setElements: function(container) {},
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
