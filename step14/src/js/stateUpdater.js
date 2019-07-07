export default {
  PageNation(state) {
    const { offset, currentItem, direction, itemWidth } = state;
    if (direction === 'next')
      return {
        offset: offset - itemWidth,
        currentItem: ++currentItem,
      };
    return {
      offset: offset + itemWidth,
      currentItem: --currentItem,
    };
  },

  Nav(state) {
    const { offest, currentItem, itemWidth, currentNavItem } = state;
    return {
      offest: offest + itemWidth * (currentItem - (currentNavItem + 1)),
      currentItem: currentNavItem + 1,
    };
  },
};
