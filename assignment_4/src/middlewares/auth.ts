import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "@models/user";

export const getUserInfo = asyncHandler(async (req, res, next) => {
  let token;
  res.locals.user = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        res.locals.user = user;
        next();
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  next();
});

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        res.locals.user = user;
        next();
      } else {
        res.status(404);
        throw new Error("User not found");
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
