class Carousel {
  constructor({ leftBtn, rightBtn, cardList, animationTime }) {
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.cardList = cardList;
    this.animationTime = animationTime;
  }

  makeRotateNumb(number) {
    return number % this.cardList.childElementCount;
  }

  addStyleToItem(currentIndex, i, animationTime) {
    const convertedIndex = currentIndex + this.makeRotateNumb(i + (this.cardList.childElementCount - 1));
    const currentItem = this.cardList.children[this.makeRotateNumb(convertedIndex)]
    currentItem.style.transform = `translateX(${-150 + i * 100}%)`;
    currentItem.style.transition = `all ${animationTime/1000}s linear`;
    currentItem.style.opacity = i === 1 ? "1" : "0";
  }

  drawCardPosition(currentIndex,animationTime) {
    for (let i = 0; i < this.cardList.childElementCount; i++) {
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
