import { Router } from "express";

const viewsRouter = Router();

// add view routes
viewsRouter.get("/signup", (req, res) => {
  res.render("signup", { formData: res.locals.formData || {} });
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

viewsRouter.get("/user", (req, res) => {
  console.log("working");
  res.render("user");
});

viewsRouter.get("/logout", (req, res) => {
  req.session.user = null;
  req.flash("success", "Logged out successfully");
  res.redirect("/movies");
});

export default viewsRouter;
