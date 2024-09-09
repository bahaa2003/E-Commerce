import express from "express";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { createCashOrder, createCheckOutSession, getSpecificOrder } from "./order.controller.js";


const OrderRouter = express.Router();

OrderRouter.route("/")
  .get(protectedRouts, allowedTo("user"), getSpecificOrder);


OrderRouter.route("/:id")
.post(protectedRouts, allowedTo("user"), createCashOrder)

OrderRouter.post("/checkout/:id",protectedRouts, allowedTo("user"),createCheckOutSession )
export default OrderRouter;
