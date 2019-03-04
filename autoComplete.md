## **요구사항**
- 검색어를 입력하면 자동완성결과가 노출된다.
- Ajax를 통해서 데이터를 가져온다. 하지만 연속된키보드 입력에 모두 request하지 않고, 1.0 초동안 입력내용이 없을때 서버로 요청한다. 
    * 노출된 데이터 중 검색어와 일치하는 단어는 색깔이 하이라이트 되여 보여진다.
    * 입력창의 내용을 백스페이스로 삭제해도 일치하는 자동완성결과가 노출된다. 
    * 자동완성 결과는 키보드 위/아래키로 이동할수 있다.
    * 자동완성 결과를 키보드 방향키로 이동시에 선택부분의 배경색은 변경된다. 선택된 상태에서 엔터키를 입력하면 해당검색어가 위쪽 검색input창에 추가된다. 동시에 검색결과창은 사라진다.
- 자동완성 결과는 고유한 URL구조를 가진다. 
- 실제 검색버튼을 눌러도 검색이 이뤄지진 않으며, 자동완성 결과 창은 닫힌다.

## **설계**

1. form 태그 사용하여 인풋 마크업 만들기 
2. Ajax로 데이터 받아오기
3. 인풋값 파악하기  
    3-1. 첫 입력이 있고 1초 지나면 서버로 데이터 요청  
    3-2. 검색어와 일치되는 단어 하이라이트  
    3-3. 자동완성결과 노출 후 백스페이스로 입력창 내용 삭제해도 자동완성결과는 노출됨  
    3-4. 자동완성결과는 키보드 위/아래 키로 이동 가능  
    3-5. 이동 시 선택 부분 배경색 변경됨
4. 자동완성 결과 고유한 URL구조 갖는다.
5. 검색 버튼을 누르거나 엔터를 누르면 선택된 자동완성 결과가 input 창에 추가되고 동시에 결과창은 사라짐 

### API URL

API URL
URL구조는 아래와 같다. cors가 지원되는 서버다. 
http://crong.codesquad.kr:8080/amazon-ac/:query

실제 요청은 다음과 같이 하면 된다. 
ex) 
http://crong.codesquad.kr:8080/amazon/ac/i 
http://crong.codesquad.kr:8080/amazon/ac/ip http://crong.codesquad.kr:8080/amazon/ac/iph http://crong.codesquad.kr:8080/amazon/ac/ipho http://crong.codesquad.kr:8080/amazon/ac/iphon http://crong.codesquad.kr:8080/amazon/ac/iph
현재 지원되는 문자열은, 다음과 같다.

"iphone8"
"bicycle hel"
"javascript"

### 고유한 URL

각 자동완성결과는 고유한 링크 URL을 가지고 있어야 한다. 예를들어, iphone 으로 검색했을때 노출되는 자동완성 결과 중에는 'iphone 8 case' 라는게 있다고 가정한다. iphone 8 case 는 고유한 링크URL을가지고 있어서, 마우스로 클릭을 하면 이동이 되어야 한다. URL은 서버로부터 받은 데이터를 통해서 아래와 같은 구조로 만든다.

http://crong.codesquad.kr:8080/amazon-search?ref=nb_sb_ss_c_1_11&field-keywords=iphone+8+plus+case&prefix=iphone

ref는 suggestions안에 있는 refTag이다.   field-keywords는 선택된 문자열이다.(자동완성 데이터) prefix 는 사용자가 입력한 문자열이다.

## **스켈레톤**

```js
const AutoComplete {
    constructor() {
        인풋
        인풋버튼
        url
    }
    addEvent() {
        인풋버튼.addEventListener("click", ((e)=> e.preventDefault())

        인풋.addEventListener("input", {
            결과창 켜는 함수,
            인풋창에 데이터 넣는 함수(url, 인풋.value)
        } 
    }
    showResultWindow() {
        결과창 켜는 css
    }

    getData(url, value) {
        fetch(url+value)
            .then(response => response.json())
            .then(data => {
                let arr = data.suggestions;
                결과창에 데이터 뿌리기(arr)
            })
            .catch(err => console.log(err));
        })
    }

    renderResult(data) {
        templating해서 데이터 보여줘야되나? 
        `<li>data.value</li>`
    }

}
```

