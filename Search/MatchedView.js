class MatchedView {
  constructor({ matchedUl }) {
    this.ul = document.querySelector(matchedUl);
    this.liTemplates = undefined;
  }

  // 이전에 입력이 없었으면 추가하고, 있으면 교체
  render(data) {
    const {
      body: { suggestions }
    } = data;
    console.log("suggestions", suggestions);
    this.ul.style.display = "block";
    if (this.liTemplates === undefined) {
      this.liTemplates = suggestions.reduce((accum, cur) => {
        accum += `<li class="suggestions">${cur.value}</li>`;
        return accum;
      }, "");
      this.ul.insertAdjacentHTML("afterbegin", this.liTemplates);
    }
    while(this.ul.firstElementChild){
      this.ul.removeChild(this.ul.firstElementChild);
    }
    this.liTemplates = suggestions.reduce((accum, cur) => {
      accum += `<li class="suggestions">${cur.value}</li>`;
      return accum;
    }, "");
    this.ul.insertAdjacentHTML("afterbegin", this.liTemplates);

  }
}

export default MatchedView;
