import util from "../util.js";

function SearchUI(inputDOM, listForm, localData) {
  // 인자값으로 전해주기
  this.searchArea = inputDOM;
  this.listForm = listForm;
  this.searchData = localData;
  this.keydownIndex = -1;

  this.findData = [];
}

SearchUI.prototype.onSearchEvent = function(autoMethod) {
  this.searchArea.addEventListener("input", event => {
    this.findData = [];
    this.keydownIndex = -1;
    this.ExploreData(this.searchData, event);
    autoMethod(this.findData, this.listForm);
    console.log(this.findData);
  });
};

SearchUI.prototype.ExploreData = function(localData, event) {
  localData.forEach(el => {
    if (event.target.value === "") {
      this.findData = [];
      return;
    } else if (this.findData.length === 10) {
      return;
    } else if (el.startsWith(event.target.value)) {
      this.findData.push(el);
    }
  });
};

SearchUI.prototype.onKeydownEvent = function() {
  window.addEventListener("keydown", event => {
    const list = util.$$("li");
    console.log(list);
    console.log(this);
    if (event.key === "ArrowDown") {
      if (this.keydownIndex === -1) {
        this.keydownIndex++;
        list[this.keydownIndex].className = "on";
        return;
      } else if (this.keydownIndex === list.length - 1) {
        list[this.keydownIndex].classList.remove("on");
        this.keydownIndex = -1;
        return;
      } else if (this.keydownIndex > -1) {
        this.keydownIndex++;
        list[this.keydownIndex - 1].classList.remove("on");
        list[this.keydownIndex].className = "on";
      }
    } else if (event.key === "ArrowUp") {
      if (this.keydownIndex === -1) {
        this.keydownIndex = list.length - 1;
        list[this.keydownIndex].className = "on";
        return;
      } else if (this.keydownIndex === 0) {
        list[this.keydownIndex].classList.remove("on");
        this.keydownIndex = -1;
        return;
      } else if (this.keydownIndex > 0) {
        this.keydownIndex--;
        list[this.keydownIndex].className = "on";
        list[this.keydownIndex + 1].classList.remove("on");
      }
    }
  });
};

export default SearchUI;
