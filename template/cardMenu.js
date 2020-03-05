export class CardMenuTemplate {
    constructor(menuData) {
        this.menuData = menuData;
    }

    addSelectedClassName(index) {
        return index === 0 ? `card-menu__selected` : ``;
    }

    render() {
        const menuList = this.menuData.reduce((cards, title, index) => {
            cards += `
                 <li class="card-menu__card ${this.addSelectedClassName(index)}">
                    <button class="carousel__bg-color${index + 1}">
                        <span class="card__title">${title}</span>
                     </button>
                  </li>`;
            return cards;
        }, '')

        return `<div id="card-menu"><ul class="card-menu__list">${menuList}</ul></div>`;
    }
}
