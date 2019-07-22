const recentResult = item => {
  const li = document.createElement("li");
  return (li.innerHTML = `
    <p>${item.title}</p>
  `);
};

export default recentResult;
