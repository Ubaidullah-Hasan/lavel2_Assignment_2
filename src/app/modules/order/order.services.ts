import { OrderModel } from "./order.model";
import { TOrder } from "./order.interface";

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await OrderModel.create(orderData);
  return result;
};

export const servicesOrder = {
  createOrderIntoDB,
};
