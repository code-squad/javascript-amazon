function ajax({httpMethod, url}) {
    const successReadyState=4;
    const successStatus=200;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === successReadyState){
                if(xhr.status === successStatus){
                    const resp = JSON.parse(this.responseText) 
                    resolve(resp);
                } else {
                    reject(new Error());
                }
            }
        };
        xhr.open(httpMethod, url);
        xhr.send();
    })
}

export { ajax };