class CarouselTypes {
    constructor(carousel, type){
        this.carousel = carousel;
        this.type = type;
        this.define(this.carousel);
    }
    define(targetObj){
        if(toString.call(targetObj) !== "[object Object]") throw new Error();
        this.type.checkArgs(targetObj, 'setEvent', ['object']);
        this.type.checkArgs(targetObj, 'runAutoMove', ['HTMLCollection']);
        this.type.checkArgs(targetObj, 'controlSlides', ['HTMLCollection', ['string', 'undefined'], ['number', 'undefined']]);
        this.type.checkArgs(targetObj, 'setPageNumber', ['HTMLCollection', 'string']);
        return this;
    }
}
export { CarouselTypes };