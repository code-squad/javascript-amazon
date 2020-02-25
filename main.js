import SlideService from './Slide/SlideService.js';

window.addEventListener('DOMContentLoaded', () => {
    const url = 'http://127.0.0.1:8080';
    const slideService = new SlideService(url);
});