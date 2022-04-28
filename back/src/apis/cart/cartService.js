import { User, Product } from "../../db";

class cartService {
    // 유저의 카트 리스트 조회
    static async getCartList({ userId }) {
        const user = await User.findByUserId({ userId });
        return user.cart; // array
    }

    static async AddProductToCart({ userId, productId }) {
        const user = await User.findByUserId({ userId });
        const carts = user.cart;

        const productInfo = await Product.findByProductId({ productId });
        const newProductInfo = { ...productInfo, quantity: quantity };

        if (carts.length === 0) {
            var newCartList = carts.push(newProductInfo);
        } else {
            // 기존 카트에 해당 상품이 존재하는지
            const checkedCartItems = carts.filter((productObject) => {
                return productObject.productId === productId;
            });

            if (checkedCartItems.length === 0) {
                var newCartList = carts.push(newProductInfo);
            }
        }

        const fieldToUpdate = "cart";
        const newValue = newCartList;
        const updateCartList = await User.update({ userId, fieldToUpdate, newValue });

        return updateCartList;
    }

    // 유저의 카트 리스트 수정 -> 수량 정보 업데이트
    static async updateCartList({ userId, productId, quantity }) {
        const user = await User.findByUserId({ userId });
        const carts = user.cart; // cart list

        if (carts.length === 0) {
            const errorMessage = "장바구니가 비었습니다.";
            return { errorMessage };
        }

        // 트랜잭션을 적용할 수 있을지?
        // 수량정보 수정한 새로운 배열 반환
        const newCartList = carts.map((objectId) => {
            if (objectId === productId) {
                objectId.quantity = quantity;
            }
        });

        const fieldToUpdate = "cart";
        const newValue = newCartList;
        const updateCartList = await User.update({ userId, fieldToUpdate, newValue });
        console.log("카트리스트가 업데이트(수량변경)된 유저 정보 >> ", updateCartList);

        return newCartList;
    }

    // 유저의 카트 리스트 삭제 -> id가 일치하는 product를 리스트에서 삭제
    static async deleteProductIdOfCart({ userId, productId }) {
        const user = await User.findByUserId({ userId });
        const carts = user.cart; // cart list

        // 일치하는 product를 제외한 새로운 배열 반환
        const newCartList = carts.filter((objectId) => {
            return objectId !== productId;
        });

        const fieldToUpdate = "cart";
        const newValue = newCartList;
        const updateCartList = await User.update({ userId, fieldToUpdate, newValue });
        console.log("카트리스트가 업데이트(삭제)된 유저 정보 >> ", updateCartList);

        return newCartList;
    }

    static async deleteAllProducts({ userId }) {
        const emptyCart = [];
        const fieldToUpdate = "cart";
        const newValue = emptyCart;
        const updateCartList = await User.update({ userId, fieldToUpdate, newValue });

        return updateCartList;
    }
}

export { cartService };
