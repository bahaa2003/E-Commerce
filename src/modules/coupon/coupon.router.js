import express from "express";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "./coupon.controller.js";

const CouponRouter = express.Router();

CouponRouter.route("/")
  .post(protectedRouts, allowedTo("user"), createCoupon)
  .get(getAllCoupons);

CouponRouter.route("/:id")
  .get(getCoupon)
  .put(protectedRouts, allowedTo("admin", "user"), updateCoupon)
  .delete(protectedRouts, allowedTo("admin", "user"), deleteCoupon);

export default CouponRouter;
