class SearchView {
  constructor(inputArr) {
    this.searchForm = document.querySelector(inputArr[0]);
    this.findBtn = document.querySelector(inputArr[1]);
    this.notify;
  }

  init(func) {
    this.notify = func;

    this.searchForm.addEventListener("focus", e => {
      this.notify("focusing");
    });

    this.searchForm.addEventListener("blur", e => {
      this.notify("blured");
    });

    this.searchForm.addEventListener("input", e => {
      if (e.srcElement.value === "") {
        this.notify("pending");
      } else {
        this.notify("entering", e.srcElement.value);
      }
    });

    this.findBtn.addEventListener("click", e => {
      this.notify("completing", this.searchForm.value);
    });
  }

  removeSearchKeyword() {
    this.searchForm.value = "";
  }

  updateSearchKeyword(selectedKeyword) {
    this.searchForm.value = "";
    this.searchForm.value = selectedKeyword;
  }
}

export default SearchView;
