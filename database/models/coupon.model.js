import mongoose from "mongoose";

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "coupon code is required"],
      unique: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: [true, "discount amount is required"],
      min: [0, "Discount amount must be greater than or equal to 0"],
    },
    expires: {
      type: Date,
      required: [true, "expiry date is required"],
      //default: Date.now() + 30 * 24 * 60 * 60 * 1000,  // 30 days from now
    },
  },
  { timestamps: true }
);

export const couponModel = mongoose.model("coupon", couponSchema);
