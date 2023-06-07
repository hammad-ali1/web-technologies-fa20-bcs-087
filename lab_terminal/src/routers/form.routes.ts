import { Router } from "express";
import Form from "@models/form";

const formRouter = Router();

formRouter.get("/", (req, res) => {
  res.render("form", { data: {} });
});

formRouter.post("/", async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    req.flash("success", "Form submitted successfully");
    res.redirect("/");
  } catch (err) {
    req.flash("error", "An error occurred while submitting form");
  }
});

formRouter.get("/delete/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const deletedForm = await Form.findByIdAndDelete(idToDelete);
    req.flash("success", "Deleted form successfully");
    res.redirect("/");
  } catch (err) {
    req.flash("error", "An error occurred while submitting form");
  }
});

formRouter.get("/edit/:id", async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.render("form", { data: form });
});

formRouter.post("/edit/:id", async (req, res) => {
  try {
    const prevForm = await Form.findById(req.params.id);
    if (prevForm) {
      prevForm.field1 = req.body.field1;
      prevForm.field2 = req.body.field2;
      await prevForm.save();
      req.flash("success", "Form updated successfully");
      res.redirect("/");
    } else {
      req.flash("error", "Form id not found");
      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "An error occurred while submitting form");
    res.redirect("/");
  }
});
export default formRouter;
