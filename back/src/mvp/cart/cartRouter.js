import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { cartService } from "./cartService";

const cartRouter = Router();
cartRouter.use(loginRequired);

cartRouter.get("/", async (req, res, next) => {
    try {
        const userId = req.currentUserId;

        const carts = await cartService.getCartList({ userId });

        if (carts.errorMessage) {
            throw new Error(carts.errorMessage);
        }

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

cartRouter.put("/:productId", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const productId = req.params.productId;
        const { quantity } = req.body; // body로 수량 몇개로 수정하는지 or 기존에서 몇개 추가/제거 됐는지(+1 or -3 ...)

        const carts = await cartService.updateCartList({ userId, productId, quantity });

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

cartRouter.delete("/:productId", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const productId = req.params.productId;

        const carts = await cartService.deleteProductIdOfCart({ userId, productId });

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

export { cartRouter };
