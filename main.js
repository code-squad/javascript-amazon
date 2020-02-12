const addEvents = () => {
    const headerEvent = new HeaderEvent();
    const sliderEvent = new SliderEvent();

    $$(".header-list").forEach(header => {
        headerEvent.addEvent(header, "click", headerEvent.selectBoxListener);
    })
    sliderEvent.addEvent($(".button2"), "click", sliderEvent.nextButtonListener.bind(sliderEvent));
    sliderEvent.addEvent($(".button1"), "click", sliderEvent.previousButtonListener.bind(sliderEvent));
    sliderEvent.addEvent($(".card-wrapper"), "transitionend", sliderEvent.transitionEndEvent.bind(sliderEvent));
}

const constructHTML = () => {
    const slider = new Slider(mockData);
    $("#slider").innerHTML = slider.render();
}

const init = () => {
    constructHTML();
    addEvents();
};

window.addEventListener("DOMContentLoaded", init);
