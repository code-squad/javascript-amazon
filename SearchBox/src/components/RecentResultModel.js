class RecentResultModel {
  constructor(maxNumber) {
    this.maxNumber = maxNumber;
    this.items = [];
  }
  init() {
    //fetch data from server and update previous record of recent search
  }

  addKeyword({ keyword }) {
    if (!this.items.includes(keyword)) {
      this.removeKeywordAuto();
      this.items.unshift(keyword);
    }
    console.log(this.items);
  }

  removeKeywordAuto() {
    if (this.items.length === this.maxNumber) {
      this.items.pop();
    }
  }
}

export default RecentResultModel;
