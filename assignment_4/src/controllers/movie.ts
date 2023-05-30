import asyncHandler from "express-async-handler";
import api from "@api/moviedb";

export const getMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await api.fetchTrendingMovies(1, "day");
    const shows = await api.fetchTrendingShows(1, "day");
    res.render("index", { movies, shows });
  } catch (err) {
    console.log(err);
  }
});

export const getMovie = asyncHandler(async (req, res) => {
  const movie = await api.fetchMovie(req.params.id);
  res.render("movie", { movie });
});
