// keywords AutoComplete Module.js step5

import { SETTING_VALUES } from "./setting_values.js";

class KeywordsAutoCompleteModule {
    constructor({
        FETCH_REQUEST_URL_FOR_KEYWORDS,
        KEYWORDS_LIST_LIMIT,
        FETCH_REQUEST_TIMER,
        INPUT_PREVENTION_KEYS,
        RESULT_LI_ELEMENTS_TEMPLET,
        ITEM_LINK_URL_TEMPLET,
        HIGHLIGHT_SPAN_TEMPLET
    }) {
        this.URL = FETCH_REQUEST_URL_FOR_KEYWORDS;
        this.LIMIT = KEYWORDS_LIST_LIMIT;
        this.TIMER = FETCH_REQUEST_TIMER;
        this.KEYS = INPUT_PREVENTION_KEYS;
        this.LI_TEMPLET = RESULT_LI_ELEMENTS_TEMPLET;
        this.URL_TEMPLET = ITEM_LINK_URL_TEMPLET;
        this.SPAN_TEMPLET = HIGHLIGHT_SPAN_TEMPLET;
        this.inputTextField = document.querySelector(".input-search-field"); // 검색창 엘리먼트 
        this.resultWindow = document.querySelector(".auto-complete-result-window"); // 자동완성결과 div 엘리먼트
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
        if (this.checkIsEmptyField({ keyCode })) return;
        if (this.checkIsUtilityKey({ keyCode })) return;
        this.initialInputText = this.inputTextField.value;
        this.triggerTimeout = setTimeout(() => {
            let composedURL = this.composeFetchRequestURL();
            this.operateFetch(composedURL);
        }, this.TIMER);
    }

    checkIsEmptyField({ keyCode }) {
        if (this.inputTextField.value === ""
            && (keyCode === 8 || keyCode === 38 || keyCode === 40))
            return true;
    }

    checkIsUtilityKey({ keyCode }) {
        let result = this.KEYS.some(keys =>
            keyCode === keys["keyCode"]
        );
        return result;
    }

    composeFetchRequestURL() {
        let composedURL = this.URL + this.inputTextField.value.toLowerCase();
        return composedURL;
    }

    async operateFetch(URL) {
        try {
            const keywordsListText = await fetch(URL, { mode: "cors" });
            const keywordsListObj = await keywordsListText.json();
            const itemsInfoList = this.generateItemsInfoList(keywordsListObj);
            return this.addItemLiElement(itemsInfoList);
        } catch (err) {
            this.resultListArea.innerHTML = `<li>추천 검색어가 없습니다.</li>`
            this.resultWindow.classList.add("window-display-block");
            return;
        }
    }

    generateItemsInfoList(jsonData) {
        let itemsInfoList = jsonData.suggestions.reduce(function (list, value) {
            return [...list, { value: value['value'], refTag: value['refTag'] }];
        }, []);
        return itemsInfoList;
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
        let highlightedSpan = this.SPAN_TEMPLET.replace(regExp, inputText);
        let highlightedKeywords = value['value'].replace(inputText, highlightedSpan);
        let itemLink = this.URL_TEMPLET.replace(regExp, value['refTag'])
            .replace(regExp, fieldKeywords)
            .replace(regExp, inputText);
        return this.LI_TEMPLET.replace(regExp, itemLink)
            .replace(regExp, highlightedKeywords);
    }

    // 키보드 조작
    moveUpDown({ keyCode }) {
        if (this.checkIsEmptyField({ keyCode })) return;
        if (this.suggestionItems === undefined) return;
        else if (keyCode === 40) {
            this.moveDown();
        } else if (keyCode === 38) {
            this.moveUp();
        }
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
        if (this.UpDownCount >= this.LIMIT) {
            this.suggestionItems[this.LIMIT - 1].classList.remove("highlight-background");
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
        if (this.UpDownCount <= 1) {
            this.UpDownCount = this.LIMIT + 1;
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
        let div = document.querySelector(".auto-complete-result-window");
        if (window.getComputedStyle(div).borderColor === "rgb(1, 0, 0)") {
            return;
        }
        this.removeItems();
    }

    // 백스페이스로 모든 텍스트를 삭제했을 때 결과창 닫기
    closeWindowOnInput() {
        if (this.inputTextField.value === "") this.removeItems();
    }

    // ESC키 입력 시 결과창 닫기
    closeWindowOnESC({ keyCode }) {
        if (keyCode === 27) this.removeItems();
    }

    removeItems() {
        this.resultWindow.classList.remove("window-display-block");
        this.suggestionItems = "";
        this.resultListArea.innerHTML = "";
    }

    //  마우스 커서를 대면 하이라이트 토글 켜기
    turnOnHighlight({ target }) {
        if (target.tagName === "LI" || target.tagName === "A") {
            target.closest("li").classList.toggle("highlight-background");
        }
    }

    //  마우스 커서가 벗어나면 하이라이트 토글 끄기
    turnOffHighlight({ target }) {
        if (target.tagName === "LI" || target.tagName === "A") {
            target.closest("li").classList.toggle("highlight-background");
        }
    }

    // 검색결과 클릭 시 해당 링크 이동
    clickGoToLink(evt) {
        evt.preventDefault();
        if (evt.target.tagName === "LI" || evt.target.tagName === "A") {
            window.open(evt.target.closest("li").firstElementChild.href, "_self");
            this.resultWindow.classList.remove("window-display-block");
            this.suggestionItems = "";
        }
    }
}

const keywordsAutoCompleteModule = new KeywordsAutoCompleteModule(SETTING_VALUES);

