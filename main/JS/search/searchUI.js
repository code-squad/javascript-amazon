import util from "../util.js";

function SearchUI(inputDOM, listForm, localData) {
  this.searchArea = inputDOM;
  this.listForm = listForm;
  this.searchData = localData;
  this.keydownIndex = -1;
  this.standByIndex = -1;
  this.findData = [];
}

SearchUI.prototype.onSearchEvent = function(autoMethod) {
  this.searchArea.addEventListener("input", event => {
    this.findData = [];
    this.keydownIndex = -1;
    this.ExploreData(this.searchData, event);
    autoMethod(this.findData, this.listForm);
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

    if (event.key === "ArrowDown") {
      if (this.keydownIndex === this.standByIndex) {
        this.keydownIndex++;
        list[this.keydownIndex].className = "on";
        return;
      } else if (this.keydownIndex === list.length - 1) {
        list[this.keydownIndex].classList.remove("on");
        this.keydownIndex = this.standByIndex;
        return;
      } else if (this.keydownIndex > this.standByIndex) {
        this.keydownIndex++;
        list[this.keydownIndex - 1].classList.remove("on");
        list[this.keydownIndex].className = "on";
      }
    }

    if (event.key === "ArrowUp") {
      if (this.keydownIndex === this.standByIndex) {
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
