import { Request, Response } from "express";
import { servicesOrder } from "./order.services";
import orderSchemaValidationZod from "./order.zodvalidation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const validateOrder = orderSchemaValidationZod.parse(orderData);
    const result = await servicesOrder.createOrderIntoDB(validateOrder);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message || "Order does not created!",
        data: err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
        data: err,
      });
    }
  }
};

export const orderController = {
  createOrder,
};
