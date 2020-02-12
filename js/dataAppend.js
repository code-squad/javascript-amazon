const navContainer = $(".slide_nav");
const slideContentContainer = $(".slide_item_wrap");

function navDataAppend() {
    DATA.itemContents.forEach((itemContent, idx) => {
        const li = _$("li");
        if (idx === 0) {
            li.classList.add("slide_nav_selected");
        }
        li.innerText = itemContent.navTitle;
        li.style.backgroundColor = DATA.navCardColors[idx % DATA.navCardColors.length];
        navContainer.appendChild(li);
    });
}

function slideContentDataAppend() {
    DATA.itemContents.forEach(itemContent => {
        const item_box = _$("li");
        item_box.classList.add("slide_item");

        const item_img = _$("img");
        item_img.setAttribute("src", itemContent.imgURL);
        item_box.appendChild(item_img);

        const item_text_box = _$("div");
        item_text_box.classList.add("slide_item_text");

        const item_text_title = _$("h2");
        item_text_title.innerText = itemContent.headTitle;
        item_text_box.appendChild(item_text_title);

        const item_text_ul = _$("ul");
        for (let i = 0; i < itemContent.contentText.length; i++) {
            const item_text_li = _$("li");
            item_text_li.innerText = itemContent.contentText[i];
            item_text_ul.appendChild(item_text_li);
        }
        item_text_box.appendChild(item_text_ul);
        item_box.appendChild(item_text_box);

        slideContentContainer.appendChild(item_box);
    });
}

navDataAppend();
slideContentDataAppend();