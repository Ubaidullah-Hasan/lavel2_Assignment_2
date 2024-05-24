import express from "express";
import { productController } from "./product.controller";
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getSingleProductById);
router.post("/", productController.createProduct);
router.put("/:productId", productController.updateSingleProductById);
router.delete("/:productId", productController.deleteSingleProductById);

export const productRoute = router;
