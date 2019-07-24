import SearchInfoView from "./SearchInfoView.js";

export default class RecentListView extends SearchInfoView {
  constructor({ maxLen, title }) {
    super({ maxLen, title });

    this.queue = [];
  }

  addRecentSearchText({ text }) {
    if (this.queue.length === this.maxLen) this.queue.pop();

    this.queue.unshift({ text });
  }

  makeHtml(queue) {
    return queue.map(item => `<span class="info-text">${item.text}</span>`);
  }

  getTemplate() {
    return this.queue.length > 0
      ? this.getListTemplate({
          list: this.makeHtml(this.queue),
          listClassName: "recent-list"
        })
      : null;
  }
}
