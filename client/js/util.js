const setTransform = (target, width, currentIndex) => {
  let transformOption = `translateX(${-width * currentIndex}px)`;
  target.style.transform = transformOption;
};

const setTransition = (target, option) => {
  target.style.transition = option;
};

export { setTransform, setTransition };
