function appendMenuData(mockData) {
    const menu = document.querySelector("#menu");
    const buttonID = 'button';

    for (let i = 0; i < mockData.length; ++i) {
        const menu_element_li = document.createElement("li");
        const menu_element_button = document.createElement("button");

        menu_element_button.innerHTML = mockData[i].title;
        menu_element_button.id = buttonID + i;

        menu_element_li.appendChild(menu_element_button);
        menu.appendChild(menu_element_li);
    }
}

function appendContentsData(mockData) {
    const content = document.querySelector("#content");

    for (let i = 0; i < mockData.length; ++i) {
        const element = document.createElement("li");

        const wrap = document.createElement("div");
        wrap.className = 'content_wrap';

        const image = document.createElement("div");
        image.className = 'image';

        const container = document.createElement("div");
        container.className = 'container';

        const title = document.createElement("div");
        title.className = 'title';

        const description_li = document.createElement("ul");
        description_li.className = 'description';

        image.style.backgroundImage = "url('" + mockData[i].imageUrl + "')";

        title.innerText = mockData[i].title;

        for (let j = 0; j < mockData[i].contents.length; ++j) {
            const description = document.createElement("li");
            description.innerText = mockData[i].contents[j];
            description_li.appendChild(description);
        }

        container.appendChild(title);
        container.appendChild(description_li);

        wrap.appendChild(image);
        wrap.appendChild(container);

        element.appendChild(wrap);

        content.appendChild(element);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    appendMenuData(mockData_Menu);
    appendContentsData(mockData_Contents);
});