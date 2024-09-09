import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from "./brand.controller.js";
import { validation } from "../../middleware/validation.js";
import {
  createBrandSchema,
  getBrandSchema,
  updateBrandSchema,
} from "./brand.validation.js";
import { uploadsSingleFile } from "../../middleware/fileUpload.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";

const BrandRouter = express.Router();

BrandRouter.route("/")
  .post(
    protectedRouts,
    allowedTo("admin"),
    uploadsSingleFile("logo", "brand"),
    validation(createBrandSchema),
    createBrand
  )
  .get(getAllBrands);

BrandRouter.route("/:id")
  .get(validation(getBrandSchema), getBrand)
  .put(
    uploadsSingleFile("logo", "brand"),
    validation(updateBrandSchema),
    allowedTo("admin"),
    updateBrand
  )
  .delete(validation(getBrandSchema), allowedTo("admin"), deleteBrand);

export default BrandRouter;
