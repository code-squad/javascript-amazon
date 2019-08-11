import autoCompleteResult from "../templates/autoCompleteResult.js";

class AutoCompleteView {
  constructor() {
    this.items = [];
  }

  render({ keyword }) {
    const ul = document.querySelector("#autoComplete");
    ul.innerHTML = "";
    const liItems = this.splitItemsByKeyword(keyword);
    ul.insertAdjacentHTML("afterbegin", liItems);
  }

  splitItemsByKeyword(keyword) {
    return this.items
      .map(item => item.toLowerCase())
      .reduce((acc, item) => {
        if (item.includes(keyword)) {
          acc += autoCompleteResult({ item, keyword });
        }
        return acc;
      }, "");
  }
}

export default AutoCompleteView;
