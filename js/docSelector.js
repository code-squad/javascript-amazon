export { $, $All };
const $ = (elName) => { return document.querySelector(elName); };
const $All = (elName) => { return document.querySelectorAll(elName); };