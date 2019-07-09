import MyEventEmitter from "../../../../MyEventEmitter/index.js";
import template from "./template.js";
import RecentView from "./RecentView.js";

export default class SearchView extends MyEventEmitter {
  constructor(autocomplete) {
    super();
    //DOM
    this.autoComplete_div = autocomplete;

    this.init();
    this.attachEvent();
  }

  init() {
    this.autoComplete_div.innerHTML = template.SearchView;
    this.form = this.autoComplete_div.querySelector("form");
    this.submit_input = this.autoComplete_div.querySelector(
      "input[type=submit]"
    );

    this.recentView = new RecentView(this.autoComplete_div);
    this.recentView.hide();
  }

  getToday() {
    const curr = new Date();
    const month = curr.getMonth() + 1;
    const day = curr.getDate();

    return [`${month}`, `${day}`]
      .map(el => (el.length === 1 ? `0${el}` : el))
      .join("-");
  }

  makeRecentSearchData(word) {
    return { date: this.getToday(), word };
  }

  addSearchWord(evt) {
    evt.preventDefault();

    const search_input = evt.target.querySelector("input[type=search]");
    if (search_input.value === "") return;

    this.emit("search", this.makeRecentSearchData(search_input.value));
    search_input.value = "";
  }

  attachEvent() {
    this.form.addEventListener("submit", this.addSearchWord.bind(this));
  }
}
