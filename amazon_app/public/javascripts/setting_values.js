// setting_values.js step6

export { SETTING_VALUES };

const SETTING_VALUES = {

    FETCH_REQUEST_URL_FOR_KEYWORDS: "http://localhost:3000/request-auto-keywords/",

    KEYWORDS_LIST_MAX_LIMIT: 10,

    KEYWORDS_LIST_MIN_LIMIT: 1,

    FETCH_REQUEST_TIMER: 500,

    INPUT_PREVENTION_KEYS: [
        { key: "Shift", keyCode: 16 },
        { key: "Control", keyCode: 17 },
        { key: "Alt", keyCode: 18 },
        { key: "Meta", keyCode: 91 },
        { key: "Meta", keyCode: 93 },
        { key: "ArrowUp", keyCode: 38 },
        { key: "ArrowDown", keyCode: 40 },
        { key: "ArrowLeft", keyCode: 37 },
        { key: "ArrowRight", keyCode: 39 },
        { key: "Enter", keyCode: 13 },
        { key: "Escape", keyCode: 27 }
    ],

    resultLiElement_TEMPLATE: `<li class="suggestion-item"><a class="link-style" href="{{}}">{{}}</a></li>`,

    itemLink_URL_TEMPLATE:`http://localhost:3000/amazon-search?ref={{}}&field-keywords={{}}&prefix={{}}`,

    highlight_span_TEMPLATE: `<span class="highlighted-keywords">{{}}</span>`,

    notFoundKeyword_MSG: `<li>추천 검색어가 없습니다.</li>`
}