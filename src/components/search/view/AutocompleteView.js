import ut from '../../../lib/myUtil/myUtil.js';
import template from './template/Template.js';
import config from '../helper/config.js';

export default class AutocompleteView {
  constructor(limitedNum) {
    this.autoViewContainer = null;
    this.autocomplete = null;
    this.limitedNum = limitedNum;
    this.dataName = null;
  }

  initRender(autoViewContainer) {
    const { autocomplete } = config.class;
    this.autoViewContainer = autoViewContainer;
    this.attachAutocomContainer(autocomplete);
    this.autocomplete = ut.qrSelectorByClass(autocomplete, this.autoViewContainer);
  }

  attachAutocomContainer(className) {
    const autocomplete = template.createAutoView(className);
    ut.appendAtLast(this.autoViewContainer, autocomplete);
  }

  render(words, inputVal) {
    const autocomList = this.attachAutocomList(words, inputVal);
    ut.appendAtLast(this.autocomplete, autocomList);
  }

  attachAutocomList(words, inputVal) {
    words = words.sort();
    return words.reduce((acc, cur, idx) => {
      if(idx > this.limitedNum-1) return acc;
      this.dataName = cur;
      const boldText = this.emphasizeLetters(cur, inputVal),
      autoViewList = config.class.autoViewList;
      const accumulatedTemplate = acc+template.createAutoViewItem(boldText, this.dataName, autoViewList);
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