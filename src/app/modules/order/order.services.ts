import { OrderModel } from "./order.model";
import { TOrder } from "./order.interface";

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await OrderModel.create(orderData);
  return result;
};
const getOrderDataFromDB = async () => {
  const result = await OrderModel.find({});
  return result;
};

export const servicesOrder = {
  createOrderIntoDB,
  getOrderDataFromDB,
};
