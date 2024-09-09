import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import { BrandModel } from "./../../../database/models/brand.model.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

export const createBrand = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let result = new BrandModel(req.body);
  await result.save();
  res.json({ message: "success" });
});

export const getAllBrands = catchError(async (req, res) => {
  let apiFeature = new ApiFeature(BrandModel.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();

  //========= execute query =========
  let result = await apiFeature.mongooseQuery;
  res.json({ message: "success", pageNumber: apiFeature.PAGE_NUMBER, result });
});

export const getBrand = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await BrandModel.findById(id);
  !result && next(new AppError("brand not found", 404));
  result && res.json({ message: "success", result });
});

export const updateBrand = catchError(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let result = await BrandModel.findByIdAndUpdate(id, req.body, { new: true });
  !result && next(new AppError("brand not found", 404));
  result && res.json({ message: "success", result });
});

export const deleteBrand = factory.deleteOne(BrandModel);
