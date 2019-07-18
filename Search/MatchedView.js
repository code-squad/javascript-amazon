class MatchedView {
  constructor({mathedDiv}){
    // this.mathedDiv = document.querySelector(mathedDiv)
    this.div = document.querySelector(mathedDiv)
  }
  
  render(data){
    console.log('모델이 준 fetchedData',data.body.suggestions);
  }
}

export default MatchedView;