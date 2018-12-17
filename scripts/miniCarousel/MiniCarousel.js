function createLiWithJSON({ id, src, alt }) {
  return `<li><img data-imgId="${id}" src="${src}" alt="${alt}" /></li>`;
}

function fetchCarouselJSON(resURI, targetEl, useFetch = false) {
  if (useFetch) {
    fetch(resURI)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error, status = ${res.status}`);

        return res.json();
      })
      .then(res => res.reduce((acc, obj) => `${acc}${createLiWithJSON(obj)}\n`, '\n'))
      .then((res) => {
        targetEl.innerHTML = res;
      });
  }

  /* equivalent XHR codes */
}

const URIPrimeMusic = '/res/primeMusic.json';
const primeMusicEl = document.querySelector(
  '.horizontalBanners__prime-music .mini-carousel .placeholder',
);
// const URIPrimeOriginal = '/res/primeOriginal.json';

fetchCarouselJSON(URIPrimeMusic, primeMusicEl, true);
