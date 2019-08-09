import autoCompleteResult from "../templates/auto-complete-result.js";
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
    const ul = document.querySelector("#autoComplete");
    broker.subscribe(ul, "keyword", e => {
      this.render({
        keyword: e.detail.toLowerCase().trim()
      });
    });
  }

  render({ keyword }) {
    const ul = document.querySelector("#autoComplete");
    ul.innerHTML = "";
    const liAll = this.makeLiAll(keyword);
    ul.insertAdjacentHTML("afterbegin", liAll);
  }

  makeLiAll(keyword) {
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
