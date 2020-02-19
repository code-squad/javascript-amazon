import EventManager from "./event-manager.js";
import Slider from "./slider.js";
import { $ } from "./util.js";


const addEvents = () => {
    const eventManager = new EventManager();
    eventManager.addEvents();
}

const constructHTML = async () => {
    const data = await Slider.getCardData();
    console.log("data is ", typeof data);
    const slider = new Slider(data);
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
