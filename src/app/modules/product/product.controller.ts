import { Request, Response } from "express";
import { productServices } from "./product.services";
import productSchemaValidationZod from "./product.zod_validation";

const createProduct = async(req: Request, res: Response) => {
    try {
        const {product: productData} = req.body;
        const validateProduct = productSchemaValidationZod.parse(productData);
        const result = await productServices.createProductIntoDB(validateProduct); 
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Product does not create!",
            data: err
        })
    }
}

export const productController = {
    createProduct,
}