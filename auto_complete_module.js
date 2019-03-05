// keywords AutoComplete Module.js step6

import { SETTING_VALUES } from "./setting_values.js";

class KeywordsAutoCompleteModule {
    constructor({
        FETCH_REQUEST_URL_FOR_KEYWORDS,
        KEYWORDS_LIST_MAX_LIMIT,
        KEYWORDS_LIST_MIN_LIMIT,
        FETCH_REQUEST_TIMER,
        INPUT_PREVENTION_KEYS,
        resultLiElement_TEMPLATE,
        itemLink_URL_TEMPLATE,
        highlight_span_TEMPLATE,
        notFoundKeyword_MSG
    }) {
        this.URL = FETCH_REQUEST_URL_FOR_KEYWORDS;
        this.MAX_LIMIT = KEYWORDS_LIST_MAX_LIMIT;
        this.MIN_LIMIT = KEYWORDS_LIST_MIN_LIMIT;
        this.TIMER = FETCH_REQUEST_TIMER;
        this.KEYS = INPUT_PREVENTION_KEYS;
        this.li_TEMPLATE = resultLiElement_TEMPLATE;
        this.url_TEMPLATE = itemLink_URL_TEMPLATE;
        this.span_TEMPLATE = highlight_span_TEMPLATE;
        this.notFound_MSG = notFoundKeyword_MSG;
        
        this.inputTextField = document.querySelector(".input-search-field"); // 검색창 엘리먼트 
        this.resultWindow = document.querySelector(".auto-complete-result-window"); // 자동완성결과 div 엘리먼트
        this.resultWindow.dataset.cursorOn = false;
        this.resultListArea = document.querySelector(".result-list-area"); // 자동완성결과 ul 리스트
        this.triggerTimeout = "";
        this.initEventListener();
    }

    initEventListener() {
        this.inputTextField.addEventListener("keyup", this.triggerFetch.bind(this));
        this.inputTextField.addEventListener("keyup", this.moveUpDown.bind(this));
        this.inputTextField.addEventListener("keyup", this.enterGoToLink.bind(this));
        this.inputTextField.addEventListener("blur", this.closeWindowOnBlur.bind(this));
        this.inputTextField.addEventListener("input", this.closeWindowOnInput.bind(this));
        this.inputTextField.addEventListener("keydown", this.closeWindowOnESC.bind(this));

        this.resultWindow.addEventListener("mouseover", this.turnOnHighlight.bind(this));
        this.resultWindow.addEventListener("mouseout", this.turnOffHighlight.bind(this));
        this.resultWindow.addEventListener("click", this.clickGoToLink.bind(this));
    }

    triggerFetch({ keyCode }) {
        if (this.triggerTimeout) clearTimeout(this.triggerTimeout);
        if (this.disableDelKeyOnEmptyField({ keyCode })) return;
        if (this.disableUtilKey({ keyCode })) return;
        this.initialInputText = this.inputTextField.value;
        this.triggerTimeout = setTimeout(() => {
            let composedURL = this.composeFetchRequestURL();
            this.operateFetch(composedURL);
        }, this.TIMER);
    }

    // 검색창이 비어있는 상태에서 백스페이스 입력 금지(fetch 요청 금지)
    disableDelKeyOnEmptyField({ keyCode }) {
        if (this.inputTextField.value === "" && keyCode === 8)
            return true;
    }

    // 기타 유틸리키 입력 금지(fetch 요청 금지)
    disableUtilKey({ keyCode }) {
        let matchResult = this.KEYS.some(keys =>
            keyCode === keys["keyCode"]
        );
        return matchResult;
    }

    // fetch 요청 url 구성
    composeFetchRequestURL() {
        let composedURL = this.URL + this.inputTextField.value.toLowerCase();
        return composedURL;
    }

    // fetch api 호출
    async operateFetch(URL) {
        try {
            const keywordsListText = await fetch(URL, { mode: "cors" });
            const keywordsListObj = await keywordsListText.json();
            const itemsInfoList = this.generateItemsInfoList(keywordsListObj);
            return this.addItemLiElement(itemsInfoList);
        } catch (err) {
            this.suggestionItems = "";
            this.resultListArea.innerHTML = this.notFound_MSG;
            this.resultWindow.classList.add("window-display-block");
            return;
        }
    }

    // 항목 정보 배열 생성
    generateItemsInfoList(jsonData) {
        return jsonData.suggestions.reduce((list, value) => {
            return [...list, { value: value['value'], refTag: value['refTag'] }];
        }, []);
    }

    // 자동완성결과 DOM 추가
    addItemLiElement(itemsInfoList) {
        let inputText = this.inputTextField.value.toLowerCase(); // 입력한 값은 모두 소문자로 처리해서 inputText로 넘긴다. 
        let itemLiElement = itemsInfoList.reduce((accumulator, value) => {
            let eachItemLiElement = this.composeLiElement(value, inputText);
            return accumulator += eachItemLiElement;
        }, "");
        this.UpDownCount = 0;
        this.resultListArea.innerHTML = itemLiElement;
        this.suggestionItems = document.querySelectorAll(".suggestion-item");
        this.resultWindow.classList.add("window-display-block");
    }

