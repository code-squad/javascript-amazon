const $querySelector = target => document.querySelector(target);
const $querySelectorAll = target => document.querySelectorAll(target);
const $getById = target => document.getElementById(target);
const $addListener = (target, type, listener, options) =>
  target.addEventListener(type, listener, options);

export { $querySelector, $querySelectorAll, $getById, $addListener };
