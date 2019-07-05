class Navigation {
    constructor({navbar,contentsData}){
        this.navbar = navbar;
        this.contentsData = contentsData;
    }
    makeTemplate(){
    const contentsTemplate = this.contentsData.reduce((contentsTemplate,cur)=>{
        const liTemplate = `
        <li class="title__card title__card_${cur.color}">
        ${cur.title}
        </li>
        `
        return contentsTemplate += liTemplate
    },`<ol>`);
    this.navbar.insertAdjacentHTML('afterbegin',contentsTemplate.concat('</ol>'));
        
    }

    drawCurrentNavItem(currentIndex,previousIndex = undefined){
        const navList =  this.navbar.firstElementChild.children    
        let previousItem = navList[previousIndex];
        let currentItem = navList[currentIndex];

        if(previousIndex !== undefined) previousItem.classList.toggle('curser');
        currentItem.classList.toggle('curser');
  
    }

}

export default Navigation;