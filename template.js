class MakeTemplate {
    constructor() {
        this.navigation = document.querySelector('.navigation-list');
        this.carousel = document.querySelector('.carousel');
    }

    makeNavigationItem(element) {
        let createdNode = document.createElement('li');
        createdNode.classList.add("item");
        createdNode.innerHTML = `${element.navTitle}`;

        this.navigation.appendChild(createdNode);
    }

    makeCarouselItem(element) {
        let createdNode = document.createElement('li');
        createdNode.classList.add('carousel-item');

        let imgNode = this.makeCarouselImageNode(element);
        let txtNode = this.makeCarouselTextNode(element);

        createdNode.appendChild(imgNode);
        createdNode.appendChild(txtNode);

        this.carousel.appendChild(createdNode);
    }
    makeCarouselImageNode(element) {
        let createdNode = document.createElement('div');
        createdNode.classList.add('info-img');
        createdNode.innerHTML = `<img src="${element.imgURL}">`;

        return createdNode;
    }
    makeCarouselTextNode(element) {
        let createdNode = document.createElement('div');
        createdNode.classList.add('info-text');

        let titleNode = document.createElement('h3');
        titleNode.innerHTML = `${element.mainTitle}`;

        let descUlNode = document.createElement('ul');
        element.mainDesc.forEach((value) => {
            let descLiNode = document.createElement('li');
            descLiNode.innerHTML = `${value}`

            descUlNode.appendChild(descLiNode);
        })
        
        createdNode.appendChild(titleNode);
        createdNode.appendChild(descUlNode);

        return createdNode;
    }

    init(data) {
        data.forEach((element) => {
            this.makeNavigationItem(element);
            this.makeCarouselItem(element);
        })
    }
}


export default MakeTemplate;

