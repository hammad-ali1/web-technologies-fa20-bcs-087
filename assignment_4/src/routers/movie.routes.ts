import { Router } from "express";
import { getMovies, getMovie, addToFavs, getAllFavs } from "@controllers/movie";

const movieRouter = Router();

movieRouter.route("/").get(getMovies);
movieRouter.route("/:id").get(getMovie);
movieRouter.route("/favs/all").get(getAllFavs);
movieRouter.route("/fav/:id").post(addToFavs);

export default movieRouter;
