import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { couponModel } from "../../../database/models/coupon.model.js";
import qrcode from "qrcode";

export const createCoupon = catchError(async (req, res) => {
  let result = new couponModel(req.body);
  await result.save();
  res.json({ message: "success" });
});

export const getAllCoupons = catchError(async (req, res) => {
  let apiFeature = new ApiFeature(couponModel.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();

  //========= execute query =========
  let result = await apiFeature.mongooseQuery;
  res.json({ message: "success", pageNumber: apiFeature.PAGE_NUMBER, result });
});

export const getCoupon = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await couponModel.findById(id);
  let url = await qrcode.toDataURL(result.code);
  !result && next(new AppError("Coupon not found", 404));
  result && res.json({ message: "success", result, url });
});

export const updateCoupon = catchError(async (req, res, next) => {
  const { id } = req.params;
  let result = await couponModel.findOneAndUpdate(id, req.body, { new: true });
  !result &&
    next(
      new AppError(
        "Coupon not found or you are not authorized to perform this action",
        404
      )
    );
  result && res.json({ message: "success", result });
});

export const deleteCoupon = factory.deleteOne(couponModel);
