import { validateForm } from "./formValidation";
import User from "./models/user";
import api from "./api";

function submitSignupFormHandler() {
  $(document).on("submit", "#signupForm", function (e) {
    e.preventDefault();
    let user = new User();
    try {
      user = validateForm(this, user)!;
      console.log(user);
    } catch (err) {
      console.log(err);
      return;
    }
    api.addUser(user);
  });
}

function favMovieHandler() {
  $(document).on("click", ".fav-icon", function (e) {
    // e.preventDefault();
    e.stopPropagation();
    $(this).children("i").toggleClass("fa-solid fa-regular");

    // const movieId = $(this).data("movieid");
    // api.addFavMovie(movieId);
  });
}

const handlers = {
  submitSignupFormHandler,
  favMovieHandler,
};
export default handlers;
