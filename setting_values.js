// setting_values.js step5

export { SETTING_VALUES };

const SETTING_VALUES = {

    FETCH_REQUEST_URL_FOR_KEYWORDS: "http://crong.codesquad.kr:8080/amazon/ac/",

    KEYWORDS_LIST_LIMIT: 10,

    FETCH_REQUEST_TIMER: 100,

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
        { key: "Enter", keyCode: 13 }
    ],

    RESULT_LI_ELEMENTS_TEMPLET: `<li class="suggestion-item"><a class="link-style" href="{{}}">{{}}</a></li>`,

    ITEM_LINK_URL_TEMPLET:`http://crong.codesquad.kr:8080/amazon-search?ref={{}}&field-keywords={{}}&prefix={{}}`,

    HIGHLIGHT_SPAN_TEMPLET: `<span class="highlighted-keywords">{{}}</span>`
}