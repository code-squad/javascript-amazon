class TemplateData {
  constructor() {
    this.init();
  }

  init() {
    this.addSearchBox();
  }

  addSearchBox() {
    let searchBox = `
      <div class="search-content">
        ${this.addSearchWrap()}
        ${this.addAutoList()}
    </div>`;

    const body = document.querySelector(".search-box");
    body.innerHTML += searchBox;
  }

  addSearchWrap() {
    let search = `
      <div class="search-wrap">
        <input type="text" class="search-term" placeholder="What are you looking for?" />
        <button type="submit" class="search-button">
          <i class="fa fa-search"></i>
        </button>
      </div>`;

    return search;
  }

  addAutoList() {
    let autoList = `
    <div class="auto-complete">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
      </ul>
    </div>`;

    return autoList;
  }
}

export { TemplateData };
