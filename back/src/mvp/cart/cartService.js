import { User, Product } from "../../db";

class cartService {
    // 유저의 카트 리스트 조회
    static async getCartList({ userId }) {
        const user = await User.findByUserId({ userId });
        return user.cart; // array
    }

    // 유저의 카트 리스트 조회 -> 수량 정보 업데이트
    static async updateCartList({ userId, productId, quantity }) {}

    // 유저의 카트 리스트 조회 -> id가 일치하는 product 삭제
    static async deleteProductIdOfCart({ userId, productId }) {}
}

export { cartService };
