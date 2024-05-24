import { OrderModel } from "./order.model";
import { TOrder } from "./order.interface";
import { Types } from "mongoose";
import { ProductModel } from "../product/product.model";

const createOrderIntoDB = async (orderData: TOrder) => {
  const objectId = new Types.ObjectId(orderData.productId);
  const product = await ProductModel.findById(objectId);
  if (!product) {
    throw new Error("Product ID does not exist");
  }

  if (product.inventory.quantity < orderData.quantity) {
    throw new Error("Not enough quantity in stock");
  }

  const newOrder = new OrderModel(orderData);
  await newOrder.save();

  product.inventory.quantity -= orderData.quantity;
  if (product.inventory.quantity === 0) {
    product.inventory.inStock = false;
  }

  await product.save();

  return newOrder;
};

const getOrderDataFromDB = async () => {
  const result = await OrderModel.find({});
  if (result.length === 0) {
    throw new Error("Order not available!");
  }
  return result;
};

const getOrderDataByEmailFromDB = async (email: string) => {
  const result = await OrderModel.find({ email: email });
  if (result.length === 0) {
    throw new Error("Order not available!");
  }
  return result;
};

export const servicesOrder = {
  createOrderIntoDB,
  getOrderDataFromDB,
  getOrderDataByEmailFromDB,
};
