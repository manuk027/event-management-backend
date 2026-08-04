import { Router } from "express";
import userController from "../constants/user.controller.js";

const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:userId", userController.getUserById);
userRouter.patch("/:userId", userController.updateUser);

export default userRouter;