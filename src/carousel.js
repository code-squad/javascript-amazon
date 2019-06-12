

const getArrFromSelector = selector => [...document.querySelectorAll(selector)];
const carouselItemList = getArrFromSelector(".carousel__item");

const removeActive = i => carouselItemList[i].classList.remove('active')
const addActive = i => carouselItemList[i].classList.add("active");
const getCurrActiveElIndex = (nodeList) =>{
  for (node of nodeList) {  
    const classListArr = [...node.classList]
    if(classListArr.indexOf("active") !== -1) return nodeList.indexOf(node);
  }
}


const active = function(e) {
    const eName = e.target.className
    const activeIndex = getCurrActiveElIndex(carouselItemList);
    removeActive(activeIndex);
    if(eName.includes('right')) {
        activeIndex === 3 ? addActive(0) : addActive(activeIndex+1);
    } else {
        activeIndex === 0 ? addActive(3) : addActive(activeIndex-1);
    }
   
}

const arrows = document.querySelectorAll(".arrow");
[...arrows].forEach( arrow => arrow.addEventListener("click", active))
