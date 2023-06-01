import handlers from "./handlers";
import * as $ from "jquery";

$(function registerHandlers() {
  handlers.submitSignupFormHandler();
  handlers.favMovieHandler();

  // $(".alert")
  //   .hide()
  //   .fadeTo(2000, 500)
  //   .slideUp(500, function () {
  //     $(".alert").slideUp(500);
  //   });

  // Slide down and fade in
  $(".alert")
    .hide()
    .slideDown(500, function () {
      $(this).delay(1000).slideUp(500);
    });

  // Wait for a certain duration (e.g., 2000 milliseconds) and then fade out and slide up
  // setTimeout(function () {
  //   $(".alert")
  //     .fadeTo(2000, 500)
  //     .slideUp(500, function () {
  //       $(".alert").slideUp(500);
  //     });
  // }, 2000);
});

// @ts-ignore
window.$ = $;
