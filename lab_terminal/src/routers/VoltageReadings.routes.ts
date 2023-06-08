import { Router } from "express";
import VoltageReading from "@models/VoltageReading";
import Joi from "joi";
import { voltageReadingSchema } from "@validations/VoltageReading";
const VoltageReadingsRouter = Router();

VoltageReadingsRouter.get("/", async (req, res) => {
  const voltageReadings = await VoltageReading.find();
  res.json(voltageReadings);
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
      res.json({ error: err, message: "Server Error" });
    }
  }
});
export default VoltageReadingsRouter;
