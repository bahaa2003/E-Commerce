import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { reviewModel } from "../../../database/models/review.model.js";

export const createReview = catchError(async (req, res , next) => {
  req.body.user = req.user._id;
  let isReview = reviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isReview)
    return next(new AppError("You have already reviewed this product", 409));
  let result = new reviewModel(req.body);
  await result.save();
  res.json({ message: "success" });
});

export const getAllReviews = catchError(async (req, res) => {
  let apiFeature = new ApiFeature(reviewModel.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();

  //========= execute query =========
  let result = await apiFeature.mongooseQuery;
  res.json({ message: "success", pageNumber: apiFeature.PAGE_NUMBER, result });
});

export const getReview = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await reviewModel.findById(id);
  !result && next(new AppError("Review not found", 404));
  result && res.json({ message: "success", result });
});

export const updateReview = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await reviewModel.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    { new: true }
  );
  !result && next(new AppError("Review not found or you are not authorized to perform this action", 404));
  result && res.json({ message: "success", result });
});

export const deleteReview = factory.deleteOne(reviewModel);
