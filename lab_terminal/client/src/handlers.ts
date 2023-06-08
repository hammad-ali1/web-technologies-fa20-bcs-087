import api from "./api";
import * as $ from "jquery";

async function renderVoltageReadings() {
  const voltages = await api.getVoltageReadings();
  $("#voltageDetails tbody").html(
    voltages
      .map(
        (voltage) =>
          `<tr><td>${voltage.max}</td><td>${voltage.min}</td><td>${voltage.avg}</td><tr>`
      )
      .join("")
  );
}

function flashMsgsAnimation() {
  // Slide down and fade in
  $(".alert")
    .hide()
    .slideDown(500, function () {
      $(this).delay(1000).slideUp(500);
    });
}

const handlers = {
  renderVoltageReadings,
  flashMsgsAnimation,
};
export default handlers;
