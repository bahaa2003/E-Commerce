import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";

export const addToWishlist = catchError(async (req, res, next) => {
  const { product } = req.body;
  let result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: product } },
    { new: true }
  );
  !result && next(new AppError("Product not found ", 404));
  result && res.json({ message: "success", result: result.wishlist });
});

export const removeFromWishlist = catchError(async (req, res, next) => {
  const { product } = req.body;
  let result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: product } },
    { new: true }
  );
  !result && next(new AppError("Product not found ", 404));
  result && res.json({ message: "success", result: result.wishlist });
});

export const getAllUserWishlist = catchError(async (req, res, next) => {
  let result = await userModel.findOne({ _id: req.user._id });
  !result && next(new AppError("Product not found ", 404));
  result && res.json({ message: "success", result: result.wishlist });
});
