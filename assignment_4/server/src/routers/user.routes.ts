import { Router } from "express";
import { addUser, sessionLogin, updateUser } from "@controllers/user";

const userRouter = Router();

userRouter.route("/session/login").post(sessionLogin);
userRouter.route("/").post(addUser);
userRouter.route("/update/:id").post(updateUser);

export default userRouter;
