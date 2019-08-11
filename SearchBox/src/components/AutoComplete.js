import autoCompleteResult from "../templates/autoCompleteResult.js";
// import autoCompleteModel from "../../autoCompleteModel.js";

class AutoComplete {
  constructor(broker) {
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

    this.ul = document.querySelector("#autoComplete");
    broker.subscribe(this.ul, "keyword", e => {
      this.render({
        keyword: e.detail.toLowerCase().trim()
      });
    });
  }

  render({ keyword }) {
    this.ul.innerHTML = "";
    const liItems = this.splitItemsByKeyword(keyword);
    this.ul.insertAdjacentHTML("afterbegin", liItems);
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

export default AutoComplete;
