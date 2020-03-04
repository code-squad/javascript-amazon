const _$ = function _$(element) {
  return document.querySelector(element);
};

const _$$ = function _$$(element) {
  return document.querySelectorAll(element);
};

export { _$, _$$ };
