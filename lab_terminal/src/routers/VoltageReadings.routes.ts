import { Router } from "express";
import VoltageReading from "@models/VoltageReading";
import Joi from "joi";
import { voltageReadingSchema } from "@validations/VoltageReading";
const VoltageReadingsRouter = Router();

VoltageReadingsRouter.get("/", async (req, res) => {
  const voltageReadings = await VoltageReading.find();
  res.json(voltageReadings);
});

VoltageReadingsRouter.get("/:id", async (req, res) => {
  try {
    const voltageReadings = await VoltageReading.findById(req.params.id);
    if (voltageReadings) {
      res.json(voltageReadings);
    } else {
      res.status(404).json({ error: "Voltage Reading Not Found" });
    }
  } catch (err) {}
});

VoltageReadingsRouter.post("/", async (req, res) => {
  try {
    await voltageReadingSchema.validateAsync(req.body);
    const voltageReadings = new VoltageReading(req.body);

    await voltageReadings.save();
    res.json(voltageReadings);
  } catch (err) {
    if (Joi.isError(err)) {
      res.json({
        error: err.details[0].message,
        message: "Invalid Voltage Reading Data",
      });
    } else {
      res.status(500).json({ error: err, message: "Server Error" });
    }
  }
});

VoltageReadingsRouter.delete("/:id", async (req, res) => {
  try {
    const voltageReading = await VoltageReading.findByIdAndDelete(
      req.params.id
    );
  } catch (err) {
    res.status(500).json({ error: err, message: "Server Error" });
  }
});

VoltageReadingsRouter.put("/:id", async (req, res) => {
  try {
    const voltageReading = await VoltageReading.findById(req.params.id);
    if (voltageReading) {
      await voltageReadingSchema.validateAsync(req.body);
      voltageReading.max = req.body.max;
      voltageReading.min = req.body.min;
      voltageReading.avg = req.body.avg;
      await voltageReading.save();
      res.json(voltageReading);
    } else {
      res.status(404).json({ error: "Voltage Reading Not Found" });
    }
  } catch (err) {
    if (Joi.isError(err)) {
      res.json({
        error: err.details[0].message,
        message: "Invalid Voltage Reading Data",
      });
    } else {
      res.status(500).json({ error: err, message: "Server Error" });
    }
  }
});
export default VoltageReadingsRouter;
