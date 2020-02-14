function $(element) {
  return document.querySelector(element);
}

function $$(element) {
  return document.querySelectorAll(element);
}

export { $, $$ };