    // URL, li 엘리먼트 구성
    composeLiElement(value, inputText) {
        let regExp = new RegExp('\{\{\}\}');
        let fieldKeywords = value['value'].replace(/\s/g, "+");
        let highlightedSpan = this.span_TEMPLATE.replace(regExp, inputText);
        let highlightedKeywords = value['value'].replace(inputText, highlightedSpan);
        let itemLink = this.url_TEMPLATE.replace(regExp, value['refTag'])
            .replace(regExp, fieldKeywords)
            .replace(regExp, inputText);
        return this.li_TEMPLATE.replace(regExp, itemLink)
            .replace(regExp, highlightedKeywords);
    }

    // 키보드 조작
    moveUpDown({ keyCode }) {
        if (this.disableDelKeyOnEmptyField({ keyCode })) return;
        if (this.disableUpDownKey()) return;
        if (this.suggestionItems === undefined) return;
        else if (keyCode === 40) {
            this.moveDown();
        } else if (keyCode === 38) {
            this.moveUp();
        }
    }

    // 키보드 상하키 입력 금지
    disableUpDownKey() {
        if (this.resultListArea.innerHTML === this.notFound_MSG || this.resultListArea.innerHTML === "")
            return true;
    }

    // 키보드 아래로 이동
    moveDown() {
        if (this.initUpDownCountOnEnd()) return;
        this.selectedItem = this.suggestionItems[this.UpDownCount];
        if (this.suggestionItems[this.UpDownCount - 1]) {
            this.suggestionItems[this.UpDownCount - 1].classList.remove("highlight-background");
        }
        this.selectedItem.classList.add("highlight-background");
        this.inputTextField.value = this.selectedItem.innerText;
        this.UpDownCount++;
    }

    // 선택 부분이 리스트의 끝까지 도달했을 때 설정 초기화
    initUpDownCountOnEnd() {
        if (this.UpDownCount >= this.MAX_LIMIT) {
            this.suggestionItems[this.MAX_LIMIT - 1].classList.remove("highlight-background");
            this.UpDownCount = 0;
            this.inputTextField.value = this.initialInputText;
            return true;
        }
    }

    // 키보드 위로 이동
    moveUp() {
        if (this.initUpDownCountOnBegin()) return;
        this.UpDownCount--;
        this.selectedItem = this.suggestionItems[this.UpDownCount - 1];
        this.selectedItem.classList.add("highlight-background");
        if (this.suggestionItems[this.UpDownCount]) {
            this.suggestionItems[this.UpDownCount].classList.remove("highlight-background");
        }
        this.inputTextField.value = this.selectedItem.innerText;
    }

    // 선택 부분이 리스트의 처음 도달했을 때 설정 초기화
    initUpDownCountOnBegin() {
        if (this.UpDownCount <= this.MIN_LIMIT) {
            this.UpDownCount = this.MAX_LIMIT + 1;
            this.suggestionItems[0].classList.remove("highlight-background");
            this.inputTextField.value = this.initialInputText;
            return true;
        }
    }

    // 엔터키를 누르면 선택된 항목의 url로 이동
    enterGoToLink({ keyCode }) {
        if (keyCode === 13 && this.inputTextField.value === "") {
            return;
        }
        else if (keyCode === 13) {
            window.open(this.selectedItem.firstElementChild.href, "_self");
            this.resultWindow.classList.remove("window-display-block");
        }
    }

    // 포커스가 벗어났을 때 검색창 닫기
    closeWindowOnBlur() {
        if (this.resultWindow.dataset.cursorOn === "true") {
            return;
        }
        this.removeItems();
        this.resultWindow.dataset.cursorOn = false;
    }

    // 백스페이스로 모든 텍스트를 삭제했을 때 결과창 닫기
    closeWindowOnInput() {
        if (this.inputTextField.value === "") this.removeItems();
    }

    // ESC키 입력 시 결과창 닫기
    closeWindowOnESC({ keyCode }) {
        if (keyCode === 27) this.removeItems();
    }

    // 결과창 초기화
    removeItems() {
        this.resultWindow.classList.remove("window-display-block");
        this.suggestionItems = "";
        this.resultListArea.innerHTML = "";
    }

    // 마우스 커서를 대면 하이라이트 토글 켜기
    turnOnHighlight({ target }) {
        this.toggleHighlight({ target });
        this.resultWindow.dataset.cursorOn = true;
    }

    // 마우스 커서가 벗어나면 하이라이트 토글 끄기
    turnOffHighlight({ target }) {
        this.toggleHighlight({ target });
        this.resultWindow.dataset.cursorOn = false;
    }

    // 하이라이트 토글 기능
    toggleHighlight({ target }) {
        if (target.tagName === "LI" || target.tagName === "A") {
            target.closest("li").classList.toggle("highlight-background");
        }
    }

    // 검색결과 클릭 시 해당 링크 이동
    clickGoToLink(evt) {
        evt.preventDefault();
        if (evt.target.tagName === "LI" || evt.target.tagName === "A") {
            window.open(evt.target.closest("li").firstElementChild.href, "_self");
            this.removeItems();
        }
    }
}

const keywordsAutoCompleteModule = new KeywordsAutoCompleteModule(SETTING_VALUES);