import { Order } from "../../db";
import { v4 as uuidv4 } from "uuid";

class orderService {
    static async createOrder(orderData) {
        const {products,userId,totalPrice,orderName,zipcode,message,paymentMethod,isPayed, orderId} = orderData
        const newOrder = {products,userId,totalPrice,orderName,zipcode,message,paymentMethod,isPayed, orderId} 
        // db에 저장
        const createdNewOrder = await Order.create( {newOrder} );
        createdNewOrder.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    
        return createdNewOrder;
      }

    static async getOrders({userId}) {
        const orders = await Order.findByUserId({userId});
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

    static async getIspayedByQuery({ isPayed, userId }) {
        const order = await Order.findByIspayed({ isPayed, userId });
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
        if (toUpdate.zipcode) {
            const fieldToUpdate = "zipcode";
            const newValue = toUpdate.zipcode;
            order = await Order.update({ orderId, fieldToUpdate, newValue });
        }

        if (toUpdate.message) {
            const fieldToUpdate = "message";
            const newValue = toUpdate.message;
            order = await Order.update({ orderId, fieldToUpdate, newValue });
        }

        if (toUpdate.paymentMethod) {
            const fieldToUpdate = "paymentMethod";
            const newValue = toUpdate.paymentMethod;
            order = await Order.update({ orderId, fieldToUpdate, newValue });
        }
        if (toUpdate.isPayed) {
            const fieldToUpdate = "isPayed";
            const newValue = toUpdate.isPayed;
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

export { orderService };
