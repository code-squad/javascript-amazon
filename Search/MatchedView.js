class MatchedView {
  constructor({ matchedUl }) {
    this.ul = document.querySelector(matchedUl);
    this.liTemplates = undefined;
    this.curIdx = 0;
    this.prevIdx = undefined;
  }

  render(data) {
    const {
      body: { suggestions }
    } = data;
    console.log("요청의종류", data.body.responseId);
    this.ul.style.display = "block";

    if (this.liTemplates) {
      while (this.ul.firstElementChild) {
        this.ul.removeChild(this.ul.firstElementChild);
      }
    }
    this.liTemplates = suggestions.reduce((accum, cur) => {
      accum += `<li class="suggestions">${cur.value}</li>`;
      return accum;
    }, "");
    this.ul.insertAdjacentHTML("afterbegin", this.liTemplates);
  }
}

export default MatchedView;
