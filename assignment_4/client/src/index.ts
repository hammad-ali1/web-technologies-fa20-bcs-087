import handlers from "./handlers";
import * as $ from "jquery";

$(function registerHandlers() {
  handlers.submitSignupFormHandler();
});

// @ts-ignore
window.$ = $;
