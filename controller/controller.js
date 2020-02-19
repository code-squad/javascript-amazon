import {Carousel, Nav, Content, Button} from '../View/carouselView.js'
import carouselEvent from './carouselEvent.js'

class Controller {
  constructor() {
    this.init()
  }

  init() {
    this.fetchData()
  }

  fetchData() {
    fetch('http://127.0.0.1:4000')
      .then(response => response.json())
      .then(responseData => this.renderTemplate(responseData))
      .then(() => this.eventload())
  }

  renderTemplate(renderData) {
    new Carousel({
      "nav": new Nav(renderData.navData),
      "content": new Content(renderData.contentData),
      "button" : new Button(renderData.buttonData)
    })
  }

  eventload() {
    new carouselEvent()
  }
}

export default Controller;
