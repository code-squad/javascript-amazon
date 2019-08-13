import recentResult from "../templates/recentResult.js";

class RecentResultView {
  constructor() {
    this.items = [];
  }

  render() {
    const ul = document.querySelector("#recentResult");
    ul.innerHTML = "";
    const liItems = this.items.reduce((acc, item) => {
      acc += recentResult({ item });
      return acc;
    }, "");
    ul.insertAdjacentHTML("afterbegin", liItems);
  }
}

export default RecentResultView;
