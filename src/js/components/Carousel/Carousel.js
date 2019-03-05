class Carousel{
    constructor(){
        this.getImages();
    }
    getImages(){
        const httpMethod = "get", successStatus = 200, 
              failStatus = 404, successReadyState = 4;
        const url = "./data/data.json";
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState === successReadyState){
                    if(xhr.status === successStatus){
                        const resp = JSON.parse(this.responseText) 
                        resolve(resp);
                    } else {
                        new Error();
                    }
                }
            };
            xhr.open(httpMethod, url);
            xhr.send();
        })
    }
}

export { Carousel };