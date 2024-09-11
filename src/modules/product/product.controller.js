import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import * as factory from "../handlers/factor.handler.js";
import { productModel } from "./../../../database/models/product.model.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

export const createProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((obj) => obj.filename);
  let result = new productModel(req.body);
  await result.save();
  res.json({ message: "success" });
});

export const getAllProducts = catchError(async (req, res) => {
  let apiFeature = new ApiFeature(
    productModel
      .find()
      .populate("category", "-createdAt -updatedAt")
      .populate("subCategory", "-createdAt -updatedAt")
      .populate("brand", "-createdAt -updatedAt"),
    req.query
  )
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();

  //========= execute query =========
  let result = await apiFeature.mongooseQuery;
  res.json({ message: "success", pageNumber: apiFeature.PAGE_NUMBER, result });
});

export const getProduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await productModel.findById(id);
  !result && next(new AppError("Product not found", 404));
  result && res.json({ message: "success", result });
});

export const updateProduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  req.body.image = req.file.filename;
  if (req.body.title) req.body.slug = slugify(req.body.title);
  let result = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppError("Product not found", 404));
  result && res.json({ message: "success", result });
});

export const deleteProduct = factory.deleteOne(productModel);
