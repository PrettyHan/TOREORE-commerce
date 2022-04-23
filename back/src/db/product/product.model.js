import { ProductModel } from "./product.schema";

class Product {
    static async create({ newProduct }) {
        const createdNewProduct = await ProductModel.create(newProduct);
        return createdNewProduct;
    }

    static async createMany(productList) {
        const createdNewProducts = await ProductModel.create(productList);
        return createdNewProducts;
    }

    static async findByProductId({ productId }) {
        const product = await ProductModel.findOne({ productId });
        return product;
    }
    static async findByQuery(categoryquery) {
        const product = await ProductModel.find(categoryquery);
        return product;
    }

    static async findAll() {
        const products = await ProductModel.find({});
        return products;
    }

    static async update({ productId, fieldToUpdate, newValue }) {
        const filteredById = { productId };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updateProduct = await ProductModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updateProduct;
    }

    static async deleteByProductId({ productId }) {
        const deleteProduct = await ProductModel.deleteOne({ productId });
        return deleteProduct;
    }
}

export { Product };
