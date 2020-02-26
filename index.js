class Carousel {
    constructor (menuData,contentData) {
        this.menuData=menuData;
        this.contentData=contentData;
        this.makingMenuList();
        this.makingSlider();
        this.btnHandler();
        this.count = 0;
    }
    changeLocation (element,index) {
        this.count = index;
        const width = element.children[0].getBoundingClientRect().width;
        element.style.transform = `translateX(${-this.count*width}px)`;
    }
    scaleMenu (element,index) {
        this.count = index;
        Array.from(element.parentNode.children).forEach((element)=>element.style.transform=`scale(0.99)`)
        element.parentNode.children[this.count].style.transform = 'scale(1.1)';
    }
    btnHandler () {
        const left =document.querySelector('div.carousel__button--prev');
        const right =document.querySelector('div.carousel__button--next');
        [left,right].forEach((btn,index)=>{
            btn.addEventListener('click',()=>{
                index === 0 ? this.count-- : this.count++;
                if (this.count >3) this.count =0;
                if (this.count<0)  this.count =3;
                const el = document.querySelector('.carousel__container');
                this.changeLocation(el,this.count);
                this.scaleMenu(document.querySelector('.menu__list>li'),this.count);
            });
        })
    }
    makingMenuList () {
        const menuConatiner=document.querySelector('.menu__list')
        this.menuData.forEach((data)=>{
            menuConatiner.innerHTML +=`
            <li><a href='#'>${data}</a></li>`
        })
        Array.from(menuConatiner.children).forEach((li,index)=>{
            li.addEventListener('click',()=>{
                this.scaleMenu(li,index);
                this.changeLocation(document.querySelector('.carousel__container'),index);
            })
        })
    }
    makingSlider () {
        const carouselContainer = document.querySelector('.carousel__container');
            carouselContainer.innerHTML=this.contentData.map((data,index)=>`              
                <div class='carousel__contents'>
                    <div class='carousel__text'>
                        <ul>
                            <h3>${data.title}</h3>
                            ${data.desc.map((desc)=>`<li>${desc}</li>`).join('')}
                        </ul>
                    </div>
                    <div class='carousel__img'>
                        <img src=${data.imgUrl} />
                    </div>
                </div>`).join('');
    }
}

window.addEventListener('DOMContentLoaded',()=>{
    fetch('./localData.json')
    .then((data)=>data.json())
    .then((data)=>{
        const {menuData,contentData}=data;
        const carousel=new Carousel(menuData,contentData);
    })
});