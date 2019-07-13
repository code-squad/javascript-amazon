import MyFetch from "../../../Grenutil/MyFetch/index.js";
import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";
import delegate from "../../../Grenutil/delegate.js";

const FETCH_PATH = "../../../data/localData.json";
const CSS_PATH = "Jungle/components/Navigation/Navigation.css";

const NAV_ITEMS_COLORS = ["#2591c0", "#a90067", "#008577", "#e65d18"];

export default class NavigationView extends MyEventEmitter {
  constructor({ navigationElement, options, carousel }) {
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

    this.carousel = carousel;

    this.carousel.on("prev", () => {
      this.setPrevItem();
    });
    this.carousel.on("next", () => {
      this.setNextItem();
    });
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

    //#2591c0
    this.navItems.forEach((item, idx) => {
      const navBtn = item.querySelector("button");
      navBtn.style.backgroundColor = NAV_ITEMS_COLORS[idx];
      navBtn.style.color = "white";
    });
  }

  activateCurrentItem() {
    this.navItems = this.navigation.querySelectorAll("li");
    this.navItems.forEach(item => {
      item.classList.remove("active");
    });

    this.navItems[this.currentActivatedItem - 1].classList.add("active");
  }

  attachEvent() {
    delegate(this.navigation, "li", "click", ({ currentTarget }) => {
      this.currentActivatedItem = Number(currentTarget.dataset.itemnum);
      this.activateCurrentItem();
      this.carousel.setItemSliderOffset(this.currentActivatedItem);
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
    this.activateCurrentItem();
    this.setCss();
    this.attachEvent();
  }

  init() {
    MyFetch(FETCH_PATH).then(data => this.render(data));
  }

  setNextItem() {
    this.currentActivatedItem = (this.currentActivatedItem >=  this.navItems.length) ? 1 : this.currentActivatedItem + 1;
    this.activateCurrentItem();
  }

  setPrevItem() {
    this.currentActivatedItem = (this.currentActivatedItem <=  1) ? this.navItems.length : this.currentActivatedItem - 1;
    this.activateCurrentItem();
  }
}
