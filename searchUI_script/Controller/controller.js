export default class Controller {
  constructor(view, model, optionObj) {
    this.view = view;
    this.model = model;
    this.optionObj = optionObj;
    this.addEvent();
  }
  addEvent() {
    this.optionObj.search.addEventListener('input', this.getFetchData.bind(this));
  }
  getFetchData(event) {
    const inputVal = event.target.value;
    const responseUrl = `https://completion.amazon.com/api/2017/suggestions?session-id=146-2216035-3218645&customer-id=&request-id=DV2W3G68C9YMG9FR19CF&page-type=PrimeLandingPageHorizonte&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=73&prefix=${inputVal}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&_=1551712792496`;
    this.model.fetchData(responseUrl)
      .then(suggestionsArr => {
        this.view.isSuggestion(suggestionsArr);
      });
  }
}