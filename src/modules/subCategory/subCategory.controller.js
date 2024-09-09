import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import * as factory from "../handlers/factor.handler.js";
import { SubCategoryModel } from "./../../../database/models/subcategory.model.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

export const createSubCategory = catchError(async (req, res) => {
  const { name, category } = req.body;
  let result = new SubCategoryModel({ name, category, slug: slugify(name) });
  await result.save();
  res.json({ message: "success" });
});

export const getAllSubCategories = catchError(async (req, res) => {
  let apiFeature = new ApiFeature(SubCategoryModel.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();

  //========= execute query =========
  let result = await apiFeature.mongooseQuery;
  res.json({ message: "success", pageNumber: apiFeature.PAGE_NUMBER, result });
});

export const getSubCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await SubCategoryModel.findById(id);
  !result && next(new AppError("subCategory not found", 404));
  result && res.json({ message: "success", result });
});

export const updateSubCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  let result = await SubCategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      category,
      slug: slugify(name),
    },
    { new: true }
  );
  !result && next(new AppError("subCategory not found", 404));
  result && res.json({ message: "success", result });
});

export const deleteSubCategory = factory.deleteOne(SubCategoryModel);
