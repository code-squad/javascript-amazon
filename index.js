const menuNav =document.querySelector('.menu__list');
const carouselSlider = document.querySelector('.carousel__container') 
const prevBtn = document.querySelector('.carousel__button--prev');
const nextBtn = document.querySelector('.carousel__button--next');

const menuList = Array.from(menuNav.children);
const menuListWidth = menuList[0].getBoundingClientRect().width;

const sliderList = Array.from(carouselSlider.children);
const sliderListWidth= sliderList[0].getBoundingClientRect().width;


let targetIndex;

class Carousel {
    constructor(targetIndex) {
        this.targetIndex = targetIndex;
        this.moveCarouselMenu(this.targetIndex);
        this.btnHandler();
    }
    moveCarouselTarget =(index)=>{
        carouselSlider.style.transform = `translateX(-${sliderListWidth*index}px)`;
    }
    moveCarouselMenu =(targetIndex)=>{ 
        this.moveMenuItem(targetIndex);
        menuList.forEach((li,index)=>{
            li.addEventListener('click',()=>{ 
                this.moveMenuItem(index)
                this.moveCarouselTarget(index);
            }); 
        });
    }
    moveMenuItem = (targetIndex)=>{
        menuList.forEach((item)=>{
            item.style.transform='scale(1)';
        })
        menuList[targetIndex].style.transform = 'scale(1.1)';
    }   
    btnHandler() {
        prevBtn.addEventListener('click',(e)=>{
            this.targetIndex--;
            if (this.targetIndex <0) this.targetIndex=3;
            this.moveCarouselTarget(this.targetIndex);
            this.moveMenuItem(this.targetIndex); 
        })
        nextBtn.addEventListener('click',(e)=>{
            this.targetIndex++; 
            if (this.targetIndex>3) this.targetIndex=0;
            this.moveCarouselTarget(this.targetIndex)
            this.moveMenuItem(this.targetIndex)
        })
    }
}
window.addEventListener('DOMContentLoaded',(e)=>{
    targetIndex=Math.floor(Math.random()*menuList.length);
    carouselSlider.style.transform=`translateX(-${sliderListWidth*targetIndex}px)`;
    menuList[targetIndex].style.transform ='scale(1.1)';  
    new Carousel(targetIndex);
})