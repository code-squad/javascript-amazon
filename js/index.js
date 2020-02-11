const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Change the background color of a class.
$('.class').style.background="#BADA55";

// Change the inner HTML of an ID.
$('#id').innerHTML="<span>Cool beans!</span>";

// Select all images on the webpage.
$$('img')

// Print the image addresses for all the images on a webpage.
$$('img').forEach(img => console.log(img.src))