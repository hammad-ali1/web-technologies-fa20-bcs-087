import asyncHandler from "express-async-handler";
import { ddMMyyyy } from "@utils/date";
import User from "@models/user";

export const appendLocals = asyncHandler(async (req, res, next) => {
  res.locals.activeLink = req.url;
  res.locals.user = req.session.user || {};

  res.locals.convertDate = ddMMyyyy;
  res.locals.messages = req.flash("success") || [];
  res.locals.errors = req.flash("error") || [];
  res.locals.formData = req.session.formData || {};
  if (req.session.user) {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      req.session.destroy(() => {});
      res.locals.user = {};
    }
  }
  next();
});
