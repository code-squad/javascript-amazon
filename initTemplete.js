
const carouselContents = document.querySelector(".carousel__contents");
let contentsData = undefined;
fetch("./localData.json")
.then(response=>response.json())
.then(data=>{
    contentsData = data;
})

let liTemplete =  `<li class="item contents__item">
<div class="item__img-container">
    <img src="${contentsData[i].imgAdress}" alt="membership-card.png" />
</div>
<div class="desc item__desc">
    <h3 class="desc__title">${contentsData[i].title}</h3>
    <ul class="desc__text">
        <li>
        ${contentsData[i].desc}
        </li>
    </ul>
</div>
</li>`




//  <ol>
//     <li class="item contents__item">
//         <div class="item__img-container">
//             <img src="./images/Card_A01.png" alt="membership-card.png" />
//         </div>
//         <div class="desc item__desc">
//             <h3 class="desc__title">1번째 화면 Enjoy exclusive savings and reawards</h3>
//             <ul class="desc__text">
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//                 <li>
//                     Consectetur adipisci accusamus ad officia autem eum
//                     dignissimos a deleniti, magni cupiditate consequuntur debitis.
//                 </li>
//                 <li>
//                     Voluptate, ullam molestias necessitatibus sequi distinctio
//                     veniam facere.
//                 </li>
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//             </ul>
//         </div>
//     </li>
//     <li class="item contents__item">
//         <div class="item__img-container">
//             <img src="./images/Card_B01.png" alt="membership-card.png" />
//         </div>
//         <div class="desc item__desc">
//             <h3 class="desc__title">2번째 화면 Enjoy exclusive savings and reawards</h3>
//             <ul class="desc__text">
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//                 <li>
//                     Consectetur adipisci accusamus ad officia autem eum
//                     dignissimos a deleniti, magni cupiditate consequuntur debitis.
//                 </li>
//                 <li>
//                     Voluptate, ullam molestias necessitatibus sequi distinctio
//                     veniam facere.
//                 </li>
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//             </ul>
//         </div>
//     </li>
//     <li class="item contents__item">
//         <div class="item__img-container">
//             <img src="./images/Card_C01.png" alt="membership-card.png" />
//         </div>
//         <div class="desc item__desc">
//             <h3 class="desc__title">3번째 화면 Enjoy exclusive savings and reawards</h3>
//             <ul class="desc__text">
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//                 <li>
//                     Consectetur adipisci accusamus ad officia autem eum
//                     dignissimos a deleniti, magni cupiditate consequuntur debitis.
//                 </li>
//                 <li>
//                     Voluptate, ullam molestias necessitatibus sequi distinctio
//                     veniam facere.
//                 </li>
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//             </ul>
//         </div>
//     </li>
//     <li class="item contents__item">
//         <div class="item__img-container">
//             <img src="./images/Card_D01.png" alt="membership-card.png" />
//         </div>
//         <div class="desc item__desc">
//             <h3 class="desc__title">4번째 화면 Enjoy exclusive savings and reawards</h3>
//             <ul class="desc__text">
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//                 <li>
//                     Consectetur adipisci accusamus ad officia autem eum
//                     dignissimos a deleniti, magni cupiditate consequuntur debitis.
//                 </li>
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//                 <li>
//                     Voluptate, ullam molestias necessitatibus sequi distinctio
//                     veniam facere.
//                 </li>
//                 <li>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </li>
//             </ul>
//         </div>
//     </li>
// </ol> 