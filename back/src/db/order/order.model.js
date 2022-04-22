import { OrderModel } from "./order.schema";

class Order {
    static async create({ newOrder }) {
        const createdNewOrder = await OrderModel.create(newOrder);
        return createdNewOrder;
    }

    static async findByProductId({ orderId }) {
        const order = await OrderModel.findOne({ orderId });
        return order;
    }

    static async findAll() {
        const orders = await OrderModel.find({});
        return orders;
    }

    static async update({ orderId, fieldToUpdate, newValue }) {
        const filteredById = { orderId };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updateProduct = await OrderModel.findOneAndUpdate(
            filteredById,
            updateData,
            option
        );

        return updateProduct;
    }

    static async deleteByProductId({ orderId }) {
        const deleteOrder = await OrderModel.deleteOne({ orderId });
        return deleteOrder;
    }
}

export { Order };
