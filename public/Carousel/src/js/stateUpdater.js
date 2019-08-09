export default {
  Main(state) {
    const { offset, currentItem, direction, itemWidth } = state;
    if (direction === 'next')
      return {
        offset: offset - itemWidth,
        currentItem: currentItem + 1,
        currNavItem: currentItem,
      };
    return {
      offset: offset + itemWidth,
      currentItem: currentItem - 1,
      currNavItem: currentItem - 2,
    };
  },

  Nav(state) {
    const { offset, currentItem, itemWidth, currNavItem } = state;
    return {
      offset: offset + itemWidth * (currentItem - (currNavItem + 1)),
      currentItem: currNavItem + 1,
    };
  },
};
