import api from "@api/moviedb";
import asyncHandler from "express-async-handler";

export const getShow = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const show = await api.fetchShow(id);
  res.render("show", { show });
});
