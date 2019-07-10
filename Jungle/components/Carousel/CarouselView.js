import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";

export default class CarouselView extends MyEventEmitter {
  constructor({ carouselElement }) {
    super();

    this.carousel = carouselElement;
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
    this.attachEvent();
  }

  attachEvent() {
    this.prevBtn = this.carousel.querySelector(".prev");
    this.nextBtn = this.carousel.querySelector(".next");

    this.prevBtn.addEventListener("click", () => {
      this.emit("prev");
    });

    this.nextBtn.addEventListener("click", () => {
      this.emit("next");
    });
  }
}
