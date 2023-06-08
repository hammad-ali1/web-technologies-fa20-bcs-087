import asyncHandler from "express-async-handler";
import User from "@models/user";
import {
  updateUserSchema,
  signupFormSchema,
  loginFormSchema,
} from "@validations/user";
import bcrypt from "bcryptjs";
import Joi from "joi";

export const addUser = asyncHandler(async (req, res) => {
  // get user object from req body
  const user = req.body as ModelTypes.User;
  try {
    // validate user object
    await signupFormSchema.validateAsync(user);
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // create and save user
    const newUser = new User(user);
    await newUser.save();
    // attach user to session
    req.session.user = newUser;
    req.flash("success", "Account created successfully");
    req.session.formData = {};
    res.redirect("/signup");
  } catch (err) {
    if (Joi.isError(err)) {
      err.details.forEach((detail) => {
        req.flash("error", detail.message);
      });
      req.session.formData = user;
      res.redirect("/signup");
    } else {
      req.session.formData = user;
      req.flash("error", "Server Error Occured");
      res.redirect("/signup");
    }
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  try {
    await updateUserSchema.validateAsync(req.body);
    const userid = req.params.id;
    const user = await User.findById(userid);
    if (!user) {
      req.flash("error", "User not found");
      res.redirect("/user");
      return;
    }
    const previousPassword = req.body.prevPassword;
    const isMatch = await bcrypt.compare(previousPassword, user.password);
    if (!isMatch) {
      req.flash("error", "Previous password is incorrect");
      res.redirect("/user");
      return;
    }
    user.username = req.body.username || user.username;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.save();
    req.flash("success", "User updated successfully");
    res.redirect("/user");
  } catch (err) {
    if (Joi.isError(err)) {
      err.details.forEach((detail) => {
        req.flash("error", detail.message);
      });
      res.redirect("/user");
    } else {
      req.flash("error", "Server Error Occured");
      res.redirect("/user");
    }
  }
});

export const sessionLogin = asyncHandler(async (req, res) => {
  try {
    await loginFormSchema.validateAsync(req.body);
    const { username, password } = req.body;
    // find user and compare password
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      req.flash("success", "Logged in successfully");
      res.redirect("/movies");
    } else {
      req.flash("error", "Username or Password is invalid");
      res.redirect("/login");
    }
  } catch (err: any) {
    if (Joi.isError(err)) {
      err.details.forEach((detail) => {
        req.flash("error", detail.message);
      });
      res.redirect("/login");
    } else {
      req.flash("error", "Server Error Occured");
      res.redirect("/login");
    }
  }
});
