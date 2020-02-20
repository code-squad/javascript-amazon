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
    if(localStorage.getItem('renderData')) {
      this.renderTemplate(JSON.parse(JSON.parse(localStorage.getItem('renderData'))))
      this.eventload()
    } else {
      fetch('http://127.0.0.1:4000')
        .then(response => response.json())
        .then(responseData => {
          this.renderTemplate(responseData)
          this.setLocalstorageData(JSON.stringify(responseData))
          return responseData
        })
        .then(() => this.eventload())
    }
  }

  renderTemplate(renderData) {
    new Carousel({
      "nav": new Nav(renderData.navData),
      "content": new Content(renderData.contentData),
      "button" : new Button(renderData.buttonData)
    })
  }

  setLocalstorageData(data) {
    localStorage.setItem("renderData", JSON.stringify(data))
  }

  eventload() {
    new carouselEvent()
  }
}

export default Controller;
