var el = document.querySelector('.plans-layer');

window.addEventListener("scroll", function (e){
    console.log(window.scrollY);
    if(window.scrollY > 366) el.classList.add('shown');
    else el.classList.remove('shown');
});