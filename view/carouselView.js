class Carousel {
  constructor({navData, contentData, buttonData}) {
    this.nav = navData
    this.content = contentData
    this.button = buttonData
      
    $("#slide").innerHTML = this.templateRendering()
  }
  templateRendering() {
    return `
      ${this.nav.template()}
      ${this.content.template()}
      ${this.button.template()}
    `
  }
}

class Nav {
  constructor(navData) {
    this.items = navData
  }
  template() {
    const nav = this.items.reduce((render, list) => 
      (render += `<li class="nav-content">${list}</li>`), ""
    )
    return `<ul class="nav-container">${nav}</ul>`
  }
}

class Content {
  constructor(contentData) {
    this.items = contentData
  }
  template() {
    const modifyListArray = this.items.reduce((item, data) => {
      const {content} = data
      const li = content.map(list => `<li>${list}</li>`).join("")
      item.push({...data, content: li})
      return item
    }, [])
    const contents = modifyListArray.reduce((render, list) => 
      (render += `<li class="content"><div><img src=${list.imgUrl}></div><div class="contents-content"><h4>${list.title}</h4><ul>${list.content}</ul></div></li>`), ""
    )
    return `<div class="contents-container"><ul class="contents">${contents}</ul></div>`;
  }
}

class Button {
  constructor(buttonData) {
    this.items = buttonData
  }
  template() {
    const buttons = this.items.reduce((render, button) => 
      (render += `<button class=${button + "Btn"}></button>`), ""
    )
    return `${buttons}` 
  }
}

export {Carousel, Nav, Content, Button}