import express from "express";
import { changeUserPassword, createUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";


const userRouter = express.Router();

userRouter.route("/")
  .post(createUser)
  .get(protectedRouts, allowedTo("admin"),getAllUsers);

  userRouter.route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

  userRouter.patch("/changeUserPassword/:id" , changeUserPassword)
export default userRouter;
