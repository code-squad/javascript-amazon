function autoCompleteView(autoCompleteData) {
  this.autoCompleteData = autoCompleteData

  $('.autoList').innerHTML = this.render()
}
  

autoCompleteView.prototype = {
  render() {
    const autoCompleteList = this.autoCompleteData.reduce((template, autoItem) => 
    (template += `<li>${autoItem}</li>`) , "")
    
    return  `<ul class="searchList">${autoCompleteList}</ul>`
  }
};
