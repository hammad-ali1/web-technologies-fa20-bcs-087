import handlers from "./handlers";
import * as $ from "jquery";

$(function registerHandlers() {
  handlers.favMovieHandler();
  handlers.flashMsgsAnimation();
});

// @ts-ignore
window.$ = $;
