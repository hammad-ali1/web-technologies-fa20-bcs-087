import { Router } from "express";
import { loginFormSchema } from "@validations/user";
import User from "@models/user";
import bcrypt from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { protectRoute } from "@middlewares/protectRoute";
const UserRouter = Router();

UserRouter.get("/", protectRoute, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

UserRouter.get("/login", async (req, res) => {
  try {
    await loginFormSchema.validateAsync(req.body);
    const { username, password } = req.body;
    // find user and compare password
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // remove password from user object
      res.json({ token: generateToken(user._id.toString()) });
    } else {
      res.status(404).json({ message: "Username or Password is invalid" });
    }
  } catch (err: any) {
    if (Joi.isError(err)) {
      res.status(400).json({ message: err.details[0].message });
    } else {
      res.status(500).json({ message: "Server Error Occured", error: err });
    }
  }
});

//generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY!, { expiresIn: "10d" });
};

export default UserRouter;
