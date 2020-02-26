import {Carousel, Nav, Content, Button} from '../View/carouselView.js'
import carouselEvent from './carouselEvent.js'

class Controller {
  constructor() {
    this.LOCALHOST_URL = 'http://127.0.0.1:4000'
    this.init()
  }

  init() {
    this.fetchData()
  }

  fetchData() {
    if(localStorage.getItem('renderData')) {
      this.renderTemplate(JSON.parse(JSON.parse(localStorage.getItem('renderData'))))
      new carouselEvent()
    } else {
      fetch(this.LOCALHOST_URL)
        .then(response => response.json())
        .then(responseData => {
          this.renderTemplate(responseData)
          this.setLocalstorageData(JSON.stringify(responseData))
          return responseData
        })
        .then(() => new carouselEvent())
    }
  }

  renderTemplate(renderData) {
    new Carousel({
      "navData": new Nav(renderData.navData),
      "contentData": new Content(renderData.contentData),
      "buttonData" : new Button(renderData.buttonData)
    })
  }

  setLocalstorageData(data) {
    localStorage.setItem("renderData", JSON.stringify(data))
  }
}

export default Controller;
