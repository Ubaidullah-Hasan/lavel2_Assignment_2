import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
    const result = await ProductModel.create(product);
    return result;
}

const getAllProductsIntoDB = async () => {
    const result = await ProductModel.find({});
    if(result.length === 0){
        throw new Error("Product not available");
    }
    return result;
}

const getProductsByQueryFromDB = async (searchTerm: string) => {
    const result = await ProductModel.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ],
    });
    if (result.length === 0) {
        throw new Error(`${searchTerm} not found`);
    }
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

const deleteSingleProductFromDB = async (id: string) => {
    const result = await ProductModel.findByIdAndDelete(id);
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
    deleteSingleProductFromDB,
    getProductsByQueryFromDB,
}