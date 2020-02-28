const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);
const sleep = ms => new Promise(resolve  => setTimeout(resolve, ms));

const KEYUP = 38;
const KEYDOWN = 40;
const ENTER = 13;

// classList li용도... 
Array.prototype.selectClassList = function ({targetClass, method, addClassName, index}) {
  if(method === add) {
    $(`${targetClass} li:nth-child(${index})`).classList.add(`${addClassName}`)
  } else if(method === remove) {
    $(`${targetClass} li:nth-child(${index})`).classList.remove(`${addClassName}`)
  } else {
    return
  }
}