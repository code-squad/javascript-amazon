class EventManager{
    constructor() {
        this.headerEvent = new HeaderEvent();
        this.sliderEvent = new SliderEvent();
    }

    addEvents() {
        $$(".header-list").forEach(header => {
            this.headerEvent.addEvent(header, "click", this.headerEvent.selectBoxListener);
        })
        $$(".dot").forEach(dot => {
            this.headerEvent.addEvent(dot, "click", this.sliderEvent.dotEventListener.bind(this.sliderEvent));
        })
        this.sliderEvent.addEvent($(".button2"), "click", this.sliderEvent.nextButtonListener.bind(this.sliderEvent));
        this.sliderEvent.addEvent($(".button1"), "click", this.sliderEvent.previousButtonListener.bind(this.sliderEvent));
        this.sliderEvent.addEvent($(".card-wrapper"), "transitionend", this.sliderEvent.transitionEndEvent.bind(this.sliderEvent));
    
    }
}