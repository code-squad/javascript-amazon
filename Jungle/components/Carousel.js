import myFetch from "../../MyFetch/index.js";

class Carousel {
  constructor({ container, slider }, observer, config) {
    //DOM
    this.container = document.querySelector(container);
    this.cardSlider = this.container.querySelector(slider);

    this.prevButton = this.container.querySelector(".prev");
    this.nextButton = this.container.querySelector(".next");

    // values
    this.observer = observer;
    this.initIndex = 0;
    this.itemWidth = this.cardSlider.firstElementChild.getBoundingClientRect().width;
    this.offset = 0;
    this.currentItem = this.initIndex + 1;
    this.itemLength = this.cardSlider.children.length;
    this.isMoving = false;

    this.defaultConfig = {
      infinite: true,
      duration: 300,
      animation: "cubic-bezier(0.240, -0.010, 0.400, 1.650)"
    };

    this.config = this.mergeConfig(config);

    // datas
    this.cardData = [];
    this.fetchData("../../data/localData.json");
  }

  fetchData(url) {
    myFetch(url)
      .then(data => {
        return this.makeCardHtml(data);
      })
      .then(cardHtml => {
        console.log(cardHtml);
      })
      .catch(err => console.log(err));
  }

  makeCardHtml(data) {
    return `
        ${data.reduce(
          (html, item) => `
          ${html}
        <div class="card">
        <div class="thumb">
          <img src="${item.imgUrl}" alt="card-thumbnail" />
        </div>
        <div class="content">
          <h2>${item.title}</h2>
          <ul>
            ${item.desc.reduce(
              (html, item) => `
              ${html}
              <li>${item}</li>
            `,
              ``
            )}
          </ul>
        </div>
      </div>
        `,
          ``
        )}
        `;
  }

  mergeConfig(config) {
    return Object.assign(this.defaultConfig, config);
  }

  setOpacity(el, val) {
    el.style.opacity = val;
  }

  init() {
    const cardWrapper = this.container.querySelector(".card-wrapper");

    cardWrapper.style.width = `${this.itemWidth}px`;
    this.attatchEvent();

    if (this.config.infinite) {
      this.cloneVirtualCard();
      this.moveWithoutTransition();
    } else {
      this.setTransition(this.cardSlider, true);
      this.isMovable();
    }

    this.setOpacity(this.container, 1);
  }

  cloneVirtualCard() {
    const firstCard = this.cardSlider.firstElementChild.cloneNode(true);
    const lastCard = this.cardSlider.lastElementChild.cloneNode(true);

    this.cardSlider.insertAdjacentElement("afterbegin", lastCard);
    this.cardSlider.insertAdjacentElement("beforeend", firstCard);
  }

  transitionEndHandler() {
    this.isMoving = false;
    if (this.isEndOfCards()) {
      if (this.config.infinite) this.moveWithoutTransition();
    }
  }

  prevHandler() {
    this.move({ getId: () => this.currentItem - 1 });
  }

  nextHandler() {
    this.move({ getId: () => this.currentItem + 1 });
  }

  attatchEvent() {
    this.prevButton.addEventListener("click", () => this.prevHandler());
    this.nextButton.addEventListener("click", () => this.nextHandler());

    this.cardSlider.addEventListener("transitionend", () =>
      this.transitionEndHandler()
    );
  }

  isMovable() {
    if (this.config.infinite) return;

    this.prevButton.disabled = this.isFirst();
    this.nextButton.disabled = this.isLast();
  }

  move({ getId }) {
    if (this.currentItem === getId()) return;
    if (this.isMoving) return;
    this.isMoving = true;

    const id = getId();
    const dist = this.config.infinite
      ? -(this.itemWidth * id)
      : -(this.itemWidth * (id - 1));
    this.currentItem = id;

    this.observer.notify("moveCarousel", this.makeSendId());
    this.isMovable();
    this.moveSlider(dist);
  }

  makeSendId() {
    let sendId;
    if (this.config.infinite && this.isFirst()) {
      sendId = this.itemLength;
    } else if (this.config.infinite && this.isLast()) {
      sendId = 1;
    } else {
      sendId = this.currentItem;
    }
    return sendId;
  }

  moveWithoutTransition() {
    this.setTransition(this.cardSlider, false);
    this.move({
      getId: () => (this.currentItem === 0 ? this.itemLength : 1)
    });
    setTimeout(() => {
      this.isMoving = false;
      this.setTransition(this.cardSlider, true);
    }, 0);
  }

  moveSlider(dist) {
    this.cardSlider.style.transform = `translateX(${dist}px)`;
  }

  isEndOfCards() {
    return this.isFirst() || this.isLast();
  }

  isFirst() {
    return this.config.infinite
      ? this.currentItem === 0
      : this.currentItem === 1;
  }

  isLast() {
    return this.config.infinite
      ? this.currentItem === this.itemLength + 1
      : this.currentItem === this.itemLength;
  }

  setTransition(el, val) {
    val
      ? (el.style.transition = `transform ${this.config.duration}ms ${
          this.config.animation
        }`)
      : (el.style.transition = `none`);
  }

  getChangingIndex() {
    return this.isFirst()
      ? { addIndex: this.itemLength - 1, removeIndex: this.currentItem }
      : { addIndex: 0, removeIndex: this.itemLength - 1 };
  }
}

export default Carousel;
