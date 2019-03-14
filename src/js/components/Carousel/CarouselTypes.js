class CarouselTypes {
    constructor(carousel, type){
        this.carousel = carousel;
        this.type = type;
        this.define(this.carousel);
    }
    define(targetObj){
        if(toString.call(targetObj) !== "[object Object]") throw new Error();
        // this.type.checkArgsTypes(targetObj, 'setEvent', ['array', 'object']);
        // this.type.checkArgsTypes(targetObj, 'runAutoMove', ['array', 'HTMLCollection']);
        // this.type.checkArgsTypes(targetObj, 'controlSlides', ['array', 'HTMLCollection', ['string', 'undefined'], ['number', 'undefined']]);
        // this.type.checkArgsTypes(targetObj, 'setPageNumber', ['HTMLCollection', 'string']);
        return this;
    }
}
export { CarouselTypes };