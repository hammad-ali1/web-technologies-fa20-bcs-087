import asyncHandler from "express-async-handler";
import User from "@models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export const addUser = asyncHandler(async (req, res) => {
  // get user object from req body
  try {
    const user = req.body as ModelTypes.User;
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // create and save user
    const newUser = new User(user);
    await newUser.save();
    res.json(newUser);
  } catch (err: any) {
    // handle errors
    // handle validation errors
    if (err instanceof Error.ValidationError) {
      res.status(400);
      res.json({
        type: "ValidationError",
        message: err.message,
        error: err.errors,
      });
      // handle duplicate key error
    } else if (err.code === 11000) {
      res.status(400);
      res.json({
        type: "MongoError",
        message: "Username already exists",
        error: err,
      });
      // handle other errors
    } else {
      res.status(500);
      res.json({
        type: "UnknownError",
        message: "Unkown Error Occured",
        error: err,
      });
    }
  }
});

export const getTokenByLogin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    // find user and compare password
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        user,
        token: generateToken(user._id.toString()),
      });
    } else {
      // user not found or incorrect password
      res.status(401);
      res.json({
        type: "InvalidCredentials",
        message: "Username or Password is invalid",
      });
    }
  } catch (err: any) {
    // handle errors
    console.log(err);
    res.status(401);
    res.json({
      type: "UnknownError",
      message: "Unkown Error Occured",
      error: err,
    });
  }
});

export const addUserToSession = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    // find user and compare password
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // @ts-ignore
      req.session.user = user;
      res.json({
        user,
      });
    } else {
      // user not found or incorrect password
      res.status(401);
      res.json({
        type: "InvalidCredentials",
        message: "Username or Password is invalid",
      });
    }
  } catch (err: any) {
    // handle errors
    console.log(err);
    res.status(401);
    res.json({
      type: "UnknownError",
      message: "Unkown Error Occured",
      error: err,
    });
  }
});
//generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY!, { expiresIn: "10d" });
};
