import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import flash from "connect-flash";
// import middlewares
import { protect } from "@middlewares/auth";
//import routers
import movieRouter from "@routers/movie.routes";
import searchRouter from "@routers/search.routes";
import userRouter from "@routers/user.routes";
import showRouter from "@routers/show.routes";
import { ddMMyyyy } from "./dateFunctions";
const app = express();
// add cors
app.use(require("cors")());

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

// create session store
let sessionStore = null;
if (typeof process.env.MONGO_URI === "string") {
  sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
  });
} else {
  console.log("MONGO_URI is not defined");
}
// session middleware
if (sessionStore)
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
      },
    })
  );
else console.log("sessionStore is not defined");

// set view engine
app.set("view engine", "ejs");
// add middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(flash());
app.use(morgan("tiny"));

// middleware for local variables
app.use((req, res, next) => {
  res.locals.activeLink = req.url;
  res.locals.convertDate = ddMMyyyy;
  res.locals.messages = req.flash("success") || [];
  res.locals.errors = req.flash("error") || [];
  next();
});
// make session variables available in views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});
// test protected route
app.route("/protected").get(protect, (req, res) => {
  try {
    res.json({ protected: true, user: res.locals.user });
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
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/user", (req, res) => {
  res.render("user");
});
app.get("/", (req, res) => {
  res.redirect("/movies");
});
app.get("/logout", (req, res) => {
  req.session.user = null;
  req.flash("success", "Logged out successfully");
  res.redirect("/movies");
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
