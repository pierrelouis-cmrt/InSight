(function ($) {
  "use strict";

  $(document).ready(function () {
    /* Hero Case study images */

    $(".slide-buttons li:nth-child(1)").on("mouseenter", function () {
      $(".slide-buttons li.active").removeClass("active");
      $(".hero-center-section.show").removeClass("show");
      $(".hero-center-section:nth-child(1)").addClass("show");
      $(".slide-buttons li:nth-child(1)").addClass("active");
    });
    $(".slide-buttons li:nth-child(2)").on("mouseenter", function () {
      $(".slide-buttons li.active").removeClass("active");
      $(".hero-center-section.show").removeClass("show");
      $(".hero-center-section:nth-child(2)").addClass("show");
      $(".slide-buttons li:nth-child(2)").addClass("active");
    });
    $(".slide-buttons li:nth-child(3)").on("mouseenter", function () {
      $(".slide-buttons li.active").removeClass("active");
      $(".hero-center-section.show").removeClass("show");
      $(".hero-center-section:nth-child(3)").addClass("show");
      $(".slide-buttons li:nth-child(3)").addClass("active");
    });
    $(".slide-buttons li:nth-child(4)").on("mouseenter", function () {
      $(".slide-buttons li.active").removeClass("active");
      $(".hero-center-section.show").removeClass("show");
      $(".hero-center-section:nth-child(4)").addClass("show");
      $(".slide-buttons li:nth-child(4)").addClass("active");
    });
    $(".slide-buttons li:nth-child(5)").on("mouseenter", function () {
      $(".slide-buttons li.active").removeClass("active");
      $(".hero-center-section.show").removeClass("show");
      $(".hero-center-section:nth-child(5)").addClass("show");
      $(".slide-buttons li:nth-child(5)").addClass("active");
    });
    $(".slide-buttons li:nth-child(6)").on("mouseenter", function () {
      $(".slide-buttons li.active").removeClass("active");
      $(".hero-center-section.show").removeClass("show");
      $(".hero-center-section:nth-child(6)").addClass("show");
      $(".slide-buttons li:nth-child(6)").addClass("active");
    });
    $(".slide-buttons li:nth-child(1)").trigger("mouseenter");
  });
})(jQuery);

// Dark/Light theme

const $bg = $("body");
const switchDiv = document.querySelector(".switch");

function applyTheme(isDark) {
  localStorage.setItem("theme", isDark ? "dark" : "light");
  $bg.css("background", isDark ? "#262626" : "#ffffff");
  $bg.toggleClass("light", !isDark);
  switchDiv.classList.toggle("switched", isDark);

  // Appliquer le calque en fonction du thème
  const overlayClass = isDark ? "dark-overlay" : "light-overlay";
  $(".img-wrap")
    .removeClass("dark-overlay light-overlay")
    .addClass(overlayClass);
}

function toggleTheme() {
  const isDark = localStorage.getItem("theme") === "dark";
  applyTheme(!isDark);
}

switchDiv.addEventListener("click", toggleTheme);

loadSavedTheme();

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "dark");
}
