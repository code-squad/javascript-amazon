
class Carousel {
  constructor({ leftBtn, rightBtn, cardList, animationTime, contentsData  }) {
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.cardList = cardList;
    this.animationTime = animationTime;
    this.contentsData = contentsData;
  }

  makeTemplate(){
    const contentsTemplate = this.contentsData.reduce((contentsTemplate,card)=>{
      const liTemplate = `
      <li class="item contents__item">
      <div class="item__img-container">
          <img src=${card.imgAddress} alt="membership-card.png" />
      </div>
      <div class="desc item__desc">
          <h3 class="desc__title">${card.title}</h3>
          <ul class="desc__text">
          ${card.desc.reduce((accum,cur)=>{
            return accum += `<li>${cur}</li>`
          },``)}</ul>
      </div>
  </li>
      `
      return contentsTemplate += liTemplate
  },`<ol>`);
  this.cardList.insertAdjacentHTML('afterbegin',contentsTemplate.concat('</ol>'));

  }

  makeRotateNumb(number) {
    const countOfCards = this.cardList.firstElementChild.childElementCount
    return number % countOfCards;
  }

  addStyleToItem(currentIndex, i, animationTime) {
    const countOfCards = this.cardList.firstElementChild.childElementCount
    const convertedIndex = currentIndex + this.makeRotateNumb(i + (countOfCards - 1));
    const currentItem = this.cardList.firstElementChild.children[this.makeRotateNumb(convertedIndex)]
    currentItem.style.transform = `translateX(${-150 + i * 100}%)`;
    currentItem.style.transition = `all ${animationTime/1000}s linear`;
    currentItem.style.opacity = i === 1 ? "1" : "0";
  }

  drawCardPosition(currentIndex,animationTime) {
    const countOfCards = this.cardList.firstElementChild.childElementCount
    for (let i = 0; i < countOfCards; i++) {
      this.addStyleToItem(currentIndex, i, animationTime);
    }
  }

  transformCard(currIdx, prevIdx) {
    const direction = currIdx > prevIdx;
    const operation = (a, b, _direction) => {
      return _direction ? a + b : a - b;
    }
    const delta = Math.abs(currIdx - prevIdx);

    const drawCardPositionAsync = async (actions, duration) => {
      const timeSlot = duration / actions.length;
      for (let i = 0; i < actions.length; i += 1) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            actions[i](timeSlot);
            resolve();
          }, timeSlot);
        });
      }
    }
    
    const actions = [];
    for (let i = 1; i <= delta; i++) {
      actions.push((timeSlot) => {
        const nextIdx = operation(prevIdx, i, direction);
        this.drawCardPosition(nextIdx, timeSlot);
      });
    }
    drawCardPositionAsync(actions, this.animationTime);
  }

}

export default Carousel;
