import {qS, addClass, removeClass} from "../../koon.js";

class Carousel {
    constructor(element, option) {
        this.el = element;
        this.option = option;
    }

    init(data) {
        this.render(data);
        this.setValues();
        this.setInitForm();
        this.setInitPosition();
        this.setItemAttribute({
            'target' : this.elementItems,
            'attrName' : "data-index"
        }); 
    }

    render(data) {
        let createdNode = data.reduce((bef, aft) => {
            aft = this.getCarouselItemHTML(aft);
            bef += aft;
            return bef;
        }, '<div class="carousel-wrap"><ul class="carousel-list">') + '</ul></div>' 

        this.el.innerHTML = createdNode;
    }

    getCarouselItemHTML(data) {
        let desc = data.mainDesc.reduce((bef, aft) => {
            bef += `<li>${aft}</li>`
            return bef;
        }, '<ul>') + '</ul>';
        return `
            <li class="carousel-item">
                <div class="info-img">
                    <img src="${data.imgURL}">
                </div>
                <div class="info-text">
                    <h3>${data.mainTitle}</h3>
                    ${desc}
                </div>
            </li>`
    }    

    setValues() {
        this.elementList = qS('.carousel-list');
        this.elementItems = this.elementList.children;
        this.elementWidth = this.el.offsetWidth;
        this.itemsInitCount = this.elementItems.length;
        this.currentPointer = -this.elementWidth;       
    }


    setInitForm() {
        let width = this.setOption();
        this.elementList.style.width = `${width}px`;
        addClass(this.elementList, 'flex');
    }

    setInitPosition() {
        if(this.option.infinite) {
            this.elementList.style.transition = 'all 0s';
            this.elementList.style.transform = `translateX(${this.currentPointer}px)`;
            addClass(this.elementItems[1], 'active');
        } else {
            addClass(this.elementItems[0], 'active');
        }
    }

    setItemAttribute({target, attrName, subject}) {
        target = Array.from(target);
        target.forEach((v, i) => {
            if(this.option.infinite && (subject !== 'cardNavi')) {
                target[i].setAttribute(attrName, i);
            } else {
                target[i].setAttribute(attrName, i + 1);
            }
        })
    }   
    
    setOption() {
        if(this.option.infinite) {
            this.cloning({
                'targetNode' : this.elementList,
                'firstItem' : this.elementItems[0],
                'lastItem' : this.elementItems[this.itemsInitCount - 1]
            })
            return this.calcWidth(this.itemsClonedCount);

        } else {
            return this.calcWidth(this.itemsInitCount);    
        }
    }

    cloning({targetNode, firstItem, lastItem}) {
        let firstClonedItem = firstItem.cloneNode(true);
        let lastClonedItem = lastItem.cloneNode(true);
 
        addClass(firstClonedItem, 'clone')    
        addClass(lastClonedItem, 'clone')      

        targetNode.prepend(lastClonedItem);
        targetNode.appendChild(firstClonedItem);

        this.itemsClonedCount = this.elementList.children.length;
    }

    calcWidth(counts) {
        let width = this.elementWidth * counts
        return width;
    }
    
    moveCarousel(distance, direction, speed = this.option.speed) {            
        this.elementList.style.transition = `all ${speed}ms`;
        this.elementList.style.transform = `translateX(${distance}px)`;
        this.changeActiveItem(direction);
        
        return this.getActiveItem();
    }

    changeActiveItem(direction) {
        let currentIdx = Number(this.getActiveItem());
        this.elementItems[currentIdx].classList.remove('active');
        this.setActiveItem(direction, currentIdx);

        let newActiveIdx = Number(this.getActiveItem());
        let newActiveItem = this.elementItems[newActiveIdx];
        if(newActiveItem.classList.contains('clone')) {
            setTimeout(() => {this.moveCloneItems(newActiveIdx);}, this.option.speed);
        }
    };

    getActiveItem() {
        let activeItem = this.el.querySelector('.active');
        return activeItem.dataset.index;
    }

    setActiveItem(direction, currentIdx) {
        if(direction > 1) {
            addClass(this.elementItems[direction - 1], 'active');
        } else {
            addClass(this.elementItems[currentIdx + direction], 'active');
        }
        
    }

    moveCloneItems(idx) {
        let newPointer;
        let clonedItemCount = 2;
        this.elementList.style.transition = `all 0s`;
        this.elementItems[idx].classList.remove('active');

        if(idx === 0) {
            newPointer = -(this.elementWidth * (this.itemsInitCount - clonedItemCount));
            this.elementList.style.transform = `translateX(${newPointer}px)`;
            this.elementItems[this.itemsClonedCount - clonedItemCount].classList.add('active');

        } else if(idx === (this.itemsClonedCount - 1)) {
            newPointer = -this.elementWidth   
            this.elementList.style.transform = `translateX(${newPointer}px)`;
            this.elementItems[1].classList.add('active');
        }
        
        this.currentPointer = newPointer;
    }

    findCurrentPosition() {
        let currentPosition = Number(this.getActiveItem());
        let clonedItemCount = 2;

        if(currentPosition === 0) {
            currentPosition = this.itemsInitCount - clonedItemCount;
        } else if(currentPosition === this.itemsInitCount - 1) {
            currentPosition = 1;
        }

        return currentPosition;
    }
}

export default Carousel;