export function $(selector, root = document) {
    return root.querySelector(selector);
}

export function $All(selector, root = document) {
    return root.querySelectorAll(selector);
}

export function debounce(callback, delay) {
    let timer = null;

    return function(){
        if(timer) clearTimeout(timer);

        timer = setTimeout(callback, delay);
    }
}

export const network = {
    async get(url) {
        const res = await fetch(url);

        if(res.status === 200) return res.json();                 
        return res;
    }
}

