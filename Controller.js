
class Controller {
    constructor({ carousel, navigation , animationTime }) {
        this.carousel = carousel;
        this.navigation = navigation;
        this.currentIndex = 0;
        this.previousIndex = undefined;
        this.animationTime = animationTime;
    }
    registerEvents() {
        this.carousel.leftBtn.addEventListener('click', this.carouselClickHandler.bind(this));
        this.carousel.rightBtn.addEventListener('click', this.carouselClickHandler.bind(this));
        
        [ ...this.navigation.navbar.firstElementChild.children].forEach(
            (navItem,idx)=>{
                navItem.addEventListener('click',(e)=>
                    this.navItemClickHandler(e,idx)
                )
            }
        )
    }
    init() {
        this.navigation.makeTemplate();
        this.currentIndex = this.makeRandomIndex();
        this.carousel.drawCardPosition(this.currentIndex);
        this.navigation.drawCurrentNavItem(this.currentIndex); 
        this.registerEvents();
    }
    carouselClickHandler(event) {
        const selectedDirection = event.target.id;
        event.preventDefault();
        this.moveIndex(selectedDirection);
        this.carousel.drawCardPosition(this.currentIndex,this.animationTime);
        this.navigation.drawCurrentNavItem(this.currentIndex,this.previousIndex); 
    }
    navItemClickHandler(e,idx){
        this.changeNavIndex(idx);
        this.navigation.drawCurrentNavItem(this.currentIndex,this.previousIndex);
        this.carousel.transformCard(this.currentIndex,this.previousIndex)
    }
    changeNavIndex(idx){
        this.previousIndex = this.currentIndex;
        this.currentIndex = idx;
    }

    moveIndex(direction) {
        this.previousIndex = this.currentIndex;
        let index =
            direction === "left" ? this.currentIndex - 1 : this.currentIndex + 1;
        if (index < 0) index += this.carousel.cardList.childElementCount;
        this.currentIndex = this.modCardLength(index);
    }
    modCardLength(number) {
        return number % this.carousel.cardList.childElementCount;
    }
    makeRandomIndex() {
        return Math.floor(Math.random() * (this.carousel.cardList.childElementCount - 1));
    }
}

export default Controller;
