const form = document.getElementById("signup-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const fields = document.querySelectorAll("form input");
  fields.forEach((field) => {
    if (!field.value) {
      field.classList.add("error");
      field.classList.remove("success");
    } else {
      field.classList.add("success");
      field.classList.remove("error");
    }
  });
});

// submitBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   const fields = document.querySelectorAll("form input");
//   console.log("hi");
// });
