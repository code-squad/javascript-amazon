function Controller() {
  this.searchInput = $("#searchInput");
  this.autoList = $(".autoList");
  this.searchBackground = $(".searchBackground")
  this.searchModel = new SearchModel();
  this.autoListIndex = 0;
  this.validateInput = false;
  this.init();
}

Controller.prototype = {
  constrouctor: Controller,
  init() {
    this.inputHandler();
    this.eventHandler();
  },

  eventHandler() {
    this.searchBackground.addEventListener("click", this.searchBackgroundClickedEvent.bind(this))
    this.autoList.addEventListener("click", this.insertInputValueEvent.bind(this))
  },

  inputHandler() {
    this.searchInput.addEventListener("input", this.validationInput.bind(this));
    this.searchInput.addEventListener("keyup", this.inputKeyupEvent.bind(this));
    this.searchInput.addEventListener("keydown", this.inputKeydownEvent.bind(this));
    this.searchInput.addEventListener("keypress", this.searchInputEnterEvent.bind(this))
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
    if(e.keyCode !== ENTER || this.searchList.childElementCount === 0) return
    this.searchInput.value = $('.searchList .selected').innerText
    this.searchBackgroundClickedEvent()
  },

  validationInput(e) {
    let message = e.target.value;
    let pattern = /^[a-zA-Z]+$/;
    this.validateInput = message.length > 0 && pattern.test(message) === true;
    if (this.validateInput) {
      this.autoListIndex = 0
      this.searchBackground.style.visibility = 'visible';
      this.autoList.style.display = 'block';
      this.connectModel(message)
      this.autoList.scrollTop = 0
    } else {
      this.searchBackground.style.visibility = 'hidden';
      this.autoList.style.display = 'none';
      this.autoListIndex = 0
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

  inputKeyupEvent(e) { //  일단 작동은 됨, 로직이 엉망.. 다 구현 후 코드 정리
    if(e.keyCode !== KEYUP || this.searchList.childElementCount === 0) return
    if(!this.validateInput) return this.initScroll()

    this.searchList = $(".searchList")
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
    this.searchList = $(".searchList")
    if(e.keyCode !== KEYDOWN || this.searchList.childElementCount === 0) return
    if(!this.validateInput) return this.initScroll()
    
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

  selectClass(index, method) { // Prototype로 util에 만들어 놓기.. Array.prototype.addOrRemove = function(...){}
    if(method === 'add') {
      $(`li:nth-child(${index})`).classList.add('selected')
    } else if(method === 'remove') {
      $(`li:nth-child(${index})`).classList.remove('selected')
    } else {
      return
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
