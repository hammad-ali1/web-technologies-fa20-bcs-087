import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "@models/user";

export const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1]; //splits "Bearer token"
      //verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

      //get user from token
      const userFound = await User.findById(decoded.id).select("-password");
      if (!userFound?.isAdmin)
        res.status(400).json({ message: "Not authorized. Admin only" });
      else if (userFound) {
        res.locals.user = userFound;
      } else {
        res.status(404).json({ message: "User not found" });
      }
      next();
    } catch (err) {
      res
        .status(401)
        .json({ success: false, err: err, msg: "Not authorized. Bad Token" });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({ success: false, err: "Not authorized. Token missing" });
  }
});
