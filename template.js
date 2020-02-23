class TemplateManager {
    constructor({ carouselData, templateOption }) {
        this.dataArea = $(templateOption.DATA_AREA);
        this.cardMenuData = new CardMunuTemplate(carouselData.menuData);
        this.sliderData = new SliderTemplate(carouselData.contentData);
    }

    init() {
        let data = '';
        data += this.cardMenuData.render();
        data += this.sliderData.render();
        this.dataArea.innerHTML += data;
    }
}

class CardMunuTemplate {
    constructor(menuData) {
        this.menuData = menuData;
    }

    addSelectedClassName(index) {
        return index === 0 ? `card-menu__selected` : ``;
    }

    render() {
        const menuList = this.menuData.reduce((cards, title, index) => {
            cards += `
                 <li class="card-menu__card ${this.addSelectedClassName(index)}">
                    <button class="carousel__bg-color${index + 1}">
                        <span class="card__title">${title}</span>
                     </button>
                  </li>`;
            return cards;
        }, '')

        return `<div id="card-menu"><ul class="card-menu__list">${menuList}</ul></div>`;
    }
}

class SliderTemplate {
    constructor(contentData) {
        this.contentData = contentData;
    }

    render() {
        const sliderItems = this.contentData.reduce((items, content, index) => {
            items += `
                 <li class="slider__item">
                     <div class="slider__img-area">
                         <img src="${content.imgUrl}" alt="언어 로고" />
                     </div>
                     <div class="slider__content">
                         <span class="slider__titleBox carousel__bg-color${index + 1}">
                             ${content.titleBox}
                         </span>
                         <h2>${content.title}</h2>
                         <p>${content.content}</p>
                     </div>
                 </li>`;
            return items;
        }, '')

        const sliderContent = `
           <div class="slider__container">
              <ul class="slider__list">${sliderItems}</ul>
           </div>`;

        return this.appendSliderBtn(sliderContent);
    }

    appendSliderBtn(sliderContent) {
        return `
           <div id="slider">
               ${sliderContent}
               <div id="slider__btn">
                 <button class="slider__previous-btn"><i class="fas fa-chevron-left">
                   <span class="blind">이전</span></i></button>
                 <button class="slider__next-btn"><i class="fas fa-chevron-right">
                   <span class="blind">다음</span></i></button>
               </div>
           </div>`;
    }
}



// const appendCarouselData = (carouselData) => {
//     const DATA_AREA = '#carousel-wrap';
//     const carouselDataArea = $(DATA_AREA);

//     const cardMenuData = new CardMunuTemplate(carouselData.menuData);
//     const sliderContentsData = new SliderTemplate(carouselData.contentData);

//     let data = '';
//     data += cardMenuData.render();
//     data += sliderContentsData.render();
//     carouselDataArea.innerHTML += data;
// }