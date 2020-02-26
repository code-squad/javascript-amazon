let util = {
  $: function(name) {
    return document.querySelector(name);
  },
  $$: function(name) {
    return document.querySelectorAll(name);
  },
  createElement: function(tag) {
    return document.createElement(tag);
  }
};

export default util;
