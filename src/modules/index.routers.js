import { AppError } from "../utils/AppError.js";
import addaressRouter from "./address/address.router.js";
import authRouter from "./auth/auth.router.js";
import BrandRouter from "./brand/brand.router.js";
import CartRouter from "./cart/cart.router.js";
import categoryRouter from "./category/category.router.js";
import CouponRouter from "./coupon/coupon.router.js";
import OrderRouter from "./order/order.router.js";
import productRouter from "./product/product.router.js";
import ReviewRouter from "./review/review.router.js";
import SubCategoryRouter from "./subCategory/subCategory.router.js";
import userRouter from "./user/user.router.js";
import WishlistRouter from "./wishlist/wishlist.router.js";
import { globalErrorHandelMiddleware } from './../middleware/globalErrorMiddleware.js';

export function init(app) {
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", SubCategoryRouter);
  app.use("/api/v1/brands", BrandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", ReviewRouter);
  app.use("/api/v1/wishlist", WishlistRouter);
  app.use("/api/v1/coupons", CouponRouter);
  app.use("/api/v1/carts", CartRouter);
  app.use("/api/v1/orders", OrderRouter);
  app.use("/api/v1/addresses", addaressRouter);

  app.all("*", (req, res, next) => {
    next(new AppError(`can't find this route : ${req.originalUrl}`, 404));
  });
  //global error handling middleware
  app.use(globalErrorHandelMiddleware);
}
