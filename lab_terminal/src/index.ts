import express from "express";
import mongoose from "mongoose";
import cors from "cors";
//import routers
import VoltageReadingsRouter from "@routers/VoltageReadings.routes";

const config = {
  MONGO_URI: "mongodb://localhost:27017/web_final",
  PORT: 5000,
};
const app = express();
app.use(cors());

// connect mongo
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("mongo connected");
  })
  .catch(() => {
    console.log("mongo connection error");
  });

// add third-party middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add routers
app.use("/api/voltage", VoltageReadingsRouter);
// start server
app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});
