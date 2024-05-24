import express from 'express';
import { productController } from './product.controller';
var router = express.Router();

router.post("/products", productController.createProduct);

export const productRoute = router;
