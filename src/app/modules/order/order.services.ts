import { OrderModel } from "./order.model";
import { TOrder } from "./order.interface";

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await OrderModel.create(orderData);
  return result;
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
