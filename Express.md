## express static 활용 

html 파일을 들여다 보면 아래와 같이 태그 내부에 src 속성이 있는 태그들이 있다.

```html
<img src="/images/carousel/carousel_1.jpg" alt="">
<img src="/images/carousel/carousel_2.jpg" alt="">
<img src="/images/carousel/carousel_3.jpg" alt="">
<img src="/images/carousel/carousel_4.jpg" alt="">
<script type="module" src="./Main/main.js"></script>
```

브라우저가 html 파싱을 시작하며 해당 태그들을 만나면 src 속성의 주소를 활용해 네트워크 요청을 한다. 요청의 결과는 다음과 같다. 

![static 파일](assets/static 파일.jpg)

서버가 해당 요청에 대응하기 위해서는 각각의 URL에 대응하는 라우터 설정 필요하다. 사실 네트워크 요청은 별도의 복잡한 처리가 필요 없으며, 라우터는 해당하는 주소에 있는 파일을 다시 돌려주는 response로 돌려주는 역할을 담당한다. 그 역할을 위해 라우터를 매번 설정하는 일은 번거롭고 반복적이다. 

이것이 바로 `express.static` 미들웨어가 필요한 이유다. 동적인 처리가 필요없는 정적 파일들을 public 폴더에 넣어두고 `express.static` 미들웨어의 인자로 `'public'` 폴더를 등록하면 별도 라우팅 설정 없이 정적파일 요청에 간편하게 응답할 수 있다. `express.static` 은 아래와 같이 사용할 수 있다. 

```js
const express = require('express');

app.use(express.static('public'));
```

