import asyncHandler from "express-async-handler";
import { ddMMyyyy } from "@utils/date";

export const appendLocals = asyncHandler((req, res, next) => {
  res.locals.activeLink = req.url;
  res.locals.user = req.session.user || {};
  res.locals.convertDate = ddMMyyyy;
  res.locals.messages = req.flash("success") || [];
  res.locals.errors = req.flash("error") || [];
  res.locals.formData = req.session.formData || {};
  next();
});
