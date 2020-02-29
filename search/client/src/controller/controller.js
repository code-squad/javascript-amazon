function Controller({searchModel, searchInput, autoList, searchBackground}) {
  this.searchInput = searchInput
  this.autoList = autoList
  this.searchBackground = searchBackground
  this.searchModel = searchModel
  this.init();
}

Controller.prototype = {
  constrouctor: Controller,
  init() {
    this.inputHandler();
    this.eventHandler();
    this.autoListIndex = 0;
    this.validateInput = false;
  },

  eventHandler() {
    this.searchBackground.addEventListener("click", this.searchBackgroundClickedEvent.bind(this))
    this.autoList.addEventListener("click", this.insertInputValueEvent.bind(this))
  },

  inputHandler() {
    this.searchInput.addEventListener("input", this.validationInput.bind(this));
    this.searchInput.addEventListener("keydown", this.inputEvent.bind(this));
  },

  validationInput(e) {
    let message = e.target.value;
    let pattern = /^[a-zA-Z]+$/;
    this.validateInput = message.length > 0 && pattern.test(message) === true;
    this.initScroll()
    if (this.validateInput) {
      this.connectModel(message)
      this.searchBackground.style.visibility = 'visible';
      this.autoList.style.display = 'block';
    } else {
      this.searchBackground.style.visibility = 'hidden';
      this.autoList.style.display = 'none';
      this.validateInput = false
    }
  },

  connectModel(message) {
    (async () => {
      try {
        await this.searchModel.fetchData(message);
        new autoCompleteView(this.searchModel.matchingItem, message);
      } catch (err) {
        console.log(err);
      }
    })();
  },

  inputEvent(e) {
    this.searchList = $(".searchList")
    const { keyCode } = e
    switch(keyCode) {
      case ENTER :
        this.searchInputEnterEvent()
        break;
      case KEYUP :
        this.inputKeyupEvent()
        break
      case KEYDOWN :
        this.inputKeydownEvent()
        break 
    }
  },

  searchBackgroundClickedEvent() {
    this.autoList.style.display = 'none';
    this.searchBackground.style.visibility = 'hidden';
  },

  insertInputValueEvent(e) {
    this.searchInput.value = e.target.innerText
    this.searchBackgroundClickedEvent()
  },

  searchInputEnterEvent(e) {
    this.searchInput.value = $('.searchList .selected').innerText
    this.searchBackgroundClickedEvent()
  },

  inputKeyupEvent() { //  일단 작동은 됨, 로직이 엉망.. 다 구현 후 코드 정리
    if(this.searchList.childElementCount === 0) return
    if(this.autoListIndex === 0) {
      this.autoListIndex = this.searchList.childElementCount
      this.autoList.scrollTop = this.autoList.scrollHeight
      this.selectClass(this.autoListIndex, 'add')
    } else if (this.autoListIndex > 1 && this.autoListIndex <= this.searchList.childElementCount) {
      this.autoListIndex--
      this.selectClass(this.autoListIndex+1, 'remove')
      this.selectClass(this.autoListIndex, 'add')
      this.scrollDownControl()
    } else if (this.autoListIndex === 1) {
      this.autoListIndex--
      this.selectClass(this.autoListIndex+1, 'remove')
      this.scrollDownControl()
    }
  },

  inputKeydownEvent(e) { //  일단 작동은 됨, 로직이 엉망.. 다 구현 후 코드 정리
    if(this.searchList.childElementCount === 0) return
    if(this.autoListIndex === 0) {
      this.autoListIndex++
      this.selectClass(this.autoListIndex, 'add')
    } else if (this.autoListIndex > 0 && this.autoListIndex < this.searchList.childElementCount) {
      this.autoListIndex++
      this.selectClass(this.autoListIndex-1, 'remove')
      this.selectClass(this.autoListIndex, 'add')
      this.scrollUpControl()
    } else if (this.autoListIndex === this.searchList.childElementCount) {
      this.selectClass(this.autoListIndex, 'remove')
      this.autoListIndex = 0
      this.autoList.scrollTop = 0
    }
  },

  selectClass(index, method) {
    switch(method) {
      case 'add' :
        $(`li:nth-child(${index})`).classList.add('selected');
        break;
      case 'remove' :
        $(`li:nth-child(${index})`).classList.remove('selected')
      default:
        break;
    }
  },
  
  scrollUpControl() {
    this.autoList.scrollTop += 18 // 일단 구현부터...
  },

  scrollDownControl() {
    this.autoList.scrollTop -= 18 // 일단 구현부터...
  },
  
  initScroll() {
    this.autoListIndex = 0,
    this.autoList.scrollTop = 0
  }
};
