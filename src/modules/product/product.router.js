import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "./product.controller.js";
import { validation } from "./../../middleware/validation.js";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./product.validation.js";
import {
  uploadMixOfFiles,
  uploadsSingleFile,
} from "../../middleware/fileUpload.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
let fieldsArray = [
  { name: "imgCover", maxCount: 1 },
  { name: "images", maxCount: 10 },
];

const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    protectedRouts,
    allowedTo("admin"),
    uploadMixOfFiles(fieldsArray, "product"),
    validation(createProductSchema),
    createProduct
  )
  .get(getAllProducts);

productRouter
  .route("/:id")
  .get(validation(getProductSchema), getProduct)
  .put(
    protectedRouts,
    allowedTo("admin"),
    uploadsSingleFile("image", "product"),
    validation(updateProductSchema),
    updateProduct
  )
  .delete(
    protectedRouts,
    allowedTo("admin"),
    validation(deleteProductSchema),
    deleteProduct
  );

export default productRouter;
