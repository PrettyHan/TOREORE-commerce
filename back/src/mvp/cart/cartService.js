import { User, Product } from "../../db";

class cartService {
    static async getCartList({ userId }) {}

    static async updateCartList({ userId, productId }) {}

    static async deleteProductIdOfCart({ userId, productId }) {}
}

export { cartService };
