import util from "./util.js";

const carouselSlide = util.$(".carousel_slide");

class CarouselElement {
  constructor(carouselSlide) {
    this.carouselSlide = carouselSlide;
  }

  createCarouselElement() {
    const item = util.createElement("div");
    const itemImg = util.createElement("div");
    const img = util.createElement("img");
    const itemText = util.createElement("div");
    const itemTextTitle = util.createElement("h1");

    return { item, itemImg, img, itemText, itemTextTitle };
  }

  settingElementProperty(carouselElement, carouselData) {
    carouselElement.item.className = carouselData.className;
    carouselElement.itemImg.className = "item_img";
    carouselElement.itemText.className = "item_text";

    carouselElement.img.src = carouselData.img;

    carouselElement.itemTextTitle.innerText = carouselData.title;
  }

  attachElement(carouselElement) {
    carouselElement.itemImg.appendChild(carouselElement.img);
    carouselElement.itemText.appendChild(carouselElement.itemTextTitle);
    carouselElement.item.appendChild(carouselElement.itemImg);
    carouselElement.item.appendChild(carouselElement.itemText);
    this.carouselSlide.appendChild(carouselElement.item);
  }

  calculateCarouselSlideWidth() {
    const carouselItems = util.$$(".item");
    console.log(carouselItems);

    const getdisappearPx = 2;

    const itemWidth = carouselItems[0].clientWidth + getdisappearPx;

    this.carouselSlide.style.width = `${itemWidth * carouselItems.length}px`;

    this.carouselSlide.style.transform = `translateX(${-itemWidth}px)`;
  }

  cloneCarouselItem() {
    const carouselItems = util.$$(".item");

    const firstIndex = 0;
    const lastIndex = carouselItems.length - 1;

    const firstCloneNode = carouselItems[firstIndex].cloneNode(true);
    const lastCloneNode = carouselItems[lastIndex].cloneNode(true);

    firstCloneNode.id = "last";
    lastCloneNode.id = "first";

    carouselItems[firstIndex].before(lastCloneNode);
    carouselItems[lastIndex].after(firstCloneNode);
  }

  renderItems(localData) {
    localData.carouselData.forEach(el => {
      const carouselElement = this.createCarouselElement();

      this.settingElementProperty(carouselElement, el);
      this.attachElement(carouselElement);
      el.content.forEach(el => {
        const createLi = util.createElement("li");
        createLi.innerText = el;
        carouselElement.itemText.appendChild(createLi);
      });
    });
    this.cloneCarouselItem();
    this.calculateCarouselSlideWidth();
  }

  fetch(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.renderItems(data);
      });
  }
  render() {
    this.fetch("http://localhost:8080/JSON/localData.json");
  }
}

const test = new CarouselElement(carouselSlide);
test.render();
