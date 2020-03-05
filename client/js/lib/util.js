const setTranslateX = (target, width, currentIndex) => {
  let transformOption = `translateX(${-width * currentIndex}px)`;
  target.style.transform = transformOption;
};

const setTransition = (target, option) => {
  target.style.transition = option;
};

const changeScale = (target, value) => {
  target.style.transform = `scale(${value})`;
};

const setVisibility = (target, isVisible) => {
  target.style.visibility = isVisible ? "visible" : "hidden";
};

export { setTranslateX, setTransition, changeScale, setVisibility };
