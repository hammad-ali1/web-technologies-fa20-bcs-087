import api from "./api";
import * as $ from "jquery";

async function renderVoltageReadings() {
  const voltages = await api.getVoltageReadings();
  $("#voltageDetails tbody").html(
    voltages
      .map(
        (voltage) =>
          `<tr><td>${voltage.max}</td><td>${voltage.min}</td><td>${voltage.avg}</td><td><button id="${voltage._id}" class="btn btn-danger">Delete</button></td><tr>`
      )
      .join("")
  );
}

async function deleteVoltageReading() {
  $("#voltageDetails tbody").on(
    "click",
    "button.btn-danger",
    async function () {
      const idToDelete = $(this).attr("id");
      await api.deleteVoltageReading(idToDelete!);
      await renderVoltageReadings();
    }
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
  deleteVoltageReading,
  flashMsgsAnimation,
};
export default handlers;
