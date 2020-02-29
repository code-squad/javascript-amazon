function Controller({searchModel, searchInput, autoList, searchBackground}) {
  this.searchInput = searchInput;
  this.autoList = autoList;
  this.searchBackground = searchBackground;
  this.searchModel = searchModel;
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
    this.searchBackground.addEventListener("click", this.searchBackgroundClickedEvent.bind(this));
    this.autoList.addEventListener("click", this.insertInputValueEvent.bind(this));
  },

  inputHandler() {
    this.searchInput.addEventListener("input", this.validationInput.bind(this));
    this.searchInput.addEventListener("keydown", this.inputEvent.bind(this));
  },

  inputEvent(e) {
    this.searchList = $(".searchList");
    const { keyCode } = e;
    switch(keyCode) {
      case ENTER :
        this.searchInputEnterEvent();
        break;
      case KEYUP :
        this.inputKeyupEvent();
        e.preventDefault();
        break;
      case KEYDOWN :
        this.inputKeydownEvent();
        e.preventDefault();
        break;
    }
  },

  validationInput(e) {
    const { target: { value } } = e;
    let pattern = /^[a-zA-Z]+$/;
    this.validateInput = value.length > 0 && pattern.test(value) === true;
    this.initScroll();
    if (this.validateInput) {
      this.connectModel(value)
      this.searchBackground.style.visibility = 'visible';
      this.autoList.style.display = 'block';
    } else {
      this.searchBackgroundClickedEvent();
      this.validateInput = false;
    }
  },

  connectModel(value) {
    (async () => {
      try {
        await this.searchModel.fetchData(value);
        new autoCompleteView(this.searchModel.matchingItem, value);
      } catch (err) {
        console.log(err);
      }
    })();
  },

  searchBackgroundClickedEvent() {
    this.autoList.style.display = 'none';
    this.searchBackground.style.visibility = 'hidden';
  },

  insertInputValueEvent(e) {
    const {target: { innerText } } = e;
    this.searchInput.value = innerText;
    this.searchBackgroundClickedEvent();
  },

  searchInputEnterEvent() {
    this.searchInput.value = $('.searchList .selected').innerText;
    this.searchBackgroundClickedEvent();
  },

  inputKeyupEvent() {
    if(this.searchList.childElementCount === 0) return;
    if (this.autoListIndex > 1 && this.autoListIndex <= this.searchList.childElementCount) {
      this.selectClass(this.autoListIndex, 'remove');
      this.selectClass(this.autoListIndex-1, 'add');
      this.scrollDownControl();
    } else if (this.autoListIndex === 1) {
      this.selectClass(this.autoListIndex, 'remove');
    }
    this.decreaseAutoListIndex();
  },

  decreaseAutoListIndex() {
    this.autoListIndex--;
    if(this.autoListIndex < 1) {
      this.endScroll();
      this.selectClass(this.autoListIndex, 'add');
    }
  },

  inputKeydownEvent() {
    if(this.searchList.childElementCount === 0) return;
    if(this.autoListIndex === 0) {
      this.selectClass(this.autoListIndex+1, 'add');
    } else if (this.autoListIndex > 0 && this.autoListIndex < this.searchList.childElementCount) {
      this.selectClass(this.autoListIndex, 'remove');
      this.selectClass(this.autoListIndex+1, 'add');
      this.scrollUpControl();
    } else if (this.autoListIndex === this.searchList.childElementCount) {
      this.selectClass(this.autoListIndex, 'remove');
    }
    this.increaseAutoListIndex() 
  },

  increaseAutoListIndex() {
    this.autoListIndex++;
    if(this.autoListIndex > this.searchList.childElementCount) this.initScroll();
  },

  selectClass(index, method) {
    switch(method) {
      case 'add' :
        $(`li:nth-child(${index})`).classList.add('selected');
        break;
      case 'remove' :
        $(`li:nth-child(${index})`).classList.remove('selected');
      default:
        break;
    }
  },
  
  scrollUpControl() {
    this.autoList.scrollTop += SCROLLUPNUM;
  },

  scrollDownControl() {
    this.autoList.scrollTop -= SCROLLDOWNNUM;
  },
  
  initScroll() {
    this.autoListIndex = 0;
    this.autoList.scrollTop = 0;
  },

  endScroll() {
    this.autoListIndex = this.searchList.childElementCount;
    this.autoList.scrollTop = this.autoList.scrollHeight;
  }
};
