export default class MiniCarousel {
  createLiHTMLWithJSON({ id, src, alt }) {
    return `<li class="carousel__card"><img data-imgId="${id}" src="${src}" alt="${alt}" /></li>`;
  }

  fetchCarouselJSON(resURI, targetEl, useXHR = false) {
    if (useXHR) {
      /* equivalent XHR codes */
      return;
    }

    fetch(resURI)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error, status = ${res.status}`);

        return res.json();
      })
      .then(res => res.reduce((acc, obj) => `${acc}${this.createLiHTMLWithJSON(obj)}\n`, '\n'))
      .then((res) => {
        /* Set width of container ul */
        const target = targetEl;
        target.innerHTML = res;
      });
  }

  fetchPrimeMusicCarousel() {
    const URIPrimeMusic = '/res/primeMusic.json';
    const primeMusicEl = document.querySelector(
      '.horizontalBanners__prime-music .mini-carousel .carousel__cardSlot',
    );

    this.fetchCarouselJSON(URIPrimeMusic, primeMusicEl);
  }

  fetchPrimeOriginalCarousel() {
    const URIPrimeOriginal = '/res/primeOriginal.json';
    const primeOriginalEl = document.querySelector(
      '.horizontalBanners__prime-original .mini-carousel .carousel__cardSlot',
    );

    this.fetchCarouselJSON(URIPrimeOriginal, primeOriginalEl);
  }
}
