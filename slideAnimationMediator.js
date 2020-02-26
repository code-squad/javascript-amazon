import { $querySelector, $addListener } from "./util.js";

export default function() {
  const components = {};

  const cardList = $querySelector(".card-list");
  const cards = cardList.children;

  let navIdx = 0;
  let cardIdx = 1;

  const registerComponent = function(component) {
    components[component.name] = component;
    component.slideAnimMediator = this;
  };

  const processSlideAnimation = function(component, index) {
    _updateState(component, index);
    components.navigation.update(navIdx);
    _moveCardList();
    $addListener(cardList, "transitionend", () => {
      if (cards[cardIdx].classList.contains("first")) {
        cardList.style.transition = "none";
        cardIdx = cards.length - 2;
        _moveCardList();
      } else if (cards[cardIdx].classList.contains("last")) {
        cardList.style.transition = "none";
        cardIdx = 1;
        _moveCardList();
      }
    });
  };

  const _updateState = function(component, index) {
    if (component === "button") {
      _updateStateBtn(index);
    } else if (component === "navigation") {
      _updateStateNav(index);
    }
    cardList.style.transition = "transform .5s ease-in-out";
  };

  const _updateStateBtn = function(index) {
    const navElements = components.navigation.elements;
    if (index === 0) {
      cardIdx -= 1;
      navIdx = navIdx === 0 ? navElements.length - 1 : navIdx - 1;
    } else {
      cardIdx += 1;
      navIdx = navIdx === navElements.length - 1 ? 0 : navIdx + 1;
    }
  };

  const _updateStateNav = function(index) {
    cardIdx = index + 1;
    navIdx = index;
  };

  const _moveCardList = function() {
    const cardWidth = components.cards.cardWidth;
    cardList.style.transform =
      "translateX(" + `${-cardWidth * cardIdx}` + "px)";
  };

  return {
    register: registerComponent,
    slide: processSlideAnimation
  };
}
