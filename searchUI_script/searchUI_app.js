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

import Model from "./Model/model.js";
import View from "./View/view.js";
import Controller from "./Controller/controller.js";


document.addEventListener('DOMContentLoaded', () => {
  const model = new Model();
  const view = new View();
  new Controller(view, model, {
    search: document.querySelector('.search-tab')
  });
})

