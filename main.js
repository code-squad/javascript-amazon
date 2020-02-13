const init = () => {
    const slider = new Slider(mockData);
    $("#slider").innerHTML = slider.render();
    slider.bindEventListener();
};

window.addEventListener("DOMContentLoaded", init);
