import { $qs, $ael } from "./util.js";

export default function() {
  const components = {};

  const cardList = $qs(".card-list");
  const cards = cardList.children;

  let navIdx = 0;
  let cardIdx = 1;

  return {
    register: function(comp) {
      components[comp.name] = comp;
      comp.slideAnimMediator = this;
    },
    _updateState_btn: function(index) {
      const navElements = components.navigation.elements;
      if (index === 0) {
        cardIdx -= 1;
        navIdx = navIdx === 0 ? navElements.length - 1 : navIdx - 1;
      } else {
        cardIdx += 1;
        navIdx = navIdx === navElements.length - 1 ? 0 : navIdx + 1;
      }
    },
    _updateState_nav: function(index) {
      cardIdx = index + 1;
      navIdx = index;
    },
    _updateState: function(comp, index) {
      if (comp === "button") {
        this._updateState_btn(index);
      } else if (comp === "navigation") {
        this._updateState_nav(index);
      }
      cardList.style.transition = "transform .5s ease-in-out";
    },
    _moveCardList: function() {
      const cardWidth = components.cards.cardWidth;
      cardList.style.transform =
        "translateX(" + `${-cardWidth * cardIdx}` + "px)";
    },
    slide: function(comp, index) {
      this._updateState(comp, index);
      components.navigation.update(navIdx);
      this._moveCardList();
      $ael(cardList, "transitionend", () => {
        if (cards[cardIdx].classList.contains("first")) {
          cardList.style.transition = "none";
          cardIdx = cards.length - 2;
          this._moveCardList();
        } else if (cards[cardIdx].classList.contains("last")) {
          cardList.style.transition = "none";
          cardIdx = 1;
          this._moveCardList();
        }
      });
    }
  };
}
