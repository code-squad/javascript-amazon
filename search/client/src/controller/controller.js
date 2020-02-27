function Controller() {
  this.searchInput = $("#searchInput");
  this.autoList = $(".autoList");
  this.searchModel = new SearchModel();
  this.autoListIndex = 0;
  this.init();
}

Controller.prototype = {
  constrouctor: Controller,
  init() {
    this.inputHandler();
  },

  inputHandler() {
    this.searchInput.addEventListener("input", this.validationInput.bind(this));
    this.searchInput.addEventListener("keyup", this.inputKeyupEvent.bind(this));
    this.searchInput.addEventListener("keydown", this.inputKeydownEvent.bind(this));
  },

  validationInput(e) {
    let message = e.target.value;
    let pattern = /^[a-zA-Z]+$/;
    this.validateInput = message.length > 0 && pattern.test(message) === true;
    if (this.validateInput) {
      this.autoList.style.display = 'block';
      this.connectModel(message)
    } else {
      this.autoList.style.display = 'none';
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

  inputKeyupEvent(e) {
    this.searchList = $(".searchList")

    if(e.keyCode !== KEYUP) return
    
  },

  inputKeydownEvent(e) { //  일단 작동은 됨, 로직이 엉망.. 다 구현 후 코드 정리
    this.searchList = $(".searchList")

    if(e.keyCode !== KEYDOWN) return
    if(this.autoListIndex === 0) {
      this.autoListIndex++
      this.selectClass(this.autoListIndex, 'add')
    } else if (this.autoListIndex > 0 && this.autoListIndex < this.searchList.childElementCount) {
      this.autoListIndex++
      this.selectClass(this.autoListIndex, 'add')
      this.selectClass(this.autoListIndex-1, 'remove')
      this.scrollControl()
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
  
  scrollControl() {
    this.autoList.scrollTop += 18 // 일단 구현부터...
  }
  
};
