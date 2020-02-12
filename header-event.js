class HeaderEvent extends MyEvent {
    constructor() {
        super();
    }

    selectBoxListener(event) {
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

        // headerTitle
        if (event.target.classList.contains("header_title") === true) {
            event.target.parentNode.classList.add('header-selected');
            event.target.parentNode.querySelector(".circles").classList.remove("invisible");
            event.target.parentNode.querySelector(".dot").classList.add("selected-dot");
            event.target.parentNode.querySelector(".dot").click();
            return;
        }

        // circles
        if (event.target.classList.contains("circles") === true) {
            event.target.parentNode.classList.add('header-selected');
            event.target.classList.remove("invisible");
            event.target.querySelector(".dot").classList.add("selected-dot");
            event.target.querySelector(".dot").click();
            return;
        }

        // dot
        if (event.target.classList.contains("dot") === true) {
            event.target.parentNode.parentNode.classList.add('header-selected');
            event.target.parentNode.classList.remove("invisible");
            event.target.classList.add("selected-dot");
            return;
        }

        // anywhere else
        event.target.querySelector(".dot").classList.add("selected-dot");
        event.target.querySelector(".dot").click();
        event.target.classList.add('header-selected');
        Array.from(event.target.children).forEach(child => {
            if (child.classList.contains("circles")) {
                child.classList.remove('invisible');
            }
        })
    }
}