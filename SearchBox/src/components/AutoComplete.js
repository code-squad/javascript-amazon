import autoCompleteResult from "../templates/auto-complete-result.js";

class AutoComplete {
  constructor(keyword) {
    this.keyword = keyword.toLowerCase().trim();
    this.items = [
      "iphone 8 plus",
      "iphone xs display",
      "iphone xs max battery",
      "LG monitor 24inch",
      "Galaxy note 10 plus",
      "Galaxy fold beta",
      "Galaxy 10",
      "ipad pro 3",
      "air pods 2",
      "imac pro",
      "ipods"
    ];
    this.render();
  }

  render() {
    const ul = document.querySelector("#autoComplete");
    const liAll = this.items
      .map(item => item.toLowerCase())
      .reduce((acc, item) => {
        if (item.includes(this.keyword)) {
          acc += autoCompleteResult({
            item,
            keyword: this.keyword
          });
        }
        return acc;
      }, "");
    ul.insertAdjacentHTML("afterbegin", liAll);
  }
}

export default AutoComplete;
