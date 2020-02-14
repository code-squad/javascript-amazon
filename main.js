const addEvents = () => {
    const eventManager = new EventManager();
    eventManager.addEvents();
}

const constructHTML = () => {
    const slider = new Slider(mockData);
    $("#slider").innerHTML = slider.render();
}

const initializeSettings = () => {
    const firstHeader = $(".header-list");
    firstHeader.classList.add("header-selected");
    firstHeader.querySelector(".circles").classList.remove("invisible");
    firstHeader.querySelector(".dot").classList.add("selected-dot");
}

const init = () => {
    constructHTML();
    addEvents();
    initializeSettings();
};

window.addEventListener("DOMContentLoaded", init);
