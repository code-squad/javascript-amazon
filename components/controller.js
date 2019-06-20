const controller = {
  regist(fn) {
    if (fn === undefined) return;
    this.handler = fn;
  },

  navigation: {
    handler: null,
    regist(fn) {
      controller.regist.call(this, fn);
    },
    sendId(id) {
      controller.carousel.receiveId(id);
    },
    receiveId(id) {
      if (this.handler === null) return;
      this.handler(id);
    }
  },

  carousel: {
    handler: null,
    regist(fn) {
      controller.regist.call(this, fn);
    },
    sendId(id) {
      controller.navigation.receiveId(id);
    },
    receiveId(id) {
      if (this.handler === null) return;
      this.handler({ getId: () => id });
    }
  }
};

export default controller;
