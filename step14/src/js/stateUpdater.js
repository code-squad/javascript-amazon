export default {
  PageNation({ offset, itemWidth, currentItem, direction }) {
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

  Nav({ offest, currentItem, itemWidth, currentNavItem }) {
    return {
      offest: offest + itemWidth * (currentItem - (currentNavItem + 1)),
      currentItem: currentNavItem + 1,
    };
  },
};
