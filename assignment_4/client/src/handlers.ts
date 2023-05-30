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

const handlers = {
  submitSignupFormHandler,
};
export default handlers;
