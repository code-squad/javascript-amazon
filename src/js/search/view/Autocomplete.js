import ut from '../../myUtil/myUtil.js';
import template from './template/Template.js';

export default class AutocompleteView {
  constructor(limitedNum) {
    this.autoViewContainer = null;
    this.autocomplete = null;
    this.limitedNum = limitedNum;
    this.autocomItems = null;
  }

  initRender(autoViewContainer) {
    this.autoViewContainer = autoViewContainer;
    const className = "search__autocomplete";
    this.attachAutocomContainer(className);
    this.autocomplete = ut.qrSelectorByClass(className, this.autoViewContainer);
  }

  attachAutocomContainer(className) {
    const autocomplete = template.createAutoView(className);
    ut.appendElLastly(this.autoViewContainer, autocomplete);
  }

  renderAutocomplete(words, inputVal, delayedTime) {
    const autocomList = this.attachAutocomList(words, inputVal);
    this.delayedRenderer(autocomList, delayedTime);
  }

  attachAutocomList(words, inputVal) {
    words = words.sort();
    const autocomList = words.reduce((acc, cur, idx) => {
      // List 최대 6개까지만 만들기 위해 초기 설정값 이상으로 넘어가면 종료.
      if(idx > this.limitedNum-1) return acc; 
      cur = this.emphasizeLetters(cur, inputVal);
      const accumulatedTemplate = acc+template.createAutoViewItem(cur);
      return accumulatedTemplate
    }, '');
    return autocomList
  }

  emphasizeLetters(word, emLetter) {
    const letterLen = emLetter.length,
          matchedIdx = word.indexOf(emLetter),
          splitWord = [...word];
  
    splitWord.splice(matchedIdx, letterLen, template.createBoldLetter(emLetter));
    return splitWord.join('');
  }

  autocompleteViewer(action) {
    const autocomCL = this.autocomplete.classList
    if(action === 'hide') autocomCL.add('hide');
    else autocomCL.remove('hide');
  }
  
  deleteRenderedList() {
    this.autocomplete.innerHTML = '';
  }
  
  delayedRenderer(template, delayedTime) {
    ut.appendElLastly(this.autocomplete, template);
    this.autocompleteViewer('show');
  }

  // focusItem({keyCode}) {
  //   if (!this.autocomItems) return;
  //   this.autocomItemsLen = this.autocomItems.length;
  //   if(this.focusedDom === null) {
  //     this.firstFocus(keyCode);
  //   } else {
  //     this.moveFocus(keyCode);
  //   }
  // }

  // firstFocus(keyCode) {
  //   const firstItemIdx = 0,
  //         lastItemIdx = this.autocomItemsLen - 1;
  //   if(keyCode === 40) {
  //     this.focusedDom = this.autocomItems[firstItemIdx];
  //     this.curItemIdx = firstItemIdx;
  //   } else {
  //     this.focusedDom = this.autocomItems[lastItemIdx];
  //     this.curItemIdx = lastItemIdx;
  //   }
  //   this.focusToggle(this.focusedDom);
  // }

  // moveFocus(keyCode) {
  //   this.focusToggle(this.focusedDom);
  //   let nextItemIdx;
  //   keyCode === 40 ? nextItemIdx = this.curItemIdx + 1 : nextItemIdx = this.curItemIdx - 1;
  //   if(nextItemIdx < 0 || nextItemIdx >= this.autocomItemsLen) {
  //     this.resetFocusDom();
  //     return;
  //   }
  //   this.focusedDom = this.autocomItems[nextItemIdx];
  //   this.curItemIdx = nextItemIdx;
  //   this.focusToggle(this.focusedDom);
  // }

  // focusToggle(targetElem) {
  //   targetElem.classList.toggle('focus');
  // }
  
  // resetFocusDom() {
  //   this.focusedDom = null;
  //   this.curItemIdx = null;
  // }
  
  // clearAutocomList() {
  //   this.autocomItems = null;
  //   this.autocomItemslen = null;
  // }

  // hideAutoView() {
  //   this.autocomplete.classList.add('hide');
  // }
}