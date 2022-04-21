import { OrderModel } from "./order.schema";

class Order {
    static async create({ newOrder }) {
        const createdNewOrder = await OrderModel.create(newOrder);
        return createdNewOrder;
    }

    static async findByProductId({ order_id }) {
        const order = await OrderModel.findOne({ order_id });
        return order;
    }

    static async findAll() {
        const orders = await OrderModel.find({});
        return orders;
    }

    static async update({ order_id, fieldToUpdate, newValue }) {
        const filteredById = { order_id };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const update_product = await OrderModel.findOneAndUpdate(
            filteredById,
            updateData,
            option
        );

        return update_product;
    }

    static async deleteByProductId({ order_id }) {
        const delete_order = await OrderModel.deleteOne({ order_id });
        return delete_order;
    }
}

export { Order };
