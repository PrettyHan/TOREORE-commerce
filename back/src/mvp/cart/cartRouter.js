import { Router } from "express";
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
