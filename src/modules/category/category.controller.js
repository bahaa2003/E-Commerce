import { CategoryModel } from "../../../database/models/category.model.js";
import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

export const createCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let result = new CategoryModel(req.body);
  await result.save();
  res.json({ message: "success" });
});

export const getAllCategories = catchError(async (req, res) => {
  let apiFeature = new ApiFeature(CategoryModel.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();

  //========= execute query =========
  let result = await apiFeature.mongooseQuery;
  res.json({ message: "success", pageNumber: apiFeature.PAGE_NUMBER, result });
});

export const getCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await CategoryModel.findById(id);
  !result && next(new AppError("category not found", 404));
  result && res.json({ message: "success", result });
  //   if (!result) return next(new AppError("category not found",404));
  //   res.json({ message: "success", result });
});

export const updateCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let result = await CategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppError("category not found", 404));
  result && res.json({ message: "success", result });
  //   if (!result) return next(new AppError("category not found",404));
  //   res.json({ message: "success", result });
});

export const deleteCategory = factory.deleteOne(CategoryModel);
