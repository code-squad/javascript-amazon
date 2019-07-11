import MyFetch from "../../../Grenutil/MyFetch/index.js";
import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";
import delegate from "../../../Grenutil/delegate.js";

const FETCH_PATH = "../../../data/localData.json";
const CSS_PATH = "Jungle/components/Navigation/Navigation.css";

export default class NavigationView extends MyEventEmitter {
  constructor({ navigationElement, options }) {
    super();

    this.navigation = navigationElement;

    this.currentActivatedItem = 1;

    this.defaultOptions = {
      width: 500,
      height: 120,
      duration: 100
    };
    this.options = this.mergeOption(options);

    this.loadNavigationCss();
    this.init();
  }

  loadNavigationCss() {
    const head = document.getElementsByTagName("HEAD")[0];
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = CSS_PATH;

    head.appendChild(link);
  }

  mergeOption(userOptions) {
    return { ...this.defaultOptions, ...userOptions };
  }

  setCss() {
    this.navigation.style.width = `${this.options.width}px`;
    this.navigation.style.height = `${this.options.height}px`;
  }

  activateCurrentItem() {
    this.navItems = this.navigation.querySelectorAll("li");

    this.navItems[this.currentActivatedItem - 1].classList.add("active");
  }

  attachEvent() {
    delegate(this.navigation, "li", "click", ({ currentTarget }) => {
      this.navItems.forEach(item => item.classList.remove("active"));

      this.currentActivatedItem = currentTarget.dataset.itemnum;
      this.activateCurrentItem();
    });
  }

  render(data) {
    const template = `
      <ul>
        ${data.reduce(
          (html, item, idx) => `
        ${html}
        <li data-itemnum=${idx + 1}>
          <button class="nav-item">
          ${item.title}
          </button>
        </li>
      `,
          ``
        )}
      </ul>
    `;

    this.navigation.innerHTML = template;
    this.setCss();
    this.activateCurrentItem();
    this.attachEvent();
  }

  init() {
    MyFetch(FETCH_PATH).then(data => this.render(data));
  }
}
