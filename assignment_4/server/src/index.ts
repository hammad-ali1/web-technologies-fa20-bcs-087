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
import { appendLocals } from "@middlewares/locals";
//import routers
import movieRouter from "@routers/movie.routes";
import searchRouter from "@routers/search.routes";
import userRouter from "@routers/user.routes";
import showRouter from "@routers/show.routes";
import viewsRouter from "@routers/views.routes";
// import api routers
import apiUserRouter from "@routers/api/user.routes";
import path from "path";
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

// create connect-mongo session store
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

// serve react static files
app.get("/admin", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});
app.get("/admin/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});
app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

// add third-party middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(flash());
app.use(morgan("tiny"));

// add custom middlewares
app.use(appendLocals);

// add routers

app.use("/", viewsRouter);
app.use("/movies", movieRouter);
app.use("/search", searchRouter);
app.use("/users", userRouter);
app.use("/shows", showRouter);
app.use("/api/users", apiUserRouter);

// index route
app.get("/", (req, res) => {
  res.redirect("/movies");
});

// add default error handler
// @ts-ignore
app.use((err, req, res, next) => {
  res.render("error", { message: err.message, type: "Internal Server Error" });
  next();
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
