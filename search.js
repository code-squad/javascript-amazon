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


class AutoSearching {
  constructor(optionObj) {
    this.optionObj = optionObj;
  }

  inputText() {
    this.optionObj.search.addEventListener('input', (event) => {
      const inputVal = event.target.value;
      fetch(`http://crong.codesquad.kr:8080/amazon/ac/${inputVal}`).then((res) => {
        return res.json();
      }).then(data => {
        for (let el of data.suggestions) {
          console.log(el)
        }
      });
    });
  }

  init() {

  }
}


const autoSearching = new AutoSearching(
  {
    'span': document.querySelector('#searchBar'),
    'search': document.querySelector(".search-tab")
  }
)
