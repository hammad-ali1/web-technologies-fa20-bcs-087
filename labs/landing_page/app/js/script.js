//animate hamburger icon
const hamburgerBtn = document.querySelector("#hamburgerBtn");
const header = document.querySelector(".header");
const overlay = document.querySelector(".overlay");
const menu = document.querySelector(".header__menu");
const fadingElements = document.querySelectorAll(".has-fade");
hamburgerBtn.addEventListener("click", function () {
  if (header.classList.contains("open")) {
    header.classList.remove("open");
    fadingElements.forEach((elem) => {
      elem.classList.add("fade-out");
      elem.classList.remove("fade-in");
    });
  } else {
    header.classList.add("open");
    fadingElements.forEach((elem) => {
      elem.classList.add("fade-in");
      elem.classList.remove("fade-out");
    });
  }
});
