import express from "express";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} from "./review.controller.js";

const ReviewRouter = express.Router();

ReviewRouter.route("/")
  .post(protectedRouts, allowedTo("user"), createReview)
  .get(getAllReviews);

ReviewRouter.route("/:id")
  .get(getReview)
  .put(protectedRouts, allowedTo("admin", "user"), updateReview)
  .delete(protectedRouts, allowedTo("admin", "user"), deleteReview);

export default ReviewRouter;
