import { User, Product } from "../../db";

class cartService {
    static async getCartList({ userId }) {
        const user = await User.findByUserId({ userId });
        return user.cart;
    }

    static async AddProductToCart({ userId, productId, quantity }) {
        const user = await User.findByUserId({ userId });
        const carts = user.cart;

        const productInfo = await Product.findByProductId({ productId });
        const newProductInfo = {
            productId: productInfo.productId,
            name: productInfo.name,
            category: productInfo.category,
            price: productInfo.price,
            color: productInfo.color,
            description: productInfo.description,
            image: productInfo.image,
            quantity: quantity,
        };

        if (carts.length === 0) {
            var newCartList = [];
            newCartList.push(newProductInfo);
        } else {
            // 기존 카트에 해당 상품이 존재하는지
            const checkedCartItems = carts.filter((productObject) => {
                return productObject.productId === productId;
            });

            if (checkedCartItems.length === 0) {
                var newCartList = [...carts];
                newCartList.push(newProductInfo);
                console.log(newCartList);
            } else {
                const errorMessage = "장바구니에 동일한 상품이 이미 등록되어 있습니다.";
                return { errorMessage };
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

        const newCartList = carts.map((productObject) => {
            if (productObject.productId === productId) {
                return { ...productObject, quantity: quantity };
            }
        });

        const fieldToUpdate = "cart";
        const newValue = newCartList;
        const updateCartList = await User.update({ userId, fieldToUpdate, newValue });
        console.log("카트리스트가 업데이트(수량변경)된 유저 정보 >> ", updateCartList);

        return newCartList;
    }

    // 유저의 카트 리스트 삭제 -> id가 일치하는 product를 리스트에서 삭제
    static async deleteProductOfCart({ userId, productIdArr }) {
        // const carts = user.cart;
        
        // const fieldToUpdate = "cart";
        // const newValue = newCartList;
        // const updateCartList = await User.update({ userId, fieldToUpdate, newValue });
        // console.log("카트리스트가 업데이트(삭제)된 유저 정보 >> ", updateCartList);
        productIdArr.forEach(productId => {
            await User.deleteProductBySelected({ userId, productId });
        });
        const user = await User.findByUserId({ userId });
        console.log("선택한 상품들을 모두 제거한 후의 장바구니 상태 >> ", user.cart);

        return user.cart;
    }

    static async deleteAllProductsOfCart({ userId }) {
        const emptyCart = [];
        const fieldToUpdate = "cart";
        const newValue = emptyCart;
        const updateCartList = await User.update({ userId, fieldToUpdate, newValue });

        return updateCartList;
    }
}

export { cartService };
