import { ProductModel } from "./product.schema";

class Product {
    static async create({ newProduct }) {
        const createdNewProduct = await ProductModel.create(newProduct);
        return createdNewProduct;
    }

    static async findByProductId({ productId }) {
        const product = await ProductModel.findOne({ productId });
        return product;
    }

    static async findByQuery(categoryQuery) {
        const product = await ProductModel.find(categoryQuery);
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

    static async findByLikeProductId({ proudctlikeId }) {
        const product = await ProductModel.findOne({ productId : proudctlikeId });
        return product;
    }

    static async findByLikeDelProductId({ productDelId }) {
        const product = await ProductModel.findOne({ productId : productDelId });
        return product;
    }

    // 좋아요 수 갱신을 위한 함수
    // static async likeProductUpdate({ productId, fieldToUpdate, newValue }) {
    //     const product = productId.productId;
    //     const filteredById = { product };
    //     const updateData = { [fieldToUpdate]: newValue };
    //     const option = { returnOriginal: false };

    //     const updateProduct = await ProductModel.findOneAndUpdate(
    //         filteredById,
    //         updateData,
    //         option,
    //     );
    //     return updateProduct;
    // }
}

export { Product };
