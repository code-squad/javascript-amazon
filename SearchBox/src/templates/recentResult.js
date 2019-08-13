const recentResult = ({ item }) => {
  return `
    <li>
      <span>${item.title}</span>
      <span>${item.timestamp}</span>
    </li>
  `;
};

export default recentResult;
