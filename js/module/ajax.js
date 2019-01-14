export const ajax = {
    getReq(url){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open("GET", url);
            xhr.addEventListener("load", () => {
                if(xhr.status >= 200 && xhr.status < 400) resolve(JSON.parse(xhr.response));
                else reject(xhr.status);
            });
            xhr.send();
        });
    }
}
