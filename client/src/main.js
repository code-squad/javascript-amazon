import EventManager from "./event/event-manager.js";
import Slider from "./view/slider.js";

import SearchBar from "./view/search_bar/search_bar.js";
import SearchList from "./view/search_bar/search_list.js";

import { $ } from "./util/util.js";


const addEvents = () => {
    const eventManager = new EventManager();
    eventManager.addEvents();
}

const renderHTML = async () => {
    const searchList = new SearchList();
    const searchBar = new SearchBar(searchList);
    const slider = new Slider();
    let cards = window.localStorage.getItem('cards');
    if (!cards) {
        const cardData = await slider.fetchCardData();
        window.localStorage.setItem("cards", JSON.stringify(cardData));
        cards = cardData;
        slider.setCardData(cards);
        $("#slider").innerHTML = slider.render();
        return;
    }
    slider.setCardData(JSON.parse(cards));
    $("#slider").innerHTML = slider.render();
    $("#search-bar").innerHTML = searchBar.render();
    searchBar.addInputEvent();
}

const initializeSettings = () => {
    const firstHeader = $(".header-list");
    firstHeader.classList.add("header-selected");
    firstHeader.querySelector(".circles").classList.remove("invisible");
    firstHeader.querySelector(".dot").classList.add("selected-dot");
}

const init = async () => {
    await renderHTML();
    addEvents();
    initializeSettings();
};

window.addEventListener("DOMContentLoaded", init);
