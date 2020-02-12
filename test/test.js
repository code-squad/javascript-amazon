// window.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');
//     onMouseDownHandler();
// });

// const onMouseDownHandler = () => {
//     let [left, right] = document.querySelectorAll("button");
//     let move = document.querySelector(".main-image-child");

//     left.addEventListener("mousedown", () => {
//         console.log("왼쪽 클릭!");
//     });

//     right.addEventListener("mousedown", () => {
//         console.log("오른쪽 클릭!");
//     });

//     left.addEventListener("mousedown", () => {
//         move.style.transform = "translateX(0px)";
//     });

//     right.addEventListener("mousedown", () => {
//         move.style.transform = "translateX(-800px)";
//     });
// }


// // class 이용 방식
// class SlideService {
//     constructor(buttonEl) {
//         this.buttonEl = buttonEl;
//         this.onMouseDownHandler();
//     }

//     onMouseDownHandler = () => {
//         let [left, right] = document.querySelectorAll("button");

//         left.addEventListener("mousedown", () => {
//             this.buttonEl.style.transform = "translateX(0px)";
//         });

//         right.addEventListener("mousedown", () => {
//             this.buttonEl.style.transform = "translateX(-800px)";
//         });
//     }
// }

// window.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');
//     const target = document.querySelector(".main-image-child");
//     const ss = new SlideService(target);
// });

class SlideService {
    constructor(buttonEl) {
        this.buttonEl = buttonEl;
        this.onMouseDownHandler();
    }

    onMouseDownHandler = () => {
        let [left, right] = document.querySelectorAll("button");
        let clickCount = -400;

        left.addEventListener("mousedown", () => {
            clickCount += 400;
            if (clickCount > 0) clickCount = -800;
            this.buttonEl.style.transform = `translateX(${clickCount}px)`;
        });
        right.addEventListener("mousedown", () => {
            clickCount -= 400;
            if (clickCount < -800) clickCount = 0;
            this.buttonEl.style.transform = `translateX(${clickCount}px)`;
        });

    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const target = document.querySelector(".main-image-child");
    const ss = new SlideService(target);
});