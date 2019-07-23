import templates from "../../templates.js";

export default class SearchInfoView {
  constructor({ maxLen, title }) {
    this.maxLen = maxLen;
    this.title = title;
    this.selectedIndex = -1;
  }

  getListTemplate({ list, listClassName }) {
    if (list.length > this.maxLen) list.length = this.maxLen;
    this.itemLen = list.length;

    return templates.getSearchInfoTemplate({
      list,
      listClassName,
      title: this.title
    });
  }
}
