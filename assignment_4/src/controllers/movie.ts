import asyncHandler from "express-async-handler";
import api from "@api/moviedb";
import Movie from "@models/movie";

export const getMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await api.fetchTrendingMovies(1, "day");
    const shows = await api.fetchTrendingShows(1, "day");
    let favs: any = [];
    if (req.session.user) {
      favs = await Movie.find({ user_id: req.session.user._id });
    }
    res.render("index", {
      movies,
      shows,
      favs,
    });
  } catch (err) {
    console.log(err);
  }
});

export const getMovie = asyncHandler(async (req, res) => {
  const movie = await api.fetchMovie(req.params.id);
  res.render("movie", { movie });
});

export const addToFavs = asyncHandler(async (req, res) => {
  if (req.session.user) {
    const isFavPresent = await Movie.findOne({
      user_id: req.session.user._id,
      id: req.params.id,
    });
    if (isFavPresent) {
      req.flash("success", "Removed from favourites");
      await Movie.deleteOne({
        user_id: req.session.user._id,
        id: req.params.id,
      });
      return res.redirect("/movies");
    }
    const movie = await api.fetchMovie(req.params.id);
    let favMovie = new Movie(movie);
    favMovie.user_id = req.session.user._id;
    favMovie.save();
    req.flash("success", "Added to favourites");
    res.redirect("/movies");
  } else {
    res.status(401).json({ success: false, msg: "Unauthorized" });
  }
});

export const getAllFavs = asyncHandler(async (req, res) => {
  if (req.session.user) {
    const movies = await Movie.find({ user_id: req.session.user._id });
    res.render("favs", { movies });
  } else {
    res.status(401).json({ success: false, msg: "Unauthorized" });
  }
});
