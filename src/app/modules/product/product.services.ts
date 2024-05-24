import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
    const result = await ProductModel.create(product);
    return result;
}

const getAllProductsIntoDB = async () => {
    const result = await ProductModel.find({});
    return result;
}

const getSingleProductFromDB = async (id: string) => {
    const result = await ProductModel.findById(id)
    return result;
}

const updateSingleProductIntoDB = async (id: string, dataForUpdate: TProduct) => {
    const result = await ProductModel.findByIdAndUpdate(id, { $set: dataForUpdate }, { new: true });
    if (!result) {
        throw new Error("Product not found");
    }
    return result;
}

export const productServices = {
    createProductIntoDB,
    getAllProductsIntoDB,
    getSingleProductFromDB,
    updateSingleProductIntoDB,
}