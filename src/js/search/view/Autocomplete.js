import ut from '../../myUtil/myUtil.js';
import template from './template/Template.js';

export default class Autocomplete {
  constructor() {
    this.inputBox = document.querySelector('.input__box');
    this.autocomContainer = this.inputBox.querySelector('.search__searcheable-list');
    this.autocomItems = null;
    this.autocomItemsLen = null;
    this.curItemIdx = null;
    this.focusedDom = null;
  }

  attachAutocomList(words, inputVal, numOfList) {
    words = words.sort();
    const autocomList = words.reduce((acc, cur, idx) => {
      if(idx > numOfList-1) return acc; 
      cur = this.emphasizeLetters(cur, inputVal);
      const accumulatedTemplate = acc+template.createSearcheableList(cur);
      return accumulatedTemplate
    }, '');
    this.delayedListRenderer(autocomList, 300);
  }

  emphasizeLetters(word, emLetter) {
    const letterLen = emLetter.length,
          matchedIdx = word.indexOf(emLetter),
          splitWord = [...word];
  
    splitWord.splice(matchedIdx, letterLen, template.createBoldLetter(emLetter));
    return splitWord.join('');
  }
  
  dettachAutocomList() {
    this.autocomContainer.classList.add('hide');
    this.autocomContainer.innerHTML = ''
    this.resetFocus();
    this.clearAutocomList();
  }
  
  delayedListRenderer(template, delayedTime) {
    setTimeout(() => {
      console.log(this.autocomItems);
      ut.appendElLastly(this.autocomContainer, template);
      this.autocomContainer.classList.remove('hide');
      this.autocomItems = this.autocomContainer.children;
    }, delayedTime);
  }

  focusItem({keyCode}) {
    if (!this.autocomItems) return;
    this.autocomItemsLen = this.autocomItems.length;
    if(this.focusedDom === null) {
      this.firstFocus(keyCode);
    } else {
      this.moveFocus(keyCode);
    }
  }

  firstFocus(keyCode) {
    const firstItemIdx = 0,
          lastItemIdx = this.autocomItemsLen - 1;
    if(keyCode === 40) {
      this.focusedDom = this.autocomItems[firstItemIdx];
      this.curItemIdx = 0;
    } else {
      this.focusedDom = this.autocomItems[lastItemIdx];
      this.curItemIdx = this.autocomItemsLen-1;
    }
    this.focusToggle(this.focusedDom);
  }

  moveFocus(keyCode) {
    this.focusToggle(this.focusedDom);
    let nextItemIdx;
    keyCode === 40 ? nextItemIdx = this.curItemIdx + 1 : nextItemIdx = this.curItemIdx - 1;
    if(nextItemIdx < 0 || nextItemIdx >= this.autocomItemsLen) {
      this.resetFocus();
      return;
    }
    this.focusedDom = this.autocomItems[nextItemIdx];
    this.curItemIdx = nextItemIdx;
    this.focusToggle(this.focusedDom);
  }

  focusToggle(targetElem) {
    targetElem.classList.toggle('focus');
  }

  resetFocus() {
    this.focusedDom = null;
    this.curItemIdx = null;
  }
  
  clearAutocomList() {
    this.autocomItems = null;
    this.autocomItemslen = null;
  }
}