const getTplInputData = async (currentVersion, url) => {
  const version = localStorage.getItem('version');
  if (!version || version < currentVersion) {
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('version', currentVersion);
    return data;
  }
  const cache = localStorage.getItem('data');
  return JSON.parse(cache);
};
const renderHTML = ({ currentVersion, url, templateFunc }) => {
  const { body } = document;
  const data = getTplInputData(currentVersion, url);
  return data.then(parsedData => {
    body.insertAdjacentHTML('afterbegin', templateFunc(parsedData));
  });
};

export default renderHTML;
