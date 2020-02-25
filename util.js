const $qs = target => document.querySelector(target);
const $qsa = target => document.querySelectorAll(target);
const $ael = (target, type, listener, options) =>
  target.addEventListener(type, listener, options);

export { $qs, $qsa, $ael };
