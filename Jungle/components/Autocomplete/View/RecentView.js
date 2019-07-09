export default class RecentView {
  constructor(autocomplete) {
    this.autocomplete_div = autocomplete;
    this.search_input = autocomplete.querySelector("input[type=search]");

    this.init();
    this.setCss();
    this.attachEvent();
  }

  init() {
    this.recent_div = document.createElement("div");
    this.recent_div.classList.add("recent");

    this.autocomplete_div.insertAdjacentElement("beforeend", this.recent_div);
  }

  setCss() {
    this.recent_div.style.width = `${
      this.search_input.getBoundingClientRect().width
    }px`;
    this.recent_div.style.height = "auto";
    this.recent_div.style.backgroundColor = "skyblue";
  }

  attachEvent() {
    this.search_input.addEventListener("focus", this.show.bind(this));
    this.search_input.addEventListener("focusout", this.hide.bind(this));
  }

  show() {
    this.recent_div.style.opacity = 1;
  }

  hide() {
    this.recent_div.style.opacity = 0;
  }

  render(data) {
    const template = `
      <ul>
        ${data.reduce(
          (html, curr) =>
          `
            ${html}
            <li>${curr.word}</li>
          `
        , ``
        )}
      </ul>
    `;

    this.recent_div.innerHTML = template;
  }
}
