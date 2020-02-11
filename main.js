const init = () => {
    const slider = new Slider(mockData);
    const sliderEvent = new SliderEvent();
    $("#slider").innerHTML = slider.render();
    $$(".header-list").forEach(header => {
        sliderEvent.addEvent(header, sliderEvent.selectBoxListener);
    })
};

window.addEventListener("DOMContentLoaded", init);
