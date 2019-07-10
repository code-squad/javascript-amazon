import ut from '../../myUtil/myUtil.js';
import template from './template/Template.js';

export default class Autocomplete {
  constructor() {
    // this.inputBox = document.querySelector('.input__box');
  }

  attachContainer() {
    const inputBox = document.querySelector('.input__box');
    if(!inputBox.querySelector('.search__searcheable-list')) ut.appendElLastly(inputBox, template.createListContainer());
  }

  attachAutocomList(words) {
    const inputBox = document.querySelector('.input__box');
    const autocomContainer = inputBox.querySelector('.search__searcheable-list');
    const autocomList = words.reduce((acc, cur) => {
      return acc+template.createSearcheableList(cur);
    }, '');
    ut.appendElLastly(autocomContainer, autocomList);
  }
  
  dettachAutocomList() {
    const inputBox = document.querySelector('.input__box');
    const autocomContainer = inputBox.querySelector('.search__searcheable-list');
    if(autocomContainer) autocomContainer.innerHTML = ''
  }
}