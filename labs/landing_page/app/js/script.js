//animate hamburger icon
const hamburgerBtn = document.querySelector("#hamburgerBtn");
const header = document.querySelector(".header");
const overlay = document.querySelector(".overlay");
hamburgerBtn.addEventListener("click", function () {
  if (header.classList.contains("open")) {
    header.classList.remove("open");
    overlay.classList.remove("fade-in");
    overlay.classList.add("fade-out");
  } else {
    header.classList.add("open");
    overlay.classList.add("fade-in");
    overlay.classList.remove("fade-out");
  }
});
