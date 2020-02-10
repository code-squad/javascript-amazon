class Slider {
    constructor({headerTexts, images, titles, contents}) {
        this.header = new Header(headerTexts);
        this.images = images;
        this.titles = titles;
        this.contents = contents;
    }

    render(){
        return this.header.render();
    }
}