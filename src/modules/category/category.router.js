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

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(
    uploadsSingleFile("image", "category"),
    validation(createCategorySchema),
    createCategory
  )
  .get(getAllCategories);

categoryRouter
  .route("/:id")
  .get(validation(getCategorySchema), getCategory)
  .put(
    uploadsSingleFile("image", "category"),
    validation(updateCategorySchema),
    updateCategory
  )
  .delete(validation(getCategorySchema), deleteCategory);

export default categoryRouter;
