import ut from '../../myUtil/myUtil.js';
import template from './template/Template.js';

export default class AutocompleteView {
  constructor(limitedNum) {
    this.autoViewContainer = null;
    this.autocomplete = null;
    this.limitedNum = limitedNum;
    this.dataName = null;
  }

  initRender(autoViewContainer) {
    const className = "search__autocomplete";
    this.autoViewContainer = autoViewContainer;
    this.attachAutocomContainer(className);
    this.autocomplete = ut.qrSelectorByClass(className, this.autoViewContainer);
  }

  attachAutocomContainer(className) {
    const autocomplete = template.createAutoView(className);
    ut.appendElLastly(this.autoViewContainer, autocomplete);
  }

  render(words, inputVal) {
    const autocomList = this.attachAutocomList(words, inputVal);
    ut.appendElLastly(this.autocomplete, autocomList);
  }

  attachAutocomList(words, inputVal) {
    words = words.sort();
    const autocomList = words.reduce((acc, cur, idx) => {
      if(idx > this.limitedNum-1) return acc; 
      this.dataName = cur;
      const boldText = this.emphasizeLetters(cur, inputVal);
      const accumulatedTemplate = acc+template.createAutoViewItem(boldText, this.dataName);

      return accumulatedTemplate
    }, '');
    return autocomList
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
    } else autocomCL.remove('hide');
  }
  
  deleteRenderedList() {
    this.autocomplete.innerHTML = '';
  }
}