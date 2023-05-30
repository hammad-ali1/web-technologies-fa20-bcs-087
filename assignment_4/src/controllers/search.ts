import asyncHandler from "express-async-handler";
import api from "@api/moviedb";

export const resolveQuery = asyncHandler(async (req, res) => {
  const queryParams = req.query.query;
  if (typeof queryParams === "string") {
    const movies = await api.searchMovies(queryParams, 1);
    res.render("search", { movies });
  } else {
    res.render("error");
  }
});
