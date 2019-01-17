import { template } from "./module/template.js";
import { ajax } from "./module/ajax.js";

const localUrl = location.href;
console.log(localUrl);

ajax.getReq(`${localUrl}json/options.json`)
    .then(template.appendOptionHTML({ HTMLEl: document.querySelector("#select-category") }))

ajax.getReq(`${localUrl}json/videoCarousel.json`)
    .then(template.appendCarouselHTML({ HTMLEl: document.querySelector("#video-card ul") }))

ajax.getReq(`${localUrl}json/musicCarousel.json`)
    .then(template.appendCarouselHTML({ HTMLEl: document.querySelector("#music-card ul") }))