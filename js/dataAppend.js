const navContainer = $(".slide-nav");
const slideContainer = $(".slide-item-wrap");

function navDataAppend() {
    DATA.itemContents.forEach((item, idx) => {
        const li = _$("li");
        if (idx === 0) { li.classList.add("slide-nav-selected") }
        li.innerText = item.navTitle;
        li.style.backgroundColor = OPTION_DATA.navCardColors[idx % OPTION_DATA.navCardColors.length];
        navContainer.appendChild(li);
    });
}

function slideDataAppend() {
    DATA.itemContents.forEach(item => {
        const item_box = _$("li");
        item_box.classList.add("slide-item");

        const item_img = _$("img");
        item_img.setAttribute("src", item.imgURL);
        item_box.appendChild(item_img);

        const item_text_box = _$("div");
        item_text_box.classList.add("slide-item-text");

        const item_text_title = _$("h2");
        item_text_title.innerText = item.headTitle;
        item_text_box.appendChild(item_text_title);

        const item_text_ul = _$("ul");
        for (let i = 0; i < item.contentText.length; i++) {
            const item_text_li = _$("li");
            item_text_li.innerText = item.contentText[i];
            item_text_ul.appendChild(item_text_li);
        }
        item_text_box.appendChild(item_text_ul);
        item_box.appendChild(item_text_box);

        slideContainer.appendChild(item_box);
    });
}

function dataAppend() {
    navDataAppend();
    slideDataAppend();
}

dataAppend();