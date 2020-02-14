import MockData from './mockData.js'
import {appendMenuData, appendContentsData} from './MockDataAppender.js';
import SlideService from './SlideService.js';
import DirectionButtonManager from './DirectionButtonManager.js';
import MenuButtonManager from './MenuButtonManager.js';

window.addEventListener('DOMContentLoaded', () => {
    appendMenuData(MockData.mockData_Menu);
    appendContentsData(MockData.mockData_Contents);

    const topElements = document.querySelector("#top");
    const bottomElements = document.querySelector("#bottom");
    const contentArea = document.querySelector("#content");

    const slideService = new SlideService(contentArea);

    const menuButtons = topElements.querySelectorAll('button');
    const directionButtons = bottomElements.querySelectorAll('button');

    const menuButtonManager = new MenuButtonManager(slideService, menuButtons);
    const directionButtonManager = new DirectionButtonManager(slideService, directionButtons);

    slideService.registerComponent(menuButtonManager);
    slideService.registerComponent(directionButtonManager);
});