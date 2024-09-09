import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { userModel } from "./../../../database/models/user.model.js";

export const createUser = catchError(async (req, res, next) => {
  let { email } = req.body;
  let user = await userModel.findOne({ email });
  if (user) next(new AppError("email use", 409));

  let result = new userModel(req.body);
  await result.save();
  res.json({ message: "success" });
});

export const getAllUsers = catchError(async (req, res) => {
  let apiFeature = new ApiFeature(userModel.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();

  //========= execute query =========
  let result = await apiFeature.mongooseQuery;
  res.json({ message: "success", pageNumber: apiFeature.PAGE_NUMBER, result });
});

export const getUser = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await userModel.findById(id);
  !result && next(new AppError("User not found", 404));
  result && res.json({ message: "success", result });
});

export const updateUser = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  !result && next(new AppError("User not found", 404));
  result && res.json({ message: "success", result });
});

export const changeUserPassword = catchError(async (req, res, next) => {
  const { id } = req.params;
  req.body.passwordChangeAt = Date.now();
  let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  !result && next(new AppError("User not found", 404));
  result && res.json({ message: "success", result });
});

export const deleteUser = factory.deleteOne(userModel);
