const asyncFetch = async srcUrl => {
  const response = await fetch(srcUrl);
  const data = await response.json();
  return data;
};

export default asyncFetch;
