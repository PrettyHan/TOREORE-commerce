import { OrderModel } from "./order.schema";

class Order {
    static async create({ newOrder }) {
        const createdNewOrder = await OrderModel.create(newOrder);
        return createdNewOrder;
    }

    static async findByProductId({ product_id }) {
        const order = await OrderModel.findOne({ product_id });
        return order;
    }

    static async findAll() {
        const orders = await OrderModel.find({});
        return orders;
    }

    static async update({ product_id, fieldToUpdate, newValue }) {
        const filteredById = { product_id };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const update_order = await OrderModel.findOneAndUpdate(
            filteredById,
            updateData,
            option
        );

        return update_order;
    }

    static async deleteByProductId({ product_id }) {
        const delete_product = await OrderModel.deleteOne({ product_id });
        return delete_product;
    }
}

export { Order };
