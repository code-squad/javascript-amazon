class Navigation {
    constructor({navbar}){
        this.navbar = navbar;
    }

    drawCurrentNavItem(currentIndex,previousIndex = undefined){
        // console.log('onClickHandler로 Navigation으로 넘어온 현재화면의 인덱스:',currentIndex, '넘어온 이전화면의 인덱스',previousIndex);
        let previousItem = this.navbar[previousIndex];
        let currentItem = this.navbar[currentIndex];

        if(previousIndex !== undefined) previousItem.classList.toggle('curser');
        currentItem.classList.toggle('curser');
  
    }

}

export default Navigation;