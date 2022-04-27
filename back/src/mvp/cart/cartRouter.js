import { Router } from "express";
import { cartService } from "./cartService";
import { loginRequired } from "../../middlewares/loginRequired";

const cartRouter = Router();
cartRouter.use(loginRequired);

cartRouter.get("/", async (req, res, next) => {
    try {
        const userId = req.currentUserId;

        const carts = await cartSerivce.getCartList({ userId });

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
        // body로 수량 몇개로 수정하는지 or 기존에서 몇개 추가/제거 됐는지(+1 or -3 ...)

        const carts = await cartSerivce.updateCartList({ userId, productId }); // 유저의 카트 리스트 조회 -> 수량 정보 업데이트

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

cartRouter.delete("/:productId", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const productId = req.params.productId;

        const carts = await cartSerivce.deleteProductIdOfCart({ userId, productId }); // 유저의 카트 리스트 조회 -> id가 일치하는 product 삭제

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

export { cartRouter };
