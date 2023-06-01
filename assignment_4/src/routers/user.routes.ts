import { Router } from "express";
import {
  getTokenByLogin,
  getUsers,
  addUser,
  addUserToSession,
  updateUser,
} from "@controllers/user";

const userRouter = Router();

userRouter.route("/login").post(getTokenByLogin);
userRouter.route("/session/login").post(addUserToSession);
userRouter.route("/").get(getUsers);
userRouter.route("/").post(addUser);
userRouter.route("/update/:id").post(updateUser);

export default userRouter;
