import handlers from "./handlers";
import * as $ from "jquery";
$(function registerHandlers() {
  handlers.renderVoltageReadings();
  handlers.deleteVoltageReading();
});

// @ts-ignore
window.$ = $;
