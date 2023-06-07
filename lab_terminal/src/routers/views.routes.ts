import { Router } from "express";
import Form from "@models/form";

const viewsRouter = Router();

// add view routes
viewsRouter.get("/", async (req, res) => {
  const forms = await Form.find();
  res.render("index", { forms });
});

export default viewsRouter;
