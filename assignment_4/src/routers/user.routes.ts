import { Router } from "express";
import {
  getTokenByLogin,
  getUsers,
  addUser,
  addUserToSession,
} from "@controllers/user";

const userRouter = Router();

userRouter.route("/login").post(getTokenByLogin);
userRouter.route("/session/login").post(addUserToSession);
userRouter.route("/").get(getUsers);
userRouter.route("/").post(addUser);
export default userRouter;
