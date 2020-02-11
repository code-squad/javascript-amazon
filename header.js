class Header {
    constructor(texts) {
        this.texts = texts;
    }

    render() {
        const header = this.texts.reduce(
            (result, text) =>
                (result += `<li class="header-list"><div class="header_title">${text}</div></li>`),
            ""
        );
        return `<ul class="header-wrapper">${header}</ul>`;
    }
}
