import express from "express";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import {
  addAddress,
  getAllUserAddress,
  removeAddress,
} from "./address.controller.js";

const addaressRouter = express.Router();

addaressRouter
  .route("/")
  .patch(protectedRouts, allowedTo("user"), addAddress)
  .delete(protectedRouts, allowedTo("user"), removeAddress)
  .get(protectedRouts, allowedTo("user"), getAllUserAddress);

export default addaressRouter;
