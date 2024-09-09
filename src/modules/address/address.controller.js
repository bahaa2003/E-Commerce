import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";

export const addAddress = catchError(async (req, res, next) => {
  let result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    { new: true }
  );
  !result && next(new AppError("Address not found ", 404));
  result && res.json({ message: "success", result: result.addresses });
});

export const removeAddress = catchError(async (req, res, next) => {
  let result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { _id: req.body.address } },
    { new: true }
  );
  !result && next(new AppError("Address not found ", 404));
  result && res.json({ message: "success", result: result.addresses });
});

export const getAllUserAddress = catchError(async (req, res, next) => {
  let result = await userModel.findOne({ _id: req.user._id });
  !result && next(new AppError("Address not found ", 404));
  result && res.json({ message: "success", result: result.addresses });
});
