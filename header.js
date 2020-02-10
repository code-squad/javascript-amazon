class Header {
    constructor(texts) {
        this.texts = texts;
    }

    render() {
        console.log(this.texts);
        const header = this.texts.reduce((result, text) =>
            result += `<li class="header-text">${text}</li>`
        , "");
        return `<ul>${header}</ul>`
    }
}