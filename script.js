//Logo

const refreshButton = document.querySelector(".logo");
const refreshPage = () => {
  location.reload();
};
refreshButton.addEventListener("click", refreshPage);

//Menu

const menuToggle = document.querySelector(".toggle");
const showcase = document.querySelector(".showcase");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  showcase.classList.toggle("active");
});

//Slideshow
var slide = document.querySelectorAll(".slide"),
  button = document.querySelectorAll(".btn"),
  current = 0;

slide[current].style.zIndex = 2;
button[0].classList.add("inactive");
button[button.length - 1].classList.add("inactive");

button = document.querySelectorAll(".btn:not(.inactive");

for (element = 0; element < button.length; element++) {
  button[element].addEventListener("click", function () {
    for (i = 0; i < slide.length; i++) {
      document.querySelectorAll(".slide-img")[i].classList.add("active");
      document.querySelectorAll(".button")[i].style.opacity = "0";
      document.querySelectorAll(".slide-content h2")[i].classList.add("active");
      document.querySelectorAll(".slide-content p")[i].classList.add("active");
      document.querySelectorAll(".slide-content a")[i].classList.add("active");
    }

    if (this.classList.contains("button-right")) {
      current++;
      if (current > slide.length - 1) {
        current = slide.length - 1;
      }
    }
    if (this.classList.contains("button-left")) {
      current--;
      if (current < 0) {
        current = 0;
      }
    }

    setTimeout(function () {
      for (e = 0; e < slide.length; e++) {
        slide[e].style.zIndex = "0";
      }
      slide[current].style.zIndex = "2";

      for (i = 0; i < slide.length; i++) {
        document.querySelectorAll(".slide-img")[i].classList.remove("active");
        document.querySelectorAll(".button")[i].style.opacity = "1";
        document
          .querySelectorAll(".slide-content h2")
          [i].classList.remove("active");
        document
          .querySelectorAll(".slide-content p")
          [i].classList.remove("active");
        document
          .querySelectorAll(".slide-content a")
          [i].classList.remove("active");
      }
    }, 1000);
  });
}
