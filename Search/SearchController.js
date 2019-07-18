class SearchController {
  constructor({inputView , matchedView , searchModel}){
    this.inputView = inputView;
    this.matchedView = matchedView;
    this.searchModel = searchModel;
  }
  
  init(){
    this.registerEvents();
  }

  registerEvents(){
    // input 이벤트가 발생할때 this.inputViewKeyDownHandler 이런 핸들러함수가 일어날것이다~
    //// keydown 말고 input으로 해야함 
    this.inputView.div.addEventListener('input',({target:{value}})=>this.inputViewKeyDownHandler(value));
  }

  async inputViewKeyDownHandler(value){
    // input 이벤트가 일어난곳에서 e.target.value 로 데이터를 받고 받은 인자를 모델에게 전달한다. 
    //// 확인을 해볼수가 없으니 inputView , Model 만들고 연결도 해야함! 
    console.log(value);
    //모델에게 value 보내고 , matchedData를 받아오고 , matchedView에 보내준다. 
    const matchedData = await this.searchModel.find(value);
    await this.matchedView.render(matchedData);
    
  }
}

export default SearchController;