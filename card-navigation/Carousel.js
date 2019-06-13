class Carousel {
  constructor(el, option) {
    this.el = document.querySelector(el);
    this.cover = this.el.children[0];
    this.items = this.cover.children;
    this.item = this.items[0];
    this.option = Carousel.mergeOption(option);
    this.prevBtn = document.querySelector(this.option.prevBtn);
    this.nextBtn = document.querySelector(this.option.nextBtn);
    this.itemWidth = this.item.offsetWidth;
    this.itemHeight = this.item.offsetHeight;
    this.offset = 0;
    this.current = 0;

    this.init();
  }
  
  static mergeOption(option) {
    const default_option = {
      gap: 10,
      prevBtn: ".btn_prev",
      nextBtn: ".btn_next",
      animate: true,
      easing: "ease-in-out",
      duration: "500",
      infinite: false
    };
    return { ...default_option, ...option };
  }

  init() {
    
  }
}

const carousel = new Carousel(".benefit-content", {
  infinite: false,
  prevBtn: ".arrow-left",
  nextBtn: ".arrow-right"
});