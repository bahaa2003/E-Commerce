import express from "express";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { addProductToCart, getLoggedUserCart, removeProductFromCart, updateQuantity } from './cart.controller.js';


const CartRouter = express.Router();

CartRouter.route("/")
  .post(protectedRouts, allowedTo("user"), addProductToCart)
  .get(protectedRouts, allowedTo("user"), getLoggedUserCart);

CartRouter.route("/:id")

  .delete(protectedRouts, allowedTo("admin", "user"), removeProductFromCart)
  .put(protectedRouts, allowedTo("admin", "user"), updateQuantity);
export default CartRouter;
