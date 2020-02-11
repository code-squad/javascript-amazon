const init = () => {
    const slider = new Slider(mockData);
    $("#slider").innerHTML = slider.render();
};

window.addEventListener("DOMContentLoaded", init);
