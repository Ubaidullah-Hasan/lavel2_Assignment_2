import express from "express";
import { orderController } from "./order.controller";
const route = express.Router();

route.get("/", orderController.getOrdersData);
route.post("/", orderController.createOrder);

export const orderRoute = route;
