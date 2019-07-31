import * as ut from '../../../lib/myUtil/myUtil.js';
import template from './template/Template.js';
import { CLASS_AUTOCOMPLETE, CLASS_AUTOVIEW_LIST } from '../helper/config.js';

export default class AutocompleteView {
  constructor(limitedNum) {
    this.autoViewContainer = null;
    this.autocomplete = null;
    this.limitedNum = limitedNum;
    this.dataName = null;
  }

  initRender(autoViewContainer) {
    this.autoViewContainer = autoViewContainer;
    this.attachAutocomContainer(CLASS_AUTOCOMPLETE);
    this.autocomplete = ut.qsByClass(CLASS_AUTOCOMPLETE, this.autoViewContainer);
  }

  attachAutocomContainer(className) {
    const autocomplete = template.createAutoView(className);
    ut.appendHTMLAtLast(this.autoViewContainer, autocomplete);
  }

  render(words, inputVal) {
    const autocomList = this.attachAutocomList(words, inputVal);
    ut.appendHTMLAtLast(this.autocomplete, autocomList);
  }

  attachAutocomList(words, inputVal) {
    return words.reduce((acc, cur, idx) => {
      if(idx > this.limitedNum-1) return acc;
      this.dataName = cur;
      const boldText = this.emphasizeLetters(cur, inputVal),
            accumulatedTemplate = acc+template.createAutoViewItem(boldText, this.dataName, CLASS_AUTOVIEW_LIST);
      return accumulatedTemplate;
    }, '');
  }

  getAutocomList() {
    return this.autocomplete.children;
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
    if(action === 'hide') {
      autocomCL.add('hide');
    } 
    else autocomCL.remove('hide');
  }
  
  deleteRenderedList() {
    this.autocomplete.innerHTML = '';
  }
}