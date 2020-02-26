export default function() {
  const components = {};

  let navIdx = 0;
  let cardIdx = 1;

  const registerComponent = function(component) {
    components[component.name] = component;
    component.slideAnimMediator = this;
  };

  const processSlideAnimation = function(component, index) {
    _updateState(component, index);
    components.navigation.update(navIdx);
    components.cards.move(cardIdx);
    components.cards.onTransitionEndHandler(cardIdx);
  };

  const _updateState = function(component, index) {
    if (component === "button") {
      _updateStateByBtn(index);
    } else if (component === "navigation") {
      _updateStateByNav(index);
    }
  };

  const _updateStateByBtn = function(index) {
    const navElements = components.navigation.elements;
    if (index === 0) {
      cardIdx -= 1;
      navIdx = navIdx === 0 ? navElements.length - 1 : navIdx - 1;
    } else {
      cardIdx += 1;
      navIdx = navIdx === navElements.length - 1 ? 0 : navIdx + 1;
    }
  };

  const _updateStateByNav = function(index) {
    cardIdx = index + 1;
    navIdx = index;
  };

  const updateStateByCards = function(index) {
    cardIdx = index;
  };

  return {
    register: registerComponent,
    slide: processSlideAnimation,
    updateCardIndex: updateStateByCards
  };
}
