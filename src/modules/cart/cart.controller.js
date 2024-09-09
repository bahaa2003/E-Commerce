import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { CartModel } from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { couponModel } from "../../../database/models/coupon.model.js";

function calcTotalPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((elm) => {
    totalPrice += elm.quantity * elm.price;
  });
  cart.totalPrice = totalPrice;
}

export const addProductToCart = catchError(async (req, res,next) => {
  let product = await productModel.findById(req.body.product);
  if (!product) return next(new AppError("product not found", 401));
  req.body.price = product.price;

  let isCartExists = await CartModel.findOne({ user: req.user._id });
  if (!isCartExists) {
    let cart = new CartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    res.json({ message: "success", cart });
  }
  let item = isCartExists.cartItems.find(
    (elm) => elm.product == req.body.product
  );
  if (item) {
    item.quantity += req.body.quantity || 1;
  } else {
    isCartExists.cartItems.push(req.body);
  }
  calcTotalPrice(isCartExists);

  if(isCartExists.discount){
    isCartExists.totalPriceAfterDiscount = isCartExists.totalPrice - (isCartExists.totalPrice * isCartExists.discount) / 100
  }
  await isCartExists.save();
  res.json({ message: "success", cart: isCartExists });
});


export const removeProductFromCart = catchError(async (req, res, next) => {
  let result = await CartModel.findOneAndUpdate({user : req.user._id} ,{$pull:{cartItems:{_id:req.params.id}}},{ new: true });
  !result && next(new AppError("Item not found ", 404));
  calcTotalPrice(result)
  if(result.discount){
    result.totalPriceAfterDiscount = result.totalPrice - (result.totalPrice * result.discount) / 100
  }
  result && res.json({ message: "success", result });
});


export const updateQuantity = catchError(async (req, res , next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) return next(new AppError("product not found", 401));

  let isCartExists = await CartModel.findOne({ user: req.user._id });
  let item = isCartExists.cartItems.find((elm) => elm.product == req.params.id);
  if (item) {
    item.quantity = req.body.quantity || 1;
  } else {
    isCartExists.cartItems.push(req.body);
  }
  calcTotalPrice(isCartExists);
  if(isCartExists.discount){
    isCartExists.totalPriceAfterDiscount = isCartExists.totalPrice - (isCartExists.totalPrice * isCartExists.discount) / 100
  }
  await isCartExists.save();
  res.json({ message: "success", cart: isCartExists });
});

export const applyCoupon = catchError(async (req, res) => {

  let coupon = await couponModel.findOne({code : req.body.code , expires:{$gt : Date.now()}});
  let cart = await CartModel.findOne({user: req.user._id})

  cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
  cart.discount = coupon.discount
  await cart.save()
  res.status(200).json({message:"Success" , cart})

});

export const getLoggedUserCart = catchError(async (req, res) => {

  let cartItems = await CartModel.findOne({ user: req.user._id }).populate('cartItems.product');
  res.json({ message: "success", cart: cartItems });
});
