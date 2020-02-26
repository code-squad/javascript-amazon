function _$(element) {
  return document.querySelector(element);
}

function _$$(element) {
  return document.querySelectorAll(element);
}

export { _$, _$$ };
