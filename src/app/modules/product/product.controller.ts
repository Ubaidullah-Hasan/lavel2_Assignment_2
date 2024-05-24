import { Request, Response } from "express";
import { productServices } from "./product.services";
import {
  productSchemaValidationZod,
  productSchemaValidationZodForUpdate,
} from "./product.zod_validation";
import { TProduct } from "./product.interface";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const validateProduct = productSchemaValidationZod.parse(productData);
    const result = await productServices.createProductIntoDB(validateProduct);
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message || "Product does not create!",
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const products = await productServices.getProductsByQueryFromDB(
        searchTerm as string,
      );
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: products,
      });
    } else {
      const result = await productServices.getAllProductsIntoDB();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message || "Products does not retrieve",
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

const getSingleProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.getSingleProductFromDB(id);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message || "Products does not retrieve",
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

const updateSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const dataForUpdate = req.body;
    const valideData = productSchemaValidationZodForUpdate.parse(dataForUpdate);
    const result = await productServices.updateSingleProductIntoDB(
      productId,
      valideData as TProduct,
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message || "Products does not updated!",
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

const deleteSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await productServices.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message || "Products does not deleted!",
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

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProductById,
  updateSingleProductById,
  deleteSingleProductById,
};
