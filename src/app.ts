import express, { Request, Response } from "express";
import cors from "cors";
import { productRoute } from "./app/modules/product/product.route";
import { orderRoute } from "./app/modules/order/order.route";

export const app = express();

/***************
 * parser
 ************ */
app.use(cors());
app.use(express.json());

// application route
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
