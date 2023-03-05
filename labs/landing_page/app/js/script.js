//animate hamburger icon
const hamburgerBtn = document.querySelector("#hamburgerBtn");
const header = document.querySelector(".header");
hamburgerBtn.addEventListener("click", function () {
  if (header.classList.contains("open")) header.classList.remove("open");
  else header.classList.add("open");
});
