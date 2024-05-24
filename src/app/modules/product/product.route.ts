import express from 'express';
import { productController } from './product.controller';
const router = express.Router();

router.get("/products", productController.getAllProducts);
router.get("/products/:productId", productController.getSingleProductById);
router.post("/products", productController.createProduct);

export const productRoute = router;
