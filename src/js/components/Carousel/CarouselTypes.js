class CarouselTypes {
    constructor(carousel, type){
        this.carousel = carousel;
        this.type = type;
        this.define(this.carousel);
    }
    define(targetObj){
        if(toString.call(targetObj) !== "[object Object]") throw new Error();
        this.type.checkArgsTypes(targetObj, 'setEvent', ['object']);
        this.type.checkArgsTypes(targetObj, 'runAutoMove', ['HTMLCollection']);
        this.type.checkArgsTypes(targetObj, 'controlSlides', ['HTMLCollection', ['string', 'undefined'], ['number', 'undefined']]);
        this.type.checkArgsTypes(targetObj, 'setPageNumber', ['HTMLCollection', 'string']);
        return this;
    }
}
export { CarouselTypes };