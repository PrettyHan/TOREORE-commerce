import { OrderModel } from "./order.schema";

class Order {
    static async create({ newOrder }) {
        const createdNewOrder = await OrderModel.create(newOrder);
        return createdNewOrder;
    }

    static async findByOrderId({ orderId }) {
        const order = await OrderModel.findOne({ orderId });
        return order;
    }
    static async findByUserId({ userId }) {
        const order = await OrderModel.find({ userId });
        return order;
    }
    static async findAll() {
        const orders = await OrderModel.find({});
        return orders;
    }
    static async findByIspayed({isPayed}) {
        const orders = await OrderModel.find({isPayed});
        return orders;
    }

    static async update({ orderId, fieldToUpdate, newValue }) {
        const filteredById = { _id : orderId };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updateProduct = await OrderModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updateProduct;
    }

    static async deleteByOrderId({ orderId }) {
        const deleteOrder = await OrderModel.deleteOne({ _id : orderId });
        return deleteOrder;
    }
}

export { Order };
