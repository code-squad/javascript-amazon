import { $$ } from "../util/util.js";

class CoreEvent {
    constructor() {

    }

    addEvent(target, type, cb) {
        target.addEventListener(type, cb);
    }

    initializeStatus() {
        $$('.header-list').forEach(list => {
            if (list.classList.contains("header-selected")) {
                list.classList.remove("header-selected");
            }
        })

        $$('.circles').forEach(circle => {
            if (circle.classList.contains("invisible") === false) {
                circle.classList.add("invisible");
            }
        })

        $$(".dot").forEach(dot => {
            if (dot.classList.contains("selected-dot")) {
                dot.classList.remove("selected-dot");
            }
        })
    }
}

export default CoreEvent;