import EventManager from "./event-manager.js";
import Slider from "./slider.js";
import { $ } from "./util.js";


const addEvents = () => {
    const eventManager = new EventManager();
    eventManager.addEvents();
}

const constructHTML = async () => {
    const slider = new Slider();
    if (!slider.doesCardDataExist()) {
        const cardData = await slider.fetchCardData();
        slider.setCardData(cardData);
    }
    $("#slider").innerHTML = slider.render();
}

const initializeSettings = () => {
    const firstHeader = $(".header-list");
    firstHeader.classList.add("header-selected");
    firstHeader.querySelector(".circles").classList.remove("invisible");
    firstHeader.querySelector(".dot").classList.add("selected-dot");
}

const init = async () => {
    await constructHTML();
    addEvents();
    initializeSettings();
};

window.addEventListener("DOMContentLoaded", init);
