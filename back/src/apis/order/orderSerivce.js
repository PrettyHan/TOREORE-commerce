import { Order } from "../../db";
import { v4 as uuidv4 } from "uuid";

class orderSerivce {
    static async getOrders() {
        const orders = await Order.findAll();
        if (!orders) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return orders;
    }

    static async getOrder({ orderId }) {
        const order = await Order.findByOrderId({ orderId });
        if (!order) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return order;
    }

    static async getIspayedByQuery({ ispayed }) {
        const order = await Order.findByIspayed({ ispayed });
        if (!order) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return order;
    }
    static async updateOrder({ orderId, toUpdate }) {
        let order = await Order.findByOrderId({ orderId });

        if (!order) {
            const errorMessage = "주문 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        if (toUpdate.products) {
            const fieldToUpdate = "products";
            const newValue = toUpdate.products;
            order = await Order.update({ orderId, fieldToUpdate, newValue });
        }

        if (toUpdate.totalPrice) {
            const fieldToUpdate = "totalPrice";
            const newValue = toUpdate.totalPrice;
            order = await Order.update({ orderId, fieldToUpdate, newValue });
        }

        if (toUpdate.orderName) {
            const fieldToUpdate = "orderName";
            const newValue = toUpdate.orderName;
            order = await Order.update({ orderId, fieldToUpdate, newValue });
        }

        if (toUpdate.zipcode) {
            const fieldToUpdate = "zipcode";
            const newValue = toUpdate.zipcode;
            order = await Order.update({ orderId, fieldToUpdate, newValue });
        }

        if (toUpdate.message) {
            const fieldToUpdate = "message";
            const newValue = toUpdate.phone;
            order = await Order.update({ orderId, fieldToUpdate, newValue });
        }

        if (toUpdate.paymentMethod) {
            const fieldToUpdate = "paymentMethod";
            const newValue = toUpdate.birth;
            order = await Order.update({ orderId, fieldToUpdate, newValue });
        }

        return order;
    }
    static async deleteOrder({ orderId }) {
        const deletedOrder = await Order.deleteByOrderId({ orderId });

        if (!deletedOrder) {
            const errorMessage = "일치하는 주문 정보가 없습니다.";
            return { errorMessage };
        }

        return deletedOrder;
    }
}

export { orderSerivce };
