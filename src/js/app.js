import {Helpers} from './Helpers/Helpers.js';
import {Plans} from './Plans/Plans.js';

document.addEventListener("DOMContentLoaded", () => {
    new Plans(new Helpers());
});
