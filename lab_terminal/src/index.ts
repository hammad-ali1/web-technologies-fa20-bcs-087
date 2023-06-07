import express from "express";
import mongoose from "mongoose";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
// import middlewares
import { appendLocals } from "@middlewares/locals";
//import routers
import viewsRouter from "@routers/views.routes";
import formRouter from "@routers/form.routes";

const config = {
  MONGO_URI: "mongodb://localhost:27017/web_final",
  JWT_SECRET_KEY: "zxcvbnm",
  SESSION_SECRET: "zxcvbnm",
  PORT: 5000,
};
const app = express();

// connect mongo
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("mongo connected");
  })
  .catch(() => {
    console.log("mongo connection error");
  });

// create connect-mongo session store
const sessionStore = MongoStore.create({
  mongoUrl: config.MONGO_URI,
  collectionName: "sessions",
});

// session middleware
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    },
  })
);

// set view engine
app.set("view engine", "ejs");

// add third-party middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(expressLayouts);

// add custom middlewares
app.use(appendLocals);

// add routers
app.use("/", viewsRouter);
app.use("/form", formRouter);
// start server
app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});
