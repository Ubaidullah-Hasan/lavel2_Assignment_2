import { Request, Response } from "express";
import { productServices } from "./product.services";
import productSchemaValidationZod from "./product.zod_validation";

const createProduct = async(req: Request, res: Response) => {
    try {
        const productData = req.body;
        const validateProduct = productSchemaValidationZod.parse(productData);
        const result = await productServices.createProductIntoDB(validateProduct); 
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message || "Product does not create!",
                data: err
            })
        } else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred",
                data: err
            });
        }
        
    }
}

const getAllProducts = async(req: Request, res: Response) => {
    try{
        const result = await productServices.getAllProductsIntoDB();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        })
    } catch (err: unknown) {
        if(err instanceof Error){
            res.status(500).json({
                success: false,
                message: err.message || "Products does not retrieve",
                data: err
            })
        } else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred",
                data: err
            });
        }
        
    }
}

const getSingleProductById = async(req: Request, res: Response) => {
    try{
        const id = req.params.productId;
        const result = await productServices.getSingleProductFromDB(id);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        })
    } catch (err: unknown) {
        if(err instanceof Error){
            res.status(500).json({
                success: false,
                message: err.message || "Products does not retrieve",
                data: err
            })
        } else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred",
                data: err
            });
        }
        
    }
}

const updateSingleProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const dataForUpdate = req.body;
        const result = await productServices.updateSingleProductIntoDB(productId, dataForUpdate);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message || "Products does not updated!",
                data: err
            })
        } else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred",
                data: err
            });
        }

    }
}

export const productController = {
    createProduct,
    getAllProducts,
    getSingleProductById,
    updateSingleProductById,
}