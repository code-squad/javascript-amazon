const SEARCH_AJAX_INFORMATION = Object.freeze({
    URL: 'https://us-central1-example-29f86.cloudfunctions.net/api1/',
});

const SEARCH_STATUS = Object.freeze({
    NORMAL: 0,
    AUTOCOMPLETION: 1,
    RECENT_SEARCH: 2
});

const SEARCH_TIMEOUT = Object.freeze({
    REQUEST: 500,
    CACHED: 300,
});

const SEARCH_CACHE_INFORMATION = Object.freeze({
    KEY: 0,
    MAX_CACHE_COUNT: 5,
});

export default {SEARCH_AJAX_INFORMATION, SEARCH_STATUS, SEARCH_TIMEOUT, SEARCH_CACHE_INFORMATION};