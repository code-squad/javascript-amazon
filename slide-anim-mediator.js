import { $qs, $ael } from "./util.js";

export default function() {
  const components = {};

  const cardList = $qs(".card-list");
  const cards = cardList.children;

  let navIdx = 0;
  let cardIdx = 1;

  const updateState_btn = function(index) {
    const navElements = components.navigation.elements;
    if (index === 0) {
      cardIdx -= 1;
      navIdx = navIdx === 0 ? navElements.length - 1 : navIdx - 1;
    } else {
      cardIdx += 1;
      navIdx = navIdx === navElements.length - 1 ? 0 : navIdx + 1;
    }
  };

  const updateState_nav = function(index) {
    cardIdx = index + 1;
    navIdx = index;
  };

  const updateState = function(comp, index) {
    if (comp === "button") {
      updateState_btn(index);
    } else if (comp === "navigation") {
      updateState_nav(index);
    }
    cardList.style.transition = "transform .5s ease-in-out";
  };

  const moveCardList = function() {
    const cardWidth = components.cards.cardWidth;
    cardList.style.transform =
      "translateX(" + `${-cardWidth * cardIdx}` + "px)";
  };

  return {
    register: function(comp) {
      components[comp.name] = comp;
      comp.slideAnimMediator = this;
    },
    slide: function(comp, index) {
      updateState(comp, index);
      components.navigation.update(navIdx);
      moveCardList();
      $ael(cardList, "transitionend", () => {
        if (cards[cardIdx].classList.contains("first")) {
          cardList.style.transition = "none";
          cardIdx = cards.length - 2;
          moveCardList();
        } else if (cards[cardIdx].classList.contains("last")) {
          cardList.style.transition = "none";
          cardIdx = 1;
          moveCardList();
        }
      });
    }
  };
}
