function AutoComplete(data) {
  this.data = data.productList;
  this.searchData = [];
  this.searchResult = [];
  this.init();
}

AutoComplete.prototype = {
  init() {
    this.dataToArray();
  },

  dataToArray() {
    this.data.forEach(element => {
      this.searchData.push(element.productName);
    });
  },

  searchChar(value) {
    this.searchResult = [];
    let resultCount = 0;

    if (value.length === 0 || !value) return;
    this.searchData.forEach(element => {
      let inputStr = element.slice(0, value.length);
      let resultStr = element.slice(value.length, element.length);

      if (value.toLowerCase() === inputStr.toLowerCase()) {
        if (resultCount === 10) return;
        this.searchResult.push(resultStr);
        resultCount++;
      }
    });

    this.render();
  },

  render() {
    const autoList = document.querySelectorAll(".auto-complete > ul > li");

    autoList.forEach((el, index) => {
      if (this.searchResult[index]) {
        el.style.display = "flex";
        el.innerHTML += this.searchResult[index];
      } else {
        el.style.display = "none";
      }
    });
  }
};

export { AutoComplete };
