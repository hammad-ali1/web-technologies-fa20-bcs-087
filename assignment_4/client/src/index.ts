import handlers from "./handlers";
import * as $ from "jquery";

$(function registerHandlers() {
  handlers.submitSignupFormHandler();
  handlers.favMovieHandler();
});

// @ts-ignore
window.$ = $;
