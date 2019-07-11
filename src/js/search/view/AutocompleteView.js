import ut from '../../myUtil/myUtil.js';
import template from './template/Template.js';

export default class Autocomplete {
  constructor() {
    this.inputBox = document.querySelector('.input__box');
    this.autocomContainer = this.inputBox.querySelector('.search__searcheable-list');
  }

  attachAutocomList(words, inputVal, numOfList) {
    words = words.sort();
    const autocomList = words.reduce((acc, cur, idx) => {
      if(idx > numOfList-1) return acc; 
      cur = this.emphasizeLetters(cur, inputVal);
      const accumulatedTemplate = acc+template.createSearcheableList(cur);
      return accumulatedTemplate
    }, '');
    ut.appendElLastly(this.autocomContainer, autocomList);
  }

  emphasizeLetters(word, emLetter) {
    const letterLen = emLetter.length,
          matchedIdx = word.indexOf(emLetter),
          splitWord = [...word];
  
    splitWord.splice(matchedIdx, letterLen, template.createBoldLetter(emLetter));
    return splitWord.join('');

  }
  
  dettachAutocomList() {
    this.autocomContainer.innerHTML = ''
  }
}