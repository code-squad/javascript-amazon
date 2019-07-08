const getCarouselData = async (currentVersion, url) => {
  const version = localStorage.getItem('version');
  if (!version || version < currentVersion) {
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('version', currentVersion);
        return data;
      });
  } else {
    return await Promise.resolve(localStorage.getItem('data')).then(response =>
      JSON.parse(response),
    );
  }
};

const renderHTML = ({ currentVersion, url, templateFunc }) => {
  const body = document.querySelector('body');
  const data = getCarouselData(currentVersion, url);
  return data.then(parsedData => {
    body.insertAdjacentHTML('afterbegin', templateFunc(parsedData));
  });
};

export default renderHTML;
