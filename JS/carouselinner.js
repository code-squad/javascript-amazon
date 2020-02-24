import carouselData from "./carouseldata.js";
import library from "./library.js";

class CarouselDataControlloer {
  constructor(carouselSlide) {
    this.carouselSlide = carouselSlide;
  }

  createElement() {
    const item = library.createElement("div");
    const itemImg = library.createElement("div");
    const img = library.createElement("img");
    const itemText = library.createElement("div");
    const itemTextTitle = library.createElement("h1");

    return { item, itemImg, img, itemText, itemTextTitle };
  }

  innerAttribute(element, data) {
    element.item.className = data.className;
    element.itemImg.className = "item_img";
    element.itemText.className = "item_text";

    element.img.src = data.img;

    element.itemTextTitle.innerText = data.title;
  }

  InsertElement(element) {
    element.itemImg.appendChild(element.img);
    element.itemText.appendChild(element.itemTextTitle);
    element.item.appendChild(element.itemImg);
    element.item.appendChild(element.itemText);
    this.carouselSlide.appendChild(element.item);
  }

  CalculationCarouselSlideWidth() {
    const itemList = library.$$(".item");

    const getdisappearPx = 2;

    const itemWidth = itemList[0].clientWidth + getdisappearPx;

    console.log(itemWidth);
    this.carouselSlide.style.width = `${itemWidth * itemList.length}px`;
    this.carouselSlide.style.transform = `translateX(${-itemWidth}px)`;
  }

  copyingItem() {
    const getItems = library.$$(".item");
    let firstIndex = 0;
    let lastIndex = getItems.length - 1;

    const firstCloneNode = getItems[firstIndex].cloneNode(true);
    const lastCloneNode = getItems[lastIndex].cloneNode(true);

    firstCloneNode.id = "last";
    lastCloneNode.id = "first";

    getItems[firstIndex].before(lastCloneNode);
    getItems[lastIndex].after(firstCloneNode);
  }

  generateItemList() {
    const database = carouselData;

    database.forEach(el => {
      const elements = this.createElement();

      this.innerAttribute(elements, el);
      this.InsertElement(elements);
      el.content.forEach(el => {
        const createLi = library.createElement("li");
        createLi.innerText = el;
        elements.itemText.appendChild(createLi);
      });
    });

    this.copyingItem();
    this.CalculationCarouselSlideWidth();
  }

  render() {
    this.generateItemList();
  }
}

export default CarouselDataControlloer;
