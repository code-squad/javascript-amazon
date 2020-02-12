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

        // headerTitle
        if (event.target.classList.contains("header_title") === true) {
            event.target.parentNode.classList.add('header-selected');
            event.target.parentNode.querySelector(".circles").classList.remove("invisible");
            return;
        }

        if (event.target.classList.contains("circles") === true) {
            event.target.parentNode.classList.add('header-selected');
            event.target.classList.remove("invisible");
            return;
        }

        if (event.target.classList.contains("dot") === true) {
            event.target.parentNode.parentNode.classList.add('header-selected');
            event.target.parentNode.parentNode.classList.remove("invisible");
            return;
        }

        event.target.classList.add('header-selected');
        Array.from(event.target.children).forEach(child => {
            if (child.classList.contains("circles")) {
                child.classList.remove('invisible');
            }
        })
    }
}