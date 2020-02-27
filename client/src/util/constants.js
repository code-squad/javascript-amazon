export const URL = {
    DEV: {
        API_SERVER_CARD: {
            ADDRESS: "http://localhost:8080/cards"
        },
        API_SERVER_SEARCH: {
            ADDRESS: "http://localhost:8080/search/"
        }
    },
    PROD: {
        API_SERVER_CARD: {
            ADDRESS: "https://ui-f5602.firebaseapp.com/cards"
        },
        API_SERVER_SEARCH: {
            ADDRESS: "https://ui-f5602.firebaseapp.com/search/"
        }
    }
}

export const KEY_CODE = {
    ARROW_UP: 38,
    ARROW_DOWN: 40,
    ENTER_KEY: 13
}

export const DIRECTION = {
    UP: -1,
    DOWN: 1
}

export const SCROLL = {
    TOP_START: 0,
    BOTTOM_END: 1500,
    ONE_UNIT: 20
}

export const CSS_CLASS = {
    SEARCH_BAR_DIV: 'hitlist-wrapper',
    SEARCH_LIST_UL: 'search-list-words',
    SEARCH_LIST_LI: 'search-list-word',
    SEARCH_LIST_TARGET_WORD: 'target-word',
    SEARCH_LIST_REST_WORD: 'rest-word'
}