import { $ } from './utils/allenibrary.js'

export default class Templater {
  getDescLists = (descLists) => {
    return descLists.reduce((acc, curr) => acc + `<li>${curr}</li>`, '')
  }

  insertCards = (data) => {
    let tpl = data.reduce((acc, curr) => {
      const { id, title, desc, imgURL } = curr;
      return acc + `<li class='benefit-card' id=${id} style='background-image:url(${imgURL})'>
                  <div class='benefit-desc'>
                    <h4 class='benefit-title'>${title}</h4>
                    <ul class='desc-list'>
                      ${this.getDescLists(desc)}
                      </ul>
                  </div>
                </li>`
    }, '')

    const cardWrapper = $('.card-wrapper');
    cardWrapper.insertAdjacentHTML('beforeend', tpl);
    return data;
  }
}