class MatchedView {
  constructor({matchedUl}){
    this.ul = document.querySelector(matchedUl)
  }
  
  render(data){
    const {body:{suggestions}} = data
    console.log("suggestions",suggestions);
    this.ul.style.display = 'block'
    const liTemplates = suggestions.reduce((accum,cur)=>{
      accum += `<li class="suggestions">${cur.value}</li>`
      return accum
    },'')
    this.ul.insertAdjacentHTML("afterbegin",liTemplates)
     
  }
}

export default MatchedView;