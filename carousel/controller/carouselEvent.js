import {$, $$} from '../utlis.js'

class CarouselEvent {
  constructor() {
    this.menuBtn = $$(".nav-container li")
    this.dirBtn = $$("#slide button")
    this.contentArea = $(".contents")
    this.ListArea = $(".contents li")
    this.STARTINDEX = 1
    this.init()
  }

  init() {
    this.cloneEl()
    this.setCss(this.STARTINDEX)
    this.onEvent()
    this.isTransition = false
  }

  onEvent() {
    this.addMenuEvent(this.menuBtn)
    this.addButtonEvent(this.dirBtn)
    this.contentEvent(this.contentArea)
  }

  cloneEl() {
    const firstChild = this.contentArea.firstChild
    const lastChild = this.contentArea.lastChild
    const firstClone = firstChild.cloneNode(true)
    const lastClone = lastChild.cloneNode(true)
    this.contentArea.appendChild(firstClone).classList.add('cloned')
    this.contentArea.insertBefore(lastClone, firstChild).classList.add('cloned')
  }

  setCss(index) {
    this.menuBtn[index - 1].classList.add("selected")
    const listCount = this.contentArea.childElementCount
    const offsetWidth = listCount * this.ListArea.offsetWidth;
    this.contentArea.style.width = offsetWidth+'px'
    this.contentArea.style.marginLeft = -(this.ListArea.offsetWidth)+'px'
    this.currentIndex = index
  }

  addMenuEvent(directBtn) {
    directBtn.forEach((target, index) => {
      target.addEventListener('click', () => {
        this.menuHandler(index);
      })
    })
  }

  menuHandler(index) {
    if(this.isTransition) return
    this.setCurrentIndex(index + 1)
  }

  addButtonEvent(el) {
    el.forEach((el, index) => {
      el.addEventListener('click', () => {
        this.btnHandler(index)
      })
    })
  }

  btnHandler(index) {
    if(this.isTransition) return
    index === 0 ? this.decreaseIndex() : this.increaseIndex();
  }

  increaseIndex() {
    this.currentIndex < this.menuBtn.length + 1 ?
      this.setCurrentIndex(this.currentIndex + 1) :
      this.setCurrentIndex(0)
  }

  decreaseIndex() {
    this.currentIndex > 0 ? 
      this.setCurrentIndex(this.currentIndex - 1) :
      this.setCurrentIndex(this.menuBtn.length - 1)
  }

  setCurrentIndex(index) {
    if(this.isTransition || this.currentIndex === index) return
    this.isTransition = true
    this.selectMeun(this.currentIndex, index)
    this.setContentArea(index)
    this.currentIndex = this.convertIndex(this.menuBtn.length, index)
  }

  selectMeun(currentIndex, index) {
    let nextIndex = this.convertIndex(this.menuBtn.length, index)
    this.menuBtn[currentIndex - 1].classList.remove('selected')
    this.menuBtn[nextIndex - 1].classList.add('selected')
  }

  setContentArea(index) {
    this.contentArea.style.transition = "margin-left 1s";
    const offsetWidth = -((index) * this.ListArea.offsetWidth)
    this.contentArea.style.marginLeft = offsetWidth + 'px';
  }

  convertIndex(menuLength, index) {
    let convertedIndex = 0;
    if (menuLength < index) { convertedIndex = 1; }
    else if (1 > index) { convertedIndex = this.menuBtn.length; }
    else { convertedIndex = index; }
    return convertedIndex;
  }

  contentEvent(el) {
    el.addEventListener('transitionend', () => {
      this.transitionEnd()
    })
  }

  transitionEnd() {
    this.isTransition = false
    this.contentArea.style.transition = 'none'
    this.contentArea.style.marginLeft = -(this.currentIndex * this.ListArea.offsetWidth) + 'px'
  }
}

export default CarouselEvent