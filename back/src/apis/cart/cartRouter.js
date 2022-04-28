import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { cartService } from "./cartService";

const cartRouter = Router();
cartRouter.use(loginRequired);

cartRouter.get("/", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const carts = await cartService.getCartList({ userId });

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

// 장바구니에 상품 등록(수량정보 body로 받기)
cartRouter.post("/:productId", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const productId = req.params.productId;
        const quantity = req.body.quantity;

        const newCarts = await cartService.AddProductToCart({
            userId,
            productId,
            quantity,
        });

        if (newCarts.errorMessage) {
            throw new Error(newCarts.errorMessage);
        }

        res.status(200).json(newCarts);
    } catch (error) {
        next(error);
    }
});

cartRouter.put("/:productId", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const productId = req.params.productId;
        const quantity = req.body.quantity; // body로 수량 몇개로 수정하는지 or 기존에서 몇개 추가/제거 됐는지(+1 or -3 ...)

        const newCarts = await cartService.updateCartList({
            userId,
            productId,
            quantity,
        });

        res.status(200).json(newCarts);
    } catch (error) {
        next(error);
    }
});

cartRouter.delete("/:productId", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const productId = req.params.productId;

        const carts = await cartService.deleteProductOfCart({ userId, productId });

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

// 장바구니 리스트 전체 비우는 api도 추가해야?
cartRouter.delete("/", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const deletedCart = await cartService.deleteAllProducts({ userId });

        res.status(200).json(deletedCart);
    } catch (error) {
        next(error);
    }
});

export { cartRouter };
