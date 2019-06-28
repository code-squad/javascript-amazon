const createCarouselCard = () => {
  const cardWrapper_div = document.createElement(`div`);
  const cardSlider_div = document.createElement(`div`);

  cardWrapper_div.classList.add(`card-wrapper`);
  cardSlider_div.classList.add(`card-slider`);

  cardWrapper_div.appendChild(cardSlider_div);

  let carouselCard = `<div class="card">
  <div class="thumb">
    <img src="../images/Card_A01.png" alt="card-thumbnail" />
  </div>
  <div class="content">
    <h2>Fast, Free Delivery</h2>
    <ul>
      <li>
        Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy t
      </li>
      <li>
        Lorem Ipsum is simply dummy text of the printing and
        typesetting industry.
      </li>
      <li>
        Lorem Ipsum is simply dummy text of the printing and
        typesetting industry.
      </li>
      <li>
        Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. t
      </li>
    </ul>
  </div>
  </div>`;
}

document.addEventListener(`DOMContentLoaded`, createCarouselCard);