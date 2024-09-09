import { catchError } from "../../middleware/catchError.js";
import { CartModel } from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { OrderModel } from "../../../database/models/order.model.js";
import { AppError } from "../../utils/AppError.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Px66zFJR5x13atRbwNwqUwSa9Xql1NfclNIDHtNMi0fVGTX7TB9teFJMzJMYqZ8FyfgUmjJy6SAi7T98Xe8nKrL00zTjYb0Bv');

export const createCashOrder = catchError(async (req, res,next) => {
  //1- get cart ID
  const cart = await CartModel.findById(req.params.id);

  //2- cal total price
  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  //3- create order
  const order = new OrderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  await order.save();
  //4- increment sold & decrement quantity
  if (order) {
    let options = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));
    await productModel.bulkWrite(options);
    //5- clear user cart
    await CartModel.findByIdAndDelete(req.params.id);
    return res.status(201).json({message:"Success",order})

  }else{
    return next(new AppError('Cart not found or not authorized to delete cart'), 404);
  }
});


export const getSpecificOrder = catchError(async (req, res,next) => {

  let order = await OrderModel.findOne({user: req.user._id}).populate('cartItems.product')
  res.status(200).json({message:"success" , order});

});

export const createCheckOutSession = catchError(async (req, res,next) => {

  //1- get cart ID
  const cart = await CartModel.findById(req.params.id);

  //2- cal total price
  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data:{
          currency: 'egp',
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://bahaamo-portfolio.netlify.app/`,
    cancel_url: `https://bahaamo-portfolio.netlify.app/#about`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata:req.body.shippingAddress
  })
  res.json({message: "success" , session})

});