function autoCompleteView(autoCompleteData, inputValue) {
  this.autoCompleteData = autoCompleteData;
  this.inputValue = inputValue;

  $('.autoList').innerHTML = this.render();
}
  

autoCompleteView.prototype = {
  constructor: autoCompleteView,
  render() {
    const autoCompleteList = this.autoCompleteData.reduce((template, autoItem) => 
    (template += `<li><strong style="color: #42B883">${autoItem.substring(0, this.inputValue.length)}</strong>${autoItem.substring(this.inputValue.length)}</li>`) , "");
    
    return  `<ul class="searchList">${autoCompleteList}</ul>`;
  }
};
