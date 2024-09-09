import express from "express";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import {
  addToWishlist,
  getAllUserWishlist,
  removeFromWishlist,
} from "./wishlist.controller.js";

const WishlistRouter = express.Router();

WishlistRouter.route("/")
  .patch(protectedRouts, allowedTo("user"), addToWishlist)
  .delete(protectedRouts, allowedTo("user"), removeFromWishlist)
  .get(protectedRouts, allowedTo("user"),getAllUserWishlist);

export default WishlistRouter;
