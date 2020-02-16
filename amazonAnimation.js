const [prev, next] = document.querySelectorAll("button");

const slide_item_wrap = document.querySelector(".slide_item_wrap");

let listLength = document.querySelectorAll(".slide_item").length; 

//첫번째랑 마지막 리스트 복사해서 앞 뒤로 붙여주기
let firstSlide = slide_item_wrap.firstElementChild;
let lastSlide = slide_item_wrap.lastElementChild;
let clonedFirst = firstSlide.cloneNode(true);
let clonedLast = lastSlide.cloneNode(true);

//slide_item_wrap 앞 뒤에 추가해주기
slide_item_wrap.appendChild(clonedFirst);
slide_item_wrap.insertBefore(clonedLast, slide_item_wrap.firstElementChild);

let itemsCount = document.querySelectorAll(".slide_item").length;
let viewerWidth = 900;

slide_item_wrap.style.width = (viewerWidth*itemsCount)+"px";

let currentItemIndex = 1;
itemsCount = itemsCount-1; //인덱스값 용도

//처음 위치 지정해주기
let startX = -viewerWidth;

slide_item_wrap.style.transform = `translateX(${startX + "px"})`;

let transitionSec = 0.3;

//next버튼
next.addEventListener("click", () => {
  if (currentItemIndex >= itemsCount) return;

  slide_item_wrap.style.transition = transitionSec+"s";
  currentItemIndex++;

  cardScaleCtl(currentItemIndex-1,currentItemIndex-2);

  const x = currentItemIndex * -viewerWidth;

  slide_item_wrap.style.transform = `translateX(${x + "px"})`;

  if (currentItemIndex === itemsCount) {
    slide_item_wrap.addEventListener(
      "transitionend",
      () => {
        slide_item_wrap.style.transition = "0s";
        slide_item_wrap.style.transform = `translateX(${startX + "px"})`;
        currentItemIndex = 1;
      },
      { once: true }
    );
  }
});

//prev버튼
prev.addEventListener("click", () => {
  if (currentItemIndex <= 0) return;

  slide_item_wrap.style.transition = transitionSec+"s";
  currentItemIndex--;

  cardScaleCtl(currentItemIndex-1,currentItemIndex);

  const x = currentItemIndex * -viewerWidth;
  slide_item_wrap.style.transform = `translateX(${x + "px"})`;

  if (currentItemIndex === 0) {
    slide_item_wrap.addEventListener(
      "transitionend",
      () => {
        slide_item_wrap.style.transition = "0s";
        slide_item_wrap.style.transform = `translateX(${(itemsCount - 1) *
          -viewerWidth +
          "px"})`;
        currentItemIndex = listLength;
      },
      { once: true }
    );
  }
});

//슬라이드 네비게이션

const slide_nav_li = document.querySelectorAll(".slide_nav li");
slide_nav_li[0].classList.add("slide_nav_selected");

// 특정 네비게이션의 스케일을 키워주는 함수
function cardScaleCtl(currentItemIndex, prevItemIndex) {
    if(currentItemIndex===listLength){
        slide_nav_li[0].classList.add("slide_nav_selected");
        slide_nav_li[prevItemIndex].classList.remove("slide_nav_selected");
        return;
    }else if(currentItemIndex===-1){
        slide_nav_li[listLength-1].classList.add("slide_nav_selected");
        slide_nav_li[prevItemIndex].classList.remove("slide_nav_selected");
        return;
    }
    slide_nav_li[currentItemIndex].classList.add("slide_nav_selected");
    slide_nav_li[prevItemIndex].classList.remove("slide_nav_selected");
};

slide_nav_li.forEach((node, idx) => {
  node.addEventListener("click", () => {
    const prevItemIndex = currentItemIndex;
    currentItemIndex = idx + 1;
    const x = currentItemIndex * -viewerWidth;
    slide_item_wrap.style.transition = transitionSec+"s";
    slide_item_wrap.style.transform = `translateX(${x + "px"})`;
    cardScaleCtl(currentItemIndex - 1, prevItemIndex - 1);
  });
});
