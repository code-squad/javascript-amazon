import HeaderEvent from "./header-event.js";
import SliderEvent from "./slider-event.js";
import { $, $$ } from "../util/util.js";

class EventManager {
    constructor() {
        this.isEventEnded = {
            ended: true
        };
        this.headerEvent = new HeaderEvent(this.isEventEnded);
        this.sliderEvent = new SliderEvent(this.isEventEnded);
    }

    addEvents() {
        $$(".header-list").forEach(header => {
            this.headerEvent.addEvent(header, "click", this.headerEvent.selectBoxListener.bind(this.headerEvent));
        })
        $$(".dot").forEach(dot => {
            this.sliderEvent.addEvent(dot, "click", this.sliderEvent.dotEventListener.bind(this.sliderEvent));
        })
        this.sliderEvent.addEvent($(".button2"), "click", this.sliderEvent.nextButtonListener.bind(this.sliderEvent));
        this.sliderEvent.addEvent($(".button1"), "click", this.sliderEvent.previousButtonListener.bind(this.sliderEvent));
        this.sliderEvent.addEvent($(".card-wrapper"), "transitionend", this.sliderEvent.transitionEndEvent.bind(this.sliderEvent));
    }
}

export default EventManager;