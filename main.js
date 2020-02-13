import MockData from './mockData.js'
import {appendMenuData, appendContentsData} from './MockDataAppender.js';
import SlideService from './SlideService.js';

window.addEventListener('DOMContentLoaded', () => {
    appendMenuData(MockData.mockData_Menu);
    appendContentsData(MockData.mockData_Contents);

    const topElements = document.querySelector("#top");
    const bottomElements = document.querySelector("#bottom");

    const sliderService = new SlideService({
        topElements: topElements,
        bottomElements: bottomElements 
    });
});