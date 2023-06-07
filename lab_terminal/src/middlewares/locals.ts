import asyncHandler from "express-async-handler";

export const appendLocals = asyncHandler((req, res, next) => {
  res.locals.activeLink = req.url;
  res.locals.user = req.session.user || {};
  res.locals.messages = req.flash("success") || [];
  res.locals.errors = req.flash("error") || [];
  next();
});
