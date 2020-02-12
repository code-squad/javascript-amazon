const init = () => {
    const slider = new Slider(mockData);
    $("#slider").innerHTML = slider.render();
    slider.attachEvent();
};

window.addEventListener("DOMContentLoaded", init);
