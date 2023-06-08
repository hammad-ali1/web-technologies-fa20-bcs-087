import { Router } from "express";
import { resolveQuery } from "@controllers/search";

const searchRouter = Router();

searchRouter.route("/").get(resolveQuery);

export default searchRouter;
