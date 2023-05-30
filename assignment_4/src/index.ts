import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import expressLayouts from "express-ejs-layouts";
// import middlewares
import { protect } from "@middlewares/auth";
//import routers
import movieRouter from "@routers/movie.routes";
import searchRouter from "@routers/search.routes";
import userRouter from "@routers/user.routes";
import showRouter from "@routers/show.routes";
import { ddMMyyyy } from "./dateFunctions";
const app = express();

// set view engine
app.set("view engine", "ejs");
// add middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.use((req, res, next) => {
  res.locals.activeLink = req.url;
  res.locals.convertDate = ddMMyyyy;
  next();
});

// test protected route
app.route("/protected").get(protect, (req, res) => {
  try {
    res.json({ protected: true, user: req.user });
  } catch (err) {
    res.json({ err });
  }
});

// add routers
app.use("/movies", movieRouter);
app.use("/search", searchRouter);
app.use("/users", userRouter);
app.use("/shows", showRouter);
// add view routes
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/", (req, res) => {
  res.redirect("/movies");
});

// connect mongo
if (typeof process.env.MONGO_URI === "string") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongo connected");
    })
    .catch((err) => {
      console.log("mongo connection error");
    });
} else {
  console.log("MONGO_URI is not defined");
}

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});