import handlers from "./handlers";
import * as $ from "jquery";
$(function registerHandlers() {
  handlers.renderVoltageReadings();
});

// @ts-ignore
window.$ = $;
