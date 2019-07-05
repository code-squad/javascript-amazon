"use strict";
import $ from "./mylibrary.js";

class Pagination {
  constructor(inputTag) {
    this.navList = $(inputTag);
    this.navItems = this.navList.children;
  }

  initData(data) {
    let result = data.reduce((acc, cur) => {
      acc += `<li class="item${cur.id}">${cur.title}</li>`;
      return acc;
    }, "");
    this.navList.insertAdjacentHTML("beforeend", result);
  }

  initSetting(obj, func) {
    this.changeNotify = func;
    this.setPaginationAttr(this.navItems, "data-nav-index");
    this.navItems[0].classList.add("scale");
    this.attachEventToPagination();
  }

  scaleUp(navIndex) {
    const currentScale = $(".scale");
    currentScale.classList.remove("scale");
    this.navItems[navIndex].classList.add("scale");
  }

  setPaginationAttr(arr, attrName) {
    const _arr = [...arr];

    _arr.forEach((v, i) => {
      _arr[i].setAttribute(attrName, i + 1);
    });
  }

  attachEventToPagination() {
    this.navList.addEventListener("click", e => {
      let navIndex = e.target.dataset.navIndex;
      this.changeNotify(e.target, navIndex);
    });
  }
}

export default Pagination;
