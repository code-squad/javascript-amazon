class Ajax {
    getReq(url, callback){
        const xmlHttpReq = new XMLHttpRequest;

        xmlHttpReq.open("GET", url);
        xmlHttpReq.addEventListener("load", function(){
            const jsonData = JSON.parse(this.responseText);
            callback(jsonData);   
        })
        xmlHttpReq.send();
    }
}

export { Ajax };