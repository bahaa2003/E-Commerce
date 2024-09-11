import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./category.controller.js";
import { validation } from "../../middleware/validation.js";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";
import { uploadsSingleFile } from "../../middleware/fileUpload.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(protectedRouts, allowedTo("admin"),uploadsSingleFile("image", "category"),validation(createCategorySchema),createCategory)
  .get(getAllCategories);

categoryRouter
  .route("/:id")
  .get(validation(getCategorySchema), getCategory)
  .put(
    protectedRouts, allowedTo("admin"),
    uploadsSingleFile("image", "category"),
    validation(updateCategorySchema),
    updateCategory
  )
  .delete(protectedRouts, allowedTo("admin"),validation(getCategorySchema), deleteCategory);

export default categoryRouter;
