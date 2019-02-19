import { qs } from "./util.js";

class Search_autocorrect {
  constructor(elObj, formObj) {
    Object.assign(this, { elObj, formObj });
    this.init();
  }

  init() {
    this.beforeData = null;
    this.formObj = qs(this.formObj.formId);
    this.formUrl = this.formObj.action;
    this.searchWindow = qs(this.elObj.searchWindow);
    this.autocorrectWindow = qs(this.elObj.autocorrectWindow);
    this.searchWindow.addEventListener('keyup', this.getSearchData.bind(this));
    //이벤트리스너 등록 등 여러가지
  }

  addList() {
    
    // 검색어를 입력하면 자동완성결과가 노출된다.
    // 입력창의 내용을 백스페이스로 삭제해도 일치하는 자동완성결과가 노출된다.
    // -입력이후 1초 뒤에 ajax데이터를 가져오는 방식으로 구현해보기.
  }

  getSearchData() {
    const inputValue = this.searchWindow.value;
    this.autocorrectWindow.innerHTML = this.beforeData;
    console.log(this.beforeData);
    fetch(this.formUrl + inputValue).then(res => {
      res.json().then(jsonData => {
        let nowData = ''
        if(jsonData.suggestions === undefined) {
          this.autocorrectWindow.innerHTML = null;
          this.beforeData = null;
          return;
        }
        jsonData.suggestions.forEach(suggestion => {
          nowData += `<li class="head-search-autocorrect-list">${suggestion.value}</li>`
        })
        this.beforeData = nowData;
        this.autocorrectWindow.innerHTML = nowData;
      })
    });
    // Ajax를 통해서 데이터를 가져온다. 하지만 연속된키보드
    //입력에 모두 request하지 않고, 1.0 초동안 입력내용이 없을때 서버로 요청한다.
  }

  highlightData() {
    // 노출된 데이터 중 검색어와 일치하는 단어는 색깔이 하이라이트 되여 보여진다.
    // -검색어와 일치하는 단어 => ajax데이터의 json데이터의 .prefix
  }

  addUrl() {
    // 자동완성 결과는 고유한 URL구조를 가진다.
  }

  moveListUpDown() {
    // 자동완성 결과는 키보드 위/아래키로 이동할수 있다.
    // 위 아래의 charCode를 얻어서 구현하면 될듯
  }
  changeListBackgourndColor() {
    // 자동완성 결과를 키보드 방향키로 이동시에 선택부분의 배경색은 변경된다.
  }
  addInputValue() {
    // 선택된 상태에서 엔터키를 입력하면 해당검색어가 위쪽 검색input창에 추가된다.  동시에 검색결과창은 사라진다.
  }

  submitFormData() {
    // 실제 검색버튼을 눌러도 검색이 이뤄지진 않으며, 자동완성 결과 창은 닫힌다.
  }
}

export { Search_autocorrect };
