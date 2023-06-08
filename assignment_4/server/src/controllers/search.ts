import asyncHandler from "express-async-handler";
import api from "@api/moviedb";

export const resolveQuery = asyncHandler(async (req, res) => {
  const queryParams = req.query.query;
  const searchType = req.query.searchType;

  if (typeof queryParams === "string") {
    const movies = await api.searchMovies(queryParams, 1);
    const shows = await api.searchShows(queryParams, 1);

    res.render("search", {
      movies,
      shows,
      searchTerm: queryParams,
      searchType,
    });
  } else {
    res.render("error");
  }
});
