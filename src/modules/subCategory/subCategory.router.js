import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
} from "./subCategory.controller.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";

const SubCategoryRouter = express.Router();

SubCategoryRouter
.route("/")
.post(protectedRouts, allowedTo("admin"),createSubCategory)
.get(getAllSubCategories);

SubCategoryRouter
  .route("/:id")
  .get(getSubCategory)
  .put(protectedRouts, allowedTo("admin"),updateSubCategory)
  .delete(protectedRouts, allowedTo("admin"),deleteSubCategory);

export default SubCategoryRouter;
