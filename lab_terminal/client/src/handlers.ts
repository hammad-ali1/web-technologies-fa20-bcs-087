import api from "./api";
import * as $ from "jquery";

async function renderVoltageReadings() {
  const voltages = await api.getVoltageReadings();
  $("#voltageDetails tbody").html("");
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

async function voltageFormSubmit() {
  $("#addVoltageForm").on("submit", async function (e) {
    e.preventDefault();
    const max = $("#max").val();
    const min = $("#min").val();
    const avg = $("#avg").val();
    // @ts-ignore
    await api.addVoltageReading({ max, min, avg });
    await renderVoltageReadings();
  });
}

const handlers = {
  renderVoltageReadings,
  deleteVoltageReading,
  voltageFormSubmit,
};
export default handlers;
