import { Router } from "express";
import { getMovies, getMovie } from "@controllers/movie";

const movieRouter = Router();

movieRouter.route("/").get(getMovies);
movieRouter.route("/:id").get(getMovie);
export default movieRouter;
