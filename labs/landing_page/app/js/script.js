//animate hamburger icon
const hamburgerBtn = document.querySelector("#hamburgerBtn");

hamburgerBtn.addEventListener("click", function () {
  if (hamburgerBtn.classList.contains("open"))
    hamburgerBtn.classList.remove("open");
  else hamburgerBtn.classList.add("open");
});
