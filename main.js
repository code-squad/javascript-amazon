import mockData from './mockData.js'
import Slide from './slide.js'
import SlideEvent from './slideEvent.js'

const init = () => {
  const slide = new Slide(mockData)
  $("#slide").innerHTML = slide.template()
  const slideEvent = new SlideEvent()
}

loaded(init)