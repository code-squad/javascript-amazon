const SEARCH_AJAX_INFORMATION = Object.freeze({
    URL: 'https://ello.dlinkddns.com:8080',
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
    KEY: '<cached-data>',
    MAX_CACHE_COUNT: 5,
});

export default {SEARCH_AJAX_INFORMATION, SEARCH_STATUS, SEARCH_TIMEOUT, SEARCH_CACHE_INFORMATION};