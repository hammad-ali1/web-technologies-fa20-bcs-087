import mongoose, { Schema } from "mongoose";

const VoltageReadingSchema = new Schema<ModelTypes.VoltageReading>({
  max: Number,
  min: Number,
  avg: Number,
});

const VoltageReading = mongoose.model<ModelTypes.VoltageReading>(
  "VoltageReadings",
  VoltageReadingSchema
);

export default VoltageReading;
