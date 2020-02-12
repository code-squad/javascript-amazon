const addEvents = () => {
    const eventManager = new EventManager();
    eventManager.addEvents();
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
