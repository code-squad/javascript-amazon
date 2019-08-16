import recentResult from "../templates/recentResult.js";

class RecentResultView {
  constructor() {
    this.items = [];
  }

  render() {
    const ul = this.clearView();
    const liItems = this.items.reduce((acc, item) => {
      acc += recentResult({ item });
      return acc;
    }, "");
    ul.insertAdjacentHTML("afterbegin", liItems);
  }

  clearView() {
    const ul = document.querySelector("#recentResult");
    ul.innerHTML = "";
    return ul;
  }
}

export default RecentResultView;
