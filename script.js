let firstSlide = document.querySelectorAll('.main-content')[0]
        let lastSlide = document.querySelectorAll('.main-content')[3]
        let currentSlide = document.querySelector('.showing')
        const arrows = document.querySelectorAll('.right-arrow, .left-arrow')    
        console.log(arrows)
        
        function setNextDisplay (event) {
            const nextSlide = currentSlide.nextElementSibling
            if(nextSlide === null) {
                currentSlide.classList.remove('showing')
                currentSlide = firstSlide
                currentSlide.classList.add('showing')
            } else {
                nextSlide.classList.add('showing')
                currentSlide.classList.remove('showing')
                currentSlide = nextSlide;
            }
        }

        function setPreviousDisplay (event) {
            const previousSlide = currentSlide.previousElementSibling
            if(previousSlide === null) {
                currentSlide.classList.remove('showing')
                currentSlide = lastSlide
                currentSlide.classList.add('showing')
            } else {
                previousSlide.classList.add('showing')
                currentSlide.classList.remove('showing')
                currentSlide = previousSlide;
            }
        }
        
        arrows[1].addEventListener('click', setNextDisplay)
        arrows[0].addEventListener('click', setPreviousDisplay)

        const script = document.getElementsByTagName('script')
        script.addEventListener('DOMContentedLoaded', )
      