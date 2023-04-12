document.onreadystatechange = function () {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const fields = document.querySelectorAll("form input");
    const errorMsg = document.querySelector("form .invalid-feedback");
    fields.forEach((field) => {
      if (!field.value) {
        field.classList.add("error");
        field.classList.remove("success");
        errorMsg.classList.add("d-block");
      } else {
        field.classList.add("success");
        field.classList.remove("error");
        errorMsg.classList.remove("d-block");
      }
    });
  });
};
