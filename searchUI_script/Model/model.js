
/*
  검색 자동 완성 기능

  1. 검색어를 입력한다.
  2. fetch api를 통해 검색어와 일치하는 값들을 불러온다.
  3. 관련 용어를 검색창 하단에 노출시킨다.


  1. 검색어를 입력한다
    1-1) input 태그를 사용한다.
    1-2) 'input' event를 발생시킨다. ==> 입력 값을 불러온다.

  2. fetch api를 통해 검색어와 일치하는 값들을 불러온다.
    2-1) input event의 event.target.value 값을 사용한다. ==> 입력한 검색어(inputText)
    2-2) inputText를 이용하여, 필요한 데이터를 fetch를 통해 불러온다. ==> `fetch('http/.../${inputText}')`

  3. 관련 용어를 검색창 하단에 노출시킨다.
*/

export default class Model {
  constructor(optionObj) {
    this.optionObj = optionObj;
  }

  init() {
    this.addEvent();
  }

  addEvent() {
    this.optionObj.search.addEventListener('input', this.getFetchData.bind(this))
  }

  getFetchData(event) {
    const inputVal = event.target.value;
    const responseUrl = `https://completion.amazon.com/api/2017/suggestions?session-id=146-2216035-3218645&customer-id=&request-id=DV2W3G68C9YMG9FR19CF&page-type=PrimeLandingPageHorizonte&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=73&prefix=${inputVal}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&_=1551712792496`

    // const responseUrl = `http://crong.codesquad.kr:8080/amazon/ac/${inputVal}`;
    this.fetchData(responseUrl);
  }

  fetchData(responseUrl) {
    fetch(responseUrl)
      .then(res => {
        return res.json()
      })
      .then(data => {
        data.suggestions.forEach(element => {
          this.optionObj.search.innerHTML += element.value;
        });
      });
  }
}



