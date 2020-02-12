const init = () => {
    const slider = new Slider(mockData);
    $("#slider").innerHTML = slider.render();
    slider.bindEvent();
};

window.addEventListener("DOMContentLoaded", init);
