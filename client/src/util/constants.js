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

export const ARROW_UP = 38;
export const ARROW_DOWN = 40;
export const ENTER_KEY = 13;
export const ONE_SCROLL_UNIT = 20;
export const SCROLL_TOP_START = 0;
export const SCROLL_BOTTOM_END = 1500;
export const DIRECTION_UP = -1;
export const DIRECTION_DOWN = 1;