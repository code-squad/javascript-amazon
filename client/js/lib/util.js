const setTransform = (target, width, currentIndex) => {
  let transformOption = `translateX(${-width * currentIndex}px)`;
  target.style.transform = transformOption;
};

const setTransition = (target, option) => {
  target.style.transition = option;
};

const changeScale = (target, value) => {
  target.style.transform = `scale(${value})`;
};

export { setTransform, setTransition, changeScale };
