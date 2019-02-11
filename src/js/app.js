import {Helpers} from './Helpers/Helpers.js';
import {Plans} from './Plans/Plans.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log('hello');
    new Plans(new Helpers());
});
