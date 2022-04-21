import { ProductModel } from "./product.schema";

class Product {
    static async create({ newProduct }) {
        const createdNewProduct = await ProductModel.create(newProduct);
        return createdNewProduct;
    }

    static async findByProductId({ product_id }) {
        const product = await ProductModel.findOne({ product_id });
        return product;
    }

    static async findAll() {
        const products = await ProductModel.find({});
        return products;
    }

    static async update({ product_id, fieldToUpdate, newValue }) {
        const filteredById = { product_id };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const update_product = await ProductModel.findOneAndUpdate(
            filteredById,
            updateData,
            option
        );

        return update_product;
    }

    static async deleteByProductId({ product_id }) {
        const delete_product = await ProductModel.deleteOne({ product_id });
        return delete_product;
    }
}

export { Product };
