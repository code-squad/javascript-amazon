const controller = {
  navigation: {
    handler: null,
    regist(fn) {
      if(fn === undefined) return;
      this.handler = fn;
    },
    sendId(id) {
      console.log(id);
      controller.carousel.receiveId(id);
    },
    receiveId(id) {
      if(this.handler === null) return;
      this.handler(id);
    }
  },

  carousel: {
    handler: null,
    regist(fn) {
      if(fn === undefined) return;
      this.handler = fn;
    },
    sendId(id) {
      console.log(id);
      controller.navigation.receiveId(id);
    },
    receiveId(id) {
      if(this.handler === null) return;
      this.handler({getId:() => id});
    }
  }
}

export default controller;