const buttons = document.querySelectorAll("[data-carousel-button]"); // select all carousel buttons
let slideTimeout; 

// reset timer function
function resetTimer() {
    clearTimeout(slideTimeout); 
    slideTimeout = setTimeout(() => autoSlide(), 30000); // new 30 seconds timer:)
}

// change automaticly after 30 seconds (when timer ends)
function autoSlide() {
    const carousels = document.querySelectorAll("[data-carousel]"); // select all carousels
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]"); //active silde

        let newIndex = ([...slides.children].indexOf(activeSlide) + 1) % slides.children.length; //index of next slide

        slides.children[newIndex].dataset.active = true; //set as active
        delete activeSlide.dataset.active; //remove active
    });

    resetTimer(); // reset after finished
}

// add event listeners to each button in the carousel
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1; // next or prev

        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]"); //active slide
        let newIndex = [...slides.children].indexOf(activeSlide) + offset; // calc new indes

        // if in the end or begining
        if (newIndex < 0) {newIndex = slides.children.length - 1;}
        if (newIndex >= slides.children.length) { newIndex = 0; } 

        slides.children[newIndex].dataset.active = true; //set new as active
        delete activeSlide.dataset.active; //delete old

        resetTimer();
    });
});

resetTimer(); // #start
