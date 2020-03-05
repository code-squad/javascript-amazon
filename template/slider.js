export class SliderTemplate {
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
                 </li>`
            return items;
        }, '')

        const sliderContent = `
           <div class="slider__container">
              <ul class="slider__list">${sliderItems}</ul>
           </div>`

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
           </div>`
    }
}
