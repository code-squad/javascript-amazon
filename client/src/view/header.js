import css from "./header.css";

class Header {
    constructor(headerData) {
        this.headerData = headerData;
        this.idIndex = 1;
    }

    returnCardLengthDivString(length) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += `<div class="dot" data-id=${this.idIndex++}></div>`
        }
        return result;
    }

    render() {
        const header = this.headerData.reduce(
            (result, data) => {
                const cardString = this.returnCardLengthDivString(data.cardLength);
                (result += `<li class="header-list"><div class="header_title">${data.title}</div><div class="circles invisible">${cardString}</div></li>`)
                return result;
            },
            ""
        );
        return `<ul class="header-wrapper">${header}</ul>`;
    }
}

export default Header;
