import { Router } from "express";
import { getShow } from "@controllers/show";

const showRouter = Router();

showRouter.route("/:id").get(getShow);

export default showRouter;
