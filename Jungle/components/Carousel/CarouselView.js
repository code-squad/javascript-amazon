import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";
import Navigation from "../Navigation/index.js";

export default class CarouselView extends MyEventEmitter {
  constructor({ carouselElement, options }) {
    super();

    //DOM caching
    this.carousel = carouselElement;

    this.carouselWidth = options.width;
    this.offset = -this.carouselWidth;
    this.currentItem = 1;
    this.isMoving = false;

    this.defaultOption = {
      duration: 200
    };

    this.options = this.mergeOption(options);
  }

  mergeOption(userOption) {
    return { ...this.defaultOption, ...userOption };
  }

  attachClone() {
    const firstItem = this.items[0];
    const lastItem = this.items[this.items.length - 1];

    const firstItemClone = firstItem.cloneNode(true);
    const lastItemClone = lastItem.cloneNode(true);
    firstItemClone.setAttribute("data-isClone", "true");
    lastItemClone.setAttribute("data-isClone", "true");

    firstItem.insertAdjacentElement("beforebegin", lastItemClone);
    lastItem.insertAdjacentElement("afterend", firstItemClone);

    this.items = this.carousel.querySelectorAll(".item"); //clone 붙여서 갱신
  }

  makeCarouselItemHtml(data) {
    const list = data.map(eachData => eachData.desc);

    return `
        ${data.reduce(
          (html, item, index) => `
          ${html}
        <div class="item">
        <div class="thumb" style="background-image: url('${item.imgUrl}')">
        </div>
        <div class="content">
          <h2>${item.title}</h2>
          <ul>
            <li>${list[index]}</li>
          </ul>
        </div>
      </div>
        `,
          ``
        )}
        `;
  }

  attachEvent() {
    this.prevBtn = this.carousel.querySelector(".prev");
    this.nextBtn = this.carousel.querySelector(".next");

    this.prevBtn.addEventListener("click", _ => {
      if (this.isMoving) return;
      this.emit("prev");
    });
    this.nextBtn.addEventListener("click", _ => {
      if (this.isMoving) return;
      this.emit("next");
    });

    this.itemSlider.addEventListener("transitionend", _ =>
      this.emit("moveend")
    );
  }

  setSliderTransition(on) {
    on
      ? (this.itemSlider.style.transition = `${
          this.options.duration
        }ms transform`)
      : (this.itemSlider.style.transition = `none`);
  }

  setCss() {
    this.items = this.carousel.querySelectorAll(".item");
    this.itemSlider = this.carousel.querySelector(".item-slider");

    this.itemSlider.style.transform = `translateX(${this.offset}px)`;
    this.setSliderTransition(true);

    this.carousel.style.width = `${this.carouselWidth}px`;
    this.carousel.style.height = `${this.options.height}px`;

    this.items.forEach(item => (item.style.width = `${this.options.width}px`));
  }

  initRender(data) {
    const carouselItemHtml = this.makeCarouselItemHtml(data);

    const carouselTemplate = `
    <div class="item-wrapper">
      <div class="item-slider">${carouselItemHtml}</div>
    </div>
    <button class="carousel-control prev"><</button>
    <button class="carousel-control next">></button>
    `;

    this.carousel.innerHTML = carouselTemplate;

    if (this.options.navigation) this.addNav();

    this.setCss();
    this.attachClone();
    this.attachEvent();
  }

  isFirstClone() {
    const lastItemIndex = this.items.length - 1;

    return this.currentItem === lastItemIndex;
  }

  isLastClone() {
    return this.currentItem === 0;
  }

  moveToCorrectPosition() {
    this.setSliderTransition(false);

    if (this.isFirstClone()) {
      this.moveToFirstItem();
    } else if (this.isLastClone()) {
      this.moveToLastItem();
    }
  }

  moveToFirstItem() {
    this.offset = -this.carouselWidth;
    this.itemSlider.style.transform = `translateX(${this.offset}px)`;
    this.currentItem = 1;
  }

  moveToLastItem() {
    const lastItemIndexWithoutClone = this.items.length - 2;

    this.offset = -(this.carouselWidth * lastItemIndexWithoutClone);
    this.itemSlider.style.transform = `translateX(${this.offset}px)`;
    this.currentItem = lastItemIndexWithoutClone;
  }

  setItemSliderOffset(itemnum) {
    const offset = -1 * (itemnum * this.carouselWidth);
    this.currentItem = itemnum;

    this.isMoving = true;
    this.setSliderTransition(true);

    this.itemSlider.style.transform = `translateX(${offset}px)`;
  }

  addNav() {
    const navContainer = document.createElement("div");
    navContainer.classList.add("nav-container");

    this.carousel.insertAdjacentElement("beforebegin", navContainer);

    this.nav = new Navigation({
      navigationElement: navContainer,
      options: {
        width: this.carouselWidth,
        height: 100,
        duration: 200
      },
      carousel: this
    });
  }
}
