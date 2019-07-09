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
        <div class="card">
        <div class="thumb">
          <img src="${item.imgUrl}" alt="card-thumbnail" />
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

  render(data) {
    const carouselItemHtml = this.makeCarouselItemHtml(data);

    const carouselTemplate = `
    <div class="item-wrapper">
      <div class="item-slider">${carouselItemHtml}</div>
    </div>
    <button class="item-control prev"><</button>
    <button class="item-control next">></button>
    `;

    this.carousel.innerHTML = carouselTemplate;
  }
}
