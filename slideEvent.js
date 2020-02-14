class SlideEvent {
  constructor() {
    this.menuBtn = $$(".nav-container li")
    this.dirBtn = $$("#slide button")
    this.contentArea = $(".contents")
    this.ListArea = $(".contents li")
    this.slideStart()
  }

  slideStart() {
    this.cloneEl()
    this.init(1)
    this.menuAddEvnet(this.menuBtn)
    this.btnAddEvent(this.dirBtn)
    this.contentEvent(this.contentArea)
    this.isTransition = false
  }

  cloneEl() {
    const firstChild = this.contentArea.firstChild
    const lastChild = this.contentArea.lastChild
    const firstClone = firstChild.cloneNode(true)
    const lastClone = lastChild.cloneNode(true)
    this.contentArea.appendChild(firstClone).classList.add('cloned')
    this.contentArea.insertBefore(lastClone, this.contentArea.firstElementChild).classList.add('cloned')
  }

  init(index) {
    this.menuBtn[index - 1].classList.add("selected")
    const listCount = this.contentArea.childElementCount
    const offsetWidth = listCount * this.ListArea.offsetWidth;
    this.contentArea.style.width = offsetWidth+'px'
    this.contentArea.style.marginLeft = -(this.ListArea.offsetWidth)+'px'
    this.currentIndex = index
  }

  menuAddEvnet(el) {
    el.forEach((el, index) => {
      el.addEventListener('click', () => {
        this.menuHandler(index);
      })
    })
  }

  menuHandler(index) {
    if(this.isTransition) return
    this.setCurrentIndex(index + 1)
  }

  btnAddEvent(el) {
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
    else if (1 > index) { convertedIndex = 4; }
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

export default SlideEvent