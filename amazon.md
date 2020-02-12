[기획서](https://docs.google.com/presentation/d/1E0HUKbGFaGpGIyZFbQ5iyX-egynVwXqfGqwl42VE1g4/edit#slide=id.g5469229b45_0_0)


# OOP WITH ES Classes








arry like type
from

$0.innerHTML
$0.parentElement

let [left, right] = document.querySelectorAll("button");

right.addEventListener("click", ()=> {
 console.log("오른쪽 클릭!");
});

click, mousemove, ...

window.addEventListener("resize", ()=> {
 console.log("오른쪽 클릭!");
});


interval 고려


# test code
```javascript
let [left, right] = document.querySelectorAll("button")

left.addEventListener("mousedown", ()=> {
 console.log("왼쪽 클릭!");
});

let move = document.querySelector(".main-image-child")

// move.style.transform = "translateX(-800px)"

right.addEventListener("mousedown", ()=> {
move.style.transform = "translateX(-800px)";
});
```

# master code
```javascript
let [left, right] = document.querySelectorAll("button");
right.addEventListener("mousedown", (e)=> {
    //const viewerEl = document.querySelector(".viewer > .img-section")
    const ul = e.target.previousElementSibling.firstElementChild;
    ul.style.marginLeft = "-800px";
});
```